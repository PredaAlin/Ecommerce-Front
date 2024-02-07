import { connectToDB } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
import { NextResponse } from "next/server";
import Server from 'next/server'
const stripe = require('stripe')(process.env.STRIPE_SK);

export async function POST(req, res) {
  const { method } = req;
  const {
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    cartProducts,
  } = await req.json();
  if (method === "POST") {
    try {
      await connectToDB();
      const uniqueIds = [...new Set(cartProducts)];
      console.log(uniqueIds);
      const productsInfos = await Product.find({ _id: uniqueIds });
      console.log("got here 1");
      let line_items = [];
      for (const productId of uniqueIds) {
        const productInfo = productsInfos.find(
          (p) => p._id.toString() === productId
        );

        const quantity =
          cartProducts.filter((id) => id === productId)?.length || 0;

        if (quantity > 0 && productInfo) {
            console.log("quantity:", quantity)
            console.log("price:", productInfo.price)
          line_items.push({
            quantity,
            price_data: {
              currency: "USD",
              product_data: { name: productInfo.title },
              unit_amount: productInfo.price *100,
            },
            
          });
        }
      }
      console.log(line_items);
      const orderDoc = await Order.create({
        line_items,
        name,
        email,
        city,
        postalCode,
        streetAddress,
        country,
        paid: false,
      });

      console.log(orderDoc)

      const session = await stripe.checkout.sessions.create({
        line_items,
        mode:'payment',
        customer_email: email,
        success_url: process.env.PUBLIC_URL + '/cart?success=1',
        cancel_url: process.env.PUBLIC_URL + '/cart?cancel=1',
        metadata:{orderId:orderDoc._id.toString(), test:'ok'},
      })
      console.log("session:", session.url)

      return NextResponse.json(session.url);
    } catch (error) {
      return new Response(`Should be a POST request: ${error}`, { status: 500 });
    }
  }
}
