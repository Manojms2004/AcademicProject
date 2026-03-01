// src/Components/ProductPage.jsx
import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { allProducts } from "./ProductsData";
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa";

export default function ProductPage({ wishlist = [], toggleWishlist }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 Merge static + dynamically added products
  const mergedProducts = [
    ...allProducts,
    ...(location.state?.extraProducts || []),
  ];

  const product = mergedProducts.find(
    (p) => p.id === parseInt(id)
  );

  if (!product)
    return <div className="p-6 text-center">Product not found</div>;

  const relatedProducts = mergedProducts
    .filter(
      (p) =>
        p.category === product.category &&
        p.id !== product.id
    )
    .slice(0, 4);

  const formatPrice = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  /* ===== WhatsApp ===== */
  const defaultNumber = "919876543210";

  const whatsappMessage = `
Hello,

I would like to request a change for:

Product Name: ${product.name}
Category: ${product.category}
Price: ₹${product.finalPrice}
Rating: ${product.rating}⭐

Thank you.
`;

  const whatsappLink = `https://wa.me/${defaultNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <div className="bg-gray-100 min-h-screen p-6">

      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
      >
        ← Go Back
      </button>

      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-md flex flex-col md:flex-row gap-10">

        {/* IMAGE */}
        <div className="md:w-2/5 relative">
          <img
            src={product.img}
            alt={product.name}
            className="w-full rounded-xl shadow-lg"
          />

          <button
            onClick={() => toggleWishlist(product.id)}
            className="absolute top-4 right-4 bg-white p-3 rounded-full shadow"
          >
            {wishlist.includes(product.id) ? (
              <FaHeart className="text-red-500 text-lg" />
            ) : (
              <FaRegHeart className="text-lg" />
            )}
          </button>
        </div>

        {/* DETAILS */}
        <div className="md:w-3/5 space-y-5">

          <h1 className="text-3xl font-bold text-gray-900">
            {product.name}
          </h1>

          <div className="flex items-center gap-3">
            <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
              <FaStar />
              {product.rating}
            </span>
            <span className="text-gray-500 text-sm">
              ({product.reviews} reviews)
            </span>
          </div>

          <div className="space-y-1">
            <div className="text-3xl font-semibold text-gray-900">
              {formatPrice(product.finalPrice)}
            </div>

            {product.oldPrice && (
              <div className="flex items-center gap-3">
                <span className="line-through text-gray-500">
                  {formatPrice(product.oldPrice)}
                </span>
                <span className="text-green-600 font-medium">
                  {product.discount}
                </span>
              </div>
            )}
          </div>

          <div className="flex gap-4 mt-4">

            <button
              onClick={() =>
                navigate("/checkout", { state: { product } })
              }
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-lg font-semibold transition"
            >
              Buy Now
            </button>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Request Change
            </a>

          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <div className="max-w-6xl mx-auto mt-14">
        <h2 className="text-2xl font-bold mb-6">
          Related Products
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map((relProd) => (
            <div
              key={relProd.id}
              onClick={() =>
                navigate(`/product/${relProd.id}`, {
                  state: { extraProducts: location.state?.extraProducts },
                })
              }
              className="cursor-pointer bg-white rounded-xl p-3 shadow hover:shadow-lg transition"
            >
              <img
                src={relProd.img}
                alt={relProd.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <p className="mt-3 text-sm font-medium">
                {relProd.name}
              </p>
              <p className="text-red-600 font-semibold">
                {formatPrice(relProd.finalPrice)}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}