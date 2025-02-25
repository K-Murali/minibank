import { useNavigate } from "react-router-dom";
import { BankState } from "../context/Bank_state";
import { useState, useContext } from "react";

const Account = () => {
  const navigate = useNavigate();
  const [accflag, setaccflag] = useState(false);
  const [status, setstatus] = useState("Creating your account...");
  const { createaccount } = useContext(BankState);
  const handleCreateAccount = async (e) => {
    setaccflag(true);
    e.preventDefault();
    let res = await createaccount();
    if (res) {
      setstatus(res.message);
      setTimeout(() => {
        navigate("/minibank");
      }, 1500);
    }
    if (res) {
    }
    // Redirect to home page after clicking
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md text-center">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Create Your Account by clicking here
        </h1>
        <button
          onClick={handleCreateAccount}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition duration-300"
        >
          {!accflag ? "Create Account" : `${status}`}
        </button>
      </div>
    </div>
  );
};

export default Account;
