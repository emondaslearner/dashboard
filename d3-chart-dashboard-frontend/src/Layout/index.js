import React from "react";
import router from "../Router";
import { Route, Routes } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <AppRouter />
    </>
  );
};

const AppRouter = () => {
  return (
    <Routes>
      {router.map((data, index) => (
        <Route key={index} element={data.element} path={data.path} />
      ))}
    </Routes>
  );
};

export default Layout;
