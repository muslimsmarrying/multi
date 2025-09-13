import React, { useState } from "react";
import {
  Moon,
  Heart,
  Shield,
  Award,
  Clock,
  Star,
  CheckCircle,
  Lightbulb,
  Target,
  TrendingUp,
  BookOpen,
  Stethoscope,
  Brain,
} from "lucide-react";

const About = () => {
  const [activeTab, setActiveTab] = useState("mission");

  const teamMembers = [
    {
      id: 1,
      name: "Dr. Sarah Mitchell",
      role: "Chief Sleep Specialist",
      credentials: "MD, Sleep Medicine Board Certified",
      experience: "15+ years",
      specialization: "Chronic Insomnia & Sleep Anxiety",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
      bio: "Leading expert in cognitive behavioral therapy for insomnia with over 10,000 patients helped.",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      role: "Behavioral Sleep Therapist",
      credentials: "PhD Psychology, CBT-I Certified",
      experience: "12+ years",
      specialization: "Sleep Psychology & Behavioral Change",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
      bio: "Pioneered natural sleep restoration techniques used by thousands worldwide.",
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Sleep Wellness Coach",
      credentials: "Certified Sleep Coach, Mindfulness Expert",
      experience: "8+ years",
      specialization: "Holistic Sleep Improvement",
      image:
        "https://images.unsplash.com/photo-1594824388838-c0d6e3b9cbd3?w=400&h=400&fit=crop&crop=face",
      bio: "Specializes in creating personalized sleep routines that fit busy lifestyles.",
    },
  ];

  const values = [
    {
      icon: Heart,
      title: "Compassionate Care",
      description:
        "We understand the frustration of sleepless nights and approach every client with empathy and understanding.",
    },
    {
      icon: Shield,
      title: "Natural Solutions",
      description:
        "We believe in drug-free, sustainable approaches that work with your body's natural sleep mechanisms.",
    },
    {
      icon: Target,
      title: "Personalized Approach",
      description:
        "Every sleep journey is unique. We create customized plans tailored to your specific needs and lifestyle.",
    },
    {
      icon: TrendingUp,
      title: "Proven Results",
      description:
        "Our evidence-based methods have helped over 25,000 people reclaim their nights and transform their days.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32">
            <Moon className="w-full h-full text-green-600" />
          </div>
          <div className="absolute bottom-20 right-20 w-24 h-24">
            <Star className="w-full h-full text-green-600" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Moon className="w-10 h-10 text-green-600 mr-4" />
                <h1 className="text-5xl md:text-6xl font-bold text-gray-800">
                  About Curesleep
                </h1>
              </div>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                We're not just another sleep clinic. We're your partners in
                reclaiming the restful nights you deserve. Founded by sleep
                specialists who understand the profound impact of quality sleep
                on every aspect of life.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center p-4 bg-white rounded-xl shadow-lg">
                  <div className="text-3xl font-bold text-green-600">
                    25,000+
                  </div>
                  <div className="text-gray-600">Lives Transformed</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-lg">
                  <div className="text-3xl font-bold text-green-600">94%</div>
                  <div className="text-gray-600">Success Rate</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-lg">
                  <div className="text-3xl font-bold text-green-600">6+</div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-lg">
                  <div className="text-3xl font-bold text-green-600">24/7</div>
                  <div className="text-gray-600">Support Available</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&h=400&fit=crop"
                  alt="Peaceful bedroom with natural lighting"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">
                    Creating Peaceful Sleep Environments
                  </h3>
                  <p className="text-sm opacity-90">
                    Where science meets serenity
                  </p>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-green-600 text-white p-4 rounded-xl shadow-lg">
                <Award className="w-8 h-8 mb-2" />
                <div className="text-sm font-semibold">Certified</div>
                <div className="text-xs">Sleep Specialists</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Tabs Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Story</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From personal struggles with insomnia to helping thousands find
              peaceful sleep
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center mb-12 bg-gray-100 rounded-2xl p-2">
            {[
              { id: "mission", label: "Our Mission", icon: Target },
              { id: "story", label: "Our Story", icon: BookOpen },
              { id: "approach", label: "Our Approach", icon: Lightbulb },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all m-1 ${
                  activeTab === tab.id
                    ? "bg-green-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-white hover:shadow-md"
                }`}
              >
                <tab.icon className="w-5 h-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-100">
            {activeTab === "mission" && (
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Transforming Lives Through Better Sleep
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Our mission is simple yet profound: to end the epidemic of
                    sleeplessness that affects millions. We believe everyone
                    deserves the restorative power of quality sleep, and we're
                    dedicated to making that a reality.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-gray-700">
                        Provide personalized, natural sleep solutions
                      </span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-gray-700">
                        Support every step of your sleep journey
                      </span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      <span className="text-gray-700">
                        Create lasting, sustainable sleep habits
                      </span>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=350&fit=crop"
                    alt="Team mission meeting"
                    className="rounded-xl shadow-lg w-full"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-green-600 text-white p-4 rounded-xl shadow-lg">
                    <div className="text-2xl font-bold">25K+</div>
                    <div className="text-sm">Lives Changed</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "story" && (
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=350&fit=crop"
                    alt="Founder's personal journey"
                    className="rounded-xl shadow-lg w-full"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur p-3 rounded-lg">
                    <div className="text-sm font-semibold text-gray-800">
                      2018
                    </div>
                    <div className="text-xs text-gray-600">Our Beginning</div>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Born from Personal Experience
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    SleepWell was founded by Dr. Sarah Mitchell after her own
                    three-year battle with chronic insomnia. Traditional
                    treatments failed, but through innovative natural
                    approaches, she found her path back to peaceful sleep.
                  </p>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Determined to help others avoid the same struggle, she
                    assembled a team of sleep specialists, psychologists, and
                    wellness coaches to create a comprehensive, compassionate
                    approach to sleep restoration.
                  </p>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-green-800 italic">
                      "I know what it's like to lie awake at 3 AM, exhausted but
                      unable to sleep. That's why every program we create comes
                      from a place of genuine understanding."
                    </p>
                    <p className="text-green-700 text-sm mt-2">
                      - Dr. Sarah Mitchell, Founder
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "approach" && (
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Science-Based, Naturally Focused
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Our approach combines cutting-edge sleep science with
                    time-tested natural techniques. We don't believe in
                    one-size-fits-all solutions or dependency-creating
                    medications.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Brain className="w-6 h-6 text-green-600 mr-3 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          Cognitive Behavioral Therapy
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Restructuring thoughts and behaviors around sleep
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Heart className="w-6 h-6 text-green-600 mr-3 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          Mindfulness & Relaxation
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Teaching your body and mind to naturally wind down
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Clock className="w-6 h-6 text-green-600 mr-3 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          Sleep Hygiene Optimization
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Creating the perfect environment and routine for rest
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=350&fit=crop"
                    alt="Scientific approach to sleep"
                    className="rounded-xl shadow-lg w-full"
                  />
                  <div className="absolute -top-4 -left-4 bg-white p-4 rounded-xl shadow-lg">
                    <Stethoscope className="w-8 h-8 text-green-600 mb-2" />
                    <div className="text-sm font-semibold text-gray-800">
                      Evidence-Based
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Meet Our Sleep Experts
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our team of certified specialists brings decades of experience and
              genuine passion for helping you sleep better
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-green-100"
                  />
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {member.experience}
                  </div>
                </div>

                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-green-600 font-semibold mb-2">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm mb-2">
                    {member.credentials}
                  </p>
                  <p className="text-green-700 text-sm font-medium">
                    {member.specialization}
                  </p>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.bio}
                </p>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-center">
                    <div className="flex items-center text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 text-center mt-1">
                    Patient satisfaction rating
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do in helping you achieve
              better sleep
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
