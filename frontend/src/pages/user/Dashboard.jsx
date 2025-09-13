import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "../../context/CartContext";

const Dashboard = () => {
  const [chips, setChips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const token = localStorage.getItem("admintoken");

  // Fetch all chips
  const fetchChipsData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API}/api/v1/chips/get-all-chips`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data?.success) {
        setChips(data?.chips);
      }
    } catch (error) {
      console.error("Error fetching chips:", error);
      toast.error("Failed to fetch chips data");
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort chips
  const getFilteredAndSortedChips = () => {
    let filteredChips = chips;

    if (filter === "active") {
      filteredChips = chips.filter((chip) => chip.status === 0);
    } else if (filter === "inactive") {
      filteredChips = chips.filter((chip) => chip.status === 1);
    }

    return filteredChips.sort((a, b) => {
      if (sortBy === "name") return a.title.localeCompare(b.title);
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "priceDesc") return b.price - a.price;
      return 0;
    });
  };

  useEffect(() => {
    fetchChipsData();
  }, []);

  const filteredChips = getFilteredAndSortedChips();
  const { cart, setCart } = useCart();
  const handleAddToCart = (product) => {
    // Check if the product already exists in the cart
    const productExists = cart.some((item) => item._id === product._id);

    if (productExists) {
      toast("Chip already present in cart");
    } else {
      // Add the product to the cart
      const updatedCart = [...cart, { ...product, quantity: 1 }]; // Set initial quantity to 1 for new product
      setCart(updatedCart); // Update the cart state
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save the updated cart to localStorage
      toast("Chip added to cart");
    }
  };
  return (
    <>
      <Navbar />
      <div className="mt-8"></div>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Hero Section */}

        <div className="nav-pd mx-auto px-4 py-12">
          {/* Filter and Sort Controls */}
          <div className="mb-10 bg-white rounded-2xl shadow-lg p-6 backdrop-blur-sm border border-white/20">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex flex-wrap gap-3">
                <span className="text-gray-700   flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                  Filter:
                </span>
                {["all", "active", "inactive"].map((filterOption) => (
                  <button
                    key={filterOption}
                    onClick={() => setFilter(filterOption)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                      filter === filterOption
                        ? "bg-green-600 text-white shadow-lg"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {filterOption.charAt(0).toUpperCase() +
                      filterOption.slice(1)}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-gray-700   flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 5a2 2 0 012-2h4a2 2 0 012 2v0H8v0z"
                    />
                  </svg>
                  Sort by:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="name">Name</option>
                  <option value="price">Price: Low to High</option>
                  <option value="priceDesc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                  <Skeleton className="w-full h-64" />
                  <div className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-3" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3 mb-4" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Chips Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredChips.length > 0 ? (
              filteredChips.map((chip, index) => (
                <div
                  key={chip._id}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500  hover:shadow-xl hover:-translate-y-1 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={chip.image}
                      alt={chip.title}
                      className="w-full h-45 object-fit transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 right-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm ${
                          chip.status === 0
                            ? "bg-green-500/90 text-white"
                            : "bg-red-500/90 text-white"
                        }`}
                      >
                        {chip.status === 0 ? "✓ Active" : "✗ Inactive"}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h2 className="text-xl font-bold text-gray-800   group-hover:text-green-600 transition-colors duration-300">
                      {chip.title}
                    </h2>

                    <div className="flex justify-between items-center mb-2">
                      <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                        ${chip.price.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleAddToCart(chip)}
                        className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 text-white py-2 px-2 rounded-xl   "
                      >
                        Add to Cart
                      </button>
                      <button className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 text-white py-2 px-2 rounded-xl   ">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <div className="max-w-md mx-auto">
                  <svg
                    className="w-24 h-24 mx-auto text-gray-300 mb-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 009.586 13H7"
                    />
                  </svg>
                  <h3 className="text-xl   text-gray-600 mb-2">
                    No chips found
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your filters to see more results.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.3s both;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out both;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};

export default Dashboard;
