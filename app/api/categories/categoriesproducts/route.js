import { connectToDB } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { method } = req;
  const categoriesProducts = {};

  try {
    await connectToDB();
    if (method === "GET") {
      const mainCategories = await Category.find({ parent: null });
      const categories = await Category.find();
      for (const mainCat of mainCategories) {
        const mainCatId = mainCat._id.toString();
        const childCatIds = categories
          .filter((c) => c?.parent?.toString() === mainCatId)
          .map((c) => c._id.toString());

          const categoriesIds = [mainCatId, ...childCatIds]
        const products = await Product.find({ category: categoriesIds }, null, {
          limit: 3,
          sort: { _id: -1 },
        });
        categoriesProducts[mainCat._id] = products;
      }
      console.log(categoriesProducts);

      return NextResponse.json(categoriesProducts);
    } else {
      // Send a 405 Method Not Allowed response for other HTTP methods
      return new Response("Method Not Allowed", { status: 405 });
    }
  } catch (error) {
    return new Response(`Error adding product:${error}`, { status: 500 });
  }
}
