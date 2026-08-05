import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Home } from './pages/Home';
import { ProductDetail } from './pages/ProductDetail';
import { AnimalProducts } from './pages/AnimalProducts';
import { Products } from './pages/Products';
import Cart from './pages/Cart';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
// import { AdminProducts } from './pages/AdminProducts';
import { AdminAnalytics } from './pages/AdminAnalytics';
import { PageLoader } from './components/PageLoader';
import { ProtectedAdminRoute } from './components/ProtectedAdminRoute';
import AdminProducts from './pages/AdminProducts';
import AdminAddProducts  from './pages/AdminAddProducts';
import AdminCategories from './pages/AdminCategories';
import Brands from './pages/Brands';
import HomeSections from './pages/HomeSections';
import AdminEditProduct from './pages/AdminEditProduct';
import StoryImage from './pages/StoryImage';
import { CartProvider } from './lib/cartContext';
import HeroSection from "./pages/HeroSection";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <PageLoader isLoading={isLoading} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route
          path="/animal/:animal"
          element={<AnimalProducts />}
        />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />
        <Route
  path="/admin/hero-section"
  element={<HeroSection />}
/>
        <Route
          path="/admin/products"
          element={
            <ProtectedAdminRoute>
              <AdminProducts/>
            </ProtectedAdminRoute>
          }
        />
         <Route
    path="admin/products/add"
    element={<AdminAddProducts/>}
  />
         <Route
            path="/admin/products/edit/:id"
            element={<AdminEditProduct/>}
          />
<Route
  path="/admin/categories"
  element={<AdminCategories/>}
/>
<Route
  path="/admin/brands"
  element={<Brands/>}
/>
<Route
  path="/admin/home-sections"
  element={<HomeSections/>}
/>
  {/* <Route
    path="products/edit/:id"
    element={<EditProduct />}
  /> */}

        <Route
          path="/admin/analytics"
          element={
            <ProtectedAdminRoute>
              <AdminAnalytics />
            </ProtectedAdminRoute>
          }
        />
        <Route path='/admin/StoryImage' element ={<StoryImage/>}/>
      </Routes>
    </>
  );
}

export function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppContent />
      </BrowserRouter>
    </CartProvider>
  );
}