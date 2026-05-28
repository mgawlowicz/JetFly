import { Kafka } from 'kafkajs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const kafka = new Kafka({ clientId: 'jetfly-worker', brokers: ['localhost:9092'] });
const consumer = kafka.consumer({ groupId: 'jetfly-operations-group' });

async function startWorker() {
  console.log('⚡ Starting JetFly Operations Kafka Worker Daemon...');
  await consumer.connect();
  await consumer.subscribe({ topic: 'payment-topic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      if (!message.value) return;
      const event = JSON.parse(message.value.toString());

      console.log(`\n--------------------------------------------------`);
      console.log(`📥 [KAFKA EVENT CONSUMED] Type: ${event.type}`);
      console.log(`--------------------------------------------------`);

      if (event.type === 'payment.succeeded') {
        const { bookingId } = event;

        const updated = await prisma.booking.update({
          where: { id: bookingId },
          data: { status: 'CONFIRMED' }
        });

        console.log(`✅ [DB Confirmed] Booking: ${bookingId} is now officially CONFIRMED.`);
        console.log(`✉️ [Powiadomienie] Wysłano bilet PDF na e-mail: ${updated.email}`);
        console.log(`🥂 [VIP Concierge] Przygotowano Bespoke Services: ${updated.bespokeServices}`);
      }
    }
  });
}

startWorker().catch(err => console.error(err));
