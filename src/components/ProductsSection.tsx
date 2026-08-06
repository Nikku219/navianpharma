import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

const BRANDS_API = 'https://api.navianpharma.com/api/brands';
const HOME_SECTION_API = 'https://api.navianpharma.com/api/home-sections';

interface ProductsSectionProps {
  selectedAnimal?: any;
  setSelectedAnimal?: (animal: any) => void;
}

export function ProductsSection({
  selectedAnimal = 'All',
  setSelectedAnimal = () => {}
}: ProductsSectionProps) {

  const [brands, setBrands] = useState<any[]>([]);
  const [homeSection, setHomeSection] = useState<any>(null);

  useEffect(() => {
    fetchBrands();
    fetchHomeSection();
  }, []);

  const fetchBrands = async () => {
    try {
      const res = await fetch(BRANDS_API);
      const result = await res.json();

      setBrands(result.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchHomeSection = async () => {
    try {
      const res = await fetch(HOME_SECTION_API);
      const result = await res.json();

      const data = Array.isArray(result.data)
        ? result.data[0]
        : result.data;

      setHomeSection(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section
      id="products"
      className="py-14 md:py-24 bg-cream relative z-10 overflow-hidden"
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl font-bold text-dark-purple inline-block relative"
          >
            Our Registered{' '}
            <span className="relative">
              BRANDS®
              <span className="absolute left-0 -bottom-1 w-2/3 h-1 bg-golden-yellow rounded-full" />
            </span>
          </motion.h2>
        </div>

        <div className="max-w-4xl mx-auto mb-20">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-4">
                        {brands.map((brand, i) => (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={cn(
                  'bg-white rounded-xl shadow-sm border border-dark-purple/5 py-3 px-5 text-center',
                  i % 3 === 1 ? 'sm:translate-y-6' : ''
                )}
              >
                <span className="font-display font-bold text-dark-purple text-base md:text-lg whitespace-nowrap">
                  {brand.name}®
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center max-w-8xl mx-auto mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-5xl font-bold text-dark-purple mb-4"
          >
            Our Product Range
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-soft-ink/70 p-5"
          >
            Innovative feed supplements and animal healthcare solutions designed
            for healthier livestock and better productivity.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                   {homeSection &&
              [
                {
                  image: homeSection.image1,
                  productId: homeSection.product1_id,
                  sequence: homeSection.sequence1,
                },
                {
                  image: homeSection.image2,
                  productId: homeSection.product2_id,
                  sequence: homeSection.sequence2,
                },
                {
                  image: homeSection.image3,
                  productId: homeSection.product3_id,
                  sequence: homeSection.sequence3,
                },
                {
                  image: homeSection.image4,
                  productId: homeSection.product4_id,
                  sequence: homeSection.sequence4,
                },
                {
                  image: homeSection.image5,
                  productId: homeSection.product5_id,
                  sequence: homeSection.sequence5,
                },
                {
                  image: homeSection.image6,
                  productId: homeSection.product6_id,
                  sequence: homeSection.sequence6,
                },
              ]
                .filter((item) => item.image)
                .sort(
                  (a, b) =>
                    Number(a.sequence) - Number(b.sequence)
                )
                .map((item, index) => (
                  <Link
                    key={index}
                    to={`/product/${item.productId}`}
                    className="group flex flex-col items-center gap-4 rounded-3xl bg-white/90 p-1 shadow-[0_16px_50px_rgba(0,0,0,0.05)] transition-transform hover:-translate-y-1"
                  >
                    <div className="rounded-[25px] overflow-hidden shadow-lg">
                      <img
                        src={`https://api.navianpharma.com/${item.image}`}
                        alt="productimage"
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>
                ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              to="/products"
              className="inline-flex items-center justify-center rounded-lg bg-golden-yellow px-8 py-3 text-sm font-semibold text-dark-purple transition hover:bg-dark-purple/90 hover:text-white"
            >
              See More Products →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
