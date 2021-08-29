import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../slices";
import { login } from "../../slices/auth";
import { Link, useHistory } from "react-router-dom";
import { useForm, FormProvider, Controller } from "react-hook-form";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import styled from "styled-components";

const SCEcommerceLogin = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: space-around;
  align-items: center;
  padding: 100px;
  width: 100%;
  flex-direction: column;
  margin: 30px 30px 30px 30px;

  .login-wrapper {
    width: 100%;
  }
  .login-header {
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

  .login-form {
    margin-top: auto;
    padding-right: 0;
  }
  .login-button {
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
    width: 100%;
  }

  .login-password {
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
type FormData = {
  username: string;
  password: string;
};
interface LoginProps {}
const Login = (props: LoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  let history = useHistory();

  const reactHookForm = useForm<FormData>({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();
  const { authToken } = useSelector((state: RootState) => state.auth);

  const formSubmitHandler = (formData: FormData) => {
    /// validation is complete now we gotta dispatch to the event to the reducer
    dispatch(login(formData.username, formData.password));
  };

  useEffect(() => {
    if (authToken) {
      history.push("/dashboard");
    }
  }, [authToken, history]);

  const pageName = "Login";

  return (
    <>
      <SCEcommerceLogin>
        <div className="login-wrapper">
          <div className="login-header">
            <h2>{pageName}</h2>
          </div>
          <FormProvider {...reactHookForm}>
            <form
              onSubmit={handleSubmit(formSubmitHandler)}
              autoComplete="off"
              className="login-form"
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
                    rows={4}
                    fullWidth
                    margin="normal"
                    error={!!errors.username}
                    helperText={errors.username ? errors.username?.message : ""}
                  />
                )}
              />

              {/* {errors.password && "This required"} */}

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
                    rows={4}
                    fullWidth
                    margin="normal"
                    error={!!errors.password}
                    helperText={errors.password ? errors.password?.message : ""}
                  />
                )}
              />

              <div className="login-password">
                <Link to="/forgotpassword">
                  <Button
                    onClick={() => console.log("click me")}
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Forgot Password
                  </Button>
                </Link>
              </div>

              <div className="login-button">
                <Button type="submit" variant="contained" color="primary">
                  Login
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </SCEcommerceLogin>
      <Footer />
    </>
  );
};

export default Login;
