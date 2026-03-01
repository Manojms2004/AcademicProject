// src/Components/RohitBal.jsx
import React, { useState } from "react";
import ShopByOccasion from "../../ShopByOccasion";

export default function RohitBal({ wishlist, toggleWishlist }) {

  const [isAdmin, setIsAdmin] = useState(false);
  const [extraProducts, setExtraProducts] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    img: "",
    price: "",
    category: "rohitbal", // 🔥 default category for Rohit Bal
  });

  const ADMIN_PASSWORD = "rohit123"; // 🔐 Change if needed

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
      rating: 4.7,
      reviews: 1,
      category: formData.category,
    };

    setExtraProducts([...extraProducts, newProduct]);

    setFormData({
      name: "",
      img: "",
      price: "",
      category: "rohitbal",
    });
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">

      {/* 🔥 DESIGNER IMAGE + ABOUT SECTION */}
      <div className="flex flex-col md:flex-row gap-8 items-start mb-12">

        <div className="w-full md:w-2/6">
          <img
            src="/rohit.png"
            alt="Rohit Bal"
            className="rounded-2xl shadow-xl border-4 border-gray-200"
          />
        </div>

        <div className="w-full md:w-2/3">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            Rohit Bal
          </h1>

          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            <b>Rohit Bal</b> is a renowned Indian fashion designer celebrated
            for his opulent designs and luxurious craftsmanship.
            His collections beautifully combine traditional Indian aesthetics
            with contemporary silhouettes.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed">
            Known for intricate embroidery, rich fabrics, and royal themes,
            his creations are often inspired by India’s cultural heritage
            and timeless elegance.
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
            placeholder="Image URL (example: /rb1.png)"
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
            <option value="rohitbal">Rohit Bal</option>
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