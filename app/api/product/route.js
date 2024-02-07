import { connectToDB } from '@/lib/mongoose'
import { Product } from '@/models/Product';
import { NextRequest, NextResponse } from 'next/server';
import React from 'react'

export async function GET(req, res){
    const {method} =req
    console.log(method)
    try{
        await connectToDB();
        if(method === "GET"){
            const product = await Product.findById({_id: '65ad067a77cac6113ff3a8be'})
            return NextResponse.json(product)
        }
    }catch (error) {
        // Send an error response with a 500 status code
        return new Response("Failed to create a new product", { status: 500 });
      }

}