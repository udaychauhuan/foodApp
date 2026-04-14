import React, { useState } from "react";
import { loginUser, registerUser } from "../../services/authService";
import { showSuccess } from "../../helpers/toast";

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({});

    // Handle input change
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

        // remove error on typing
        setErrors({
            ...errors,
            [e.target.name]: ""
        });
    };

    // Validation
    const validate = () => {
        let newErrors = {};

        if (!form.email) {
            newErrors.email = "Email is required";
        }

        if (!form.password) {
            newErrors.password = "Password is required";
        }

        if (!isLogin) {
            if (!form.name) {
                newErrors.name = "Name is required";
            }

            if (!form.phone) {
                newErrors.phone = "Phone is required";
            }

            if (!form.confirmPassword) {
                newErrors.confirmPassword = "Confirm your password";
            }

            if (form.password !== form.confirmPassword) {
                newErrors.confirmPassword = "Passwords do not match";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Submit
    const handleSubmit = async () => {
        if (!validate()) return;

        try {
            setLoading(true);

            const res = isLogin
                ? await loginUser({
                    email: form.email,
                    password: form.password
                })
                : await registerUser(form);

            if (isLogin) {
                localStorage.setItem("token", res.token);
                showSuccess("Login successful 🚀");
                window.location.href = "/";
            } else {
                showSuccess("Registered successfully 🎉");
                setIsLogin(true);
            }

        } catch (err) {
            // handled globally in api.js
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">

            {/* LEFT SIDE */}
            <div className="hidden lg:flex w-1/2 relative">
                <img
                    src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
                    alt="food"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60"></div>

                <div className="relative z-10 flex flex-col justify-center px-16 text-white">
                    <h1 className="text-5xl font-bold mb-6 leading-tight">
                        Delicious Food, <br /> Delivered Fast 🍔
                    </h1>

                    <p className="text-lg mb-8 text-gray-200">
                        Order from your favorite restaurants instantly.
                    </p>

                    <div className="space-y-3 text-sm">
                        <p>✔️ 1000+ Restaurants</p>
                        <p>✔️ Fast Delivery</p>
                        <p>✔️ Easy Payments</p>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-2xl shadow-lg w-[400px]">

                    <h2 className="text-2xl font-bold mb-6 text-center">
                        {isLogin ? "Login" : "Create Account"}
                    </h2>

                    {/* Name */}
                    {!isLogin && (
                        <>
                            <input
                                name="name"
                                type="text"
                                placeholder="Full Name"
                                onChange={handleChange}
                                className={`w-full mb-1 p-3 border rounded-lg ${errors.name ? "border-red-500" : ""}`}
                            />
                            {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name}</p>}
                        </>
                    )}

                    {/* Email */}
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        onChange={handleChange}
                        className={`w-full mb-1 p-3 border rounded-lg ${errors.email ? "border-red-500" : ""}`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}

                    {/* Phone */}
                    {!isLogin && (
                        <>
                            <input
                                name="phone"
                                type="text"
                                placeholder="Phone"
                                onChange={handleChange}
                                className={`w-full mb-1 p-3 border rounded-lg ${errors.phone ? "border-red-500" : ""}`}
                            />
                            {errors.phone && <p className="text-red-500 text-sm mb-2">{errors.phone}</p>}
                        </>
                    )}

                    {/* Password */}
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className={`w-full mb-1 p-3 border rounded-lg ${errors.password ? "border-red-500" : ""}`}
                    />
                    {errors.password && <p className="text-red-500 text-sm mb-2">{errors.password}</p>}

                    {/* Confirm Password */}
                    {!isLogin && (
                        <>
                            <input
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm Password"
                                onChange={handleChange}
                                className={`w-full mb-1 p-3 border rounded-lg ${errors.confirmPassword ? "border-red-500" : ""}`}
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm mb-2">{errors.confirmPassword}</p>
                            )}
                        </>
                    )}

                    {/* Button */}
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full bg-orange-500 text-white p-3 rounded-lg font-semibold hover:bg-orange-600 transition mt-2"
                    >
                        {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
                    </button>

                    {/* Toggle */}
                    <p className="text-center mt-4 text-sm">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                        <span
                            className="text-orange-500 cursor-pointer ml-1"
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setErrors({});
                            }}
                        >
                            {isLogin ? "Sign Up" : "Login"}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}