import React, {useState, useEffect} from "react";
import {Typography, Box, makeStyles} from "@material-ui/core";
import "./Dashboard.css";

import {  useSelector } from 'react-redux';

import Header from "../../components/Header/Header";
import Balance from "../../components/Balance/Balance";
import AddTransaction from '../../components/AddTransaction/AddTransaction';
import Footer from "../../components/Footer";
import IncomeExpenses from "../../components/IncomeExpences/IncomeExpense";

import { RootState } from '../../slices';
import transactions from '../../slices/transactions';
import TableCharts from "../../components/TableCharts";
import Transaction from '../../components/Transaction';


const useStyle= makeStyles({
  component: {
    background: '#FFF',
    padding: 10,
    width:1200,
    borderRadius: 20,
    display:"flex",
    '& > *': {
      width: "100%",
      padding: 10,
      height: "80vh"
    }
  }
})
const Dashboard = (props:any)  => {
  const classes = useStyle();


  const { transactions} = useSelector(
    (state: RootState) => state.transactions
);


  return (
    <div className="Conatainer-Dashboard">
       <Box className={classes.component}>
        <Box>
          <Balance {...props}/>
          <IncomeExpenses  />
          <AddTransaction {...props}/>
        </Box>
       
      </Box>
     
     
    </div>
   
  );
}

export default Dashboard;
