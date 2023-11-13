import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: {},
  token: null,
  error: null,
  loading: false,
  authloading: true,
  isAuth: false,
};

export const login = createAsyncThunk("login", async (data, thunkAPI) => {
  try {
    const response = await axios.post("http://localhost:5000/auth/login", data);

    if (response.data) {
      localStorage.setItem("jwt", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data));
      return response.data;
    }
  } catch (error) {
    if (error.response && error.response.status === 500)
      return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const refresh = createAsyncThunk("refresh", async (thunkAPI) => {
  const token = document.cookie.split("=")[1];
  const response = await axios.get("https://api.anadolutab.com/user/detail", {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(response.status);
  if (response.status === 500 || response.status === 401) {
    const errorData = response.data;
    console.log(errorData);
    return thunkAPI.rejectWithValue(errorData);
  }

  if (response.status === 200) {
    const data = response.data;
    return data;
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.authloading = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      const data = JSON.parse(action.payload);

      state.user = data;
      state.isAuth = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
      state.isAuth = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuth = true;
      state.error = null;
      state.token = action.payload.token;
      state.user = action.payload.data;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.isAuth = false;
      state.error = action.payload;
    });
    builder.addCase(refresh.pending, (state, action) => {
      state.authloading = true;
      state.isAuth = false;
    });
    builder.addCase(refresh.fulfilled, (state, action) => {
      state.isAuth = true;
      state.error = null;
      state.authloading = false;
      state.user = action.payload;
    });
    builder.addCase(refresh.rejected, (state, action) => {
      state.isAuth = false;
      state.authloading = false;
      state.error = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setToken, setLoading, setUser } = userSlice.actions;
export default userSlice.reducer;
