import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { RiVerifiedBadgeFill } from "react-icons/ri";

const SleepQuiz = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    snoreLoudly: "",
    snoreLoudness: "",
    tiredDuringDay: "",
    tirednessLevel: "",
    breathingStopped: "",
    gender: "",
    highBloodPressure: "",
    heightFeet: "",
    heightInches: "",
    weight: "",
    birthMonth: "",
    birthDay: "",
    birthYear: "",
    sleepStudyExclusions: [],
    additionalDescriptions: [],
    additionalNotes: "",
  });
  const [completed, setCompleted] = useState(false);

  const questions = [
    {
      id: 1,
      question: "1. Do you snore loudly?",

      type: "yesno",
    },
    {
      id: 2,
      question: "2. Are you tired during the day?",

      type: "yesno",
    },
    {
      id: 3,
      question:
        "3. Has anyone observed you stop breathing, or struggle to breath while sleeping?",

      type: "yesno",
      field: "breathingStopped",
    },
    {
      id: 4,
      question: "4. Are you ?",
      type: "gender",
      field: "gender",
      options: ["Female", "Male"],
    },
    {
      id: 5,
      question:
        "5. Have you been diagnosed with high blood pressure (hypertension)?",

      type: "yesno",
      field: "highBloodPressure",
    },
    {
      id: 6,
      question: "6. How tall are you?",
      type: "height",
      fields: [
        { name: "heightFeet", label: "FEET", required: true },
        { name: "heightInches", label: "INCHES", required: false },
      ],
    },
    {
      id: 7,
      question: "7. How much do you weigh?",
      type: "weight",
      field: "weight",
      label: "LBS",
      required: true,
    },
    {
      id: 8,
      question: "8. What is your date of birth?",
      type: "date",
      fields: [
        { name: "birthMonth", label: "MM", required: true },
        { name: "birthDay", label: "DD", required: true },
        { name: "birthYear", label: "YYYY", required: true },
      ],
    },
    {
      id: 9,
      question:
        "9. Do any of the following Home Sleep Study exclusions apply to you?",
      subquestion: "*What are these medications?",
      type: "checkbox",
      field: "sleepStudyExclusions",
      options: [
        "None of the below",
        "Have serious heart or lung disease (examples: heart failure, stroke, COPD, condition requiring a pacemaker)",
        "Currently taking Opioid, Alpha Blocker or Short Acting Nitrate medications*",
        "Severe Insomnia",
      ],
    },
    {
      id: 10,
      question: "10. Are any of these descriptions true for you?",
      type: "checkbox",
      field: "additionalDescriptions",
      options: [
        "None of the below",
        "Family has a history of sleep apnea (parents or siblings)",
        "Heartburn or acid reflux at night",
        "Frequently wake up throughout the night",
        "Headache in the morning",
      ],
    },
    {
      id: 11,
      question: "11. Is there anything else you would like us to know?",
      type: "textarea",
      field: "additionalNotes",
      optional: true,
    },
  ];

  const handleAnswerChange = (field, value) => {
    setAnswers((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCheckboxChange = (field, value) => {
    setAnswers((prev) => {
      const currentValues = [...prev[field]];
      const index = currentValues.indexOf(value);

      if (index === -1) {
        currentValues.push(value);
      } else {
        currentValues.splice(index, 1);
      }

      if (
        value === "None of the below" &&
        currentValues.includes("None of the below")
      ) {
        return { ...prev, [field]: ["None of the below"] };
      }

      if (
        value !== "None of the below" &&
        currentValues.includes("None of the below")
      ) {
        const filtered = currentValues.filter(
          (item) => item !== "None of the below"
        );
        return { ...prev, [field]: filtered };
      }

      return { ...prev, [field]: currentValues };
    });
  };

  const handleNext = () => {
    const currentQuestion = questions[currentStep];

    if (currentQuestion.type === "height" && !answers.heightFeet) {
      alert("Please enter your height in feet");
      return;
    } else if (currentQuestion.type === "weight" && !answers.weight) {
      alert("Please enter your weight");
      return;
    } else if (
      currentQuestion.type === "date" &&
      (!answers.birthMonth || !answers.birthDay || !answers.birthYear)
    ) {
      alert("Please enter your complete date of birth");
      return;
    } else if (
      (currentQuestion.type === "yesno" || currentQuestion.type === "gender") &&
      !answers[currentQuestion.field]
    ) {
      alert("Please answer this question");
      return;
    }

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Quiz answers:", answers);
    setCompleted(true);
  };

  const renderQuestion = () => {
    const question = questions[currentStep];

    switch (question.type) {
      case "yesno":
        return (
          <div className="space-y-4">
            <h3 className="text-gray-800 text-xl font-semibold">
              {question.question}
            </h3>
            {question.subquestion && (
              <p className="text-gray-600">{question.subquestion}</p>
            )}
            <div className="flex space-x-4">
              <button
                className={`px-6 py-2 rounded-md ${
                  answers[question.field] === "Yes"
                    ? "bg-[#00aa63] text-white"
                    : "bg-white border border-[#00aa63] text-[#00aa63]"
                }`}
                onClick={() => handleAnswerChange(question.field, "Yes")}
              >
                Yes
              </button>
              <button
                className={`px-6 py-2 rounded-md ${
                  answers[question.field] === "No"
                    ? "bg-[#00aa63] text-white"
                    : "bg-white border border-[#00aa63] text-[#00aa63]"
                }`}
                onClick={() => handleAnswerChange(question.field, "No")}
              >
                No
              </button>
            </div>

            {answers[question.field] === "Yes" && question.followUp && (
              <div className="mt-4">
                <p className="text-gray-800 mb-2">
                  {question.followUp.question}
                </p>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={answers[question.followUp.field] || ""}
                  onChange={(e) =>
                    handleAnswerChange(question.followUp.field, e.target.value)
                  }
                  placeholder="Enter details..."
                />
              </div>
            )}
          </div>
        );

      case "gender":
        return (
          <div className="space-y-4">
            <h3 className="text-gray-800 text-xl font-semibold">
              {question.question}
            </h3>
            {question.subquestion && (
              <p className="text-gray-600">{question.subquestion}</p>
            )}
            <div className="flex space-x-4">
              {question.options.map((option) => (
                <button
                  key={option}
                  className={`px-6 py-2 rounded-md ${
                    answers[question.field] === option
                      ? "bg-[#00aa63] text-white"
                      : "bg-white border border-[#00aa63] text-[#00aa63]"
                  }`}
                  onClick={() => handleAnswerChange(question.field, option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case "height":
        return (
          <div className="space-y-4">
            <h3 className="text-gray-800 text-xl font-semibold">
              {question.question}
            </h3>
            <div className="flex space-x-4 items-end">
              {question.fields.map((field) => (
                <div key={field.name} className="flex flex-col">
                  <label className="text-gray-800 mb-1">{field.label}</label>
                  <input
                    type="number"
                    className="w-20 p-2 border border-gray-300 rounded-md"
                    value={answers[field.name] || ""}
                    onChange={(e) =>
                      handleAnswerChange(field.name, e.target.value)
                    }
                    placeholder={field.label}
                    required={field.required}
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case "weight":
        return (
          <div className="space-y-4">
            <h3 className="text-gray-800 text-xl font-semibold">
              {question.question}
            </h3>
            <div className="flex flex-col w-32">
              <label className="text-gray-800 mb-1">{question.label}</label>
              <input
                type="number"
                className="p-2 border border-gray-300 rounded-md"
                value={answers[question.field] || ""}
                onChange={(e) =>
                  handleAnswerChange(question.field, e.target.value)
                }
                placeholder={question.label}
                required={question.required}
              />
            </div>
          </div>
        );

      case "date":
        return (
          <div className="space-y-4">
            <h3 className="text-gray-800 text-xl font-semibold">
              {question.question}
            </h3>
            <div className="flex space-x-4">
              {question.fields.map((field) => (
                <div key={field.name} className="flex flex-col">
                  <label className="text-gray-800 mb-1">{field.label}</label>
                  <input
                    type="number"
                    className="w-20 p-2 border border-gray-300 rounded-md"
                    value={answers[field.name] || ""}
                    onChange={(e) =>
                      handleAnswerChange(field.name, e.target.value)
                    }
                    placeholder={field.label}
                    required={field.required}
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case "checkbox":
        return (
          <div className="space-y-4">
            <h3 className="text-gray-800 text-xl font-semibold">
              {question.question}
            </h3>
            {question.subquestion && (
              <p className="text-gray-600">{question.subquestion}</p>
            )}
            <div className="space-y-2">
              {question.options.map((option) => (
                <div key={option} className="flex items-center">
                  <input
                    type="checkbox"
                    id={option}
                    className="h-5 w-5 text-[#00aa63] rounded border-gray-300 focus:ring-[#00aa63]"
                    checked={answers[question.field].includes(option)}
                    onChange={() =>
                      handleCheckboxChange(question.field, option)
                    }
                  />
                  <label htmlFor={option} className="ml-2 text-gray-800">
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        );

      case "textarea":
        return (
          <div className="space-y-4">
            <h3 className="text-gray-800 text-xl font-semibold">
              {question.question}
            </h3>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md"
              value={answers[question.field] || ""}
              onChange={(e) =>
                handleAnswerChange(question.field, e.target.value)
              }
              placeholder={question.optional ? "Optional" : ""}
              rows={4}
            />
          </div>
        );

      default:
        return null;
    }
  };

  if (completed) {
    return (
      <>
        <Navbar />
        <div className="mt-top"></div>
        <div className="bg-white min-h-screen">
          <div className={`transition-all duration-300 `}>
            <div className="p-6">
              <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
                <RiVerifiedBadgeFill className="text-[#00aa63] text-6xl mx-auto mb-4" />
                <h2 className="text-gray-800 text-2xl font-bold mb-2">
                  Thank you for completing the sleep quiz!
                </h2>
                <p className="text-gray-600 mb-6">
                  Your responses have been submitted successfully.
                </p>
                <button
                  className="bg-[#00aa63] text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
                  onClick={() => navigate("/")}
                >
                  Go to homepage
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="mt-top"></div>
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className={`transition-all duration-300 w-full`}>
          <div className="p-6">
            <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-8">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-800">
                    Question {currentStep + 1} of {questions.length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-[#00aa63] h-2.5 rounded-full"
                    style={{
                      width: `${((currentStep + 1) / questions.length) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="mb-8">{renderQuestion()}</div>

              <div className="flex justify-between">
                {currentStep > 0 ? (
                  <button
                    className="bg-white text-[#00aa63] border border-[#00aa63] px-6 py-2 rounded-md hover:bg-gray-50 transition-colors"
                    onClick={handlePrev}
                  >
                    Back
                  </button>
                ) : (
                  <div></div>
                )}

                <button
                  className="bg-[#00aa63] text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
                  onClick={handleNext}
                >
                  {currentStep === questions.length - 1 ? "Finish" : "Continue"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SleepQuiz;
