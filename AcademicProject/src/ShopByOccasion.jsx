// src/Components/ShopByOccasion.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaStar,
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { allProducts } from "./ProductsData";

export default function ShopByOccasion({
  wishlist = [],
  toggleWishlist = () => {},
}) {
  const [selectedCategory, setSelectedCategory] = useState("cotton");
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }
  }, [selectedCategory]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  const productsToShow =
    selectedCategory === "all"
      ? allProducts
      : allProducts.filter(
          (product) => product.category === selectedCategory
        );

  const containerClass =
    selectedCategory === "all"
      ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4"
      : "flex space-x-4 overflow-x-auto scroll-smooth px-8 custom-scrollbar";

  return (
    <div className="w-full bg-white p-6 relative">
      <h2 className="text-2xl font-bold text-center mb-6">
        Shop by Occasion
      </h2>

      {/* CATEGORY BUTTONS (Removed Ritu & All) */}
      <div className="flex gap-3 justify-center mb-6 flex-wrap">
        {["cotton", "banarasi", "wedding"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`h-[40px] px-5 border-2 rounded-md capitalize transition ${
              selectedCategory === cat
                ? "bg-black text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* LEFT SCROLL */}
      {selectedCategory !== "all" && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow z-10"
        >
          <FaChevronLeft />
        </button>
      )}

      {/* PRODUCTS */}
      <div ref={scrollRef} className={containerClass}>
        {productsToShow.length === 0 ? (
          <p className="text-center w-full text-gray-500">
            No products found.
          </p>
        ) : (
          productsToShow.map((product) => (
            <div
              key={product.id}
              className="min-w-[250px] border rounded-xl shadow-sm bg-white p-2 hover:shadow-lg transition-all duration-300"
            >
              <div
                className="relative overflow-hidden rounded-lg h-[300px] cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform hover:scale-110"
                />

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  className="absolute top-2 right-2 bg-white p-2 rounded-full shadow"
                >
                  {wishlist.includes(product.id) ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart />
                  )}
                </button>
              </div>

              <div className="p-2">
                <p className="font-medium">{product.name}</p>
                <p className="text-red-600 font-semibold">
                  ₹{product.finalPrice}
                </p>
                <div className="flex items-center text-yellow-500 text-sm">
                  <FaStar className="mr-1" />
                  {product.rating}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* RIGHT SCROLL */}
      {selectedCategory !== "all" && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow z-10"
        >
          <FaChevronRight />
        </button>
      )}

      {/* VIEW ALL BUTTON (BOTTOM) */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => setSelectedCategory("all")}
          className="px-8 py-3 border border-black rounded-md hover:bg-black hover:text-white transition"
        >
          VIEW ALL
        </button>
      </div>
    </div>
  );
}