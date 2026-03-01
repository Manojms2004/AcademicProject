// src/Components/NeetuLulla.jsx
import React, { useState } from "react";
import ShopByOccasion from "../../ShopByOccasion";

export default function NeetuLulla({ wishlist, toggleWishlist }) {

  const [isAdmin, setIsAdmin] = useState(false);
  const [extraProducts, setExtraProducts] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    img: "",
    price: "",
    category: "neetululla", // 🔥 default category for Neetu
  });

  const ADMIN_PASSWORD = "neetu123"; // 🔐 change if needed

  const handleAdminAccess = () => {
    const enteredPassword = prompt("Enter Designer Password:");
    if (enteredPassword === ADMIN_PASSWORD) {
      setIsAdmin(true);
      alert("Access Granted ✅");
    } else {
      alert("Wrong Password ❌");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddProduct = () => {
    if (!formData.name || !formData.img || !formData.price) {
      alert("Fill all fields");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: formData.name,
      img: formData.img,
      finalPrice: Number(formData.price),
      rating: 4.5,
      reviews: 1,
      category: formData.category,
    };

    setExtraProducts([...extraProducts, newProduct]);

    setFormData({
      name: "",
      img: "",
      price: "",
      category: "neetululla",
    });
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">

      {/* 🔥 DESIGNER IMAGE + ABOUT SECTION */}
      <div className="flex flex-col md:flex-row gap-8 items-start mb-12">

        <div className="w-full md:w-2/6">
          <img
            src="/neetu.png"
            alt="Neetu Lulla"
            className="rounded-2xl shadow-xl border-4 border-gray-200"
          />
        </div>

        <div className="w-full md:w-2/3">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            Neetu Lulla
          </h1>

          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            <b>Neetu Lulla</b> is a celebrated Indian fashion designer known
            for blending contemporary design with traditional elegance.
            Her collections showcase luxurious fabrics, intricate embroidery,
            and timeless bridal couture.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed">
            She has styled for films, celebrities, and grand weddings,
            becoming a global fashion icon in Indian couture.
          </p>

          {/* 🔐 Admin Login */}
          {!isAdmin && (
            <button
              onClick={handleAdminAccess}
              className="mt-6 px-6 py-2 bg-black text-white rounded"
            >
              Designer Login
            </button>
          )}
        </div>
      </div>

      {/* 🔥 ADMIN PRODUCT FORM */}
      {isAdmin && (
        <div className="bg-white p-6 rounded-xl shadow mb-12 space-y-4">

          <h2 className="text-xl font-semibold">
            Add New Product
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="img"
            placeholder="Image URL (example: /nl1.png)"
            value={formData.img}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="cotton">Cotton</option>
            <option value="banarasi">Banarasi</option>
            <option value="wedding">Wedding</option>
            <option value="ritu">Ritu</option>
            <option value="neetululla">Neetu Lulla</option>
          </select>

          <button
            onClick={handleAddProduct}
            className="px-6 py-2 bg-green-600 text-white rounded"
          >
            Add Product
          </button>
        </div>
      )}

      {/* 🔥 COLLECTION SECTION */}
      <ShopByOccasion
        wishlist={wishlist}
        toggleWishlist={toggleWishlist}
        extraProducts={extraProducts}
      />

    </div>
  );
}