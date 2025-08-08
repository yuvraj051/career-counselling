import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function RegistrationForm() {
  const [step, setStep] = useState(1);
  const [imgurl, setImgurl] = useState("no file selected.");

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const all = watch();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    alert("Registration Submitted!");
  };

  // Image Preview
  useEffect(() => {
    const file = all.profile_picture?.[0];
    if (file) {
      setImgurl(URL.createObjectURL(file));
    } else {
      setImgurl("no file selected.");
    }
  }, [all.profile_picture]);

  // Step change with validation
  const nextStep = async () => {
    let currentStepFields = [];
    if (step === 1)
      currentStepFields = [
        "full_name",
        "email",
        "mobile",
        "age",
        "gender",
        "password",
      ];
    else if (step === 2)
      currentStepFields = [
        "education_level",
        "preferred_language",
        "career_interest",
      ];
    else if (step === 3) currentStepFields = ["location", "profile_picture"];

    const isStepValid = await trigger(currentStepFields);
    if (isStepValid) setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const steps = [
    { number: 1, title: "Personal Information" },
    { number: 2, title: "Educational Details" },
    { number: 3, title: "Additional Information" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
          <h1 className="text-3xl font-bold text-center mb-2">
            Career Counseling Registration
          </h1>
          <p className="text-blue-100 text-center">
            Join us to discover your perfect career path
          </p>
        </div>

        {/* Progress Bar */}
        <div className="px-8 pt-6">
          <div className="flex items-center justify-between mb-8">
            {steps.map((stepItem, index) => (
              <div key={stepItem.number} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step >= stepItem.number
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {stepItem.number}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {stepItem.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-1 mx-4 ${
                      step > stepItem.number ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="px-8 pb-8">
          {/* Step 1 */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    {...register("full_name", {
                      required: "Full Name is required",
                      pattern: {
                        value: /^[A-Za-z\s]+$/,
                        message: "Only alphabets allowed",
                      },
                      minLength: {
                        value: 3,
                        message: "Minimum 3 characters required",
                      },
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your full name"
                  />
                  {errors.full_name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.full_name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email format",
                      },
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Mobile */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number *
                  </label>
                  <input
                    {...register("mobile", {
                      required: "Mobile number is required",
                      pattern: {
                        value: /^[6-9]\d{9}$/,
                        message: "Enter valid 10-digit mobile number",
                      },
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your mobile number"
                  />
                  {errors.mobile && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.mobile.message}
                    </p>
                  )}
                </div>

                {/* Age */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age *
                  </label>
                  <input
                    type="number"
                    {...register("age", {
                      required: "Age is required",
                      min: { value: 13, message: "Minimum age is 13" },
                      max: { value: 100, message: "Maximum age is 100" },
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your age"
                  />
                  {errors.age && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.age.message}
                    </p>
                  )}
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender *
                  </label>
                  <select
                    {...register("gender", { required: "Gender is required" })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.gender.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <input
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Minimum 6 characters",
                      },
                      pattern: {
                        value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])/,
                        message:
                          "Must contain uppercase, number & special character",
                      },
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your password"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Education Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Education Level *
                  </label>
                  <select
                    {...register("education_level", {
                      required: "Education level is required",
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select education level</option>
                    <option value="10th">10th Standard</option>
                    <option value="12th">12th Standard</option>
                    <option value="graduate">Graduate</option>
                    <option value="postgraduate">Postgraduate</option>
                  </select>
                  {errors.education_level && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.education_level.message}
                    </p>
                  )}
                </div>

                {/* Preferred Language */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Language *
                  </label>
                  <input
                    {...register("preferred_language", {
                      required: "Language is required",
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., English, Hindi"
                  />
                  {errors.preferred_language && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.preferred_language.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Career Interests */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Career Interests * (Select at least one)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    "Engineering",
                    "Entrepreneurship",
                    "Government",
                    "Medical",
                  ].map((interest) => (
                    <label
                      key={interest}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        value={interest}
                        {...register("career_interest", {
                          validate: (value) =>
                            value?.length > 0 || "Select at least one interest",
                        })}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{interest}</span>
                    </label>
                  ))}
                </div>
                {errors.career_interest && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.career_interest.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    {...register("location", {
                      required: "Location is required",
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your city/state"
                  />
                  {errors.location && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.location.message}
                    </p>
                  )}
                </div>

                {/* Profile Picture */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Picture:
                  </label>
                  <input
                    type="file"
                    id="profile-picture"
                    {...register("profile_picture", {
                      validate: (files) => {
                        const file = files?.[0];
                        if (!file) return true;
                        if (!["image/jpeg", "image/png"].includes(file.type))
                          return "Only JPG/PNG allowed";
                        if (file.size > 2 * 1024 * 1024) return "Max 2MB";
                        return true;
                      },
                    })}
                    className="hidden"
                    accept="image/*"
                  />
                  <label htmlFor="profile-picture" className="cursor-pointer">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors duration-200">
                      {imgurl && imgurl !== "no file selected." ? (
                        <img
                          src={imgurl}
                          alt="Profile Preview"
                          className="mx-auto h-32 w-32 rounded object-cover"
                        />
                      ) : (
                        <div className="text-gray-500">
                          <p className="text-sm">
                            Click to upload profile picture
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            JPG, PNG up to 2MB
                          </p>
                        </div>
                      )}
                    </div>
                  </label>
                  {errors.profile_picture && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.profile_picture.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-8 border-t border-gray-200 mt-8">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium"
              >
                ← Previous
              </button>
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="ml-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium shadow-lg"
              >
                Next Step →
              </button>
            ) : (
              <button
                type="submit"
                className="ml-auto px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium shadow-lg"
              >
                Complete Registration
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
