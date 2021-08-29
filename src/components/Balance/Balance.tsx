import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../slices";

import { transactionsDetails } from '../../slices/transactions';
import transactions from "../../slices/transactions";

import { Typography, makeStyles, Box } from '@material-ui/core';


const useStyle = makeStyles({
    balance: {
        fontSize: 20,
        marginTop:20
    }
})

interface BalanceProps{
    text: string | null;
    amount: number | null[];
    
}

const Balance = ({text,amount}:BalanceProps) => {
    const [balance, setBalance] = useState(0);
    const classes = useStyle();

    const { 
        transactions, 
        
    } = useSelector(
        (state: RootState) => state.transactions
    );
    // const Amount = transactions.map(transaction => amount);
    // const total = Amount.reduce((Amount, item) => (Amount += item), 0);
    // console.log(total)

    return (
        <Box>
            <Typography className={classes.balance}>Balance $5000</Typography>
            
            
        </Box>
    )
}

export default Balance;