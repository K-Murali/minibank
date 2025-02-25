import React from "react";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { BankState } from "../context/Bank_state";
import {
  FaMoneyBillWave,
  FaWallet,
  FaHistory,
  FaBalanceScale,
} from "react-icons/fa";

const UserMenu = () => {
  return (
    <div className="absolute top-4 right-4 flex items-center space-x-4">
      {localStorage.getItem("bankflag") ? (
        <Link
          onClick={localStorage.setItem("bankflag", false)}
          to="/signup"
          className="bg-green-500 text-white py-2 px-4 rounded-full shadow-md"
        >
          Logout
        </Link>
      ) : (
        <Link
          to="/signup"
          className="bg-green-500 text-white py-2 px-4 rounded-full shadow-md"
        >
          Login
        </Link>
      )}

      <button className="bg-gray-500 text-white py-2 px-4 rounded-full shadow-md">
        Profile
      </button>
    </div>
  );
};

const HomePage = () => {
  const [transactions, settransactions] = useState([]);
  const [balance, setbalance] = useState(0);
  const [deposit, setDeposit] = useState(0);
  const [withdraw, setWithdraw] = useState(0);
  const [trans_flag, settrans_flag] = useState(false);
  const [msg, setmsg] = useState("Transaction Successful!");
  const { gettransactions, getBalance, payment } = useContext(BankState);

  return !localStorage.getItem("bankflag") ? (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-20 px-4 sm:px-6 lg:px-8">
      <Link
        to="/signup"
        className="bg-green-500 text-white py-2 px-4 rounded-full shadow-md"
      >
        Login to continue...
      </Link>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-20 px-4 sm:px-6 lg:px-8">
      <UserMenu />
     <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center ">

        <h1 className="text-2xl font-bold text-gray-800">
          Welcome to Mini Bank
        </h1>
        <p className="text-gray-600 mt-2">
          Manage your account, transactions, and balance easily.
        </p>
{/* deposit button */}
        <div className="mt-6 space-y-4 w-full max-w-md mx-auto text-center">
          <div
            onClick={(e) => {
              e.preventDefault(),
                document.getElementById("deposit").showModal();
            }}
            className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl shadow-lg w-full"
          >
            <FaMoneyBillWave className="mr-2 text-lg" /> Deposit
          </div>
{/* withdraw button */}
          <div
            onClick={(e) => {
              e.preventDefault(),
                document.getElementById("withdraw").showModal();
            }}
            className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-xl shadow-lg w-full"
          >
            <FaWallet className="mr-2 text-lg" /> Withdraw
          </div>
{/* check balance button */}
          <div
            onClick={async (e) => {
              e.preventDefault();
              let res = await getBalance();
              if (res) {
                setbalance(res.balance);
                document.getElementById("balance").showModal();
              }
            }}
            className="flex items-center justify-center bg-gray-700 hover:bg-gray-800 text-white py-3 px-6 rounded-xl shadow-lg w-full"
          >
            <FaBalanceScale className="mr-2 text-lg" /> Check Balance
          </div>
  {/* transaction history button */}
          <div
            onClick={async (e) => {
              e.preventDefault();
              let res = await gettransactions();
              if (res) {
                settransactions(res.transactions);
                document.getElementById("transactions").showModal();
              }
            }}
            className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl shadow-lg w-full"
          >
            <FaHistory className="mr-2 text-lg" /> Transaction History
          </div>

        </div>
      </div>
{/* dialogboxxes */}

{/* deposit */}
      <dialog id="deposit" className="modal">
        <div className="modal-box w-11/12 max-w-md p-6 rounded-lg shadow-lg">
          <h3 className="font-bold text-xl text-center text-gray-800">
            Deposit Money
          </h3>
          {!trans_flag ? (
            <p className="text-gray-600 text-center mt-2">
              Enter the amount you want to deposit.
            </p>
          ) : (
            <p className="text-gray-600 text-center mt-2">{msg}</p>
          )}
          {!trans_flag && (
            <div className="mt-4">
              <input
                type="number"
                onChange={(e) => {
                  setDeposit(e.target.value);
                }}
                placeholder="Enter amount"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <div className="modal-action flex justify-between mt-6">
            <form method="dialog">
              <button className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600">
                Close
              </button>
            </form>
            {!trans_flag ? (
              <button
                disabled={deposit == 0 ? true : false}
                onClick={async (e) => {
                  e.preventDefault();
                  let res = await payment(deposit, "deposit");
                  if (res) {
                    setDeposit(0);
                    settrans_flag(true);
                    setmsg(res.message);
                  }
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700"
              >
                Deposit
              </button>
            ) : (
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  settrans_flag(false);
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700"
              >
                Deposit Again
              </button>
            )}
          </div>
        </div>
      </dialog>
{/* withdraw */}

      <dialog id="withdraw" className="modal">
        <div className="modal-box w-11/12 max-w-md p-6 rounded-lg shadow-lg">
          <h3 className="font-bold text-xl text-center text-gray-800">
            withdraw Money
          </h3>
          {!trans_flag ? (
            <p className="text-gray-600 text-center mt-2">
              Enter the amount you want to withdraw.
            </p>
          ) : (
            <p className="text-gray-600 text-center mt-2">{msg}</p>
          )}
          {!trans_flag && (
            <div className="mt-4">
              <input
                type="number"
                onChange={(e) => {
                  setWithdraw(e.target.value);
                }}
                placeholder="Enter amount"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <div className="modal-action flex justify-between mt-6">
            <form method="dialog">
              <button className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600">
                Close
              </button>
            </form>
            {!trans_flag ? (
              <button
                disabled={withdraw == 0 ? true : false}
                onClick={async () => {
                  let res = await payment(withdraw, "Withdraw");
                  if (res) {
                    setWithdraw(0);
                    settrans_flag(true);
                    setmsg(res.message);
                  }
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700"
              >
                Withdraw
              </button>
            ) : (
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  settrans_flag(false);
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700"
              >
                Withdraw Again
              </button>
            )}
          </div>
        </div>
      </dialog>
{/* balance */}
      <dialog id="balance" className="modal">
        <div className="modal-box w-11/12 max-w-md p-6 rounded-lg shadow-lg">
          <h3 className="font-bold text-xl text-center text-gray-800">
            Account Balance
          </h3>
          <p className="text-gray-600 text-center mt-2">
            Your current account balance is:
          </p>

          <div className="mt-4 text-center">
            <span className="text-3xl font-bold text-green-600">
              ${balance}
            </span>
          </div>

          <div className="modal-action flex justify-center mt-6">
            <form method="dialog">
              <button className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
{/* transactions */}
      <dialog id="transactions" className="modal">
        <div className="modal-box w-11/12 max-w-md p-6 rounded-lg shadow-lg">
          <h3 className="font-bold text-xl text-center text-gray-800">
            Transaction History
          </h3>
          <div className="mt-4 max-h-60 overflow-y-auto">
            {transactions?.length > 0 ? (
              transactions.map((transaction, index) => (
                <div key={index} className="flex justify-between p-2 border-b">
                  <div>
                    <p
                      className={`
                     font-semibold text-green-600 ${
                       transaction.type === "Deposit"
                         ? " text-green-700"
                         : " text-red-700"
                     } `}
                    >
                      ${transaction.amount}
                    </p>
                    <p className="text-sm text-gray-600">
                      {new Date(transaction.date).toLocaleDateString("en-GB")}{" "}
                      {new Date(transaction.date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <span
                    className={`  p-4 w-24 text-sm rounded-lg ${
                      transaction.type === "Deposit"
                        ? "bg-green-200 text-green-700"
                        : "bg-red-200 text-red-700"
                    }`}
                  >
                    {transaction.type}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">No transactions found</p>
            )}
          </div>
          <div className="modal-action flex justify-center mt-6">
            <form method="dialog">
              <button className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
      
    </div>
  );
};

export default HomePage;
