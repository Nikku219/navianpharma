import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, BarChart3, X, Package2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { path } from 'framer-motion/client';

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: Package },
    // { name: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
    {
    name : 'Add Story ', 
    path:'/admin/StoryImage' ,
    icon:Package2 
  },
    {
  name: "Categories",
  path: "/admin/categories",
  icon: Package,
},
{
  name: 'Home Sections',
  path: '/admin/home-sections',
  icon: Package,
},

{
  name: 'Brands',
  path: '/admin/brands',
   icon: Package,
}
  ];

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed md:static top-0 left-0 h-screen w-64 bg-dark-purple text-white transform transition-transform md:translate-x-0 z-40 flex flex-col',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <h1 className="font-display text-xl font-bold">NAVIAN</h1>
            <button
              onClick={onClose}
              className="md:hidden p-1 hover:bg-white/10 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm text-white/70 mt-1">Admin Panel</p>
        </div>

        <nav className="p-6 space-y-3 overflow-y-auto flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl transition-all',
                  isActive
                    ? 'bg-golden-yellow text-dark-purple font-semibold'
                    : 'text-white/80 hover:bg-white/10'
                )}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/10">
          <div className="flex flex-col gap-3">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              onClick={onClose}
              className="text-dark-purple bg-golden-yellow text-center px-4 py-2 rounded-lg font-semibold"
            >
              Go to Site
            </a>

            <button
              onClick={handleLogout}
              className="w-full text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
