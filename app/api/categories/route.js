import { connectToDB } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(req) {
    const { method } = req;
    const categoriesProducts={};
  
    try {
      await connectToDB();
      if (method === "GET") {
     
        const mainCategories = await Category.find({parent:null})
        for (const mainCat of mainCategories){
          const products = await Product.find({category: mainCat._id}, null, {limit:3, sort:{'_id':-1}})
          categoriesProducts[mainCat._id] = products;
        }
        console.log(categoriesProducts);
      
        return NextResponse.json(categoriesProducts)
          
       
       
        
         
        
        } else {
          // Send a 405 Method Not Allowed response for other HTTP methods
          return new Response("Method Not Allowed", { status: 405 });
        }
    } catch (error) {
      return new Response(`Error adding product:${error}`, {status:500})
    }
  }