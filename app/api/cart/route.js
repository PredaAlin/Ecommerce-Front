import { connectToDB } from '@/lib/mongoose'
import { Product } from '@/models/Product';
import { NextRequest, NextResponse } from 'next/server';
import React from 'react'

export async function POST(req, res){
    const {method} =req
    const { ids } = await req.json();
    console.log(ids[0])
    console.log(method)
    try{
        await connectToDB();
        if(method === "POST"){
            const products = await Product.find({_id: ids})
           
            return NextResponse.json(products)
        }
    }catch (error) {
        // Send an error response with a 500 status code
        return new Response("Failed to create a new product", { status: 500 });
      }

}