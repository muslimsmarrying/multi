import React from "react";
import { CheckCircle, Clock, Home, Shield } from "lucide-react";
import EvaImage from "../../assets/images/evalaution.webp";
const Evaluation = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-green-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content Side */}
          <div className="space-y-6 lg:space-y-8 order-2 lg:order-1">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">
                Easy and comfortable to get started
                <span className="text-gray-600"> at home</span>
              </h2>
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
                The first step to better sleep is a diagnosis. We perform a
                clinical evaluation without you stepping foot in a clinic.
              </p>
            </div>

            {/* Process Steps */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Quick Online Assessment
                  </h3>
                  <p className="text-gray-600">
                    Start with our comprehensive online evaluation from the
                    comfort of your home.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Home Sleep Study
                  </h3>
                  <p className="text-gray-600">
                    Receive professional sleep monitoring equipment delivered to
                    your door.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Virtual Clinical Review
                  </h3>
                  <p className="text-gray-600">
                    Our clinicians analyze your results remotely with the same
                    accuracy as in-person visits.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Image Side */}
          <div className="relative order-1 lg:order-2 rounded-lg">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl   h-64 sm:h-80 lg:h-96 flex items-center justify-center border-none">
              <img
                className="w-full h-full object-cover rounded-xl animate-image"
                src={EvaImage}
                alt=""
              />
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-gray-800 text-white rounded-full p-3 shadow-lg">
              <Clock className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Evaluation;
