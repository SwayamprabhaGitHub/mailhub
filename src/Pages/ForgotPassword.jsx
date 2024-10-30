import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/UI/Card";
import { toast } from "react-toastify";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { BiLoader } from "react-icons/bi";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");

  const handleForgotPassword = async(event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent successfully");
    } catch(error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      {/* Forgot password form */}
      <div className="w-full max-w-md p-8 rounded-xl relative z-10 mx-4 backdrop-blur-3xl bg-white/10 border border-white/10 shadow-xl animate-fadeIn">
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 rounded-xl -z-10" />

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-700">Reset Password</h2>
          <p className="text-slate-500 mt-2">
            Enter your email and we'll send you instructions to reset your
            password
          </p>
        </div>

        <form onSubmit={handleForgotPassword} className="space-y-6">
          <div className="relative animate-slideIn">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-0 focus:border-teal-400 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-teal-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Email
            </label>
          </div>

          <div className="flex flex-col space-y-4 animate-slideIn">
            <button
              type="submit"
              className="w-full px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-teal-400 to-rose-400 hover:from-teal-300 hover:to-rose-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400/50 shadow-md transition-all duration-200 flex items-center justify-center"
            >
              {isLoading ? (<><BiLoader className="w-5 h-5 animate-spin mr-2"/>Loading...</>):"Send Reset Instructions"}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500">
            Remember your password?{" "}
            <button
              onClick={() => navigate("/")}
              className="text-teal-500 hover:text-teal-600 font-medium transition-colors duration-200"
            >
              Back to login
            </button>
          </p>
        </div>
      </div>
    </Card>
  );
};

export default ForgotPassword;
