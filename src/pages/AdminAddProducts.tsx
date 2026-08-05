import React, { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  Save,
  Menu,
} from "lucide-react";

import { AdminSidebar } from "../components/AdminSidebar";

export default function AdminAddProducts() {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [categories, setCategories] =
    useState([]);

  const [product, setProduct] =
    useState({
      name: "",
      brand: "",
      category_id: "",
      short_description: "",
      description: "",
      usage_instructions: "",
    });

  const [featuredImage, setFeaturedImage] =
    useState(null);

  const [benefits, setBenefits] =
    useState([""]);

  const [suitableFor, setSuitableFor] =
    useState([]);

  const animals = [
    "Cow",
    "Buffalo",
    "Goat",
    "Sheep",
    "Dog",
    "Poultry",
  ];

  const [variants, setVariants] =
    useState([
      {
        variant_name: "",
        size: "",
        price: "",
        images: [],
      },
    ]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await fetch(
        "https://api.navianpharma.com/api/categories"
      );

      const data = await res.json();

      setCategories(data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const addBenefit = () => {
    setBenefits([
      ...benefits,
      "",
    ]);
  };

  const removeBenefit = (index) => {
    setBenefits(
      benefits.filter(
        (_, i) => i !== index
      )
    );
  };

  const updateBenefit = (
    index,
    value
  ) => {
    const updated = [...benefits];

    updated[index] = value;

    setBenefits(updated);
  };

  const addVariant = () => {
    setVariants([
      ...variants,
      {
        variant_name: "",
        size: "",
        price: "",
        image: null,
      },
    ]);
  };

  const removeVariant = (
    index
  ) => {
    setVariants(
      variants.filter(
        (_, i) => i !== index
      )
    );
  };

  const updateVariant = (
    index,
    field,
    value
  ) => {
    const updated = [...variants];

    updated[index][field] = value;

    setVariants(updated);
  };

  const toggleAnimal = (
    animal
  ) => {
    if (
      suitableFor.includes(
        animal
      )
    ) {
      setSuitableFor(
        suitableFor.filter(
          (a) => a !== animal
        )
      );
    } else {
      setSuitableFor([
        ...suitableFor,
        animal,
      ]);
    }
  };
    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append(
        "name",
        product.name
      );

      formData.append(
        "brand",
        product.brand
      );

      formData.append(
        "category_id",
        product.category_id
      );

      formData.append(
        "short_description",
        product.short_description
      );

      formData.append(
        "description",
        product.description
      );

      formData.append(
        "usage_instructions",
        product.usage_instructions
      );

      formData.append(
        "benefits",
        JSON.stringify(
          benefits
        )
      );

      formData.append(
        "suitable_for",
        JSON.stringify(
          suitableFor
        )
      );

      if (featuredImage) {
        formData.append(
          "featured_image",
          featuredImage
        );
      }

      formData.append(
        "variants",
        JSON.stringify(
          variants.map(
            (v) => ({
              variant_name:
                v.variant_name,
              size: v.size,
              price: v.price,
            })
          )
        )
      );

   variants.forEach((variant, index) => {
  if (variant.images && variant.images.length > 0) {
    const file = variant.images[0]; // sirf first image

    if (file instanceof File) {
      formData.append(`variant_image_${index}`, file);
    }
  }
});

      const response =
        await fetch(
          "https://api.navianpharma.com/api/products",
          {
            method:
              "POST",
            body: formData,
          }
        );

      const data =
        await response.json();

      if (data.status) {
        alert(
          "Product Added Successfully"
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      <AdminSidebar
        open={sidebarOpen}
        onClose={() =>
          setSidebarOpen(false)
        }
      />

      <div className="flex-1 p-6">

        <div className="flex items-center gap-3 mb-6">

          <button
            className="md:hidden"
            onClick={() =>
              setSidebarOpen(
                true
              )
            }
          >
            <Menu />
          </button>

          <h1 className="text-3xl font-bold">
            Add Product
          </h1>

        </div>

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-6"
        >

          {/* Product Details */}

          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="text-xl font-bold mb-5">
              Product Details
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

              <input
                type="text"
                placeholder="Product Name"
                value={
                  product.name
                }
                onChange={(
                  e
                ) =>
                  setProduct({
                    ...product,
                    name:
                      e
                        .target
                        .value,
                  })
                }
                className="border rounded-xl p-3"
              />

              <input
                type="text"
                placeholder="Brand"
                value={
                  product.brand
                }
                onChange={(
                  e
                ) =>
                  setProduct({
                    ...product,
                    brand:
                      e
                        .target
                        .value,
                  })
                }
                className="border rounded-xl p-3"
              />

              <select
                value={
                  product.category_id
                }
                onChange={(
                  e
                ) =>
                  setProduct({
                    ...product,
                    category_id:
                      e
                        .target
                        .value,
                  })
                }
                className="border rounded-xl p-3"
              >

                <option value="">
                  Select Category
                </option>

                {categories.map(
                  (
                    cat
                  ) => (
                    <option
                      key={
                        cat.id
                      }
                      value={
                        cat.id
                      }
                    >
                      {
                        cat.name
                      }
                    </option>
                  )
                )}

              </select>

              <input
                type="file"
                onChange={(
                  e
                ) =>
                  setFeaturedImage(
                    e
                      .target
                      .files[0]
                  )
                }
                disabled={loading}
                className="border rounded-xl p-3"
              />

            </div>

            <textarea
              rows="3"
              placeholder="Short Description"
              value={
                product.short_description
              }
              onChange={(
                e
              ) =>
                setProduct({
                  ...product,
                  short_description:
                    e
                      .target
                      .value,
                })
              }
              className="w-full border rounded-xl p-3 mt-5"
            />

            <textarea
              rows="6"
              placeholder="Full Description"
              value={
                product.description
              }
              onChange={(
                e
              ) =>
                setProduct({
                  ...product,
                  description:
                    e
                      .target
                      .value,
                })
              }
              className="w-full border rounded-xl p-3 mt-5"
            />

          </div>
                    {/* Benefits */}

          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex justify-between items-center mb-5">

              <h2 className="text-xl font-bold">
                Product Benefits
              </h2>

              <button
                type="button"
                onClick={addBenefit}
                className="bg-green-500 text-white px-4 py-2 rounded-xl"
              >
                Add Benefit
              </button>

            </div>

            <div className="space-y-3">

              {benefits.map(
                (benefit, index) => (

                  <div
                    key={index}
                    className="flex gap-3"
                  >

                    <input
                      type="text"
                      value={benefit}
                      placeholder={`Benefit ${
                        index + 1
                      }`}
                      onChange={(e) =>
                        updateBenefit(
                          index,
                          e.target.value
                        )
                      }
                      className="flex-1 border rounded-xl p-3"
                    />

                    {benefits.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          removeBenefit(index)
                        }
                        className="bg-red-500 text-white px-3 rounded-xl"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}

                  </div>

                )
              )}

            </div>

          </div>

          {/* Suitable For */}

          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="text-xl font-bold mb-5">
              Suitable For
            </h2>

            <div className="grid md:grid-cols-3 gap-4">

              {animals.map((animal) => (

                <label
                  key={animal}
                  className="flex items-center gap-3 border rounded-xl p-3 cursor-pointer"
                >

                  <input
                    type="checkbox"
                    checked={suitableFor.includes(
                      animal
                    )}
                    onChange={() =>
                      toggleAnimal(
                        animal
                      )
                    }
                  />

                  {animal}

                </label>

              ))}

            </div>

          </div>

          {/* Usage Instructions */}

          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="text-xl font-bold mb-5">
              Usage Instructions
            </h2>

            <textarea
              rows="6"
              value={
                product.usage_instructions
              }
              placeholder="Enter usage instructions..."
              onChange={(e) =>
                setProduct({
                  ...product,
                  usage_instructions:
                    e.target.value,
                })
              }
              className="w-full border rounded-xl p-3"
            />

          </div>

          {/* Variants */}

          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex justify-between items-center mb-5">

              <h2 className="text-xl font-bold">
                Product Variants
              </h2>

              <button
                type="button"
                onClick={addVariant}
                className="flex items-center gap-2 bg-yellow-400 px-4 py-2 rounded-xl font-semibold"
              >
                <Plus size={18} />
                Add Variant
              </button>

            </div>

            <div className="space-y-4">

              {variants.map(
                (
                  variant,
                  index
                ) => (

                  <div
                    key={index}
                    className="border rounded-xl p-5"
                  >

                    <div className="flex justify-between mb-4">

                      <h3 className="font-semibold">
                        Variant #
                        {index + 1}
                      </h3>

                      {variants.length >
                        1 && (

                        <button
                          type="button"
                          onClick={() =>
                            removeVariant(
                              index
                            )
                          }
                        >
                          <Trash2
                            size={18}
                            className="text-red-500"
                          />
                        </button>

                      )}

                    </div>

                    <div className="grid md:grid-cols-4 gap-4">

                      {/* <input
                        type="text"
                        placeholder="Variant Name"
                        value={
                          variant.variant_name
                        }
                        onChange={(e) =>
                          updateVariant(
                            index,
                            "variant_name",
                            e.target.value
                          )
                        }
                        className="border rounded-xl p-3"
                      /> */}

                      <input
                        type="text"
                        placeholder="Size (1kg, 5kg, 25kg, 1L)"
                        value={
                          variant.size
                        }
                        onChange={(e) =>
                          updateVariant(
                            index,
                            "size",
                            e.target.value
                          )
                        }
                        className="border rounded-xl p-3"
                      />

                      {/* <input
                        type="number"
                        placeholder="Price"
                        value={
                          variant.price
                        }
                        onChange={(e) =>
                          updateVariant(
                            index,
                            "price",
                            e.target.value
                          )
                        }
                        className="border rounded-xl p-3"
                      /> */}

                      <input
                        type="file"
                        multiple
                        onChange={(e) =>
                          updateVariant(
                            index,
                            "images",
                            e.target.files ? Array.from(e.target.files) : []
                          )
                        }
                        className="border rounded-xl p-3"
                        disabled={loading}
                      />

                    </div>

                  </div>

                )
              )}

            </div>

          </div>

          {/* Save */}

          <button
            type="submit"
            disabled={loading}
            className="bg-dark-purple text-white px-6 py-3 rounded-xl flex items-center gap-2"
          >
            <Save size={18} />

            {loading
              ? "Saving..."
              : "Save Product"}
          </button>

        </form>

      </div>

    </div>
  );
}