import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { AdminSidebar } from "../components/AdminSidebar";

const API = "https://api.navianpharma.com/api";

export default function HeroSection() {
  const [hero, setHero] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<any>(null);

  const fetchHero = async () => {
    try {
      const res = await fetch(`${API}/hero-section`);
      const result = await res.json();

      if (result.status) {
        setHero(result.data);
      } else {
        setHero(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHero();
  }, []);

  const uploadHero = async () => {
    if (!file) {
      setAlert({
        type: "error",
        message: "Please select an image."
      });

      setTimeout(() => setAlert(null), 2000);
      return;
    }

    const formData = new FormData();

    formData.append("hero_image", file);
    formData.append("alt_text", "Hero Banner");

    setLoading(true);

    try {
      const res = await fetch(
        `${API}/admin/hero-section/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.status) {
        fetchHero();

        setFile(null);

        setAlert({
          type: "success",
          message: "Hero Image Updated Successfully"
        });
      } else {
        setAlert({
          type: "error",
          message: data.message
        });
      }
    } catch (error) {
      console.log(error);

      setAlert({
        type: "error",
        message: "Upload Failed"
      });
    }

    setLoading(false);

    setTimeout(() => {
      setAlert(null);
    }, 2500);
  };

  const deleteHero = async () => {

    if (!confirm("Delete Hero Image?")) return;

    try {

      const res = await fetch(
        `${API}/admin/hero-section`,
        {
          method: "DELETE"
        }
      );

      const data = await res.json();

      if (data.status) {

        fetchHero();

        setAlert({
          type: "success",
          message: "Hero Image Deleted"
        });

      } else {

        setAlert({
          type: "error",
          message: data.message
        });

      }

    } catch (error) {

      console.log(error);

      setAlert({
        type: "error",
        message: "Delete Failed"
      });

    }

    setTimeout(() => {
      setAlert(null);
    }, 2500);

  };

  return (
    <div className="flex">

      <AdminSidebar />

      <div className="w-full md:ml-64 p-8">

        <h1 className="text-3xl font-bold mb-6">
          Hero Section
        </h1>

        {alert && (

          <div
            className={`mb-5 rounded p-3 text-sm ${
              alert.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {alert.message}
          </div>

        )}

        <div className="bg-white shadow rounded-lg p-6 max-w-xl">

          <h2 className="font-semibold text-lg mb-4">
            Current Hero Image
          </h2>

          {hero?.hero_image ? (

            <img
              src={hero.hero_image}
              className="w-full h-72 object-cover rounded border"
            />

          ) : (

            <div className="w-full h-72 rounded border bg-gray-100 flex items-center justify-center text-gray-500">
              No Hero Image
            </div>

          )}

          <input
            type="file"
            className="mt-5"
            onChange={(e) =>
              setFile(
                e.target.files?.[0] || null
              )
            }
          />

          <button
            onClick={uploadHero}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded"
          >
            {loading
              ? "Uploading..."
              : "Upload / Replace"}
          </button>

          {hero?.hero_image && (

            <button
              onClick={deleteHero}
              className="w-full mt-3 bg-red-600 hover:bg-red-700 text-white py-3 rounded flex items-center justify-center gap-2"
            >
              <Trash2 size={18} />
              Delete Image
            </button>

          )}

        </div>

      </div>

    </div>
  );
}