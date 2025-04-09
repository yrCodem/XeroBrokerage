import { connectDB } from "@/lib/db";
import PropertyModel from "@/lib/models/Property";
import cloudinary from "@/lib/cloudinary";


export async function GET() {
  try {
    await connectDB();
    const listings = await PropertyModel.find({});
    return Response.json({ success: true, listings });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: "Failed to fetch listings." }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  try {
    await connectDB(); 

    const formData = await req.formData();

    const title = formData.get("title");
    const price = formData.get("price");
    const address = formData.get("address");
    const beds = formData.get("beds");
    const baths = formData.get("baths");
    const file = formData.get("image");

    if (!title || !price || !address || !beds || !baths || !file) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
      });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: "properties",
          resource_type: "image",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    const imageUrl = uploadResult.secure_url;

    const newProperty = await PropertyModel.create({
      title,
      price,
      address,
      beds,
      baths,
      image: imageUrl,
      uploadedAt: new Date(),
    });

    return new Response(JSON.stringify({ success: true, property: newProperty }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
    });
  }
}
