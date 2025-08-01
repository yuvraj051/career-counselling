import React, { useState } from "react";
import { useForm } from "react-hook-form";

function RegistrationForm() {
  const [step, setStep] = useState(1);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    alert("Registration Submitted!");
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Step {step} of 3
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {step === 1 && (
            <>
              <div>
                <label>Full Name</label>
                <input
                  {...register("full_name", {
                    required: "Full Name is required",
                  })}
                  className="input"
                />
                {errors.full_name && (
                  <p className="text-red-500">{errors.full_name.message}</p>
                )}
              </div>

              <div>
                <label>Email</label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email format",
                    },
                  })}
                  className="input"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label>Mobile</label>
                <input
                  {...register("mobile", {
                    required: "Mobile is required",
                    pattern: {
                      value: /^[6-9]\d{9}$/,
                      message: "Enter valid mobile number",
                    },
                  })}
                  className="input"
                />
                {errors.mobile && (
                  <p className="text-red-500">{errors.mobile.message}</p>
                )}
              </div>

              <div>
                <label>Password</label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" },
                  })}
                  className="input"
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>

              <div>
                <label>Age</label>
                <input
                  type="number"
                  {...register("age", {
                    required: "Age is required",
                    min: { value: 13, message: "Min age 13" },
                    max: { value: 100, message: "Max age 100" },
                  })}
                  className="input"
                />
                {errors.age && (
                  <p className="text-red-500">{errors.age.message}</p>
                )}
              </div>

              <div>
                <label>Gender</label>
                <select
                  {...register("gender", { required: "Gender is required" })}
                  className="input"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500">{errors.gender.message}</p>
                )}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label>Education Level</label>
                <select
                  {...register("education_level", { required: true })}
                  className="input"
                >
                  <option value="">Select</option>
                  <option value="10th">10th</option>
                  <option value="12th">12th</option>
                  <option value="graduate">Graduate</option>
                  <option value="postgraduate">Postgraduate</option>
                </select>
                {errors.education_level && (
                  <p className="text-red-500">Education level is required</p>
                )}
              </div>

              <div>
                <label>Preferred Language</label>
                <input
                  {...register("preferred_language", { required: true })}
                  className="input"
                />
                {errors.preferred_language && (
                  <p className="text-red-500">Language is required</p>
                )}
              </div>

              <div>
                <label>Career Interest</label>
                <select
                  {...register("career_interest", { required: true })}
                  multiple
                  className="input h-32"
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Entrepreneurship">Entrepreneurship</option>
                  <option value="Government">Government</option>
                  <option value="Medical">Medical</option>
                </select>
                {errors.career_interest && (
                  <p className="text-red-500">Select at least one interest</p>
                )}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div>
                <label>Location</label>
                <input
                  {...register("location", {
                    required: "Location is required",
                  })}
                  className="input"
                />
                {errors.location && (
                  <p className="text-red-500">{errors.location.message}</p>
                )}
              </div>

              <div>
                <label>Profile Picture</label>
                <input
                  type="file"
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
                  className="input"
                />
                {errors.profile_picture && (
                  <p className="text-red-500">
                    {errors.profile_picture.message}
                  </p>
                )}
              </div>
            </>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Back
              </button>
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="ml-auto px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="ml-auto px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
