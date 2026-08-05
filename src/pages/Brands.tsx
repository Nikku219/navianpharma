import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { AdminSidebar } from '../components/AdminSidebar';

interface Brand {
  id: number;
  name: string;
  sequence_no: number;
  status: number;
}

interface BrandForm {
  name: string;
  sequence_no: string;
  status: string;
}

const API_URL = 'https://api.navianpharma.com/api/brands';

const Brands: React.FC = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [form, setForm] = useState<BrandForm>({
    name: '',
    sequence_no: '',
    status: '1',
  });

  const fetchBrands = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL);
      const result = await response.json();

      console.log('BRANDS =>', result);

      if (result?.status && Array.isArray(result.data)) {
        setBrands(result.data);
      } else {
        setBrands([]);
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      setBrands([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append('name', form.name);
      formData.append('sequence_no', form.sequence_no);
      formData.append('status', form.status);

      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      console.log(result);

      if (result?.status || result?.success) {
        setForm({
          name: '',
          sequence_no: '',
          status: '1',
        });

        fetchBrands();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this brand?')) return;

    try {
    const response = await fetch(
  `https://api.navianpharma.com/api/brands/delete/${id}`,
  {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json'
    }
  }
);

console.log(await response.text());

      fetchBrands();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 p-6">

        {/* Add Brand */}

        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-2xl font-bold mb-6">
            Add Brand
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-3 gap-4">

              <div>
                <label className="block mb-2 font-medium">
                  Brand Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg p-3"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Sequence No
                </label>

                <input
                  type="number"
                  name="sequence_no"
                  value={form.sequence_no}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg p-3"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Status
                </label>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                >
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
              </div>

            </div>

            <button
              type="submit"
              className="mt-5 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Brand
            </button>
          </form>
        </div>

        {/* Brand List */}

        <div className="bg-white rounded-xl shadow overflow-hidden">

          <div className="p-4 border-b">
            <h2 className="text-xl font-bold">
              Brand List
            </h2>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              Loading...
            </div>
          ) : (
            <table className="w-full">

              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 text-left">ID</th>
                  <th className="p-4 text-left">Brand Name</th>
                  <th className="p-4 text-left">Sequence</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Action</th>
                </tr>
              </thead>

              <tbody>

                {brands.map((brand) => (
                  <tr
                    key={brand.id}
                    className="border-t"
                  >
                    <td className="p-4">
                      {brand.id}
                    </td>

                    <td className="p-4 font-medium">
                      {brand.name}
                    </td>

                    <td className="p-4">
                      {brand.sequence_no}
                    </td>

                    <td className="p-4">
                      {brand.status === 1
                        ? 'Active'
                        : 'Inactive'}
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() =>
                          handleDelete(brand.id)
                        }
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {brands.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="p-8 text-center text-gray-500"
                    >
                      No Brands Found
                    </td>
                  </tr>
                )}

              </tbody>

            </table>
          )}

        </div>

      </div>
    </div>
  );
};

export default Brands;