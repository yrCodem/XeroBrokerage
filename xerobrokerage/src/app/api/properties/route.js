import { connectDB } from "@/lib/db";
import PropertyModel from "@/lib/models/Property";

export async function GET() {
    await connectDB(); 
    const listings = await PropertyModel.find({});

  
  
    return Response.json({ success: true, listings });
  }
  