import React from "react";
import { Route, Routes } from "react-router-dom";
import { isAuthPages, pages } from "../routing/routes";
import { useSelector } from "react-redux";

export default function Layout() {
  const isAuth = useSelector((state) => state.auth.isAuth);

  return (
    <Routes>
      {pages.map((i) => {
        return (
          <Route key={i.id} path={i.path} exact={true} element={i.component} />
        );
      })}
      {isAuth &&
        isAuthPages.map((i) => {
          return (
            <Route
              key={i.id}
              path={i.path}
              exact={true}
              element={i.component}
            />
          );
        })}
    </Routes>
  );
}
