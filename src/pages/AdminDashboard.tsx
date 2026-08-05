import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Package, Users, LogOut, Menu, X } from 'lucide-react';
import { PRODUCTS } from '../data/mockData';
import { AdminSidebar } from '../components/AdminSidebar';

export function AdminDashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const totalProducts = PRODUCTS.length;
  const totalCategories = 6;
  const totalVariants = PRODUCTS.reduce((sum, p) => sum + p.variants.length, 0);

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
            <h1 className="font-display text-2xl font-bold text-dark-purple">Dashboard</h1>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Total Products Card */}
            <div className="bg-white rounded-2xl shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Products</p>
                  <p className="text-3xl font-bold text-dark-purple mt-2">{totalProducts}</p>
                </div>
                <div className="p-3 bg-dark-purple/10 rounded-full">
                  <Package className="w-8 h-8 text-dark-purple" />
                </div>
              </div>
            </div>

            {/* Total Variants Card */}
            <div className="bg-white rounded-2xl shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Variants</p>
                  <p className="text-3xl font-bold text-mid-purple mt-2">{totalVariants}</p>
                </div>
                <div className="p-3 bg-mid-purple/10 rounded-full">
                  <BarChart3 className="w-8 h-8 text-mid-purple" />
                </div>
              </div>
            </div>

            {/* Categories Card */}
            <div className="bg-white rounded-2xl shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Categories</p>
                  <p className="text-3xl font-bold text-golden-yellow mt-2">{totalCategories}</p>
                </div>
                <div className="p-3 bg-golden-yellow/20 rounded-full">
                  <Users className="w-8 h-8 text-golden-yellow" />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Products Table */}
          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="font-display text-xl font-bold text-dark-purple">Recent Products</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Product Name
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Variants
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Rating
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {PRODUCTS.slice(0, 5).map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-dark-purple">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{product.variants.length}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-3 py-1 bg-golden-yellow/20 text-golden-yellow rounded-full font-medium">
                          {product.rating} ⭐
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
