import { connectToDB } from '@/lib/mongoose'
import { Product } from '@/models/Product';
import { NextRequest, NextResponse } from 'next/server';
import React from 'react'

export async function GET(req, res){
    const {method} =req;
    console.log(method)
    try{
        await connectToDB();
        if(method === "GET"){
            const products = await Product.find({}, null, {sort:{'_id':-1}, limit: 4})
            return NextResponse.json(products)
        }
    }catch (error) {
        // Send an error response with a 500 status code
        return new Response("Failed to create a new product", { status: 500 });
      }

}