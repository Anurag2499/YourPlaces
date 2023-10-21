import './App.css';
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import Users from './user/components/pages/Users';
// import NewPlace from './places/components/pages/NewPlace';
// import UserPlaces from './places/components/pages/UserPlaces';
// import UpdatePlace from './places/components/pages/UpdatePlace';
// import Auth from './user/components/pages/Auth';
import { Redirect, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';

const Users = React.lazy(() => import('./user/components/pages/Users'));
const NewPlace = React.lazy(() => import('./places/components/pages/NewPlace'));
const UserPlaces = React.lazy(() =>
  import('./places/components/pages/UserPlaces')
);
const UpdatePlace = React.lazy(() =>
  import('./places/components/pages/UpdatePlace')
);
const Auth = React.lazy(() => import('./user/components/pages/Auth'));

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { token, login, logout, userId } = useAuth();

  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId">
          <UpdatePlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Suspense
            fallback={
              <div className="center">
                <LoadingSpinner />
              </div>
            }
          >
            {routes}
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
