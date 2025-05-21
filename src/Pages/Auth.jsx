import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (isSignup && !formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      if (isSignup) {
        // Save user data to localStorage
        const userData = {
          name: formData.name,
          email: formData.email,
        };
        localStorage.setItem("user", JSON.stringify(userData));
        console.log("Signed up:", userData);
      } else {
        // Try to retrieve existing user
        const savedUser = JSON.parse(localStorage.getItem("user"));
        if (
          savedUser &&
          savedUser.email === formData.email
          // You could add password check here if stored securely
        ) {
          console.log("Logged in as:", savedUser);
        } else {
          alert("Invalid credentials or user not found.");
          return;
        }
      }

      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-[#800000] mb-6 text-center">
          {isSignup ? "Create an Account" : "Welcome Back"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-[#800000] text-white py-2 rounded-md hover:bg-[#660000] transition-colors"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            className="text-[#FFD700] hover:underline ml-1"
            onClick={() => {
              setIsSignup(!isSignup);
              setFormData({ name: "", email: "", password: "" });
              setErrors({});
            }}
          >
            {isSignup ? "Login here" : "Sign up here"}
          </button>
        </p>
      </div>
    </div>
  );
}
