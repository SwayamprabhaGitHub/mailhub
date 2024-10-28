import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/UI/Card";
import { BiLoader } from "react-icons/bi";

const SignUp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [isEmailTouched, setIsEmailTouched] = useState(false); //for checking email ends with @mailhub.com
  const [isConfirmPswrdTouched, setIsConfirmPswrdTouched] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleEmailBlur = () => {
    setIsEmailTouched(true);
  };

  const handleConfirmPswrdBlur = () => {
    if(password !== confirmPassword) {
      setIsConfirmPswrdTouched(true);
    }
  }
  
  useEffect(() => {
    // Update form validity status
    const isEmailValid = email.endsWith("@mailhub.com");
    const isPasswordValid = password.length >= 6;
    const arePasswordsMatching = password === confirmPassword;
    const isFullNameValid = fullName.trim().length > 0;

    setIsFormValid(
      isEmailValid && isPasswordValid && arePasswordsMatching && isFullNameValid
    );
  }, [email, password, confirmPassword, fullName]);

  const handleSignUpSubmit = (event) => {
    event.preventDefault();
    if (email.endsWith("@mailhub.com")) {
      // Submit the form or perform any desired action
      console.log("Email submitted:", email);
    } else {
      console.log("Invalid email format");
    }
  };

  return (
    <Card>
      {/* Sign up form */}
      <div className="w-full max-w-md p-8 rounded-xl relative z-10 mx-4 backdrop-blur-3xl bg-white/10 border border-white/10 shadow-xl animate-fadeIn">
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 rounded-xl -z-10" />

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-700">
            Create your account
          </h2>
          <p className="text-slate-500 mt-2">Join Mail Hub today</p>
        </div>

        <form onSubmit={handleSignUpSubmit} className="space-y-6">
          <div className="relative animate-slideIn [animation-delay-400ms] opacity-0">
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-0 focus:border-teal-400 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="fullName"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-teal-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Full Name
            </label>
          </div>

          <div className="relative animate-slideIn [animation-delay-800ms] opacity-0">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={handleEmailBlur}
              className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-0 focus:border-teal-400 peer ${isEmailTouched && !email.endsWith("@mailhub.com") && "border-rose-600 focus:border-rose-600"}`}
              placeholder=" "
              required
              pattern="^[a-zA-Z0-9._%+-]+@mailhub\.com$" // Pattern to validate email ending with @mailhub.com
            />
            <label
              htmlFor="email"
              className={`absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-teal-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 ${isEmailTouched && !email.endsWith("@mailhub.com") && "text-rose-600 peer-focus:text-rose-600 peer-placeholder-shown:top-6"}`}
            >
              Email
            </label>
            {isEmailTouched && !email.endsWith("@mailhub.com") && (<p className="text-rose-600 text-sm px-2">Email must end with @mailhub.com</p>)}
          </div>

          <div className="relative animate-slideIn [animation-delay-1200ms] opacity-0">
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-0 focus:border-teal-400 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="password"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-teal-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Password
            </label>
          </div>

          <div className="relative animate-slideIn [animation-delay-1600ms] opacity-0">
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={handleConfirmPswrdBlur}
              className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-0 focus:border-teal-400 peer ${isConfirmPswrdTouched && (password !== confirmPassword) && "border-rose-600 focus:border-rose-600"}`}
              placeholder=" "
              required
            />
            <label
              htmlFor="confirmPassword"
              className={`absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-teal-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 ${isConfirmPswrdTouched && (password !== confirmPassword) && "text-rose-600 peer-focus:text-rose-600 peer-placeholder-shown:top-6"}`}
            >
              Confirm Password
            </label>
            {isConfirmPswrdTouched && (password !== confirmPassword) && (<p className="text-rose-600 text-sm px-2">Password and Confirm Password does not match.</p>)}
          </div>

          <div className="flex flex-col space-y-4 animate-slideIn">
            <button
              type="submit"
              disabled={!isFormValid}
              className="w-full px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-teal-400 to-rose-400 hover:from-teal-300 hover:to-rose-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400/50 shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (<><BiLoader className="w-5 h-5 animate-spin mr-2"/>Loading...</>):"Create Account"}
            </button>
            <div className="text-center">
              <span className="text-gray-500 text-sm">
                Already have an account?
              </span>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="text-sm text-teal-500 hover:text-teal-600 font-medium transition-colors duration-200 ml-2"
              >
                Sign in
              </button>
            </div>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default SignUp;
