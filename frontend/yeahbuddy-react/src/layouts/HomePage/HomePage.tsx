import { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export const HomePage: React.FC<{auth: any}> = (props) => {
  const history = useHistory();
  const [isAuth, setIsAuth] = useState(false);

  const isAuthenticated =async () => {
    setIsAuth(await props.auth.isAuthenticated());
  }

  async function handleUserData() {
    const user = await props.auth.getUser();
    const email = user.email;
    const response: any = await fetch(
      `http://localhost:8080/user/email=${email}`
    );
    const result: any = await response.json();
    if (result.email == null) {
      history.push("/user-info");
    }
  }
  handleUserData();
  isAuthenticated();

  return (
    <div id="home" className="mt-5">
      <main className="px-5 text-center">
        <h1 id="home__title">Yeah Buddy</h1>
        <h4 className="mb-5">Let your journey begin!</h4>
        <p className="lead">
          {!isAuth ? (
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
