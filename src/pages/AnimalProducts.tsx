import { useParams, Link } from "react-router-dom";
import { PRODUCTS } from "../data/mockData";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MessageCircle } from "lucide-react";

export function AnimalProducts() {
  const { animal } = useParams();

  const products = PRODUCTS.filter((p) =>
    p.animals.includes(animal || "")
  );

  return (
    <>
      <Navbar />

      <main className="pt-32 pb-20 bg-[#faf7f2] min-h-screen">

        <div className="max-w-7xl mx-auto px-6">

          {/* Heading */}
          <div className="mb-10">
            <h1 className="text-5xl font-bold text-dark-purple">
              {animal} Products
            </h1>

            <p className="text-gray-600 mt-2">
              Explore all products designed for {animal}
            </p>
          </div>

          {/* Products */}
          <div className="space-y-6">

            {products.map((product) => (
              <div
                key={product.id}
                className="
                  bg-white
                  rounded-3xl
                  shadow-md
                  hover:shadow-xl
                  transition-all
                  p-6
                "
              >
                <div className="grid md:grid-cols-4 gap-8">

                  {/* Image */}
                  <div>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="
                        w-full
                        h-60
                        object-cover
                        rounded-2xl
                      "
                    />
                  </div>

                  {/* Details */}
                  <div className="md:col-span-2">

                    <h2 className="text-3xl font-bold text-dark-purple">
                      {product.name}
                    </h2>

                    <p className="text-sm text-yellow-600 mt-1">
                      {product.brand}
                    </p>

                    <p className="mt-4 text-gray-600">
                      {product.shortDescription}
                    </p>

                    <ul className="mt-4 space-y-2">
                      {product.benefits
                        ?.slice(0, 4)
                        .map((benefit) => (
                          <li key={benefit}>
                            ✓ {benefit}
                          </li>
                        ))}
                    </ul>

                  </div>

                  {/* Actions */}
                  <div className="flex flex-col justify-center gap-4">

                    <Link
                      to={`/product/${product.id}`}
                      className="
                        bg-dark-purple
                        text-white
                        py-3
                        rounded-xl
                        text-center
                        font-semibold
                      "
                    >
                      View Details
                    </Link>

                    <a
                      href="https://wa.me/1234567890"
                      target="_blank"
                      rel="noreferrer"
                      className="
                        bg-[#25D366]
                        text-white
                        py-3
                        rounded-xl
                        text-center
                        font-semibold
                        flex
                        items-center
                        justify-center
                        gap-2
                      "
                    >
                      <MessageCircle size={18} />
                      Order Now
                    </a>

                  </div>

                </div>
              </div>
            ))}

          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}