import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Forgotpassword from "./pages/Forgotpassword/Forgotpassword";

import TransactionList from "./components/TransactionList/TransactionList";

import Navbar from "./components/Narbar";
import Logout from "./pages/Logout/Logout";
import React from "react";

function App() {
  return (
    <>
      <Navbar />

      <Router>
        <Route path="/" exact component={Register}></Route>
        <Route path="/auth" exact component={Login}></Route>
        <Route path="/dashboard" exact component={Dashboard}></Route>
        <Route path="/logout" exact component={Logout}></Route>
        <Route path="/forgotpassword" exact component={Forgotpassword}></Route>
        <Route path="/history" exact component={TransactionList} />
        {/* <Route path="*">Page not found</Route> */}
      </Router>
    </>
  );
}

export default App;
