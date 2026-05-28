import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { publishEvent } from '@/lib/events/kafka';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { data: { object: session } } = body; 
    const bookingId = session.metadata.bookingId;
    const transactionId = session.id;

    console.log(`[Stripe Webhook Completed] Booking ID: ${bookingId} paid successfully.`);

    const updated = await prisma.booking.update({
      where: { id: bookingId },
      data: { status: 'PAID', paymentId: transactionId }
    });

    await publishEvent('payment-topic', 'payment.succeeded', updated.id, {
      transactionId,
      amount: updated.totalPrice
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
