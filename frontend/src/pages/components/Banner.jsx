import React from "react";
import { IoMoon, IoHeart, IoShield, IoCheckmarkCircle } from "react-icons/io5";

const Banner = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-800 via-gray-800 to-slate-900 text-white">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-green-500 rounded-full opacity-10 animate-pulse"></div>
        <div
          className="absolute top-32 right-20 w-16 h-16 bg-green-400 rounded-full opacity-20 animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/3 w-12 h-12 bg-green-300 rounded-full opacity-15 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 right-10 w-8 h-8 bg-green-500 rounded-full opacity-25 animate-bounce"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      {/* Floating moon and stars */}
      <div className="absolute top-8 right-8 opacity-30">
        <IoMoon size={40} className="text-green-400 animate-pulse" />
      </div>
      <div className="absolute top-16 right-24 w-2 h-2 bg-green-300 rounded-full opacity-40 animate-twinkle"></div>
      <div
        className="absolute top-12 right-32 w-1 h-1 bg-white rounded-full opacity-60 animate-twinkle"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium border border-green-500/30">
                <IoShield size={16} />
                <span>Professional Sleep Care</span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                <span className="text-white">Put your</span>
                <br />
                <span className="text-green-400 bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">
                  sleep apnea
                </span>
                <br />
                <span className="text-white">to bed.</span>
              </h1>

              <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                Finally get the restful sleep you deserve with our comprehensive
                at-home sleep apnea testing and personalized treatment
                solutions.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 text-gray-200">
                <IoCheckmarkCircle
                  size={20}
                  className="text-green-400 flex-shrink-0"
                />
                <span>At-home testing</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-200">
                <IoCheckmarkCircle
                  size={20}
                  className="text-green-400 flex-shrink-0"
                />
                <span>Expert diagnosis</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-200">
                <IoCheckmarkCircle
                  size={20}
                  className="text-green-400 flex-shrink-0"
                />
                <span>Personalized treatment</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-200">
                <IoCheckmarkCircle
                  size={20}
                  className="text-green-400 flex-shrink-0"
                />
                <span>Better sleep quality</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25">
                Start Your Test Today
              </button>
              <button className="border-2 border-green-600 text-green-400 hover:bg-green-600 hover:text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300">
                Get Started
              </button>
            </div>
          </div>

          {/* Right visual */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-3xl p-8 backdrop-blur-sm border border-green-500/20">
              <div className="text-center space-y-6">
                <div className="relative inline-block">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center shadow-xl">
                    <IoHeart size={64} className="text-white animate-pulse" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-300 rounded-full animate-ping opacity-75"></div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white">
                    Peaceful Sleep Awaits
                  </h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                      <div className="text-2xl font-bold text-green-400">
                        98%
                      </div>
                      <div className="text-xs text-gray-300">Success Rate</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                      <div className="text-2xl font-bold text-green-400">
                        24h
                      </div>
                      <div className="text-xs text-gray-300">Quick Results</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                      <div className="text-2xl font-bold text-green-400">
                        5★
                      </div>
                      <div className="text-xs text-gray-300">
                        Patient Rating
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" className="w-full h-12 fill-green-500/10">
          <path d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,200L1392,200C1344,200,1248,200,1152,200C1056,200,960,200,864,200C768,200,672,200,576,200C480,200,384,200,288,200C192,200,96,200,48,200L0,200Z"></path>
        </svg>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Banner;
