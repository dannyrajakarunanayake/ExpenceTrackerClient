import React, {useState} from "react";
import {Typography, Box, makeStyles} from "@material-ui/core";
import "./Header.css";
import Balance from "../Balance/Balance";
import IncomeExpenses from "../IncomeExpences/IncomeExpense";
import AddTransaction from "../AddTransaction/AddTransaction";
import TranactionList from "../TransactionList/TransactionList";



const  Header = () => {
  return (
   
    <div className="Conatainer-Header">
      <Typography style={{marginBottom:20}}>Expense Tracker</Typography>
     
    </div>
  );
}

export default Header;
