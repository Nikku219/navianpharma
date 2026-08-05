import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export function Products() {
const [categories, setCategories] = useState([]);
const [products, setProducts] = useState([]);
const [selectedCategory, setSelectedCategory] =
useState("All");

useEffect(() => {
loadCategories();
loadProducts();
}, []);

const loadCategories = async () => {
try {
const res = await fetch(
"https://api.navianpharma.com/api/categories"
);


  const data = await res.json();

  if (data.status) {
    setCategories(data.data || []);
  }
} catch (err) {
  console.log(err);
}

};

const loadProducts = async () => {
try {
const res = await fetch(
"https://api.navianpharma.com/api/products"
);

 
  const data = await res.json();

  if (data.status) {
    setProducts(data.data || []);
  }
} catch (err) {
  console.log(err);
}
 

};

const categoryButtons = [
{
id: "All",
name: "All",
image: null,
},
...categories,
];

const filteredProducts = useMemo(() => {
if (selectedCategory === "All") {
return products;
}

 
return products.filter(
  (product) =>
    String(product.category_id) ===
    String(selectedCategory)
);
 

}, [
products,
selectedCategory,
]);

return ( <div className="min-h-screen bg-cream">

 
  <Navbar />

  <main className="pt-28 pb-20">

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <section className="text-center mb-12">

        <p
          className="
          inline-flex
          items-center
          gap-2
          rounded-full
          bg-white/80
          px-4
          py-2
          text-sm
          font-semibold
          text-dark-purple
          shadow-sm
        "
        >
          Browse Products
        </p>

        <h1
          className="
          mt-6
          text-4xl
          sm:text-5xl
          font-display
          font-bold
          text-dark-purple
        "
        >
          All Products
        </h1>

        <p
          className="
          mx-auto
          mt-4
          max-w-2xl
          text-base
          text-soft-ink/80
          sm:text-lg
        "
        >
          Explore all available products.
        </p>

      </section>

      {/* Categories */}

      <section className="mb-12">

        <div className="flex flex-wrap justify-center gap-4">

          {categoryButtons.map(
            (category) => {

              const isActive =
                selectedCategory ===
                category.id;

              return (

                <button
                  key={category.id}
                  onClick={() =>
                    setSelectedCategory(
                      category.id
                    )
                  }
                  className={`
                    flex
                    flex-col
                    items-center
                    gap-2
                    rounded-3xl
                    border
                    px-4
                    py-3
                    transition-all

                    ${
                      isActive
                        ? "border-dark-purple bg-dark-purple text-white"
                        : "border-dark-purple/20 bg-white text-dark-purple"
                    }
                  `}
                >

                  <div
                    className="
                    h-16
                    w-16
                    rounded-full
                    overflow-hidden
                    bg-gray-100
                  "
                  >

                    {category.image ? (

                      <img
                        src={`https://api.navianpharma.com/uploads/categories/${category.image}`}
                        alt={category.name}
                        className="
                          w-full
                          h-full
                          object-cover
                        "
                      />

                    ) : (

                      <div
                        className="
                        w-full
                        h-full
                        flex
                        items-center
                        justify-center
                        font-bold
                      "
                      >
                        All
                      </div>

                    )}

                  </div>

                  <span className="font-semibold">
                    {category.name}
                  </span>

                </button>

              );
            }
          )}

        </div>

      </section>

      {/* Products */}

      <section>

        <div
          className="
          grid
          grid-cols-1
          gap-8
          md:grid-cols-2
          xl:grid-cols-3
        "
        >

          {filteredProducts.map(
            (product) => (

              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="
                  group
                  overflow-hidden
                  rounded-[2rem]
                  bg-white
                  p-6
                  shadow-lg
                  transition
                  hover:-translate-y-1
                "
              >

                <div
                  className="
                  relative
                  mb-5
                  overflow-hidden
                  rounded-[1.75rem]
                "
                >

                  <img
                    src={`https://api.navianpharma.com/uploads/products/${product.featured_image}`}
                    alt={product.name}
                    className="
                      h-72
                      w-full
                      object-cover
                      transition-transform
                      duration-500
                      group-hover:scale-105
                    "
                  />

                  <span
                    className="
                    absolute
                    left-4
                    top-4
                    rounded-full
                    bg-dark-purple
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    text-white
                  "
                  >
                    {product.category_name}
                  </span>

                </div>

                <div className="space-y-4">

                  <div>

                    <h2
                      className="
                      text-2xl
                      font-bold
                      text-dark-purple
                    "
                    >
                      {product.name}
                    </h2>

                    <p
                      className="
                      mt-2
                      text-sm
                      text-soft-ink/80
                    "
                    >
                      {product.short_description}
                    </p>

                  </div>

                  <div
                    className="
                    flex
                    items-center
                    justify-between
                  "
                  >

                    <span
                      className="
                      font-semibold
                      text-dark-purple
                    "
                    >
                      {product.brand}
                    </span>

                    <span
                      className="
                      inline-flex
                      items-center
                      gap-2
                      text-sm
                      font-semibold
                      text-golden-yellow
                    "
                    >
                      Explore
                      <ArrowRight className="h-4 w-4" />
                    </span>

                  </div>

                </div>

              </Link>

            )
          )}

        </div>

        {filteredProducts.length === 0 && (

          <div
            className="
            mt-16
            rounded-3xl
            bg-white
            p-12
            text-center
            shadow-sm
          "
          >

            <p
              className="
              text-xl
              font-semibold
              text-dark-purple
            "
            >
              No Products Found
            </p>

          </div>

        )}

      </section>

    </div>

  </main>

  <Footer />

</div>
 

);
}
