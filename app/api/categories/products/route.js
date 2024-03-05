import { connectToDB } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { method } = req;
  const searchParams = req.nextUrl.searchParams;
  let filters = [];
  const categories = searchParams.get("categories");
  const sort = searchParams.get("sort")
  const [sortField, sortOrder] = sort.split('-');
  
  // Extract category filter
  const categoryFilter = categories ? { category: categories.split(",") } : {};
  
  // Extract property filters
  for (const [key, value] of searchParams.entries()) {
    if (key !== 'categories' && key !== 'sort') {
      filters.push({ [key]: value });
    }
  }
  
  try {
    await connectToDB();
    if (method === "GET") {
      const products = await Product.find({ ...categoryFilter, ...buildPropertyFilter(filters) }, null,{sort:{[sortField]:sortOrder==='asc'? 1: -1}} );
      return NextResponse.json(products);
    } else {
      // Send a 405 Method Not Allowed response for other HTTP methods
      return new Response("Method Not Allowed", { status: 405 });
    }
  } catch (error) {
    return new Response(`Error adding product:${error}`, { status: 500 });
  }
}

// Function to build property filter
function buildPropertyFilter(filters) {
  const propertyFilter = {};
  for (const filter of filters) {
    const key = Object.keys(filter)[0];
    const value = filter[key];
    propertyFilter[`properties.${key}`] = value; // Assuming properties are nested under 'properties' field
  }
  return propertyFilter;
}
