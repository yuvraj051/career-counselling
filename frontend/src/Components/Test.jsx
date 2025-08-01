import React from "react";
import { useForm } from "react-hook-form";

function RegistrationForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    alert("Registration Submitted!");
    // Send data to backend with axios here
  };

  // Watch file input for validation
  const profilePicture = watch("profile_picture");

  return (
    <div className="flex items-center justify-center p-12">
      <div className="mx-auto w-full max-w-[550px] bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Career Counselling - Registration
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <div>
            <label>Full Name</label>
            <input
              {...register("full_name", { required: "Full Name is required" })}
              className="input"
              placeholder="Yuvraj Vala"
            />
            {errors.full_name && (
              <p className="text-red-500">{errors.full_name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label>Email</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Invalid email format",
                },
              })}
              type="email"
              className="input"
              placeholder="vyuvraj051@example.com"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Mobile */}
          <div>
            <label>Mobile</label>
            <input
              {...register("mobile", {
                required: "Mobile number is required",
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: "Enter valid 10-digit Indian mobile number",
                },
              })}
              className="input"
              placeholder="9979108573"
            />
            {errors.mobile && (
              <p className="text-red-500">{errors.mobile.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label>Password</label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              type="password"
              className="input"
              placeholder="********"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Age */}
          <div>
            <label>Age</label>
            <input
              {...register("age", {
                required: "Age is required",
                min: { value: 13, message: "Minimum age is 13" },
                max: { value: 100, message: "Maximum age is 100" },
              })}
              type="number"
              className="input"
              placeholder="21"
            />
            {errors.age && <p className="text-red-500">{errors.age.message}</p>}
          </div>

          {/* Gender */}
          <div>
            <label>Gender</label>
            <select
              {...register("gender", { required: "Gender is required" })}
              className="input"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500">{errors.gender.message}</p>
            )}
          </div>

          {/* Education Level */}
          <div>
            <label>Education Level</label>
            <select
              {...register("education_level", {
                required: "Education level is required",
              })}
              className="input"
            >
              <option value="">Select Education Level</option>
              <option value="10th">10th</option>
              <option value="12th">12th</option>
              <option value="graduate">Graduate</option>
              <option value="postgraduate">Postgraduate</option>
            </select>
            {errors.education_level && (
              <p className="text-red-500">{errors.education_level.message}</p>
            )}
          </div>

          {/* Career Interests */}
          <div>
            <label>Career Interests (Hold Ctrl to multi-select)</label>
            <select
              {...register("career_interest", {
                required: "Select at least one career interest",
              })}
              className="input"
              multiple
            >
              <option value="Engineering">Engineering</option>
              <option value="Entrepreneurship">Entrepreneurship</option>
              <option value="Medicine">Medicine</option>
              <option value="Government Jobs">Government Jobs</option>
              <option value="IT">IT</option>
            </select>
            {errors.career_interest && (
              <p className="text-red-500">{errors.career_interest.message}</p>
            )}
          </div>

          {/* Preferred Language */}
          <div>
            <label>Preferred Language</label>
            <input
              {...register("preferred_language")}
              className="input"
              placeholder="Gujarati"
            />
          </div>

          {/* Location */}
          <div>
            <label>Location</label>
            <input
              {...register("location")}
              className="input"
              placeholder="Amreli"
            />
          </div>

          {/* Profile Picture */}
          <div>
            <label>Profile Picture (JPG/PNG, max 2MB)</label>
            <input
              {...register("profile_picture", {
                validate: (fileList) => {
                  if (!fileList || fileList.length === 0) return true; // not required
                  const file = fileList[0];
                  const isValidType = ["image/jpeg", "image/png"].includes(
                    file.type
                  );
                  const isValidSize = file.size <= 2 * 1024 * 1024;
                  if (!isValidType) return "Only JPG or PNG allowed";
                  if (!isValidSize) return "File size must be under 2MB";
                  return true;
                },
              })}
              type="file"
              className="input"
            />
            {errors.profile_picture && (
              <p className="text-red-500">{errors.profile_picture.message}</p>
            )}
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
