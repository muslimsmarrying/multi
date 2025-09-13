import { Link } from "react-router-dom";
import {
  BedDouble,
  Stethoscope,
  ArrowRightCircle,
  Clock,
  Shield,
  CheckCircle,
  Moon,
  Heart,
  Brain,
  Users,
  Timer,
  Award,
} from "lucide-react";

const Find = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-green-50 py-20 px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-7xl mx-auto text-gray-800">
        {/* Main Heading Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-[#00aa63]/10 rounded-full mb-6">
            <Moon className="w-8 h-8 text-[#00aa63]" />
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Find out if you have sleep apnea from the comfort of your own bed
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Expert care without setting foot in the doctor's office. Our
            comprehensive guided online assessment helps identify symptoms of
            sleep apnea quickly and privately — all from the comfort of your
            home.
          </p>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-100">
              <div className="text-3xl font-bold text-[#00aa63] mb-2">22M+</div>
              <div className="text-sm text-gray-600">
                Americans affected by sleep apnea
              </div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-100">
              <div className="text-3xl font-bold text-[#00aa63] mb-2">80%</div>
              <div className="text-sm text-gray-600">
                Cases remain undiagnosed
              </div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-100">
              <div className="text-3xl font-bold text-[#00aa63] mb-2">
                5 min
              </div>
              <div className="text-sm text-gray-600">Quick assessment time</div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="bg-[#00aa63]/10 text-[#00aa63] p-4 rounded-full w-fit mb-4">
              <BedDouble className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-xl text-gray-800 mb-3">
              At-Home Evaluation
            </h4>
            <p className="text-gray-600 leading-relaxed">
              No travel, no stress, no waiting rooms. Everything starts from
              your bedroom with our user-friendly digital assessment tool.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="bg-[#00aa63]/10 text-[#00aa63] p-4 rounded-full w-fit mb-4">
              <Stethoscope className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-xl text-gray-800 mb-3">
              Expert Insights
            </h4>
            <p className="text-gray-600 leading-relaxed">
              Developed and reviewed by board-certified sleep medicine
              specialists and pulmonologists with years of experience.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="bg-[#00aa63]/10 text-[#00aa63] p-4 rounded-full w-fit mb-4">
              <Clock className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-xl text-gray-800 mb-3">
              Quick & Easy
            </h4>
            <p className="text-gray-600 leading-relaxed">
              Complete our comprehensive assessment in just 5 minutes. Get
              instant results and personalized recommendations.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="bg-[#00aa63]/10 text-[#00aa63] p-4 rounded-full w-fit mb-4">
              <Shield className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-xl text-gray-800 mb-3">
              100% Private
            </h4>
            <p className="text-gray-600 leading-relaxed">
              Your health information is completely confidential and secure.
              HIPAA-compliant platform with end-to-end encryption.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="bg-[#00aa63]/10 text-[#00aa63] p-4 rounded-full w-fit mb-4">
              <Brain className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-xl text-gray-800 mb-3">
              AI-Powered Analysis
            </h4>
            <p className="text-gray-600 leading-relaxed">
              Advanced algorithms analyze your responses against thousands of
              verified sleep study results for accurate insights.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="bg-[#00aa63]/10 text-[#00aa63] p-4 rounded-full w-fit mb-4">
              <Heart className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-xl text-gray-800 mb-3">
              Health Monitoring
            </h4>
            <p className="text-gray-600 leading-relaxed">
              Track your sleep quality, symptoms, and overall health metrics to
              monitor improvements over time.
            </p>
          </div>
        </div>

        {/* What You'll Get Section */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 mb-16 border border-gray-100">
          <div className="text-center mb-8">
            <Award className="w-12 h-12 text-[#00aa63] mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              What You'll Get
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our comprehensive assessment provides you with detailed insights
              and actionable next steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="bg-[#00aa63]/10 text-[#00aa63] p-2 rounded-full">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-semibold text-gray-800 mb-1">
                  Personalized Risk Assessment
                </h5>
                <p className="text-sm text-gray-600">
                  Detailed analysis of your sleep apnea risk level
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-[#00aa63]/10 text-[#00aa63] p-2 rounded-full">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-semibold text-gray-800 mb-1">
                  Symptom Analysis Report
                </h5>
                <p className="text-sm text-gray-600">
                  Comprehensive breakdown of your symptoms
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-[#00aa63]/10 text-[#00aa63] p-2 rounded-full">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-semibold text-gray-800 mb-1">
                  Next Steps Guidance
                </h5>
                <p className="text-sm text-gray-600">
                  Clear recommendations for follow-up care
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-[#00aa63]/10 text-[#00aa63] p-2 rounded-full">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-semibold text-gray-800 mb-1">
                  Doctor Discussion Guide
                </h5>
                <p className="text-sm text-gray-600">
                  Prepared questions and information for your physician
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <Timer className="w-12 h-12 text-[#00aa63] mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              How It Works
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Simple 3-step process to get your personalized sleep apnea
              assessment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-[#00aa63]/10 text-[#00aa63] p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h4 className="font-bold text-xl text-gray-800 mb-3">
                Answer Questions
              </h4>
              <p className="text-gray-600">
                Complete our scientifically-designed questionnaire about your
                sleep habits and symptoms
              </p>
            </div>

            <div className="text-center">
              <div className="bg-[#00aa63]/10 text-[#00aa63] p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h4 className="font-bold text-xl text-gray-800 mb-3">
                Get Analysis
              </h4>
              <p className="text-gray-600">
                Our AI system analyzes your responses using validated sleep
                medicine criteria
              </p>
            </div>

            <div className="text-center">
              <div className="bg-[#00aa63]/10 text-[#00aa63] p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h4 className="font-bold text-xl text-gray-800 mb-3">
                Receive Results
              </h4>
              <p className="text-gray-600">
                Get your personalized report with recommendations and next steps
              </p>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 mb-16 border border-gray-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <Users className="w-8 h-8 text-[#00aa63]" />
              <div>
                <div className="font-bold text-2xl text-gray-800">50,000+</div>
                <div className="text-sm text-gray-600">People assessed</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Award className="w-8 h-8 text-[#00aa63]" />
              <div>
                <div className="font-bold text-2xl text-gray-800">95%</div>
                <div className="text-sm text-gray-600">Accuracy rate</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Shield className="w-8 h-8 text-[#00aa63]" />
              <div>
                <div className="font-bold text-2xl text-gray-800">HIPAA</div>
                <div className="text-sm text-gray-600">Compliant</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-[#00aa63] to-[#009257] rounded-2xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">
            Take Control of Your Sleep Health Today
          </h3>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Don't let sleep apnea go undiagnosed. Start your journey to better
            sleep and improved health.
          </p>
          <Link
            to="/take-quiz"
            className="inline-flex items-center px-8 py-4 bg-white text-[#00aa63] font-bold text-lg rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Take Sleep Quiz
            <ArrowRightCircle className="ml-3 w-6 h-6" />
          </Link>
          <p className="text-sm mt-4 opacity-75">
            ✓ Free assessment ✓ Instant results ✓ No appointment needed
          </p>
        </div>
      </div>
    </div>
  );
};

export default Find;
