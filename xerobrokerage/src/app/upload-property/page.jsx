"use client";

import { useState } from "react";

export default function Upload() {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handlePreview = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(e.target);

    try {
      const res = await fetch("/api/properties", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setMessage("✅ Property uploaded!");
      console.log(data);
    } catch (err) {
      console.error(err);
      setMessage("❌ Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex flex-col gap-8 items-center justify-center">
      <h1 className="mt-16 text-5xl poppins-black text-center">
        Upload Your Property...
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-black/10  shadow-2xl backdrop-blur-md rounded-2xl p-12 w-full max-w-md space-y-6 text-black"
      >
        <h2 className="text-2xl font-bold text-center">Enter All the Fields</h2>

        <input
          className="w-full px-4 py-2 rounded-xl bg-black/10 shadow-2xl backdrop-blur-md placeholder-gray-800 focus:outline-none" 
          placeholder="Title"
          type="text"
          name="title"
          required
        />
        <input
          className="w-full px-4 py-2 rounded-xl bg-black/10 shadow-2xl backdrop-blur-md placeholder-gray-800 focus:outline-none"
          placeholder="Price"
          type="number"
          name="price"
          required
        />
        <input
          className="w-full px-4 py-2 rounded-xl bg-black/10 shadow-2xl backdrop-blur-md placeholder-gray-800 focus:outline-none"
          placeholder="Address"
          type="text"
          name="address"
          required
        />
        <input
          className="w-full px-4 py-2 rounded-xl bg-black/10 shadow-2xl backdrop-blur-md placeholder-gray-800  focus:outline-none"
          placeholder="No. of Beds"
          type="number"
          name="beds"
          required
        />
        <input
          className="w-full px-4 py-2 rounded-xl bg-black/10 shadow-2xl backdrop-blur-md placeholder-gray-800  focus:outline-none"
          placeholder="Bathrooms"
          type="number"
          name="baths"
          required
        />

        <div className="flex flex-col items-center space-y-2">
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handlePreview}
            required
            className=" file:text-black file:px-4 file:py-2 file:rounded-xl file:border-none text-sm"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full rounded-xl border border-gray-300 shadow-md"
            />
          )}
        </div>

        <button
          type="submit"
          className={`w-full bg-black text-white hover:bg-gray-800 transition-all duration-300 py-2 px-4 rounded-xl font-semibold ${
            loading ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload Property"}
        </button>

        {message && <p className="text-center mt-2 font-medium">{message}</p>}
      </form>
    </div>
  );
}
