import { dbConnect } from "@/lib/db";
import OtpSchema from "@/models/Otp";

export default async function POST(req) {
  const { email, otp } = await req.json();
  if (!email || !otp) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Missing Fields",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  await dbConnect();
  const record = await OtpSchema.findOne({ email });
  if (!record) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "OTP Expired or not found",
      }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  if (record.otp !== otp) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Invalid OTP",
      }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  await OtpSchema.deleteOne({ email });
  return new Response(
    JSON.stringify({
      success: true,
      message: "OTP verified..",
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
