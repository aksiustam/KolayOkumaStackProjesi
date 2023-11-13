import { Button, Card, Input, Typography } from "@material-tailwind/react";
import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import Logo from "../Public/logo.png";
import { login } from "../redux/userSlice";
const Login = () => {
  const dispatch = useDispatch();

  const [eError, setEError] = useState();
  const { user, isAuth, error, loading } = useSelector((state) => state.user);
  const [data, setData] = useState({
    name: "",
    password: "",
  });
  const onChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const onSignin = async () => {
    if (data.name === "") {
      setEError("Ad Giriniz");
      return;
    }
    if (data.password === "") {
      setEError("Şifre Giriniz");
      return;
    }
    setEError(false);
    await dispatch(login(data));
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <Card color="transparent" shadow={false} className="p-5">
        <div className="flex flex-col items-center justify-center gap-3">
          <img src={Logo} alt="LOGO" className="h-32 w-32 " />
          <Typography variant="h4" color="blue-gray">
            Ender Gençlik Admin Sitesi
          </Typography>
          <Typography variant="h4" color="blue-gray">
            Giriş Yap
          </Typography>
          <div className="text-red-900 text-lg">
            {isAuth
              ? "Hoşgeldiniz..." + user.name
              : loading
              ? "Loading..."
              : eError
              ? eError
              : error?.message}
          </div>
        </div>
        <form className="mt-4 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input onChange={onChange} name="name" size="lg" label="Name" />
            <Input
              onChange={onChange}
              name="password"
              type="password"
              size="lg"
              label="Password"
            />
          </div>

          <Button className="mt-6" fullWidth onClick={onSignin}>
            Giriş Yap
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
