import React, {useState, useEffect} from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { 
  transactionsDetails} from '../../slices/transactions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../slices';
import {  Link, useHistory } from "react-router-dom";
import { auth } from '../../firebase';
import { TextField, Typography, Button, Box } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";


import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import Axios from "axios";
import Transaction from '../Transaction';

import Alert from '@material-ui/lab/Alert/Alert';


type TransactionData = {
  text: string;
  amount: number;
};


const useStyle = makeStyles({
  container: {
    dispay: "flex",
    flexDirection: "column",
    '& > *': {
      marginTop: 40
    }
  },
  button: {
    background: "#66D3FA",
    color:"#fff",
    marginTop: 68,
    width:"100%",
    position:"relative",
    
  },
})

const showMessage = (submitSucceeded:any, errorMessage:any) => {
  if(submitSucceeded) {
    return (
      <Alert
        color="success"
        children="Sucessfull Added"
        severity="success"
        variant="filled"
      />
    )
  }else if (errorMessage) {
    return (
      <Alert
        color="warning"
        children="Error Occured"
        severity="error"
        variant="filled"
      />
    )
  }
}


interface TransactionProps {
  userId:string;
}

const AddTransaction = ({userId}:TransactionProps) => {
  const classes = useStyle();
  
  const dispatch = useDispatch();
  let history = useHistory();
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0)

  const { 
    submitSucceeded,
    errorMessage,
} = useSelector(
    (state: RootState) => state.transactions
)

  const reactHookForm = useForm<TransactionData>({
    defaultValues: {
      text: "",
      amount: 0,
    },
    mode: "onSubmit",
  });

  const { handleSubmit, control, formState:{errors} } = useForm<TransactionData>();
  
  const formSubmitHandler = (transactionData:any) => {
    dispatch(transactionsDetails(transactionData.text, transactionData.amount));
  };

  useEffect(() => {
    if (submitSucceeded) {
      history.push("/history")
    }
  }, [submitSucceeded, dispatch]);

  
    return (
        <>
        <div>{showMessage(submitSucceeded, errorMessage)}</div>
        <FormProvider {...reactHookForm}>
          <form onSubmit={handleSubmit(formSubmitHandler)}>
              <Box className={classes.container}>
                <Typography>Add New Transaction</Typography>
                    <Controller
                      name="text"
                      control={control}
                      rules={{ required: true }}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          {...field}
                          type="text"
                          label="Text"
                          id="standard-full-width"
                          placeholder="Enter Text"
                          variant="outlined"
                          required
                          rows={4}
                          fullWidth
                          margin="normal"
                          error={!!errors.text}
                          helperText={errors.text ? errors.text ?.message : ""}
                          
                        />
                      )}
                    />
              </Box>
              
                <Box className={classes.container}>
                  <Controller
                      name="amount"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          type="number"
                          label="amount"
                          id="standard-full-width"
                          placeholder="Enter Amount"
                          variant="outlined"
                          required
                          rows={4}
                          fullWidth
                          margin="normal"
                          error={!!errors.amount}
                          helperText={errors.amount ? errors.amount ?.message : ""}
                          
                        />
                      )}
                    />
                </Box>
                
                
                <Button 
                  className={classes.button} 
                  type="submit" 
                  variant="contained" 
                >
                  Add Tranaction
                </Button> 
               
                <Button 
                  className={classes.button} 
                  type="submit" 
                  variant="contained" 
                  >
                  Submit
                </Button> 
          </form>
          </FormProvider>
        </>
        
    )
}

export default AddTransaction;



