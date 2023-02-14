import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { SpinnerLoading } from "../Utils/SpinnerLoading";

export const EditProfile: React.FC<{ auth: any }> = (props) => {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [age, setAge] = useState(16);
  const [gender, setGender] = useState("MALE");
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [activity, setActivity] = useState("SEDENTARY");
  const [goal, setGoal] = useState("MAINTAIN");
  const [isLoading, setIsLaoding] = useState(true);

  const history = useHistory();

  useEffect(() => {
    const fetchUser = async () => {
      const email = await getEmail();

      const response = await fetch(`http://localhost:8080/user/email=${email}`);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      setFName(responseData.firstName);
      setLName(responseData.lastName);
      setAge(responseData.age);
      setGender(responseData.gender);
      setHeight(responseData.height);
      setWeight(responseData.weight);
      setActivity(responseData.activity);
      setGoal(responseData.goal);
      setIsLaoding(false);
    };
    fetchUser();
  }, []);

  async function getEmail() {
    const user = await props.auth.getUser();
    return user.email;
  }

  const fNameChange = (event: any) => {
    setFName(event.target.value);
  };
  const lNameChange = (event: any) => {
    setLName(event.target.value);
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
    if (response.status == 200) {
      history.push("/home");
    } else {
      throw new Error("Something went wrong!");
    }
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const email = await getEmail();

    const client: Object = {
      firstName: fName,
      lastName: lName,
      email: email,
      gender: gender,
      age: age,
      height: height,
      weight: weight,
      activity: activity,
      goal: goal,
    };

    await fetch(`http://localhost:8080/user/email=${email}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(client),
    }).then(handleRedirect);
  };

  if (isLoading) {
    return <SpinnerLoading />;
  }

  return (
    <div className="container mt-5" id="edit_profle">
      <form onSubmit={handleSubmit}>
        <div className="row mb-4">
          <div className="col">
            <div className="form-outline">
              <label className="form-label">First name</label>

              <input
                type="text"
                className="form-control"
                onChange={fNameChange}
                required
                defaultValue={fName}
              />
            </div>
          </div>
          <div className="col">
            <div className="form-outline">
              <label className="form-label">Last name</label>

              <input
                type="text"
                className="form-control"
                onChange={lNameChange}
                required
                defaultValue={lName}
              />
            </div>
          </div>
        </div>

        <div className="form-outline mb-4">
          <label className="form-label">Age</label>

          <input
            type="number"
            className="form-control"
            onChange={ageChange}
            defaultValue={age}
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
            defaultValue={height}
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
            defaultValue={weight}
            required
            min="0"
          />
          <small className="hide">Weight can not be below 0</small>
        </div>
        <div className="activity form-outline mb-4">
          <label htmlFor="">Activity:</label>
          <select
            className="form-control"
            id=""
            onChange={activityChange}
            defaultValue={activity}
            required
            value={activity}
          >
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
            onChange={goalChange}
            defaultValue={"MAINTAIN"}
            value={goal}
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
