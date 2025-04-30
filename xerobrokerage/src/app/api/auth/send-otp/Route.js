import nodemailer from "nodemailer";
import { connectDB } from "@/lib/db";
import OtpSchema from "@/models/Otp";

export default async function POST(req) {
  await connectDB();
  const { email } = await req.json();
  if (!email) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Email is Required",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await OtpSchema.deleteMany({ email });
  await OtpSchema.create({ email, otp });


  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Use this OTP To Sign up in XeroBrokerage",
    text: `Your OTP is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return (
      new Response(
        JSON.stringify({
          success: true,
          message: "successfull sent OTP",
        })
      ),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error(err);
    return (
      new Response(
        JSON.stringify({
          success: true,
          message: "successfull sent OTP",
        })
      ),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
