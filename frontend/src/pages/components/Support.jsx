import { CheckCircle, Clock, Shield, PackageCheck } from "lucide-react";
import SuppImg from "../../assets/images/support.webp";

const Support = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-green-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content Left */}
          <div className="space-y-6 lg:space-y-8 order-2 lg:order-1">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">
                Follow-Up Support <br />
                <span className="text-gray-600">
                  tailored to your treatment
                </span>
              </h2>
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
                Stick with your treatment with personalized support and
                supplies. Our team of experts will help track your progress and
                provide tips to make the transition smooth.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                If you're struggling with your treatment, we’ll help you adjust.
                And when you need more supplies, you can order them directly
                from our site.
              </p>
            </div>

            {/* Support Features with Icons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
              <div className="flex items-start gap-3">
                <div className="bg-green-100 text-green-600 p-2 rounded-full">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">
                    Expert Progress Tracking
                  </h4>
                  <p className="text-sm text-gray-600">
                    Our team monitors your journey and supports adjustments.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-gray-800 text-white p-2 rounded-full">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">24/7 Help</h4>
                  <p className="text-sm text-gray-600">
                    We're always available when you need assistance.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">
                    Secure Support
                  </h4>
                  <p className="text-sm text-gray-600">
                    Your data and health are always safe with us.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-yellow-100 text-yellow-600 p-2 rounded-full">
                  <PackageCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">
                    Easy Reordering
                  </h4>
                  <p className="text-sm text-gray-600">
                    Need more supplies? Order them anytime from your dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Image Right Side */}
          <div className="relative order-1 lg:order-2 rounded-lg">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl h-64 sm:h-80 lg:h-96 flex items-center justify-center border-none animate-float">
              <img
                className="w-full h-full object-cover rounded-xl"
                src={SuppImg}
                alt="Follow Up Support"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
