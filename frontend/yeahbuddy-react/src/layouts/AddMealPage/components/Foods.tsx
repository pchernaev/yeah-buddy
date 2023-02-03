import FoodModel from "../../../models/FoodModel";
import SaveMealModal from "./SaveMealModal";
import useModal from "../../../hooks/useModel";
import { useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { useHistory } from "react-router-dom";

export const Foods: React.FC<{ food: FoodModel }> = (props) => {
  const { isOpen, toggle } = useModal();
  const [size, setSize] = useState(0);
  const [group, setGroup] = useState(0);
  const { oktaAuth, authState } = useOktaAuth();
  const history = useHistory();

  const getEmail = () => {
    return authState?.idToken?.claims.email == undefined
      ? ""
      : authState.idToken.claims.email;
  };

  function changeSize(e: any) {
    setSize(parseFloat(e.target.value));
  }

  function changeGroup(e: any){
    setGroup(parseInt(e.target.value));
  }

  function handleRedirect(response: any) {
    console.log(response);
    if (response.status == 201) {
      history.push("/meals");
    } else {
      throw new Error("Something went wrong!");
    }
  }

  async function handleSubmit(e: any){
    e.preventDefault();

    const foodId: number = props.food.id;
    const email: string = getEmail();
    const date: Date = new Date();

    const meal: Object = {
      size: size,
      date: date,
      foodId: foodId,
      groupId: group,
      userEmail: email,
    };

    
    await fetch("http://localhost:8080/meal", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(meal),
    }).then(handleRedirect);

  }

  return (
    <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
      <div className="row g-0">
        <div className="col-md-6">
          <div className="card-body">
            <h4 className="card-title">{props.food.name}</h4>
            <h5>{props.food.calories} cal / 100g</h5>
          </div>
        </div>
        <button className="btn btn-primary" onClick={toggle}>
          Add
        </button>
        <SaveMealModal isOpen={isOpen} toggle={toggle}>
          <form onSubmit={handleSubmit}>
            <div className="form-group my-5">
              <label>Size: (grams)</label>
              <input
                type="number"
                className="form-control"
                onChange={changeSize}
              />
            </div>
            <p>Group:</p>
            <div className="form-group mb-5 text-center">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input border border-dark"
                  type="radio"
                  value="1"
                  name="group"
                  onClick={changeGroup}
                />
                <label className="form-check-label">Breakfast</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input border border-dark"
                  type="radio"
                  value="2"
                  name="group"
                  onClick={changeGroup}
                />
                <label className="form-check-label">Lunch</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input border border-dark"
                  type="radio"
                  value="3"
                  name="group"
                  onClick={changeGroup}
                />
                <label className="form-check-label">Dinner</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input border border-dark"
                  type="radio"
                  value="4"
                  name="group"
                  onClick={changeGroup}
                />
                <label className="form-check-label">Snacks</label>
              </div>
            </div>
            <div>
              <button className="btn btn-outline-dark m-3" onClick={toggle}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary ">
                Save
              </button>
            </div>
          </form>
        </SaveMealModal>
      </div>
    </div>
  );
};
