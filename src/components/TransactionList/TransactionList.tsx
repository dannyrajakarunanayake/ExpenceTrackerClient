import { Typography, List, Divider, Box, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../slices";

import Footer from "../Footer";
import TableCharts from "../TableCharts";

import { transactionsList } from "../../slices/transactions";
import Transaction from "../Transaction";

const useStyle = makeStyles({
  container: {
    width: 1650,
    display: "flex",
    "& > *": {
      width: "50%",
      padding: 10,
      height: "70vh",
      marginTop: 20,
    },
  },
});

interface TransactionsProps {
  userId: string;
}

const TranactionList = ({ userId }: TransactionsProps) => {
  const classes = useStyle();
  const dispatch = useDispatch();

  const { transactions } = useSelector(
    (state: RootState) => state.transactions
  );

  useEffect(() => {
    dispatch(transactionsList());
  }, [dispatch]);

  return (
    <>
      <div className="Conatainer-list">
        <Box className={classes.container}>
          <Box>
            <Typography>Transactions History</Typography>
            <Divider style={{ width: "220%" }} />

            <List>
              {transactions &&
                transactions.map((transaction) => {
                  return (
                    <>
                      <Transaction {...transaction} />
                    </>
                  );
                })}
            </List>
          </Box>

          <Box>
            <br />

            <TableCharts />
          </Box>
        </Box>
      </div>
    </>
  );
};

export default TranactionList;
