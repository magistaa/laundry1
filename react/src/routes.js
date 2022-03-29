/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Paket from "views/Paket.js";
import Member from "views/Member.js";
import User from "views/User.js";
import Transaksi from "views/Transaksi.js";
import FormTransaksi from "views/FormTransaksi.js";
import Outlet from "views/Outlet.js";

import Login from "views/Login.js";

const dashboardRoutes = [
  // {
  //   path: "/login",
  //   name: "Login",
  //   icon: "nc-icon nc-alien-33",
  //   component: Login,
  //   layout: "/admin",
  // },
  {
    path: "/dashboard",
    name: "Home",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/paket",
    name: "Jenis Paket",
    icon: "nc-icon nc-paper-2",
    component: Paket,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "User",
    icon: "nc-icon nc-notes",
    component: User,
    layout: "/admin",
  },
  {
    path: "/member",
    name: "Member",
    icon: "nc-icon nc-circle-09",
    component: Member,
    layout: "/admin",
  },
  {
    path: "/transaksi",
    name: "Transaksi",
    icon: "nc-icon nc-atom",
    component: Transaksi,
    layout: "/admin",
  },
  {
    path: "/outlet",
    name: "Outlet",
    icon: "nc-icon nc-pin-3",
    component: Outlet,
    layout: "/admin",
  },
  {
    path: "/formtransaksi",
    name: "Form Transaksi",
    icon: "nc-icon nc-bell-55",
    component: FormTransaksi,
    layout: "/admin",
  },
];

export default dashboardRoutes;
