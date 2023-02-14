import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SpinnerLoading } from "../Utils/SpinnerLoading";

export const Profile: React.FC<{ auth: any }> = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState("");
  const [goal, setGoal] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const email = await getEmail();

      const response = await fetch(`http://localhost:8080/user/email=${email}`);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      setFirstName(responseData.firstName);
      setLastName(responseData.lastName);
      setAge(responseData.age);
      setHeight(responseData.height);
      setWeight(responseData.weight);
      switch (responseData.activity) {
        case "SEDENTARY":
          setActivity("Sedentary");
          break;
        case "LIGHTLY":
          setActivity("Lightly");
          break;
        case "MODERATELY":
          setActivity("Moderately");
          break;
        case "VERY":
          setActivity("Very");
          break;
        case "EXTRA":
          setActivity("Extra");
          break;
      }
      switch (responseData.goal) {
        case "EXTREAM_CUT":
          setGoal("Extream cut");
          break;
        case "CUT":
          setGoal("Cut");
          break;
        case "MAINTAIN":
          setGoal("Maintain");
          break;
        case "BULK":
          setGoal("Bulk");
          break;
        case "EXTREAM_BULK":
          setGoal("Extream Bulk");
          break;
      }
    setIsLoading(false);
    };
    fetchUser();
  }, []);

  if(isLoading){
    return <SpinnerLoading />
  }

  async function getEmail() {
    const user = await props.auth.getUser();
    return user.email;
  }

  return (
    <div className="container mt-5" id="profile">
      <div className="form-outline mb-4">
        <label className="form-label h4">First name:</label>
        <p className="h5 text-muted">{firstName}</p>
      </div>

      <div className="form-outline mb-4 ">
        <label className="form-label h4">Last name:</label>
        <p className="h5 text-muted">{lastName}</p>
      </div>

      <div className="form-outline mb-4 ">
        <label className="form-label h4">Age:</label>
        <p className="h5 text-muted">{age}</p>
      </div>

      <div className="form-outline mb-4">
        <label className="form-label h4">Height:</label>
        <p className="h5 text-muted">{height}</p>
      </div>

      <div className="form-outline mb-4">
        <label className="form-label h4">Weight:</label>
        <p className="h5 text-muted">{weight}</p>
      </div>
      <div className="form-outline mb-4">
        <label className="form-label h4">Activity:</label>
        <p className="h5 text-muted">{activity}</p>
      </div>
      <div className="form-outline mb-5">
        <label className="form-label h4">Goal:</label>
        <p className="h5 text-muted">{goal}</p>
      </div>
      <Link to="/edit-profile" className="btn btn-secondary">
        Edit
      </Link>
    </div>
  );
};
