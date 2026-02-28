// src/Components/ProductPage.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { allProducts } from "./ProductsData";
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa";

export default function ProductPage({ wishlist, toggleWishlist }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = allProducts.find((p) => p.id === parseInt(id));
  if (!product) return <div className="p-6">Product not found</div>;

  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-200 rounded"
      >
        Go Back
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/5 relative">
          <img
            src={product.img}
            alt={product.name}
            className="w-full rounded-lg shadow-lg"
          />
          <button
            onClick={() => toggleWishlist(product.id)}
            className="absolute top-2 right-2 bg-white p-2 rounded-full shadow"
          >
            {wishlist.includes(product.id) ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart />
            )}
          </button>
        </div>

        <div className="md:w-3/5 space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <div className="flex items-center gap-2">
            <span className="bg-green-600 text-white px-2 py-1 rounded text-sm flex items-center">
              <FaStar className="mr-1" />
              {product.rating}
            </span>
            <span className="text-gray-500 text-sm">
              ({product.reviews} reviews)
            </span>
          </div>

          <p className="text-2xl font-semibold text-gray-800">
            ₹{product.finalPrice}
          </p>

          <div className="flex gap-4 mt-6">
            <button
              onClick={() => navigate("/checkout", { state: { product } })}
              className="px-6 py-3 bg-green-600 text-white rounded"
            >
              Buy Now
            </button>

            <button
              onClick={() => toggleWishlist(product.id)}
              className="px-6 py-3 bg-blue-600 text-white rounded"
            >
              {wishlist.includes(product.id)
                ? "Remove from Wishlist"
                : "Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {relatedProducts.map((relProd) => (
            <div
              key={relProd.id}
              onClick={() => navigate(`/product/${relProd.id}`)}
              className="cursor-pointer border rounded-lg p-2 hover:shadow-lg transition"
            >
              <img
                src={relProd.img}
                alt={relProd.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <p className="mt-2 text-sm font-medium">{relProd.name}</p>
              <p className="text-red-600 font-semibold">
                ₹{relProd.finalPrice}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}