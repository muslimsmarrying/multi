import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import { RxCross2 } from "react-icons/rx";
import { useCart } from "../../context/CartContext";
import { FaMinus, FaPlus, FaTruck, FaCreditCard } from "react-icons/fa6";
import { HiOutlineShoppingBag } from "react-icons/hi2";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, setCart } = useCart();

  const [showShippingForm, setShowShippingForm] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    postalCode: "",
    city: "",
    state: "",
    country: "",
  });

  // Helper functions
  const getValidPrice = (price) => (isNaN(price) ? 0 : parseFloat(price));
  const getValidQuantity = (quantity) =>
    isNaN(quantity) || quantity < 1 ? 1 : parseInt(quantity);
  const getProductTotal = (product) =>
    getValidPrice(product.price) * getValidQuantity(product.quantity);
  const getCartTotal = () =>
    cart.reduce((sum, product) => sum + getProductTotal(product), 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setShowPaymentForm(true);
  };

  const handlePaymentSuccess = async (e) => {
    e.preventDefault();
    toast.success("Payment successful");
  };

  return (
    <>
      <Navbar />
      <div className="mt-top"></div>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          {showPaymentForm ? (
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
              <div className="text-center mb-6">
                <FaCreditCard className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800">Payment</h2>
                <p className="text-gray-600">
                  Total Amount: ${getCartTotal().toFixed(2)}
                </p>
              </div>
              {/* Add your payment component here */}
              <button
                onClick={handlePaymentSuccess}
                className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-4 rounded-xl font-semibold hover:from-green-700 hover:to-green-600 transition-all duration-300"
              >
                Complete Payment
              </button>
            </div>
          ) : showShippingForm ? (
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <FaTruck className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Shipping Information
                </h2>
                <p className="text-gray-600">
                  Please provide your delivery details
                </p>
              </div>

              <form onSubmit={handleShippingSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={shippingInfo.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={shippingInfo.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Enter your phone number"
                      value={shippingInfo.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      placeholder="Enter your city"
                      value={shippingInfo.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      placeholder="Enter your state"
                      value={shippingInfo.state}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      placeholder="Enter postal code"
                      value={shippingInfo.postalCode}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Country *
                    </label>
                    <input
                      type="text"
                      name="country"
                      placeholder="Enter your country"
                      value={shippingInfo.country}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Full Address *
                  </label>
                  <textarea
                    name="address"
                    placeholder="Enter your complete address"
                    value={shippingInfo.address}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 text-white py-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105"
                >
                  Continue to Payment
                </button>
              </form>
            </div>
          ) : cart.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <div className="flex items-center mb-8">
                    <HiOutlineShoppingBag className="w-8 h-8 text-indigo-600 mr-3" />
                    <div>
                      <h1 className="text-3xl font-bold text-gray-800">
                        Shopping Bag
                      </h1>
                      <p className="text-gray-600">
                        {cart.length} {cart.length === 1 ? "item" : "items"} in
                        your bag
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {cart.map((chip, index) => (
                      <div
                        key={chip._id}
                        className="flex flex-col sm:flex-row gap-4 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="relative">
                          <img
                            src={chip.image}
                            alt={chip.title}
                            className="w-32 h-32 sm:w-28 sm:h-28 object-cover rounded-xl shadow-md"
                          />
                          <button
                            onClick={() => removeFromCart(chip._id)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors duration-200 shadow-lg"
                          >
                            <RxCross2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex-1 space-y-3">
                          <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-1">
                              {chip.title}
                            </h3>
                            <p className="text-gray-600 text-sm line-clamp-2">
                              {chip.description}
                            </p>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                              ${getValidPrice(chip.price).toFixed(2)}
                            </div>

                            <div className="flex items-center gap-4">
                              <div className="flex items-center bg-white rounded-xl border border-gray-200 shadow-sm">
                                <button
                                  onClick={() =>
                                    updateQuantity(chip._id, "decrease")
                                  }
                                  className="p-3 hover:bg-gray-100 rounded-l-xl transition-colors duration-200"
                                >
                                  <FaMinus className="w-3 h-3 text-gray-600" />
                                </button>
                                <span className="px-4 py-3 font-bold text-gray-800 min-w-[3rem] text-center">
                                  {getValidQuantity(chip.quantity)}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(chip._id, "increase")
                                  }
                                  className="p-3 hover:bg-gray-100 rounded-r-xl transition-colors duration-200"
                                >
                                  <FaPlus className="w-3 h-3 text-gray-600" />
                                </button>
                              </div>

                              <div className="text-right">
                                <p className="text-sm text-gray-500">
                                  Subtotal
                                </p>
                                <p className="text-xl font-bold text-gray-800">
                                  ${getProductTotal(chip).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>
                        Subtotal ({cart.length}{" "}
                        {cart.length === 1 ? "item" : "items"})
                      </span>
                      <span>${getCartTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span className="text-green-600 font-semibold">Free</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Tax</span>
                      <span>$0.00</span>
                    </div>
                    <hr className="border-gray-200" />
                    <div className="flex justify-between text-xl font-bold text-gray-800">
                      <span>Total</span>
                      <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                        ${getCartTotal().toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowShippingForm(true)}
                    className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 text-white py-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Proceed to Checkout
                  </button>

                  <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                    <div className="flex items-center text-sm text-gray-600">
                      <FaTruck className="w-4 h-4 mr-2 text-indigo-600" />
                      <span>Free shipping on all orders</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md mx-auto">
                <img
                  src={EmptyCart}
                  alt="Empty cart"
                  className="w-32 h-32 mx-auto mb-8 opacity-80"
                />
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                  Your cart is empty
                </h1>
                <p className="text-gray-600 mb-8">
                  Looks like you haven't added any chips to your cart yet.
                </p>
                <Link
                  to="/products"
                  className="inline-block bg-gradient-to-r from-indigo-600 to-indigo-500 text-white py-4 px-8 rounded-xl font-semibold hover:from-indigo-700 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Shop Chips
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out both;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};

export default Cart;
