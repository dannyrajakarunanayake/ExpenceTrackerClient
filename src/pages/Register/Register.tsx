import React, { useState, useEffect } from "react";
//import { Form, Button, Card } from "react-bootstrap";
import Footer from "../../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { RootState } from "../../slices";
import Axios from "axios";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import styled from "styled-components";
import { registerUser } from "../../slices/register";

const SCEcommerceRegister = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: space-around;
  align-items: center;
  padding: 100px;
  width: 100%;
  flex-direction: column;
  margin: 30px 30px 30px 30px;

  .register-wrapper {
    width: 100%;
  }
  .register-header {
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

  .register-form {
    margin-top: auto;
    padding-right: 0;
  }
  .register-button {
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

type RegisterData = {
  username: string;
  password: string;
};
interface RegisterProps {}
function Register(props: RegisterProps) {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessages, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  let history = useHistory();

  const reactHookForm = useForm<RegisterData>({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onSubmit",
  });
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<RegisterData>();

  const { errorMessage, submitSucceeded } = useSelector(
    (state: RootState) => state.register
  );
  const formSubmitHandler = (registerData: RegisterData) => {
    /// validation is complete now we gotta dispatch to the event to the reducer
    dispatch(registerUser(registerData.username, registerData.password));
    console.log(registerData);
  };

  // const registerdata = () => {
  //   Axios.post("http://localhost:5000/api/v1/register", {
  //     username,
  //     password,
  //   }).then((response) => {
  //     if (response.data.authToken) {
  //       localStorage.getItem("authToken");
  //       localStorage.getItem("username");
  //       history.push("/login");
  //     } else {
  //       setErrorMessage(response.data.message);
  //     }
  //   });
  // };

  useEffect(() => {
    if (submitSucceeded) {
      history.push("/auth");
    }
  }, [submitSucceeded, history]);

  const pageName = "Register";
  return (
    <>
      <SCEcommerceRegister>
        <div className="register-wrapper">
          <div className="register-header">
            <h2>{pageName}</h2>
          </div>
          <form
            onSubmit={handleSubmit(formSubmitHandler)}
            autoComplete="off"
            className="register-form"
          >
            <Controller
              name="username"
              control={control}
              rules={{ required: true }}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  type="text"
                  id="standard-full-width"
                  label="Username"
                  style={{ margin: 8 }}
                  placeholder="Username"
                  variant="outlined"
                  required
                  fullWidth
                  margin="normal"
                  error={!!errors.username}
                  helperText={errors.username ? errors.username?.message : ""}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  id="standard-full-width"
                  label="Password"
                  style={{ margin: 8 }}
                  placeholder="Password"
                  variant="outlined"
                  required
                  fullWidth
                  margin="normal"
                  error={!!errors.password}
                  helperText={errors.password ? errors.password?.message : ""}
                />
              )}
            />
            <div className="register-button">
              <Button
                //onClick={registerdata}
                type="submit"
                variant="contained"
                color="primary"
              >
                Register
              </Button>
            </div>
          </form>
        </div>
      </SCEcommerceRegister>
      <Footer />
    </>
  );
}

export default Register;
