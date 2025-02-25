import React from "react";
import Bank_state from "./context/Bank_state";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./componets/Homepage";
import Signup from "./componets/Signup";

import Account from "./componets/Account";
const App = () => {
  return (
    <>
      <Bank_state>
        <div>
          <Router>
            <Routes>
              <Route path="/minibank" element={<HomePage />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/account" element={<Account />} />
            </Routes>
          </Router>
        </div>
      </Bank_state>
    </>
  );
};

export default App;
