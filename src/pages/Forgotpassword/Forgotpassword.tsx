import React, { useState } from "react";
import Footer from "../../components/Footer";
import { tempPasswordUpdate } from "../../slices/forgotpassword";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../slices";
import { useForm, FormProvider, Controller } from "react-hook-form";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import styled from "styled-components";

const SCEcommerceForgot = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: space-around;
  align-items: center;
  padding: 100px;
  width: 100%;
  flex-direction: column;
  margin: 30px 30px 30px 30px;

  .forgot-wrapper {
    width: 100%;
  }
  .forgot-header {
    display: flex;
    justify-content: center;
    justify-content: space-between;
    h2 {
      font-weight: normal;
      justify-content: flex-start;
      padding-left: 0.86em;
      display: flex;
      align-items: center;
      color: blue;
      padding: 0;
    }
    label {
      color: blue;
    }
  }

  .input-field {
    margin-bottom: 2em;
    text-color: blue;
  }

  .forgot-form {
    margin-top: auto;
    padding-right: 0;
  }
  .forgot-button {
    text-align: center;
    margin-top: 3.33em;
    margin-bottom: 3.33em;
    font-weight: bold;
    font-size: 0.86em;
    display: flex;
    justify-content: center;
    height: 45px;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    width: 35%;
  }
`;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: "25ch",
    },
  })
);
type ForgotPassword = {
  username: "";
};

function Forgotpassword() {
  const [username, setUsername] = useState("");
  //const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const reactHookForm = useForm<ForgotPassword>({});
  const { handleSubmit, control } = reactHookForm;
  const { errorMessage, submitSucceeded } = useSelector(
    (state: RootState) => state.forgotPassword
  );

  const onSubmit = (data: any) => {
    /// validation is complete now we gotta dispatch to the event to the reducer
    dispatch(tempPasswordUpdate(data));
  };

  const pageName = "ForgotPassword";

  return (
    <>
      <SCEcommerceForgot>
        <div className="forgot-wrapper">
          <div className="forgot-header">
            <h2>{pageName}</h2>
          </div>
          <FormProvider {...reactHookForm}>
            <form
              onSubmit={handleSubmit((onSubmit) => console.log(onSubmit))}
              autoComplete="off"
              className="forgot-form"
            >
              <Controller
                control={control}
                name="username"
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="standard-full-width"
                    label="Username"
                    style={{ margin: 8 }}
                    placeholder="Username"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />

              <div className="forgot-button">
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </SCEcommerceForgot>
      <Footer />
    </>
  );
}
export default Forgotpassword;
