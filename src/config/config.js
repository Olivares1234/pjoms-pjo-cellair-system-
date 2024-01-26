import { lazy } from "react";
const PoItemsView = lazy(() => import("../views/PoItemsView"));
const JoListView = lazy(() => import("../views/JoListView"));
const LogsView = lazy(() => import("../views/LogsView"));

export const brandname_lg = { name: "PJO", suffix: "MS" }; //BRANDNAME TO BE DISPLAY WHEN ON LG MODE,MAX OF 10 CHARACTERS FOR NAME AND 5 FOR SUFFIX
export const brandname_sm = "pjo"; //SHORTER NAME or acronym for BRANDNAME TO BE DISPLAY WHEN ON MOBILE SIZE, MAX OF 8 CHARACTERS ONLY
export const redirect_path = "/items"; //redirect path if successfully logged in
export const API = process.env.REACT_APP_API_URL; //api link

//https://ant.design/components/icon/ for icons
export const routes = [
  //array for routes
  {
    component: PoItemsView,
    title: "purchase order items",
    icon: "file-invoice",
    view: true, //change to false if you dont want this route to be on sidebar menu
    path: "/items",
  },
  {
    component: JoListView,
    title: "Job order list",
    icon: "list",
    view: true, //change to false if you dont want this route to be on sidebar menu
    path: "/jolist",
  },
  {
    component: LogsView,
    title: "Logs",
    icon: "history",
    view: true, //change to false if you dont want this route to be on sidebar menu
    path: "/logs",
  },
];
