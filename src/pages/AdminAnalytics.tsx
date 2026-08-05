import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, TrendingUp } from 'lucide-react';
import { PRODUCTS } from '../data/mockData';
import { AdminSidebar } from '../components/AdminSidebar';

export function AdminAnalytics() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const totalRevenue = PRODUCTS.reduce(
    (sum, p) => sum + p.variants.reduce((vSum, v) => vSum + v.price, 0),
    0
  );

  const avgProductPrice =
    PRODUCTS.reduce(
      (sum, p) => sum + p.variants.reduce((vSum, v) => vSum + v.price, 0) / p.variants.length,
      0
    ) / PRODUCTS.length;

  const topProduct = PRODUCTS.reduce((top, p) =>
    p.rating > (top?.rating || 0) ? p : top
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <h1 className="font-display text-2xl font-bold text-dark-purple">Analytics</h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Total Revenue */}
            <div className="bg-white rounded-2xl shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Inventory Value</p>
                  <p className="text-3xl font-bold text-dark-purple mt-2">
                    ₹{totalRevenue.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
              </div>
            </div>

            {/* Average Price */}
            <div className="bg-white rounded-2xl shadow p-6">
              <div>
                <p className="text-gray-600 text-sm font-medium">Average Product Price</p>
                <p className="text-3xl font-bold text-mid-purple mt-2">
                  ₹{avgProductPrice.toFixed(0)}
                </p>
                <p className="text-xs text-gray-500 mt-2">per variant</p>
              </div>
            </div>

            {/* Top Rated Product */}
            <div className="bg-white rounded-2xl shadow p-6">
              <div>
                <p className="text-gray-600 text-sm font-medium">Top Rated Product</p>
                <p className="text-2xl font-bold text-golden-yellow mt-2">{topProduct.name}</p>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-lg font-semibold text-dark-purple">{topProduct.rating}</span>
                  <span className="text-yellow-400">⭐</span>
                  <span className="text-xs text-gray-500">({topProduct.reviews} reviews)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Categories Breakdown */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="font-display text-xl font-bold text-dark-purple mb-6">
              Products by Category
            </h2>
            <div className="space-y-4">
              {['Milk Production', 'Growth Support', 'Digestion Care', 'Immunity Support', 'Mineral Nutrition', 'Deworming Solutions'].map((category) => {
                const count = PRODUCTS.filter((p) => p.category === category).length;
                const percentage = (count / PRODUCTS.length) * 100;

                return (
                  <div key={category}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{category}</span>
                      <span className="text-sm font-semibold text-dark-purple">{count} products</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-dark-purple to-mid-purple h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
