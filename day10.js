import React from "react";

// Individual Product Card Component
function ProductCard({ product }) {
  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden w-72 transform transition hover:scale-105">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
        <p className="text-sm text-gray-500 mb-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-green-600">
            ${product.price}
          </span>
          <button className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

// Product List Component
export default function ProductList() {
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      description: "Noise cancelling over-ear headphones.",
      price: 120,
      image: "https://via.placeholder.com/300x200.png?text=Headphones",
    },
    {
      id: 2,
      name: "Smart Watch",
      description: "Fitness tracking with notifications.",
      price: 80,
      image: "https://via.placeholder.com/300x200.png?text=Smart+Watch",
    },
    {
      id: 3,
      name: "Gaming Mouse",
      description: "RGB wireless gaming mouse.",
      price: 45,
      image: "https://via.placeholder.com/300x200.png?text=Gaming+Mouse",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        🛍️ Product List
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
