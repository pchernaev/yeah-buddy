import { useOktaAuth } from "@okta/okta-react";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const { oktaAuth, authState } = useOktaAuth();

  if (!authState) {
    return <SpinnerLoading />;
  }

  const getEmail = () => {
    return authState?.idToken?.claims.email == undefined
      ? ""
      : authState.idToken.claims.email;
  };

  const handleLogout = async () =>
    oktaAuth.signOut({
      postLogoutRedirectUri: `${window.location.origin}/`,
      accessToken: authState.accessToken,
    });

  return (
    <nav className="navbar navbar-dark bg-dark mb-auto navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Yeah Buddy
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample01"
          aria-controls="navbarsExample01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarsExample01"
        >
          <ul className="navbar-nav ">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              {!authState.isAuthenticated ? (
                <></>
              ) : (
                <Link className="nav-link" to="/meals">
                  Meals
                </Link>
              )}
            </li>
            <li className="nav-item">
              {!authState.isAuthenticated ? (
                <></>
              ) : (
                <a className="nav-link disabled">Workouts</a>
              )}
            </li>
            <li className="nav-item">
              {!authState.isAuthenticated ? (
                <></>
              ) : (
                <Link className="nav-link" to="/profile">
                  Profile
                </Link>
              )}
            </li>
            <li className="nav-item">
              {!authState.isAuthenticated ? (
                <Link type="button" className="nav-link" to="/login">
                  Log In
                </Link>
              ) : (
                <a className="nav-link" onClick={handleLogout}>
                  Log Out
                </a>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
