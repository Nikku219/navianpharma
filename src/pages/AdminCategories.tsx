import React, { useEffect, useState } from "react";
import { Plus, Trash2, Pencil } from "lucide-react";
import { AdminSidebar } from "../components/AdminSidebar";

export default function AdminCategories() {
const [sidebarOpen, setSidebarOpen] = useState(false);

const [name, setName] = useState("");
const [image, setImage] = useState(null);
const [uploading, setUploading] = useState(false);
const [sequenceNo, setSequenceNo] = useState("");
const [editingId, setEditingId] = useState(null);

const [categories, setCategories] = useState([]);

const loadCategories = async () => {
try {
const res = await fetch(
"https://api.navianpharma.com/api/categories"
);


  const data = await res.json();

  setCategories(data.data || []);
} catch (err) {
  console.log(err);
}


};

useEffect(() => {
loadCategories();
}, []);

const saveCategory = async (e) => {
e.preventDefault();


try {
  setUploading(true);
  const formData = new FormData();

  formData.append("name", name);
  formData.append("sequence_no", sequenceNo);

  if (image) {
    formData.append("image", image);
  }

  const url = editingId
    ? `https://api.navianpharma.com/api/categories/update/${editingId}`
    : "https://api.navianpharma.com/api/categories";

  const res = await fetch(url, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (data.status) {
    setName("");
    setImage(null);
    setSequenceNo("");
    setEditingId(null);

    loadCategories();
  }
} catch (err) {
  console.log(err);
} finally {
  setUploading(false);
}


};

const editCategory = (item) => {
setEditingId(item.id);
setName(item.name);
setSequenceNo(item.sequence_no || "");
};

const deleteCategory = async (id) => {
if (!window.confirm("Delete Category?")) return;


try {
  await fetch(
    `https://api.navianpharma.com/api/categories/${id}`,
    {
      method: "DELETE",
    }
  );

  loadCategories();
} catch (err) {
  console.log(err);
}


};

return (
<div className="flex min-h-screen bg-gray-100">


  <AdminSidebar
    open={sidebarOpen}
    onClose={() => setSidebarOpen(false)}
  />

  <div className="flex-1">

    <div className="bg-white shadow px-6 py-4">
      <h1 className="text-2xl font-bold">
        Categories
      </h1>
    </div>

    <div className="p-6">

      <div className="bg-white rounded-2xl shadow p-6 mb-6">

        <h2 className="text-xl font-semibold mb-4">
          {editingId
            ? "Edit Category"
            : "Add Category"}
        </h2>

        <form
          onSubmit={saveCategory}
          className="grid md:grid-cols-4 gap-4"
        >

          <input
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="border rounded-xl px-4 py-3"
            required
          />

          <input
            type="number"
            placeholder="Sequence Number"
            value={sequenceNo}
            onChange={(e) =>
              setSequenceNo(
                e.target.value
              )
            }
            className="border rounded-xl px-4 py-3"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(
                e.target.files[0]
              )
            }
            disabled={uploading}
            className="border rounded-xl px-4 py-3"
          />

          <button
            type="submit"
            disabled={uploading}
            className="bg-golden-yellow text-dark-purple rounded-xl px-4 py-3 font-semibold flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {uploading && (
              <div className="w-4 h-4 border-2 border-dark-purple border-t-transparent rounded-full animate-spin mr-2" />
            )}

            <Plus size={18} />

            {editingId ? "Update" : uploading ? "Saving..." : "Add"}
          </button>

        </form>

      </div>

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          <thead>
            <tr className="bg-gray-50">
              <th className="p-4">
                ID
              </th>
              <th>Image</th>
              <th>Name</th>
              <th>Sequence</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {categories.map(
              (item) => (
                <tr
                  key={item.id}
                  className="border-t"
                >
                  <td className="p-4">
                    {item.id}
                  </td>

                  <td>
                    {item.image && (
                      <img
                        src={`https://api.navianpharma.com/uploads/categories/${item.image}`}
                        alt={item.name}
                        className="w-14 h-14 rounded-lg object-cover"
                      />
                    )}
                  </td>

                  <td>
                    {item.name}
                  </td>

                  <td>
                    {
                      item.sequence_no
                    }
                  </td>

                  <td>
                    <div className="flex justify-center gap-3">

                      <button
                        onClick={() =>
                          editCategory(
                            item
                          )
                        }
                        className="bg-blue-500 text-white px-3 py-2 rounded-lg"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() =>
                          deleteCategory(
                            item.id
                          )
                        }
                        className="bg-red-500 text-white px-3 py-2 rounded-lg"
                      >
                        <Trash2 size={16} />
                      </button>

                    </div>
                  </td>
                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>

  </div>

</div>


);
}
