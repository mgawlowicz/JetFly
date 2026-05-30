import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { publishEvent } from '@/lib/events/kafka';
import Stripe from 'stripe';

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16' as any,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      firstName, lastName, email, phone,
      departure, arrival, distance, datetime,
      jetSlug, passengers, price, sustainabilityTax,
      vat, bespokeServices, totalPrice
    } = body;

    const newBooking = await prisma.booking.create({
      data: {
        firstName, lastName, email, phone,
        departure, arrival, distance, datetime,
        jetSlug, passengers,
        price, sustainabilityTax, vat,
        bespokeServices: JSON.stringify(bespokeServices),
        totalPrice,
        status: 'PENDING_PAYMENT'
      }
    });

    await publishEvent('booking-topic', 'booking.created', newBooking.id, {
      email: newBooking.email,
      totalPrice: newBooking.totalPrice
    });

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `JetFly Private Flight: ${departure} to ${arrival}`,
              description: `Aircraft capacity: ${passengers} PAX. Class: Brutalist Premium.`,
            },
            unit_amount: Math.round(totalPrice * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/charter/confirmed?bookingId=${newBooking.id}`,
      cancel_url: `${baseUrl}/charter/confirm?status=cancelled`,
      metadata: {
        bookingId: newBooking.id,
      }
    });

    return NextResponse.json({
      success: true,
      stripeSessionUrl: session.url
    });
  } catch (error: any) {
    console.error('API Booking error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
