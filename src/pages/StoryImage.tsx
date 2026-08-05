import { useEffect, useState } from "react";
// import { AdminSidebar } from "../../components/admin/AdminSidebar";

import { Trash2 } from "lucide-react";
import { AdminSidebar } from "../components/AdminSidebar";

const API = "https://api.navianpharma.com/api";

export default function StoryImage() {
  const [images, setImages] = useState<any[]>([]);

  const [files, setFiles] = useState<{
    [key: number]: File | null;
  }>({});

  const [products, setProducts] = useState<any[]>([]);

  const [selectedProduct, setSelectedProduct] =
    useState<{ [key: number]: number }>({});

  const [loading, setLoading] = useState<number | null>(
    null
  );

  const [alert, setAlert] = useState<any>(null);

  // ✅ DYNAMIC SLOTS
  const [slots, setSlots] = useState<number[]>([
    1, 2, 3, 4, 5,
  ]);

  // 🔥 FETCH IMAGES
  const fetchImages = () => {
    fetch(`${API}/hero-images`)
      .then((res) => res.json())
      .then((data) => {
        const imgs = Array.isArray(data)
          ? data
          : [];

        setImages(imgs);

        // ✅ SET PRODUCT MAP
        const map: any = {};

        imgs.forEach((img: any) => {
          map[img.slot] =
            img.product_id !== null &&
            img.product_id !== undefined
              ? Number(img.product_id)
              : undefined;
        });

        setSelectedProduct(map);

        // ✅ AUTO CREATE SLOTS
        const existingSlots = imgs.map((img: any) =>
          Number(img.slot)
        );

        const maxSlot =
          existingSlots.length > 0
            ? Math.max(...existingSlots)
            : 5;

        const generatedSlots = Array.from(
          { length: maxSlot },
          (_, i) => i + 1
        );

        setSlots(generatedSlots);
      });
  };

  // 🔥 FETCH PRODUCTS
const fetchProducts = async () => {
  try {
    const res = await fetch(`${API}/products`);
    const result = await res.json();

    setProducts(result.data || []);
  } catch (error) {
    console.error(error);
    setProducts([]);
  }
};

  // 🔥 INITIAL LOAD
  useEffect(() => {
    fetchImages();
    fetchProducts();
  }, []);
  // 🔥 UPLOAD IMAGE / UPDATE PRODUCT
  const uploadImage = (slot: number) => {
    const file = files[slot];

    const formData = new FormData();

    // ✅ ONLY IF NEW FILE EXISTS
    if (file) {
      formData.append("image", file);
    }

    formData.append("slot", slot.toString());

    formData.append(
      "product_id",
      selectedProduct[slot] !== undefined
        ? String(selectedProduct[slot])
        : ""
    );

    console.log(
      "UPLOADING PRODUCT ID:",
      selectedProduct[slot]
    );

    setLoading(slot);

    fetch(`${API}/hero-images`, {
      method: "POST",
      body: formData,
    })
      .then(async (res) => {
        const data = await res.json();

        console.log("API RESPONSE:", data);

        fetchImages();

        setAlert({
          type: "success",
          message: "Updated ✅",
        });

        setTimeout(() => {
          setAlert(null);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);

        setAlert({
          type: "error",
          message: "Update Failed ❌",
        });
      })
      .finally(() => setLoading(null));
  };

  // 🔥 DELETE IMAGE
  const deleteImage = async (id: number) => {
    if (!confirm("Delete?")) return;

    const res = await fetch(
      `${API}/admin/hero-images/${id}`,
      {
        method: "DELETE",
      }
    );

    if (res.ok) {
      fetchImages();

      setAlert({
        type: "success",
        message: "Deleted ✅",
      });

      setTimeout(() => {
        setAlert(null);
      }, 2000);
    }
  };

  // 🔥 GET IMAGE BY SLOT
  const getImageBySlot = (slot: number) =>
    images.find(
      (img) => Number(img.slot) === slot
    );

  return (
    <div className="flex">
      <AdminSidebar/>

      <div className="p-8 md:ml-64 w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            Story Images
          </h1>

          {/* ADD SLOT */}
          <button
            onClick={() => {
              const next =
                slots.length > 0
                  ? Math.max(...slots) + 1
                  : 1;

              setSlots([...slots, next]);
            }}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            + Add Slot
          </button>
        </div>

        {/* ALERT */}
        {alert && (
          <div
            className={`mb-4 px-4 py-3 rounded text-sm ${
              alert.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {alert.message}
          </div>
        )}

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-6">
          {slots.map((slot) => {
            const img = getImageBySlot(slot);

            return (
              <div
                key={slot}
                className="border p-4 rounded shadow"
              >
                <h3 className="font-semibold mb-2">
                  Image {slot}
                </h3>

                {/* IMAGE */}
                {img ? (
                  <img
                    src={`https://api.navianpharma.com/${img.image}`}
                    className="h-40 w-full object-cover rounded mb-2"
                  />
                ) : (
                  <div className="h-40 flex items-center justify-center bg-gray-100 text-gray-500 mb-2">
                    No Image
                  </div>
                )}

                {/* LINKED PRODUCT */}
                {img?.product_id ? (
                  <p className="text-sm text-green-600 mb-2">
                    Linked Product ID:{" "}
                    {img.product_id}
                  </p>
                ) : (
                  <p className="text-sm text-red-500 mb-2">
                    No Product Linked
                  </p>
                )}

                {/* PRODUCT SELECT */}
             <select
  className="w-full mt-2 border p-2 rounded"
  value={selectedProduct[slot] || ""}
  onChange={(e) =>
    setSelectedProduct({
      ...selectedProduct,
      [slot]: Number(e.target.value),
    })
  }
>
  <option value="">-- Select Product --</option>

  {products.map((p: any) => (
    <option key={p.id} value={p.id}>
      {p.name}
    </option>
  ))}
</select>

                {/* FILE */}
                <input
                  type="file"
                  className="mt-3"
                  onChange={(e) =>
                    setFiles({
                      ...files,
                      [slot]:
                        e.target.files?.[0] ||
                        null,
                    })
                  }
                />

                {/* UPLOAD */}
                <button
                  onClick={() =>
                    uploadImage(slot)
                  }
                  className="mt-3 bg-blue-500 text-white w-full py-2 rounded"
                >
                  {loading === slot
                    ? "Uploading..."
                    : "Upload"}
                </button>

                {/* DELETE */}
                {img && (
                  <Trash2
                    onClick={() =>
                      deleteImage(img.id)
                    }
                    className="text-red-500 mt-3 cursor-pointer"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}