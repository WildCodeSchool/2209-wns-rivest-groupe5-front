import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import PrivateRoutes from "./components/PrivateRoute";
import AdminPage from "./pages/AdminPage";
import Contribution from "./pages/Contribution";
import GoodDealsFeed from "./pages/GoodDealsFeed";
import GoodDealsForm from "./pages/GoodDealsForm";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MyAccount from "./pages/MyAccount";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import { currentUserState } from "./atom/currentUserAtom";
import { useRecoilState } from "recoil";
import { ThemeProvider } from "@mui/material/styles";
import ResetPasswordStepOnePage from "./pages/ResetPasswordStepOnePage";
import ResetPasswordStepTwoPage from "./pages/ResetPasswordStepTwoPage";
import LayoutRoot from "./layout/LayoutRoot";
import Dashboard from "./pages/dashboard/Dashboard";
import FollowedUsersActivitiesList from "./pages/FollowedUsersAcitivities";
import PublicLayout from "./layout/PublicLayout";
import { theme } from "./assets/Styles/theme";
import AllActivityListPage from "./pages/AllActivityListPage";

function App() {
  const [user, setUser] = useRecoilState(currentUserState);
  console.log(">>>>Current user >>>", user);
  useEffect(() => {
    const currentUserInLocalStorage = JSON.parse(
      localStorage.getItem("user") || "{}"
    );
    setUser(currentUserInLocalStorage);
  }, []);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Public routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />

              <Route path="/contribution" element={<Contribution />} />
              <Route
                path="/resetPassword/stepOne"
                element={<ResetPasswordStepOnePage />}
              />
              <Route
                path="/reset-password/*"
                element={<ResetPasswordStepTwoPage />}
              />
            </Route>

            {/* Routes accessibles in public and in private, only layout around changes */}
            {user && Object.keys(user).length !== 0 ? (
              <Route element={<LayoutRoot />}>
                <Route path="/profile/:userId" element={<ProfilePage />} />
                <Route path="/good-deals-feed" element={<GoodDealsFeed />} />
              </Route>
            ) : (
              <Route element={<PublicLayout />}>
                <Route path="/profile/:userId" element={<ProfilePage />} />
                <Route path="/good-deals-feed" element={<GoodDealsFeed />} />
              </Route>
            )}

            {/* Private routes only */}
            <Route element={<LayoutRoot />}>
              <Route element={<PrivateRoutes />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/my-account" element={<MyAccount />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route
                  path="/followed-activities-feed"
                  element={<FollowedUsersActivitiesList />}
                />
                <Route
                  path="/my-activities"
                  element={<AllActivityListPage />}
                />
                <Route path="/good-deals-form" element={<GoodDealsForm />} />
                <Route path="/my-account" element={<MyAccount />} />
                <Route path="/profile/:userId" element={<ProfilePage />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
