import React from "react";
import { Card, CardContent, makeStyles, Typography, Box } from '@material-ui/core';

const useStyle = makeStyles({
    container: {
        display: 'flex',
        marginTop:40
    },
    trade: {
        flex: 1,
        padding: 10
    },
    income: {
        color: 'green'
    },
    expense: {
        color: 'red'
    }
})

const  IncomeExpenses = () => {
    const classes = useStyle();

  
    
    return (
        <Box className={classes.container}>
            <Card className={classes.trade}>
                <CardContent>
                    <Typography>Income</Typography>
                    <Typography className={classes.income}>+$1000</Typography>
                </CardContent>
            </Card>
            <Card className={classes.trade}>
                <CardContent>
                    <Typography>Expense</Typography>
                    <Typography className={classes.expense}>-$200</Typography>
                </CardContent>
            </Card>
        </Box>
    )
}

export default IncomeExpenses;

