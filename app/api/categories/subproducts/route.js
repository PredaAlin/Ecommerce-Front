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
           const category = await Category.findById({_id:categoryId});
           const subCategories = await Category.find({parent:category._id});
           const catIds = [category._id, ...subCategories.map(c => c._id)];
           const products = await Product.find({category:catIds});
           return NextResponse.json(products);

        }else{
           
      
        return new Response("no category id:", {status:201})
        }
     
        
          
       
       
        
         
        
        } else {
          // Send a 405 Method Not Allowed response for other HTTP methods
          return new Response("Method Not Allowed", { status: 405 });
        }
    } catch (error) {
      return new Response(`Error adding product:${error}`, {status:500})
    }
  }