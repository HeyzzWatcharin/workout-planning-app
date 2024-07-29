"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/libs/firebase";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [comfirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [confirmPasswordError, setconfirmPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (password !== "" && comfirmPassword !== password) {
      setconfirmPasswordError("Password and ConfirmPassword not matching");
    } else {
      setconfirmPasswordError("");
    }
  }, [comfirmPassword, password]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.push("/home");
      }, 2000);
    } catch (err) {
      setLoading(false);
      setSuccess(false);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSignUp}
        className="bg-white p-12 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl text-black mb-4 text-center font-semibold">
          Sign Up
        </h2>
        {error && <p className="text-red-500 mb-4 text-sm text-center">{error}</p>}
        <div className="mb-4">
          <label className="block mb-2 text-black">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-black">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-black">Confirm Password</label>
          <input
            type="password"
            value={comfirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-black"
            required
          />
        </div>
        <div>
          {confirmPasswordError !== "" && (
            <p className="text-red-500 text-sm text-center">
              {confirmPasswordError}
            </p>
          )}
        </div>
        <button
          type="submit"
          className={`w-full text-white py-2 my-3 rounded 
            ${
              confirmPasswordError !== "" || loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 cursor-pointer"
            }`}
          disabled={loading || confirmPasswordError !== ""}
        >
          {loading ? "Loading..." : success ? "Success" : "Sign Up"}
        </button>
        <div>
          <h2 className="text-black text-sm font-normal text-center">
            {"Already have an accout"}
            <span
              onClick={() => router.push("/signIn")}
              className="text-sm text-bold mx-2 hover:cursor-pointer hover:underline hover:text-blue-500"
            >
              Sign In
            </span>
          </h2>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
