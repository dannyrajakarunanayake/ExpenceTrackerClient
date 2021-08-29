import React from 'react'
import { ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import {  useSelector } from 'react-redux';
import { RootState } from '../slices';
import transactions from '../slices/transactions';
import { TextField } from '@material-ui/core';

const useStyle = makeStyles({
    list: {
        display: 'flex',
        marginTop: 10,
        border: '1px solid #F6F6F6'
    },
    text:{

    },
    amount:{

    }
   
})


interface TransactionProps{
    text: string | null;
    amount: number | null;
}

const Transaction= ({text, amount}: TransactionProps) => {
    const classes = useStyle();
    const sign = transactions.length >= 0 ? '$' : '-$';
    // const Amount1 = sign + Math.abs();
    const color = transactions.length >=0 ? 'Green' : 'Red';

    return (
        <ListItem style={{borderRight: `5px solid ${color} `}} className={classes.list}>
            <ListItemIcon>
                <DeleteIcon  />
            </ListItemIcon>
            <ListItemText primary={text}/>
            <ListItemText primary={amount} />
        </ListItem>
    )
}

export default  Transaction;