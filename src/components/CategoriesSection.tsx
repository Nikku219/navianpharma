import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface AnimalData {
  id: number;
  name: string;
  image: string;
}

interface CategoriesSectionProps {
  setSelectedAnimal: (animal: string) => void;
}

const PURPOSES = [
  {
    title: "Milk Production",
    image: "/milk.png",
  },
  {
    title: "Growth Support",
    image: "/growth.png",
  },
  {
    title: "Digestion Care",
    image: "/digestion.png",
  },
  {
    title: "Immunity Support",
    image: "/vv.png",
  },
  {
    title: "Mineral Nutrition",
    image: "/minral.png",
  },
  {
    title: "Deworming Solutions",
    image: "/solution.png",
  },
];

function scrollToProducts() {
  const el = document.getElementById('products');

  if (el) {
    el.scrollIntoView({
      behavior: 'smooth',
    });
  }
}

export function CategoriesSection({
  setSelectedAnimal,
}: CategoriesSectionProps) {
  const [animals, setAnimals] = useState<AnimalData[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch('https://api.navianpharma.com/api/categories')
    .then((res) => res.json())
    .then((data) => {
      console.log('API DATA =>', data);

      if (Array.isArray(data)) {
        setAnimals(data);
      } else if (Array.isArray(data.data)) {
        setAnimals(data.data);
      } else {
        setAnimals([]);
      }

      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setLoading(false);
    });
}, []);

  const handleAnimalClick = (animalName: string) => {
    setSelectedAnimal(animalName);
    scrollToProducts();
  };

  return (
    <section
      id="categories"
      className="py-15 lg:py-2 bg-transparent relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-lg text-soft-ink/70 max-w-3xl mx-auto">
            Providing trusted nutrition and healthcare solutions for every
            livestock category.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* LEFT SIDE */}
          {/* LEFT SIDE */}
<div>
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="font-display text-4xl lg:text-5xl font-bold text-dark-purple text-center mb-5"
  >
    Products By Purpose
  </motion.h2>

  <motion.p
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.1 }}
    className="text-xl text-soft-ink/70 text-center mb-10"
  >
    Find the right solution for your livestock needs.
  </motion.p>

  <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
    {PURPOSES.map((item, index) => (
      <motion.div
        key={item.title}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05 }}
        className="group h-[220px] bg-white rounded-[28px] border-2 border-purple-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
      >
        <img
          src={item.image}
          alt={item.title}
            className="w-full h-full object-cover object-center"
        />
      </motion.div>
    ))}
  </div>
</div>

          {/* RIGHT SIDE */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-4xl lg:text-5xl font-bold text-dark-purple text-center mb-10"
            >
              Animals We Serve
            </motion.h2>

            {loading ? (
              <div className="text-center py-10 text-white">
                Loading...
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5 auto-rows-[250px]">

                {animals.map((animal, index) => (
                  <motion.button
                    key={animal.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleAnimalClick(animal.name)}
                    className="group overflow-hidden rounded-[28px] relative shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <img
                       src={`https://api.navianpharma.com/uploads/categories/${animal.image}`}
  alt={animal.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                    <div className="absolute bottom-4 left-4">
                      <span className="text-white font-bold text-xl">
                        {animal.name}
                      </span>
                    </div>
                  </motion.button>
                ))}

              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}