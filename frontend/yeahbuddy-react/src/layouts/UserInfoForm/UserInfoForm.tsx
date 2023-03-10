import { useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { useHistory } from "react-router-dom";

export const UserInfoForm = () => {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [gender, setGender] = useState("MALE");
  const [age, setAge] = useState(16);
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [activity, setActivity] = useState("SEDENTARY");
  const [goal, setGoal] = useState("MAINTAIN");

  const { oktaAuth, authState } = useOktaAuth();

  const history = useHistory();

  if (!authState) {
    return <SpinnerLoading />;
  }

  const fNameChange = (event: any) => {
    setFName(event.target.value);
  };
  const lNameChange = (event: any) => {
    setLName(event.target.value);
  };
  const genderChange = (event: any) => {
    setGender(event.target.value);
  };
  const ageChange = (event: any) => {
    const input = event.target;
    const parentEl = input.parentElement;
    const smallEl = parentEl.lastChild;
    if (input.value < 16) {
      smallEl.classList.remove("hide");
    } else {
      smallEl.classList.add("hide");
      setAge(event.target.value);
    }
  };
  const heightChange = (event: any) => {
    const input = event.target;
    const parentEl = input.parentElement;
    const smallEl = parentEl.lastChild;
    if (input.value < 0) {
      smallEl.classList.remove("hide");
    } else {
      smallEl.classList.add("hide");
      setHeight(event.target.value);
    }
  };
  const weightChange = (event: any) => {
    const input = event.target;
    const parentEl = input.parentElement;
    const smallEl = parentEl.lastChild;
    if (input.value < 0) {
      smallEl.classList.remove("hide");
    } else {
      smallEl.classList.add("hide");
      setWeight(event.target.value);
    }
  };
  const activityChange = (event: any) => {
    setActivity(event.target.value);    
  };
  const goalChange = (event: any) => {
    setGoal(event.target.value);
  };

  function handleRedirect(response: any) {
    if (response.status == 201) {
      history.push("/home");
    } else {
      throw new Error("Something went wrong!");
    }
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const email: any = authState.idToken?.claims.email;

    const client: Object = {
      email: email,
      firstName: fName,
      lastName: lName,
      gender: gender,
      age: age,
      height: height,
      weight: weight,
      activity: activity,
      goal: goal
    };
    

    await fetch("http://localhost:8080/user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(client),
    }).then(handleRedirect);
  };

  return (
    <div className="container mt-4" id="userFormContainer">
      <form onSubmit={handleSubmit}>
        <div className="row mb-5">
          <div className="col">
            <div className="form-outline">
              <label className="form-label">First name</label>

              <input
                type="text"
                className="form-control"
                required
                onChange={fNameChange}
              />
            </div>
          </div>
          <div className="col">
            <div className="form-outline">
              <label className="form-label">Last name</label>

              <input
                type="text"
                className="form-control"
                required
                onChange={lNameChange}
              />
            </div>
          </div>
        </div>

        <div className="form-check form-check-inline mb-4">
          <label className="form-check-label">Male</label>

          <input
            className="form-check-input border border-dark"
            type="radio"
            name="inlineRadioOptions"
            value="MALE"
            defaultChecked
            onClick={genderChange}
          />
        </div>
        <div className="form-check form-check-inline">
          <label className="form-check-label">Female</label>

          <input
            className="form-check-input border border-dark"
            type="radio"
            name="inlineRadioOptions"
            value="FEMALE"
            onClick={genderChange}
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label">Age</label>

          <input
            type="number"
            className="form-control"
            onChange={ageChange}
            required
            min="16"
          />
          <small className="hide">You must be 16 or older</small>
        </div>

        <div className="form-outline mb-4">
          <label className="form-label">Height</label>
          <input
            type="number"
            className="form-control"
            onChange={heightChange}
            required
            min="0"
          />
          <small className="hide">Height can not be below 0</small>
        </div>

        <div className="form-outline mb-4">
          <label className="form-label">Weight</label>
          <input
            type="number"
            className="form-control"
            onChange={weightChange}
            required
            min="0"
          />
          <small className="hide">Weight can not be below 0</small>
        </div>
        <div className="activity form-outline mb-4">
          <label htmlFor="">Activity:</label>
          <select className="form-control" id="" onClick={activityChange}>
            <option value="SEDENTARY">Sedentary</option>
            <option value="LIGHTLY">Lightly</option>
            <option value="MODERATELY">Moderately</option>
            <option value="VERY">Very</option>
            <option value="EXTRA">Extra</option>
          </select>
        </div>
        <div className="dropdown form-outline mb-5">
          <label htmlFor="">Goal:</label>
          <select
            className="form-control"
            id=""
            onClick={goalChange}
            defaultValue={"MAINTAIN"}
          >
            <option value="EXTREAM_CUT">Extream cut</option>
            <option value="CUT">Cut</option>
            <option value="MAINTAIN">Maintain</option>
            <option value="BULK">Bulk</option>
            <option value="EXTREAM_BULK">Extream Bulk</option>
          </select>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary btn-block mb-5">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
