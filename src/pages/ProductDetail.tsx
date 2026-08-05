import React, { useEffect, useState } from "react";

import {
  useParams,
  Link,
  useNavigate
} from "react-router-dom";

import { motion } from "framer-motion";

import {
  ArrowLeft,
  ShieldCheck,
  Truck,
  RotateCcw,
  Minus,
  Plus,
  ShoppingCart,
  MessageCircle,
  CheckCircle2
} from "lucide-react";

import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { cn } from "../lib/utils";
import { useScreenInit } from "../useScreenInit";
import { useCart } from '../lib/cartContext';

export function ProductDetail() {
  const [mainImage, setMainImage] = useState<string | null>(null);

  useScreenInit();

  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [product, setProduct] = useState<any>(null);

  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);

  const [selectedVariant, setSelectedVariant] = useState<any>(null);

  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    loadProduct();
  }, [id]);

  useEffect(() => {
    if (!product) return;

    const sel = selectedVariant || (product.variants && product.variants[0]);

    const imgs = (sel && sel.images && sel.images.length)
      ? sel.images
      : (sel && sel.image)
        ? [sel.image]
        : (product.featured_image ? [product.featured_image] : []);

    if (imgs && imgs.length) {
      setMainImage(`https://api.navianpharma.com/uploads/products/${imgs[0]}`);
    } else {
      setMainImage(null);
    }
  }, [selectedVariant, product]);

  const loadProduct = async () => {

    try {

      const response =
        await fetch(
          `https://api.navianpharma.com/api/products/${id}`
        );

      const data =
        await response.json();

      if (data.status) {

        setProduct(data.data);

        if (data.data.variants && data.data.variants.length) {
          setSelectedVariant(data.data.variants[0]);
        }

        // initialize mainImage from variant images or featured_image
        const firstVariant = data.data.variants && data.data.variants[0];
        const imgs = (firstVariant && firstVariant.images && firstVariant.images.length)
          ? firstVariant.images
          : (firstVariant && firstVariant.image)
            ? [firstVariant.image]
            : (data.data.featured_image ? [data.data.featured_image] : []);

        if (imgs && imgs.length) {
          setMainImage(`https://api.navianpharma.com/uploads/products/${imgs[0]}`);
        }

        const productRes = await fetch("https://api.navianpharma.com/api/products");
        const productData = await productRes.json();

        setRelatedProducts(
          (productData.data || [])
            .filter((p: any) => p.id !== data.data.id)
            .slice(0, 4)
        );
      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  const handleQuantityChange = (
    delta: number
  ) => {

    setQuantity((prev) =>
      Math.max(
        1,
        Math.min(
          10,
          prev + delta
        )
      )
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-bold">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center">

        <h2 className="font-display text-3xl text-dark-purple mb-4">
          Product not found
        </h2>

        <Link
          to="/"
          className="text-mid-purple hover:underline"
        >
          Return Home
        </Link>

      </div>
    );
  }

  const benefits = JSON.parse(product.benefits || "[]");

  const suitableFor = JSON.parse(product.suitable_for || "[]");

  return (
    <div className="min-h-screen bg-cream flex flex-col">

      <Navbar />

      <main className="flex-grow pt-28 pb-24">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
                    <div className="mb-8 flex items-center gap-2 text-sm text-soft-ink/60">

            <button
              onClick={() => navigate(-1)}
              className="hover:text-dark-purple flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <span>/</span>

            <Link
              to="/"
              className="hover:text-dark-purple"
            >
              Home
            </Link>

            <span>/</span>

            <span className="text-dark-purple font-medium">
              {product.name}
            </span>

          </div>

          <div className="bg-white rounded-[2rem] shadow-premium border border-dark-purple/5 overflow-hidden">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">

              {/* Left Side */}

              <div className="p-8 md:p-12 bg-beige/30 flex flex-col items-center justify-start relative group">

                <div className="absolute top-8 left-8 bg-white px-4 py-1.5 rounded-full text-xs font-bold text-dark-purple shadow-sm border border-dark-purple/10 z-10">
                  {product.brand}
                </div>

                  <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                  className="w-full max-w-md aspect-square rounded-2xl overflow-hidden bg-white shadow-md relative"
                >

                  <img
                    src={mainImage || (selectedVariant?.image
                        ? `https://api.navianpharma.com/uploads/products/${selectedVariant.image}`
                        : `https://api.navianpharma.com/uploads/products/${product.featured_image}`)}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                </motion.div>

                {/* Thumbnails */}
                <div className="mt-4 flex gap-3">
                  {(
                    (selectedVariant && selectedVariant.images && selectedVariant.images.length)
                      ? selectedVariant.images
                      : (selectedVariant && selectedVariant.image)
                        ? [selectedVariant.image]
                        : (product.featured_image ? [product.featured_image] : [])
                  ).map((img: any, i: number) => {
                    const url = `https://api.navianpharma.com/uploads/products/${img}`;
                    const isCover = mainImage === url;
                    return (
                      <button
                        key={i}
                        onClick={() => setMainImage(url)}
                        className={cn(
                          "w-16 h-16 rounded-lg overflow-hidden border-2 p-0",
                          isCover ? "border-dark-purple" : "border-dark-purple/20"
                        )}
                      >
                        <img src={url} alt={`thumb-${i}`} className="w-full h-full object-cover" />
                      </button>
                    );
                  })}
                </div>

              </div>

              {/* Right Side */}

              <div className="p-8 md:p-12 flex flex-col">

                <div className="mb-6">

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                    <div>

                      <h1 className="font-display text-3xl md:text-4xl font-bold text-dark-purple mb-3">
                        {product.name}
                      </h1>

                      <p className="text-sm text-soft-ink/70 uppercase tracking-[0.2em]">
                        {selectedVariant?.size}
                      </p>

                    </div>

                    {/* <div className="rounded-3xl bg-golden-yellow/10 px-5 py-3 text-right">

                      <p className="text-sm text-soft-ink/70">
                        Price
                      </p>

                      <p className="text-3xl font-bold text-dark-purple">
                        ₹
                        {selectedVariant?.price}
                      </p>

                    </div> */}

                  </div>

                  <p className="text-soft-ink/80 text-lg leading-relaxed mt-6">
                    {product.description}
                  </p>

                </div>

                <div className="h-px bg-dark-purple/10 my-6" />

                {/* Variants */}

                <div className="mb-8">

                  <h3 className="text-sm font-bold text-dark-purple uppercase tracking-wider mb-3">
                    Available Variants
                  </h3>

                  <div className="flex flex-wrap gap-3">

                    {product.variants?.map(
                      (variant: any) => (

                        <button
                          key={variant.id}
                          onClick={() =>
                            setSelectedVariant(
                              variant
                            )
                          }
                          className={cn(
                            "rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200 border-2",

                            selectedVariant?.id ===
                              variant.id
                              ? "border-dark-purple bg-dark-purple text-cream shadow-lg"
                              : "border-dark-purple/20 bg-white text-dark-purple hover:border-dark-purple/80 hover:bg-beige"
                          )}
                        >
                          {variant.size}
                        </button>

                      )
                    )}

                  </div>

                </div>

                {/* Quantity */}

                <div className="flex flex-col sm:flex-row gap-4 mb-10">

                  <div className="flex items-center border-2 border-dark-purple/20 rounded-xl bg-white h-14">

                    <button
                      onClick={() =>
                        handleQuantityChange(
                          -1
                        )
                      }
                      className="w-12 h-full flex items-center justify-center"
                    >
                      <Minus className="w-5 h-5" />
                    </button>

                    <div className="w-12 text-center font-bold text-lg text-dark-purple">
                      {quantity}
                    </div>

                    <button
                      onClick={() =>
                        handleQuantityChange(
                          1
                        )
                      }
                      className="w-12 h-full flex items-center justify-center"
                    >
                      <Plus className="w-5 h-5" />
                    </button>

                  </div>

                  <button className="flex-1 h-14 bg-golden-yellow text-dark-purple rounded-xl font-bold text-lg flex items-center justify-center gap-2">
                      <ShoppingCart className="w-5 h-5" />
                      <span onClick={async () => {
                        const img = selectedVariant?.image ? `https://api.navianpharma.com/uploads/products/${selectedVariant.image}` : `https://api.navianpharma.com/uploads/products/${product.featured_image}`;
                        addItem({
                          id: String(product.id),
                          name: `${product.name} ${selectedVariant?.size || ''}`.trim(),
                          price: selectedVariant?.price || product.price || 0,
                          quantity,
                          image: img,
                          variant: selectedVariant || null,
                        });
                        setAdded(true);
                        setTimeout(() => setAdded(false), 1500);
                      }} style={{display: 'inline-flex', alignItems: 'center', gap: 8}}>
                        {added ? 'Added' : 'Add To Cart'}
                      </span>
                    </button>

                  <a
                    href="https://wa.me/918989403011"
                    target="_blank"
                    rel="noreferrer"
                    className="h-14 px-6 bg-[#25D366] text-white rounded-xl font-bold flex items-center justify-center gap-2"
                  >

                    <MessageCircle className="w-5 h-5" />

                    Order via WhatsApp

                  </a>

                </div>

                {/* Trust Badges */}

                <div className="grid grid-cols-3 gap-4 mb-10">

                  <div className="flex flex-col items-center text-center gap-2 p-4 rounded-xl bg-beige/50">
                    <ShieldCheck className="w-6 h-6 text-mid-purple" />
                    <span className="text-xs font-semibold text-dark-purple">
                      100% Authentic
                    </span>
                  </div>

                  <div className="flex flex-col items-center text-center gap-2 p-4 rounded-xl bg-beige/50">
                    <Truck className="w-6 h-6 text-mid-purple" />
                    <span className="text-xs font-semibold text-dark-purple">
                      Fast Delivery
                    </span>
                  </div>

                  <div className="flex flex-col items-center text-center gap-2 p-4 rounded-xl bg-beige/50">
                    <RotateCcw className="w-6 h-6 text-mid-purple" />
                    <span className="text-xs font-semibold text-dark-purple">
                      Easy Returns
                    </span>
                  </div>

                </div>

                {/* Product Details */}
                                <div className="space-y-6 mt-auto">

                  {/* Benefits */}

                  <div>

                    <h3 className="font-display text-xl font-bold text-dark-purple mb-3">
                      Key Benefits
                    </h3>

                    <ul className="space-y-2">

                      {benefits.map(
                        (
                          benefit: string,
                          i: number
                        ) => (

                          <li
                            key={i}
                            className="flex items-start gap-2 text-soft-ink/80"
                          >

                            <CheckCircle2 className="w-5 h-5 text-golden-yellow shrink-0 mt-0.5" />

                            <span>
                              {benefit}
                            </span>

                          </li>

                        )
                      )}

                    </ul>

                  </div>

                  {/* Usage */}

                  <div>

                    <h3 className="font-display text-xl font-bold text-dark-purple mb-2">
                      Usage Instructions
                    </h3>

                    <p className="text-soft-ink/80 bg-beige/50 p-4 rounded-xl border border-dark-purple/5">
                      {
                        product.usage_instructions
                      }
                    </p>

                  </div>

                  {/* Suitable For */}

                  <div>

                    <h3 className="font-display text-xl font-bold text-dark-purple mb-2">
                      Suitable For
                    </h3>

                    <div className="flex gap-2 flex-wrap">

                      {suitableFor.map(
                        (
                          animal: string
                        ) => (

                          <span
                            key={animal}
                            className="px-3 py-1.5 bg-dark-purple/5 text-dark-purple rounded-lg text-sm font-semibold"
                          >
                            {animal}
                          </span>

                        )
                      )}

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Related Products */}

          <section className="mt-20">

            <div className="mb-10">

              <h2 className="font-display text-4xl font-bold text-dark-purple mb-2">
                Related Products
              </h2>

              <p className="text-soft-ink/70 text-lg">
                Explore other products from our range
              </p>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

              {relatedProducts.map(
                (
                  relatedProduct: any
                ) => (

                  <Link
                    key={
                      relatedProduct.id
                    }
                    to={`/product/${relatedProduct.id}`}
                    className="group overflow-hidden rounded-2xl bg-white p-5 shadow-md transition-all hover:shadow-xl hover:-translate-y-1"
                  >

                    <div className="relative mb-4 overflow-hidden rounded-xl bg-beige/70">

                      <img
                        src={`https://api.navianpharma.com/uploads/products/${relatedProduct.featured_image}`}
                        alt={
                          relatedProduct.name
                        }
                        className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />

                      <span className="absolute left-3 top-3 rounded-full bg-dark-purple/90 px-2.5 py-1 text-xs font-semibold text-white">

                        {
                          relatedProduct.category_name
                        }

                      </span>

                    </div>

                    <div className="space-y-2">

                      <h3 className="font-semibold text-dark-purple line-clamp-2">
                        {
                          relatedProduct.name
                        }
                      </h3>

                      <p className="text-sm text-soft-ink/70 line-clamp-2">
                        {
                          relatedProduct.short_description
                        }
                      </p>

                    </div>

                  </Link>

                )
              )}

            </div>

          </section>

        </div>

      </main>

      <Footer />

    </div>
  );
}