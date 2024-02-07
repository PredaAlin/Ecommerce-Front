import { connectToDB } from "@/lib/mongoose";
import { Order } from "@/models/Order";
const stripe = require("stripe")(process.env.STRIPE_SK);
import { buffer } from "micro";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const { method } = req;
  if (method === "POST") {
    await connectToDB();
    const sig = req.headers.get("stripe-signature");
    console.log("sig:" + sig);

    let event;

    try {
      console.log(req.text);
      event = stripe.webhooks.constructEvent(
        await req.text(),
        sig,
        process.env.ENDPOINT_SECRET
      );
    } catch (err) {
      return new Response(`Webhook Error: ${err.message}`, { status: 500 });
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const data = event.data.object;
        const orderId = data.metadata.orderId;
        const paid = data.payment_status === 'paid';
        if(orderId && paid){
         await Order.findByIdAndUpdate(orderId, {paid:true})
        }
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  }

  return new Response("succesfull webhook", {status:200})
}

export const config = {
  api: { bodyParser: false },
};

