import axios, { AxiosInstance } from "axios";
import { AnyAction } from "redux";

export type LoginSuccessResponse = {
  authToken: string;
};
export type RegisterSuccessResponse = {
  username: string;
  password: string;
};
export type ResetPasswordSuccess = {
  authToken: string;
  newPassword: string;
};
export type AddTransactionsSuccess = {
  transaction: {
    userId: string;
    text: string;
    amount: number;
  };
};

class CustomerAPI {
  axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: {
        common: {
          "x-auth-token": `${localStorage.getItem("authToken")}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    });
  }

  static login = async (): // username: string,
  // password: string
  Promise<LoginSuccessResponse> => {
    try {
      const url = `/api/v1/auth`;
      const response = await axios.get(process.env.REACT_APP_API_URL + url, {
        // username,
        // password,
      });

      if (response.data.authToken) {
        return {
          authToken: response.data.authToken,
        };
      } else {
        throw new Error("Unexpected error. Please try again");
      }
    } catch (error) {
      if (error.isAxiosError) {
        throw new Error(error.response.data.message);
      }
      throw new Error("Unexpected error. Please try again");
    }
  };

  forgotPassword = async (
    userCredentials: any
  ): Promise<ResetPasswordSuccess> => {
    try {
      const url = `/api/v1/forgotpassword`;
      const response = await axios.post<ResetPasswordSuccess>(
        process.env.REACT_APP_API_URL + url,
        {
          userCredentials,
        }
      );
      if (response.data) {
        return {
          ...response.data,
        };
      } else {
        throw new Error("Unexpected error. Please try again");
      }
    } catch (error) {
      if (error.isAxiosError) {
        throw new Error(error.response.data.message);
      }
      throw new Error("Unexpected error. Please try again");
    }
  };

  register = async (
    username: string,
    password: string
  ): Promise<RegisterSuccessResponse> => {
    try {
      const url = `/api/v1/register`;
      const response = await axios.post<RegisterSuccessResponse>(
        process.env.REACT_APP_API_URL + url,
        {
          username,
          password,
        }
      );

      if (response.data) {
        return {
          ...response.data,
        };
      } else {
        throw new Error("Unexpected error. Please try again");
      }
    } catch (error) {
      if (error.isAxiosError) {
        throw new Error(error.response.data.message);
      }
      throw new Error("Unexpected error. Please try again");
    }
  };

  addTransactions = async (
    text: string,
    amount: number
  ): Promise<AddTransactionsSuccess> => {
    try {
      const url = `/api/v1/transactions`;
      const response = await this.axiosInstance.post<AddTransactionsSuccess>(
        process.env.REACT_APP_API_URL + url,
        {
          text,
          amount,
        }
      );

      if (response.data) {
        return {
          ...response.data,
        };
      } else {
        throw new Error("Unexpected error. Please try again");
      }
    } catch (error) {
      if (error.isAxiosError) {
        throw new Error(error.response.data.message);
      }
      throw new Error("Unexpected error. Please try again");
    }
  };

  listTransactions = async (): Promise<any> => {
    try {
      const url = `/api/v1/transactions`;
      const response = await this.axiosInstance.get(
        process.env.REACT_APP_API_URL + url
      );
      console.log(response.data);
      if (response.data) {
        return {
          ...response.data,
        };
      } else {
        throw new Error("Unexpected error. Please try again");
      }
    } catch (error) {
      if (error.isAxiosError) {
        throw new Error(error.response.data.message);
      }
      throw new Error("Unexpected error. Please try again");
    }
  };
}

export default CustomerAPI;
