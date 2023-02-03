import { useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { useHistory } from "react-router-dom";

export const HomePage = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const history = useHistory();

  if (!authState) {
    return <SpinnerLoading />;
  }

  if (authState.isAuthenticated) {
    handleUserData(authState);
  }

  async function handleUserData(authState: any) {
    const email: any = authState.idToken?.claims.email;
    const response: any = await fetch(
      `http://localhost:8080/user/email=${email}`
    );
    const result: any = await response.json();
    if (result.email == null) {
      history.push("/user-info");
    }
  }

  return (
    <div id="home" className="mt-5">
      <main className="px-5 text-center">
        <h1 id="home__title">Yeah Buddy</h1>
        <h4 className="mb-5">Let your journey begin!</h4>
        <p className="lead">
          {!authState.isAuthenticated ? (
            <Link
              type="button"
              className="btn btn-lg btn-light fw-bold border-white bg-white"
              to="/login"
            >
              Start now
            </Link>
          ) : (
            <></>
          )}
        </p>
      </main>
    </div>
  );
};
