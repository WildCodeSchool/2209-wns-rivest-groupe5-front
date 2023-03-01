import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import PrivateRoutes from "./components/PrivateRoute";
import AdminPage from "./pages/AdminPage";
import Contribution from "./pages/Contribution";
import Dashboard from "./pages/dashboard/Dashboard";
import GoodDealsFeed from "./pages/GoodDealsFeed";
import GoodDealsForm from "./pages/GoodDealsForm";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MyAccount from "./pages/MyAccount";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import { currentUserState } from "./atom/currentUserAtom";
import { useRecoilState } from "recoil";
import { createTheme, ThemeProvider } from "@mui/material/styles";
<<<<<<< HEAD
import ActivityList from "./pages/ActivityList";
=======
import ResetPasswordStepOnePage from "./pages/ResetPasswordStepOnePage";
import ResetPasswordStepTwoPage from "./pages/ResetPasswordStepTwoPage";
>>>>>>> eea6cf8 (reset password working but need makeup)

function App() {
  const [user, setUser] = useRecoilState(currentUserState);
  console.log(">>>>Current user >>>", user);
  useEffect(() => {
    const currentUserInLocalStorage = JSON.parse(
      localStorage.getItem("user") || "{}"
    );
    setUser(currentUserInLocalStorage);
  }, []);
  const theme = createTheme({
    palette: {
      primary: {
        main: "#2196F3",
        dark: "#1565C0",
        light: "#E3F2FD",
      },
      secondary: {
        main: "#673AB7",
        dark: "#5E35B1",
        light: "#EDE7F6",
      },
    },
  });
  return (
    <div>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/my-account" element={<MyAccount />} />
              <Route path="/good-deals-form" element={<GoodDealsForm />} />
              <Route path="/profile/:userId" element={<ProfilePage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/my-activities" element={<ActivityList />} />
            </Route>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/resetPassword/stepOne"
              element={<ResetPasswordStepOnePage />}
            />
            <Route
              path="/reset-password/*"
              element={<ResetPasswordStepTwoPage />}
            />

            <Route path="/good-deals-feed" element={<GoodDealsFeed />} />

            <Route path="/contribution" element={<Contribution />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
