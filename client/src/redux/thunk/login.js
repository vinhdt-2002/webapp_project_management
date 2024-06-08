import { createAsyncThunk } from "@reduxjs/toolkit";
import { postApi } from "../../utils/api";

const login = createAsyncThunk("users/login", async (data, thunkApi) => {
  try {
    console.log("Sending login request with data:", data); // Log data being sent to login endpoint
    const res = await postApi("/login", data);
    console.log("Received response:", res.data); // Log response data
    return res.data;
  } catch (error) {
    const errMsg = error.response.data.err || error.message;
    console.error("Error occurred during login:", errMsg); // Log error message
    return thunkApi.rejectWithValue(errMsg);
  }
});

export default login;
