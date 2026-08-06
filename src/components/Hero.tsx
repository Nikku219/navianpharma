import React from "react";
import { motion } from "framer-motion";
import {
  Shield,
  TrendingUp,
  Droplets,
  Activity,
  Leaf,
  Phone,
  ShoppingBag,
} from "lucide-react";

export function Hero() {
  return (
    <div className="relative overflow-hidden min-h-screen bg-cream flex flex-col justify-between pt-20 md:pt-20"

      {/* Background Video */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="
            absolute
            top-0 left-0
            w-full
            h-[38vh]
            sm:h-[42vh]
            md:h-full
            object-cover
            object-[78%_center]
            lg:object-[84%_center]
            md:scale-105
          "
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        {/* Mobile Logo */}
<div className="block md:hidden absolute top-5 left-5 z-30">
  <img
    src="/logo.png"
    alt="Navian Pharma"
    className="w-40"
  />
</div>

        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-[#FFF8F2]/70 via-[#FFF8F2]/15 to-transparent" />
      </div>

      <div className="relative z-10 flex-grow flex items-end md:items-center pt-[18vh] md:pt-0 md:pt-0">
       <div className="w-full pl-6 sm:pl-10 md:pl-16 lg:pl-24 xl:pl-32 pr-6">
          <div className="max-w-[700px]">

            <motion.img
              src="/logo.png"
              alt="Logo"
              initial={{opacity:0,y:20}}
              animate={{opacity:1,y:0}}
              transition={{duration:.6}}
               className="hidden md:block w-56 sm:w-72 md:w-80 lg:w-[480px] xl:w-[520px] h-auto mb-10"
            />

            <motion.h1
              initial={{opacity:0,y:25}}
              animate={{opacity:1,y:0}}
              transition={{delay:.2}}
className="font-display font-bold text-dark-purple leading-[1.05] tracking-tight text-[2rem] sm:text-[2.6rem] md:text-[3.2rem] lg:text-[3.8rem] xl:text-[4.2rem] max-w-[650px]"            >
              Healthy Animals.<br/>
              Prosperous Farmers.<br/>
              <span className="text-golden-yellow">Stronger Nation.</span>
            </motion.h1>

            <motion.p
              initial={{opacity:0,y:20}}
              animate={{opacity:1,y:0}}
              transition={{delay:.35}}
className="mt-4 mb-8 text-sm sm:text-base md:text-lg lg:text-xl text-dark-purple/80 flex items-center gap-2"            >
              <Leaf className="w-5 h-5 text-green-600"/>
              Trusted Nutrition. Better Health. Higher Productivity.
            </motion.p>

            <motion.div
              initial={{opacity:0,y:20}}
              animate={{opacity:1,y:0}}
              transition={{delay:.5}}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a href="#products" 
              className="hidden md:inline-flex items-center justify-center gap-2 px-8 py-4 bg-dark-purple text-cream rounded-full font-bold shadow-lg"
               >
                <ShoppingBag className="w-5 h-5 text-green-400"/>
                Explore Products
              </a>

              <a href="#contact" className="inline-flex justify-center items-center gap-2 px-8 py-4 rounded-full bg-golden-yellow text-dark-purple font-bold shadow-lg hover:bg-[#e6b555] transition">
                <Phone className="w-5 h-5"/>
                Contact Us
              </a>
            </motion.div>

          </div>
        </div>
      </div>

     <motion.div
initial={{
opacity:0,
y:40
}}
animate={{
opacity:1,
y:0
}}
transition={{
delay:.7
}}
className="hidden md:block relative z-20"
>
        <div className="flex flex-col lg:flex-row">
          <div className="flex-grow bg-dark-black py-6 px-5 lg:px-8 flex flex-wrap justify-center lg:justify-start gap-8">
            {[
              [Shield,"Stronger","Immunity"],
              [TrendingUp,"Better","Growth"],
              [Droplets,"Higher","Milk Production"],
              [Activity,"Better","Digestion"],
              [Leaf,"100% Safe","& Natural"],
            ].map(([Icon,a,b],i)=>{
              const C=Icon as any;
              return(
                <div key={i} className="flex flex-col items-center text-center gap-2">
                  <div className="w-12 h-12 rounded-full border-2 border-black/30 flex items-center justify-center">
    <C className="w-6 h-6 text-black" />
</div>
                  <span className="text-xs uppercase tracking-wider text-black font-semibold">
                {a}
              <br />
               {b}
                </span>
                </div>
              )
            })}
          </div>

          <div
  className="
    relative
    bg-golden-yellow
    px-8
    py-8
    lg:px-12
    flex
    items-center
    justify-center
    lg:justify-start
    overflow-hidden

    rounded-tl-[90px]
    rounded-bl-none

    min-w-[320px]
    lg:min-w-[360px]
  "
>
  {/* Purple Curved Shape */}
  <div
    className="
      absolute
      -left-14
      bottom-0

      w-28
      h-28

      
      rounded-full
    "
  ></div>

  {/* Purple Strip */}
  <div
    className="
      absolute
      left-0
      top-0
      bottom-0

      w-10

    "
  ></div>

  {/* Content */}
  <div className="relative z-10">
    <p className="text-sm md:text-base text-dark-purple font-medium mb-2">
      A Step Towards
    </p>

    <h3 className="font-display font-bold text-xl md:text-2xl leading-tight">
      <span className="text-dark-purple">
        Healthier Animals
      </span>

      <br />

      <span className="text-dark-purple">
        and a Better Tomorrow
      </span>
    </h3>
  </div>
</div>
        </div>
      </motion.div>

    </div>
  );
}

export default Hero;
