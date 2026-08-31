import React from "react";
import { Outlet } from "react-router";
import MenuAppBar from "./AppBar";

function MainLayout() {
  return (
    <>
      <MenuAppBar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
