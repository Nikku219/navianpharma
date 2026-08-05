import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
// import { ProductsSection } from '../components/ProductsSection';
import { CategoriesSection } from '../components/CategoriesSection';
// import HomeCarousel from '../components/HomeCarousel';
// import { AboutSection } from '../components/AboutSection';
import { DistributorSection } from '../components/DistributorSection';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import { useScreenInit } from '../useScreenInit';
// import { ANIMALS, Animal } from '../data/mockData';
import AboutSection from '../components/AboutSection';
import { ProductsSection } from '../components/ProductsSection';
import { Stories } from '../components/Stories';

export function Home() {
  // useScreenInit();
  // const location = useLocation();
  // const [selectedAnimal, setSelectedAnimal] = useState<Animal | 'All'>('All');
  // Read animal filter from URL on mount / change
  // useEffect(() => {
  //   const params = new URLSearchParams(location.search);
  //   const animalParam = params.get('animal') as Animal;
  //   if (animalParam && ANIMALS.some((a) => a.name === animalParam)) {
  //     setSelectedAnimal(animalParam);
  //   }
  // }, [location]);
  return (
    <div className="min-h-screen bg-fixed bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/home-bg.jpg')",
      }}>
      <Navbar />
      <main>
        <Hero />
        <ProductsSection/>        
        <CategoriesSection  />
        <AboutSection/>
            <Stories/>

        <ContactSection />
          <DistributorSection />
      </main>
      <Footer />
    </div>);

}