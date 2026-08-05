import React, { useEffect, useState } from "react";
import { AdminSidebar } from "../components/AdminSidebar";

const API_URL = "https://api.navianpharma.com/api/home-sections";
const PRODUCTS_API = "https://api.navianpharma.com/api/products";

interface Product {
  id: number;
  name: string;
}

interface FormState {
  title: string;

  product1_id: string;
  product2_id: string;
  product3_id: string;
  product4_id: string;
  product5_id: string;
  product6_id: string;

  sequence1: string;
  sequence2: string;
  sequence3: string;
  sequence4: string;
  sequence5: string;
  sequence6: string;

  section_sequence: string;
  status: string;
}

export default function HomeSections() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);

  const [form, setForm] = useState<FormState>({
    title: "",

    product1_id: "",
    product2_id: "",
    product3_id: "",
    product4_id: "",
    product5_id: "",
    product6_id: "",

    sequence1: "1",
    sequence2: "2",
    sequence3: "3",
    sequence4: "4",
    sequence5: "5",
    sequence6: "6",

    section_sequence: "1",
    status: "1",
  });

  const [images, setImages] = useState<Record<string, File>>({});

  const [previews, setPreviews] = useState({
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    image5: "",
    image6: "",
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadProducts();
    loadSection();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await fetch(PRODUCTS_API);
      const result = await res.json();

      if (Array.isArray(result)) {
        setProducts(result);
      } else if (result.data) {
        setProducts(result.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const loadSection = async () => {
    try {
      const res = await fetch(API_URL);
      const result = await res.json();
      const data = Array.isArray(result.data) ? result.data[0] : result.data;

      if (!data) {
        // no data from API — populate demo previews
        setPreviews({
          image1: 'https://via.placeholder.com/1200x600?text=Demo+1',
          image2: 'https://via.placeholder.com/1200x600?text=Demo+2',
          image3: 'https://via.placeholder.com/1200x600?text=Demo+3',
          image4: 'https://via.placeholder.com/1200x600?text=Demo+4',
          image5: 'https://via.placeholder.com/1200x600?text=Demo+5',
          image6: 'https://via.placeholder.com/1200x600?text=Demo+6',
        });
        return;
      }

      setForm({
        title: data.title?.toString() || "",

        product1_id: data.product1_id?.toString() || "",
        product2_id: data.product2_id?.toString() || "",
        product3_id: data.product3_id?.toString() || "",
        product4_id: data.product4_id?.toString() || "",
        product5_id: data.product5_id?.toString() || "",
        product6_id: data.product6_id?.toString() || "",

        sequence1: data.sequence1?.toString() || "1",
        sequence2: data.sequence2?.toString() || "2",
        sequence3: data.sequence3?.toString() || "3",
        sequence4: data.sequence4?.toString() || "4",
        sequence5: data.sequence5?.toString() || "5",
        sequence6: data.sequence6?.toString() || "6",

        section_sequence:
          data.section_sequence?.toString() || "1",

        status: data.status?.toString() || "1",
      });

      setPreviews({
        image1: data.image1
          ? `https://api.navianpharma.com/${data.image1}`
          : "",

        image2: data.image2
          ? `https://api.navianpharma.com/${data.image2}`
          : "",

        image3: data.image3
          ? `https://api.navianpharma.com/${data.image3}`
          : "",

        image4: data.image4
          ? `https://api.navianpharma.com/${data.image4}`
          : "",

        image5: data.image5
          ? `https://api.navianpharma.com/${data.image5}`
          : "",

        image6: data.image6
          ? `https://api.navianpharma.com/${data.image6}`
          : "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const name = e.target.name;

    setImages((prev) => ({
      ...prev,
      [name]: file,
    }));

    setPreviews((prev) => ({
      ...prev,
      [name]: URL.createObjectURL(file),
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      const fd = new FormData();

      Object.entries(form).forEach(([k, v]) => {
        fd.append(k, v);
      });

      Object.entries(images).forEach(([k, v]) => {
        fd.append(k, v);
      });

      const res = await fetch(API_URL, {
        method: "POST",
        body: fd,
      });

      const result = await res.json();

      alert(result.message || "Saved");

      loadSection();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <AdminSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 p-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-6">
            Home Sections
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Section Title"
              className="w-full border rounded-xl p-3"
            />

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="border rounded-xl p-4 bg-gray-50 relative"
                >
                  <h3 className="font-semibold mb-3">
                    Image {i}
                  </h3>

                  <input
                    type="file"
                    name={`image${i}`}
                    onChange={handleImage}
                    className="w-full mb-3"
                    disabled={submitting}
                  />

                  {previews[
                    `image${i}` as keyof typeof previews
                  ] && (
                    <img
                      src={
                        previews[
                          `image${i}` as keyof typeof previews
                        ]
                      }
                      alt=""
                      className="w-full h-48 object-cover rounded-lg border mb-3"
                    />
                  )}

                  {submitting && (
                    <div className="absolute inset-0 bg-black/30 rounded-xl flex items-center justify-center">
                      <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}

                  <select
                    name={`product${i}_id`}
                    value={
                      form[
                        `product${i}_id` as keyof FormState
                      ]
                    }
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg mb-3"
                  >
                    <option value="">
                      Select Product
                    </option>

                    {products.map((p) => (
                      <option
                        key={p.id}
                        value={p.id}
                      >
                        {p.name}
                      </option>
                    ))}
                  </select>

                  <input
                    type="number"
                    name={`sequence${i}`}
                    value={
                      form[
                        `sequence${i}` as keyof FormState
                      ]
                    }
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                  />
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="number"
                name="section_sequence"
                value={form.section_sequence}
                onChange={handleChange}
                className="border p-3 rounded-lg"
              />

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="border p-3 rounded-lg"
              >
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl disabled:opacity-70 flex items-center gap-3"
            >
              {submitting && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {submitting ? "Saving..." : "Save Section"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}