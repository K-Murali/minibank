import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../Utilities/api";
import { BankState } from "../context/Bank_state";

const Signup = () => {
  const navigate = useNavigate();
  const [loginflag, setloginflag] = useState(false);
  const [msg, setmsg] = useState(true);
  const [loader, setloader] = useState(false);
  const [details, setdetails] = useState({
    username: "",
    email: "",
    password: "",
    number: "",
    age: "",
  });

  const { signup } = useContext(BankState);
  const onchange = (e) => {
    setdetails({ ...details, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-md w-full">
        {/* <h3 className="font-semibold text-2xl text-gray-800 text-center">
          {loginflag ? "Sign Up" : "Login"}
        </h3> */}
        {/* <p className="text-gray-500 text-center mb-4">
          {loginflag ? "Create an account" : "Login to your account"}
        </p> */}

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setloader(true);
            console.log(details);
            const res = await signup(details, loginflag);
            setloader(false);
            if (res.status === "success") {
              if (loginflag) {
                navigate("/account"); // Navigate only after sign-up
              } else {
                navigate("/"); // Stay on the homepage after login
              }
            } else {
              setmsg(res.message);
            }
          }}
          className="space-y-4"
        >
          {loginflag && (
            <>
              <div>
                <label className="text-sm   -3 font-medium text-gray-700">
                  Username
                </label>
                <input
                  required
                  onChange={onchange}
                  name="username"
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                  type="text"
                  placeholder="Enter username"
                />
              </div>

              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="text-sm   -3 font-medium text-gray-700">
                    Number
                  </label>
                  <input
                    required
                    onChange={onchange}
                    name="number"
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                    type="number"
                    placeholder="Phone number"
                  />
                </div>
                <div className="w-1/2">
                  <label className="text-sm  -3  font-medium text-gray-700">
                    Age
                  </label>
                  <input
                    required
                    onChange={onchange}
                    name="age"
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                    type="number"
                    placeholder="Age"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="text-sm font-medium  -3  text-gray-700">
              Email
            </label>
            <input
              required
              onChange={onchange}
              name="email"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
              type="email"
              placeholder="mail@gmail.com"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              required
              onChange={onchange}
              name="password"
              className="w-full mt- px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
              type="password"
              placeholder="Enter your password"
            />
          </div>

          {msg && <div className="text-sm text-red-500">{msg}</div>}

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition duration-300"
          >
            {loader ? "Loading..." : loginflag ? "Sign Up" : "Login"}
          </button>
        </form>

        <div className="text-center text-gray-500 mt-4">
          {loginflag ? (
            <>
              Already have an account?{" "}
              <Link
                onClick={() => setloginflag(false)}
                className="text-green-500 hover:underline"
              >
                Login here
              </Link>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <Link
                onClick={() => setloginflag(true)}
                className="text-green-500 hover:underline"
              >
                Sign up here
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
