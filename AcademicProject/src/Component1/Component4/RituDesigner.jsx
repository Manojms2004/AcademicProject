// src/Components/RituDesigner.jsx
import React from "react";
import ShopByOccasion from "../../ShopByOccasion";

export default function RituDesigner({ wishlist, toggleWishlist }) {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Ritu Designer</h1>

      <div className="flex flex-col md:flex-row items-start">
        {/* Designer Image */}
        <div className="w-full md:w-2/6">
          <img
            src="/rd.png"
            alt="Ritu Designer"
            className="h-180 rounded-2xl shadow-xl border-4 border-gray-200"
          />
        </div>

        {/* Designer Bio */}
        <div className="w-full md:w-2/3 p-6">
          <p className="text-lg leading-relaxed text-gray-700 mb-4">
            <b><span className="text-4xl">R</span>itu Designer</b> is a celebrated Indian fashion designer known for blending contemporary design with traditional motifs. Her creations showcase vibrant colours, innovative drapes, and elegant silhouettes.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            She emphasizes sustainability, empowering artisan communities, and creating timeless collections that resonate globally.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Ritu Designer’s signature lies in her modern reinterpretation of classic sarees and fusion wear, celebrated in fashion editorials and red-carpet events.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed">
            Today, she is considered a cultural fashion icon, influencing contemporary Indian couture.
          </p>
        </div>
      </div>

      {/* Shop by Occasion Section */}
      <ShopByOccasion wishlist={wishlist} toggleWishlist={toggleWishlist} />
    </div>
  );
}