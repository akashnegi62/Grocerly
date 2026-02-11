/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Product } from "@/app/types/product";
import { toast } from "react-hot-toast";
import axios from "axios";

const initialState: Product = {
  name: "",
  brand: "",
  price: 0,
  mrp: 0,
  rating: 0,
  reviews: 0,
  type: "",
  flavour: "",
  diet: "",
  weight: "",
  packaging: "",
  features: "",
  categories: [],
  image: "",
};

export default function ProductForm() {
  const [form, setForm] = useState<Product>(initialState);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!form.name || !form.price || !form.categories.length) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);
      await axios.post("/api/products", form);
      toast.success("Product added successfully");
      setForm(initialState);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl bg-white rounded-2xl shadow-sm p-6 space-y-8">
      {/* BASIC INFO */}
      <section>
        <h2 className="text-lg font-bold mb-4">Product Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Product Name"
            value={form.name}
            onChange={(v) => setForm({ ...form, name: v })}
          />
          <Input
            label="Brand"
            value={form.brand}
            onChange={(v) => setForm({ ...form, brand: v })}
          />
        </div>

        <div className="mt-4">
          <Input
            label="Image URL"
            value={form.image}
            onChange={(v) => setForm({ ...form, image: v })}
          />
        </div>
      </section>

      {/* PRICING */}
      <section>
        <h2 className="text-lg font-bold mb-4">Pricing</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="number"
            label="Selling Price"
            value={form.price}
            onChange={(v) => setForm({ ...form, price: Number(v) })}
          />
          <Input
            type="number"
            label="MRP"
            value={form.mrp}
            onChange={(v) => setForm({ ...form, mrp: Number(v) })}
          />
        </div>
      </section>

      {/* META */}
      <section>
        <h2 className="text-lg font-bold mb-4">Product Meta</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Type"
            value={form.type}
            onChange={(v) => setForm({ ...form, type: v })}
          />
          <Input
            label="Flavour"
            value={form.flavour}
            onChange={(v) => setForm({ ...form, flavour: v })}
          />
          <Input
            label="Diet"
            value={form.diet}
            onChange={(v) => setForm({ ...form, diet: v })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <Input
            label="Weight"
            value={form.weight}
            onChange={(v) => setForm({ ...form, weight: v })}
          />
          <Input
            label="Packaging"
            value={form.packaging}
            onChange={(v) => setForm({ ...form, packaging: v })}
          />
          <Input
            type="number"
            label="Rating"
            value={form.rating}
            onChange={(v) => setForm({ ...form, rating: Number(v) })}
          />
        </div>
      </section>

      {/* EXTRA */}
      <section>
        <h2 className="text-lg font-bold mb-4">Additional Info</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="number"
            label="Reviews Count"
            value={form.reviews}
            onChange={(v) => setForm({ ...form, reviews: Number(v) })}
          />
          <Input
            label="Categories (comma separated)"
            value={form.categories.join(",")}
            onChange={(v) =>
              setForm({
                ...form,
                categories: v.split(",").map((c) => c.trim()),
              })
            }
          />
        </div>

        <div className="mt-4">
          <Textarea
            label="Features"
            value={form.features}
            onChange={(v) => setForm({ ...form, features: v })}
          />
        </div>
      </section>

      {/* ACTION */}
      <button
        onClick={submit}
        disabled={loading}
        className="w-full bg-[#015f5a] text-white py-4 rounded-xl font-semibold text-lg disabled:opacity-60"
      >
        {loading ? "Adding Product..." : "Add Product"}
      </button>
    </div>
  );
}

/*  UI COMPONENTS  */

function Input({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: any;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#015f5a]"
      />
    </div>
  );
}

function Textarea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <textarea
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full  border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#015f5a]"
      />
    </div>
  );
}
