import { Button, Typography } from "@material-tailwind/react";
import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import Logo from "../Public/logo.png";
const AdminSidebar = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <aside
      className={` bg-light-green-900 fixed  z-50 my-4 ml-4 h-[calc(100vh-32px)] w-48 rounded-xl  `}
    >
      <Link to="/">
        <div className="flex flex-col items-center gap-2  py-4 px-8">
          <img src={Logo} alt="LOGO" className="h-24 w-24 " />
          <div className={`border w-full  border-white/80 `} />
          <Typography variant="small" color="white">
            Hoşgeldiniz : {user.name}
          </Typography>
          <div className={`border w-full  border-white/80 `} />
        </div>
      </Link>
      <div className="m-4">
        <ul className="mb-4 flex flex-col gap-1">
          <li>
            <NavLink to={`/`}>
              <Button
                variant="text"
                color="white"
                className="flex items-center gap-4 capitalize"
                fullWidth
              >
                <Typography
                  variant="small"
                  color="white"
                  className="font-black uppercase opacity-75"
                >
                  Home
                </Typography>
              </Button>
            </NavLink>
          </li>
          <li>
            <NavLink to={`/Book`}>
              <Button
                variant="text"
                color="white"
                className="flex items-center gap-4 capitalize"
                fullWidth
              >
                <Typography
                  variant="small"
                  color="white"
                  className="font-black uppercase opacity-75"
                >
                  Kitaplar
                </Typography>
              </Button>
            </NavLink>
          </li>
          <li>
            <NavLink to={`/Video`}>
              <Button
                variant="text"
                color="white"
                className="flex items-center gap-4 capitalize"
                fullWidth
              >
                <Typography
                  variant="small"
                  color="white"
                  className="font-black uppercase opacity-75"
                >
                  Videolar
                </Typography>
              </Button>
            </NavLink>
          </li>
          <li>
            <NavLink to={`/Ayarlar`}>
              <Button
                variant="text"
                color="white"
                className="flex items-center gap-4 capitalize"
                fullWidth
              >
                <Typography
                  variant="small"
                  color="white"
                  className="font-black uppercase opacity-75"
                >
                  Ayarlar
                </Typography>
              </Button>
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default AdminSidebar;
