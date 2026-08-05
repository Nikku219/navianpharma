import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, Plus, Pencil, Trash2 } from "lucide-react";
import { AdminSidebar } from "../components/AdminSidebar";

export default function AdminProducts() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await fetch(
        "https://api.navianpharma.com/api/products"
      );

      const data = await res.json();

      setProducts(data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProduct = async (id: number) => {
    if (!window.confirm("Delete Product ?")) return;

    try {
      const res = await fetch(
        `https://api.navianpharma.com/api/products/${id}`,
        {
          method: "DELETE",
           headers: {
      'Accept': 'application/json'
    }
        }
      );

      if (!res.ok) {
        const text = await res.text();
        alert('Delete failed: ' + (text || res.statusText));
        return;
      }

      alert('Product deleted');
      loadProducts();
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      <AdminSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1">

        {/* Header */}
        <div className="bg-white shadow px-6 py-4 flex justify-between items-center">

          <div className="flex items-center gap-3">

            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden"
            >
              <Menu />
            </button>

            <h1 className="text-2xl font-bold">
              Products
            </h1>

          </div>

          <Link
            to="/admin/products/add"
            className="bg-golden-yellow text-dark-purple px-5 py-2 rounded-xl font-semibold flex items-center gap-2"
          >
            <Plus size={18} />
            Add Product
          </Link>

        </div>

        {/* Product Table */}
        <div className="p-6">

          <div className="bg-white rounded-2xl shadow overflow-hidden">

            <table className="w-full">

              <thead>
                <tr className="bg-gray-50">
                  <th className="p-4 text-left">ID</th>
                  <th className="text-left">Product</th>
                  <th className="text-left">Brand</th>
                  <th className="text-left">Variants</th>
                  {/* <th className="text-left">Stock</th> */}
                  <th className="text-center">Action</th>
                </tr>
              </thead>

              <tbody>

                {products.map((item: any) => (
                  <tr
                    key={item.id}
                    className="border-t"
                  >
                    <td className="p-4">
                      {item.id}
                    </td>

                    <td>{item.name}</td>

                    <td>{item.brand}</td>

                  <td>
  {item.total_variants || 0}
</td>

                    {/* <td>
                      {item.total_stock || 0}
                    </td> */}

                    <td>
                      <div className="flex justify-center gap-4">

                        <Link
                          to={`/admin/products/edit/${item.id}`}
                        >
                          <Pencil
                            size={18}
                            className="text-blue-600"
                          />
                        </Link>

                        <button
                          onClick={() =>
                            deleteProduct(item.id)
                          }
                        >
                          <Trash2
                            size={18}
                            className="text-red-600"
                          />
                        </button>

                      </div>
                    </td>
                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}