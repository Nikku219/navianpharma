import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
export function Footer() {
  return (
    <footer className="bg-[#7C6AA6] text-cream pt-10 md:pt-16 pb-5 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 mb-8 md:mb-14">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1 space-y-3">
            <Link to="/" className="flex items-center gap-2">
              {/* <div className="w-10 h-10 bg-golden-yellow rounded-lg flex items-center justify-center text-dark-purple font-display font-bold text-xl">
                N
              </div> */}
              {/* <span className="font-display font-bold text-2xl text-cream tracking-tight">
                NAVIAN{' '}
                <span className="text-golden-yellow font-medium">PHARMA</span> */}
                <img src="logo.png" alt="" />
              {/* </span> */}
            </Link>
            <p className="text-cream/70 text-xs md:text-sm leading-5">
              Premium livestock healthcare solutions dedicated to prosperous
              farmers and a stronger nation through trusted animal nutrition and
              medicine.
            </p>
           <div className="flex items-center gap-2">
              <a
                href="#"
                className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-golden-yellow hover:text-dark-purple transition-colors">
                
                 <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-golden-yellow hover:text-dark-purple transition-colors">
                
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-golden-yellow hover:text-dark-purple transition-colors">
                
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6 text-golden-yellow">
              Quick Links
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="#about"
                  className="text-cream/70 hover:text-golden-yellow transition-colors">
                  
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  className="text-cream/70 hover:text-golden-yellow transition-colors">
                  
                  Our Products
                </a>
              </li>
              <li>
                <a
                  href="#distributor"
                  className="text-cream/70 hover:text-golden-yellow transition-colors">
                  
                  Become a Distributor
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-cream/70 hover:text-golden-yellow transition-colors">
                  
                  Contact Us
                </a>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-cream/70 hover:text-golden-yellow transition-colors">
                  
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6 text-golden-yellow">
              Categories
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="#products"
                  className="text-cream/70 hover:text-golden-yellow transition-colors">
                  
                  Milk Production
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  className="text-cream/70 hover:text-golden-yellow transition-colors">
                  
                  Growth Support
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  className="text-cream/70 hover:text-golden-yellow transition-colors">
                  
                  Immunity Boosters
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  className="text-cream/70 hover:text-golden-yellow transition-colors">
                  
                  Mineral Mixtures
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  className="text-cream/70 hover:text-golden-yellow transition-colors">
                  
                  Dewormers
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6 text-golden-yellow">
              Contact Info
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-cream/70">
                <MapPin className="w-5 h-5 text-golden-yellow shrink-0 mt-0.5" />
                <span>
                 121 C Block, Sharda Nagar, Nariyal Kheda,
                Bhopal, Madhya Pradesh - 462038, India
                </span>
              </li>
              <li className="flex items-center gap-3 text-cream/70">
                <Phone className="w-5 h-5 text-golden-yellow shrink-0" />
                <span>+91 8989403011  <br /> +91 9479474401</span>
              </li>
              <li className="flex items-center gap-3 text-cream/70">
                <Mail className="w-5 h-5 text-golden-yellow shrink-0" />
                <span>sales@navianpharma.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-cream/50 text-sm">
            © {new Date().getFullYear()} Navian Pharma. All rights reserved. 
          </p>
          <p className="text-cream/50 text-sm">
            Designed for Prosperous Farmers By <a className='text-blue-500' href='https://www.progset.com' target='_blank'>Pawar digital  </a>
          </p>
        </div>
      </div>
    </footer>);

}