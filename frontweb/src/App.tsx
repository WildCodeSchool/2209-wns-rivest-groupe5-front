import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import PrivateRoutes from './components/PrivateRoute'
import AdminPage from './pages/AdminPage'
import GoodDealsFeed from './pages/GoodDealsFeed'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import MyAccount from './pages/MyAccount'
import ProfilePage from './pages/ProfilePage'
import RegisterPage from './pages/RegisterPage'
import { currentUserState } from './atom/currentUserAtom'
import { useRecoilState } from 'recoil'
import { ThemeProvider } from '@mui/material/styles'
import ResetPasswordStepOnePage from './pages/ResetPasswordStepOnePage'
import ResetPasswordStepTwoPage from './pages/ResetPasswordStepTwoPage'
import LayoutRoot from './layout/LayoutRoot'
import Dashboard from './pages/dashboard/Dashboard'
import FollowedUsersActivitiesList from './pages/FollowedUsersAcitivities'
import PublicLayout from './layout/PublicLayout'
import { theme } from './assets/Styles/theme'
import GoodDealDetails from './pages/GoodDealDetails'
import ActivityListPage from './pages/ActivityListPage'
import CreateActivityPage from './pages/CreateActivityPage'
import GoodDealsForm from './pages/GoodDealsForm'
import { useQuery } from '@apollo/client'
import { GET_MY_USER_DATA } from './graphql/queries/users/getMyUserData'
import { GET_ALL_GOOD_DEALS } from './graphql/queries/goodDeals/getAllGoodDeals'
import { GET_ALL_MY_GOOD_DEALS } from './graphql/queries/goodDeals/getAllMyGoodDeals'

function App() {
  const [user, setUser] = useRecoilState(currentUserState)

  // will try to use a token from localstorage to make connexion
  useQuery(GET_MY_USER_DATA, {
    onCompleted(data) {
      setUser(data.getMyUserData)
    },
    onError() {
      setUser(null)
      localStorage.removeItem('token')
    },
  })

  const goodDealsFeedRoute = (
    <Route
      path="/good-deals-feed"
      element={
        <GoodDealsFeed
          isCurrentUser={false}
          getGoodDealsQuery={GET_ALL_GOOD_DEALS}
        />
      }
    />
  )
  return (
    <div>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
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
                {goodDealsFeedRoute}
              </Route>
            ) : (
              <Route element={<PublicLayout />}>
                <Route path="/profile/:userId" element={<ProfilePage />} />
                {goodDealsFeedRoute}
              </Route>
            )}

            <Route element={<LayoutRoot />}>
              <Route element={<PrivateRoutes />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/my-account" element={<MyAccount />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route
                  path="/followed-activities-feed"
                  element={<FollowedUsersActivitiesList />}
                />
                <Route path="/good-deals-form" element={<GoodDealsForm />} />
                <Route path="/good-deals-form" element={<GoodDealsForm />} />

                <Route
                  path="/my-good-deals"
                  element={
                    <GoodDealsFeed
                      isCurrentUser={true}
                      getGoodDealsQuery={GET_ALL_MY_GOOD_DEALS}
                    />
                  }
                />

                <Route path="/my-account" element={<MyAccount />} />
                <Route path="/profile/:userId" element={<ProfilePage />} />
                <Route
                  path="/good-deal/:goodDealId"
                  element={<GoodDealDetails />}
                />
                <Route
                  path="/my-activities"
                  element={<ActivityListPage isAllList={true} />}
                />
                <Route
                  path="/create-activity"
                  element={<CreateActivityPage />}
                />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  )
}

export default App
