import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Phone, MessageCircle, ShoppingCart } from 'lucide-react';
import { cn } from '../lib/utils';
import { PRODUCTS } from '../data/mockData';
import { useCart } from '../lib/cartContext';
export function Navbar() {
  const { count } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [animalsDropdownOpen, setAnimalsDropdownOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  // Handle scroll to show/hide navbar only on home page
  useEffect(() => {
    if (!isHomePage) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);
  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const API_URL = 'https://api.navianpharma.com/api/home-sections';
  const PRODUCTS_API = 'https://api.navianpharma.com/api/products';

  const [sectionProducts, setSectionProducts] = useState<any[]>([]);

  useEffect(() => {
    const loadSectionProducts = async () => {
      try {
        const res = await fetch(API_URL);
        const result = await res.json();
        const data = Array.isArray(result.data) ? result.data[0] : result.data;

        const prodRes = await fetch(PRODUCTS_API);
        const prodResult = await prodRes.json();
        const allProducts = Array.isArray(prodResult)
          ? prodResult
          : prodResult.data || [];

        let ids: string[] = [];

        if (data) {
          ids = [
            data.product1_id,
            data.product2_id,
            data.product3_id,
            data.product4_id,
            data.product5_id,
            data.product6_id,
          ].filter(Boolean).map(String);
        }

        let items: any[] = [];

        if (ids.length) {
          // prefer home-section images when available so hover images match product section
          items = [1,2,3,4,5,6]
            .map((i) => {
              const pid = data[`product${i}_id`];
              if (!pid) return null;
              const prod = allProducts.find((p: any) => String(p.id) === String(pid));
              const imgPath = data[`image${i}`];
              const image = imgPath ? `https://api.navianpharma.com/${imgPath}` : prod?.image || '';

              return prod ? { ...prod, image } : { id: pid, name: '', image };
            })
            .filter(Boolean)
            .slice(0, 8);
        } else {
          // fallback to first products from API
          items = (allProducts || []).slice(0, 8);
        }

        setSectionProducts(items);
      } catch (err) {
        console.error(err);
      }
    };

    loadSectionProducts();
  }, []);
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/' },
    { name: 'About Us', path: '/#about' },
    { name: 'Contact', path: '/#contact' },
  ];

  return (
    <>
      <motion.header
        initial={{
          y: -100,
          opacity: 0
        }}
        animate={{
          y: isScrolled ? 0 : -100,
          opacity: isScrolled ? 1 : 0
        }}
        transition={{
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1]
        }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          'bg-golden-yellow shadow-md'
        )}>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <a href="https://navianpharma.com" className="flex-shrink-0 flex items-center gap-2">
              <span className="font-display font-bold  text-dark-purple tracking-tight">
                <img className='md:w-60 w-36' src="/logo.png" alt="logo" />
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8 h-full">
              {navLinks.map((link) => {
                if (link.name === 'Products') {
                  return (
                    <div
                      key={link.name}
                      className="h-full flex items-center"
                      onMouseEnter={() => setAnimalsDropdownOpen(true)}
                      onMouseLeave={() => setAnimalsDropdownOpen(false)}>
                      
                      <a
                        href={link.path}
                        className="flex items-center gap-1 text-dark-purple hover:text-dark-purple/80 font-medium text-lg transition-colors h-full">
                        
                        {link.name} <ChevronDown className="w-4 h-4" />
                      </a>

                      {/* Products Mega Menu */}
                      <AnimatePresence>
                        {animalsDropdownOpen &&
                        <motion.div
                          initial={{
                            opacity: 0,
                            y: 10
                          }}
                          animate={{
                            opacity: 1,
                            y: 0
                          }}
                          exit={{
                            opacity: 0,
                            y: 10
                          }}
                          transition={{
                            duration: 0.2
                          }} 
                          className="absolute  top-full  left-12 -translate-x-1/2 w-[1400px] bg-cream/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-dark-purple/10 p-10">
                          
                          <div className="grid grid-cols-6 gap-11">
  {(sectionProducts.length ? sectionProducts : PRODUCTS.slice(0, 8)).map((product: any) => (
    <Link
      key={product.id}
      to={`/product/${product.id}`}
      className="group flex flex-col  items-center gap-3.5 "
    >
      <div className="w-40 h-40 rounded-xl overflow-hidden  shadow-lg ">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full  object-cover group-hover:scale-105 transition-transform"
        />
      </div>

      {/* <span className="font-semibold text-dark-purple text-center">
        {product.name}
      </span> */}
    </Link>
  ))}
  <div className=" flex text-center   justify-self-center ">
 
</div>
 
</div>
<Link
    to="/products"
    className="bg-golden-yellow text-center text-dark-purple flex  align-center justify-center px-6 py-3 rounded-lg hover:bg-dark-purple/90 transition"
  >
    See More Products →
  </Link>
                          </motion.div>
                        }
                      </AnimatePresence>
                    </div>);

                }
                return (
                  <a
                    key={link.name}
                    href={link.path}
                    className="text-dark-purple hover:text-dark-purple/80 font-medium text-lg transition-colors h-full flex items-center">
                    
                    {link.name}
                  </a>);

              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
              {/* Cart button */}
              <Link to="/cart" className="relative flex items-center gap-2 px-4 py-2 rounded-md text-dark-purple hover:bg-dark-purple/5">
                <ShoppingCart className="w-5 h-5" />
                <span className="sr-only">Cart</span>
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{count}</span>
                )}
              </Link>
              <a
                href="https://wa.me/919171303700"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-[#25D366] text-white px-6 py-2.5 rounded-md font-medium text-base hover:bg-[#20bd5a] transition-colors shadow-sm">
                
                <span>WhatsApp</span>
              </a>
              <a
                href="#contact"
                className="flex items-center gap-2 bg-dark-purple text-cream px-6 py-2.5 rounded-md font-medium text-base hover:bg-dark-purple/90 transition-colors shadow-sm">
                
                <span>Enquiry</span>
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-dark-purple p-2">
                
                {mobileMenuOpen ?
                <X className="w-6 h-6" /> :

                <Menu className="w-6 h-6" />
                }
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen &&
          <motion.div
            initial={{
              height: 0,
              opacity: 0
            }}
            animate={{
              height: 'auto',
              opacity: 1
            }}
            exit={{
              height: 0,
              opacity: 0
            }}
            className="md:hidden bg-cream border-t border-dark-purple/10 overflow-hidden">
            
              <div className="px-4 pt-2 pb-6 space-y-1">
                {navLinks.map((link) =>
              <a
                key={link.name}
                href={link.path}
                className="block px-3 py-3 text-base font-medium text-soft-ink hover:text-dark-purple hover:bg-beige rounded-lg"
                onClick={() => setMobileMenuOpen(false)}>
                
                    {link.name}
                  </a>
              )}
                <div className="pt-4 flex flex-col gap-3 px-3">
                  <Link to="/cart" className="flex items-center justify-center gap-2 border border-dark-purple text-dark-purple px-5 py-3 rounded-xl font-medium text-sm">
                    <ShoppingCart className="w-4 h-4" />
                    <span>Cart</span>
                    {count > 0 && <span className="ml-2 bg-red-500 text-white rounded-full w-5 h-5 text-center text-xs">{count}</span>}
                  </Link>
                  <a
                  href="#contact"
                  className="flex items-center justify-center gap-2 border border-dark-purple text-dark-purple px-5 py-3 rounded-xl font-medium text-sm">
                  
                    <Phone className="w-4 h-4" />
                    <span>Enquiry</span>
                  </a>
                  <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-5 py-3 rounded-xl font-medium text-sm">
                  
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Order</span>
                  </a>
                </div>
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </motion.header>
    </>);

}