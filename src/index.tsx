import React from "react";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import Contribution from "./pages/Contribution";
import RegisterPage from "./pages/RegisterPage";
import MyAccount from "./pages/MyAccount";
import ProfilePage from "./pages/ProfilePage";
import Dashboard from "./pages/Dashboard";
import GoodDealsFeed from "./pages/GoodDealsFeed";
import GoodDealsForm from "./pages/GoodDealsForm";
import LoginPage from "./pages/LoginPage";

const client = new ApolloClient({
  uri: "http://localhost:5050/",
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>,
  },
  {
    path: "/register",
    element: <RegisterPage/>,
  },
  {
    path: "/login",
    element: <LoginPage/>,
  },
  {
    path: "/my-account",
    element: <MyAccount/>,
  },
  {
    path: "/profile/:userId",
    element: <ProfilePage/>,
  },
  {
    path: "/dashboard",
    element: <Dashboard/>,
  },
  {
    path: "/good-deals-feed",
    element: <GoodDealsFeed/>,
  },
  {
    path: "/good-deals-form",
    element: <GoodDealsForm/>,
  },
  {
    path: "/contribution",
    element: <Contribution/>,
  },
  {
    path: "/admin",
    element: <AdminPage/>,
  },
]);


root.render(
  <React.StrictMode>
   <RouterProvider router={router}/>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
