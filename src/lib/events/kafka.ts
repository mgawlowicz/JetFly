import { Kafka } from 'kafkajs';

const kafkaBroker = process.env.KAFKA_BROKER || 'localhost:9092';

export const kafka = new Kafka({
  clientId: 'jetfly-app',
  brokers: [kafkaBroker],
});

export const producer = kafka.producer();
let isConnected = false;

export async function connectProducer() {
  if (!isConnected) {
    await producer.connect();
    isConnected = true;
    console.log('CONNECTED: Kafka Producer active.');
  }
  return producer;
}

export async function publishEvent(topic: string, eventType: string, bookingId: string, data: object) {
  try {
    const activeProducer = await connectProducer();
    const payload = { type: eventType, bookingId, timestamp: new Date().toISOString(), ...data };
    await activeProducer.send({
      topic,
      messages: [{ key: bookingId, value: JSON.stringify(payload) }]
    });
    console.log(`[Kafka Published] Topic: ${topic} | Type: ${eventType}`);
  } catch (error) {
    console.error('Failed to publish event to Kafka:', error);
  }
}
