import React from "react";
import { createContext, useState } from "react";
export const BankState = createContext();
import { BASE_URL } from "../Utilities/api";
const Bank_state = (props) => {
  const signup = async (details, loginflag) => {
    try {
      const { username, number, age, email, password } = details;

      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: username, number, age, email, password }),
      };

      let base_url = `${BASE_URL}users/signup`;

      if (!loginflag) {
        options.body = JSON.stringify({ email, password });
        base_url = `${BASE_URL}users/login`;
      }

      const res = await fetch(base_url, options);

      const json = await res.json();
      if (json.status == "success") {
        localStorage.setItem("user_id", json.user.id);
        localStorage.setItem("token", json.token);
        localStorage.setItem("bankflag", true);
        // localStorage.setItem("user_id", json.account_id);
      }
      console.log(json);
      return json;
    } catch (err) {
      console.log("This is error message: " + err.message);
      // setmessage(err.message);
      // setalert(true);
    }
  };
  const gettransactions = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const res = await fetch(
        `${BASE_URL}transactions/${localStorage.getItem("user_id")}`,
        options
      );
      const json = await res.json();
      console.log(json);
      return json;
    } catch (err) {
      console.log("This is error message: " + err.message);
    }
  };
  const getBalance = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const res = await fetch(
        `${BASE_URL}transactions/balance/${localStorage.getItem("user_id")}`,
        options
      );
      const json = await res.json();
      console.log(json);
      return json;
    } catch (err) {
      console.log("This is error message: " + err.message);
    }
  };
  const payment = async (amount, type) => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ amount: amount, type: type }),
      };
      console.log(amount, type);
      const res = await fetch(
        `${BASE_URL}transactions/${type}/${localStorage.getItem("user_id")}`,
        options
      );
      const json = await res.json();
      console.log(json);
      return json;
    } catch (err) {
      console.log("This is error message: " + err.message);
    }
  };
  const createaccount = async () => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ user_id: localStorage.getItem("user_id") }), // Wrap in object
      };
  
      const res = await fetch(`${BASE_URL}accounts`, options);
      const json = await res.json();
      console.log(json);
      return json;
    } catch (err) {
      console.log("This is error message: " + err.message);
    }
  };
  
  return (
    <BankState.Provider
      value={{
        signup,
        gettransactions,
        getBalance,
        payment,
        createaccount,
      }}
    >
      {props.children}
    </BankState.Provider>
  );
};

export default Bank_state;
