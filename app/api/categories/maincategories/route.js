import { connectToDB } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(req) {
    const { method } = req;
    const searchParams = req.nextUrl.searchParams
    const categoryId = searchParams.get('id')
  
    try {
      await connectToDB();
      if (method === "GET") {
        if(categoryId){
            console.log(categoryId)
            return NextResponse.json(await Category.findById({_id:categoryId}))

        }else{
            const mainCategories = await Category.find({parent:null})
      
        return NextResponse.json(mainCategories)
        }
     
        
          
       
       
        
         
        
        } else {
          // Send a 405 Method Not Allowed response for other HTTP methods
          return new Response("Method Not Allowed", { status: 405 });
        }
    } catch (error) {
      return new Response(`Error adding product:${error}`, {status:500})
    }
  }