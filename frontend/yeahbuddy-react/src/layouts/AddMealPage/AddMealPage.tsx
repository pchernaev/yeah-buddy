import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import FoodModel from "../../models/FoodModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { Foods } from "./components/Foods";

export const AddMealsPage = () => {
  const [foods, setFoods] = useState<FoodModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [name, setName] = useState("");
  const [calories, setCalories] = useState(0);
  const [carbohydrates, setCarbohydrates] = useState(0);
  const [fats, setFats] = useState(0);
  const [protein, setProtein] = useState(0);
  const [size, setSize] = useState(0);
  const [group, setGroup] = useState(1);
  const [search, setSearch] = useState("");
  const { oktaAuth, authState } = useOktaAuth();
  const history = useHistory();

  const getEmail = () => {
    return authState?.idToken?.claims.email == undefined
      ? ""
      : authState.idToken.claims.email;
  };

  function changeName(e: any) {
    setName(e.target.value);
  }

  function changeCalories(e: any) {
    const input = e.target;
    const parentEl = input.parentElement;
    const smallEl = parentEl.lastChild;
    if (input.value < 0) {
      smallEl.classList.remove("hide");
    } else {
      smallEl.classList.add("hide");
      setCalories(e.target.value);
    }
  }

  function changeCarbohydrates(e: any) {
    const input = e.target;
    const parentEl = input.parentElement;
    const smallEl = parentEl.lastChild;
    if (input.value < 0) {
      smallEl.classList.remove("hide");
    } else {
      smallEl.classList.add("hide");
      setCarbohydrates(e.target.value);
    }
  }

  function changeFats(e: any) {
    const input = e.target;
    const parentEl = input.parentElement;
    const smallEl = parentEl.lastChild;
    if (input.value < 0) {
      smallEl.classList.remove("hide");
    } else {
      smallEl.classList.add("hide");
      setFats(e.target.value);
    }
  }

  function changeProtein(e: any) {
    const input = e.target;
    const parentEl = input.parentElement;
    const smallEl = parentEl.lastChild;
    if (input.value < 0) {
      smallEl.classList.remove("hide");
    } else {
      smallEl.classList.add("hide");
      setProtein(e.target.value);
    }
  }

  function changeSize(e: any) {
    const input = e.target;
    const parentEl = input.parentElement;
    const smallEl = parentEl.lastChild;
    if (input.value < 0) {
      smallEl.classList.remove("hide");
    } else {
      smallEl.classList.add("hide");
      setSize(e.target.value);
    }
  }

  function changeGroup(e: any) {
    setGroup(e.target.value);
  }

  function changeSearch(e: any) {
    setSearch(e.target.value);
  }

  function handleRedirect(response: any) {
    if (response.status == 201) {
      history.push("/meals");
    } else {
      throw new Error("Something went wrong!");
    }
  }

  async function handleSubmit(e: any) {
    e.preventDefault();

    let foodId: number = 0;
    let email: string = getEmail();

    const food: Object = {
      name: name,
      calories: calories,
      carbs: carbohydrates,
      fats: fats,
      protein: protein,
    };

    await fetch("http://localhost:8080/food", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(food),
    }).then((res) => {
      if (res.status != 201) {
        throw new Error("Something went wrong!");
      }
    });

    const response = await fetch(`http://localhost:8080/food/name=${name}`);

    const responseData = await response.json();

    foodId = responseData.id;

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

  useEffect(() => {
    const fetchFoods = async () => {
      const url: string =
        search == ""
          ? "http://localhost:8080/food"
          : `http://localhost:8080/food/search=${search}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      const loadedFoods: FoodModel[] = [];

      for (const key in responseData) {
        loadedFoods.push({
          id: responseData[key].id,
          name: responseData[key].name,
          calories: responseData[key].calories,
          carbs: responseData[key].carbs,
          fats: responseData[key].fats,
          protein: responseData[key].protein,
        });
      }

      setFoods(loadedFoods);
      setIsLoading(false);
    };
    fetchFoods().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [search]);

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="container">
        <div className="row mt-5">
          <div className="col" id="food_id">
            <div>
              <div className="d-flex">
                <input
                  className="form-control me-2 "
                  type="search"
                  placeholder="Search"
                  aria-labelledby="Search"
                  onChange={changeSearch}
                />
              </div>
            </div>
            {foods.map((food) => (
              <Foods food={food} key={food.id} />
            ))}
          </div>
          <div className="col-1"></div>
          <div className="col">
            <div className="text-center">
              <h2>ADD NEW FOOD</h2>
            </div>
            <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
              <form onSubmit={handleSubmit}>
                <div className="form-group my-3">
                  <label>Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    onChange={changeName}
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Calories: (per 100g)</label>
                  <input
                    type="number"
                    className="form-control"
                    required
                    onChange={changeCalories}
                    min="0"
                  />
                  <small className="hide">Calories can not be below 0</small>
                </div>
                <div className="form-group mb-3">
                  <label>Carbohydrates: (grams)</label>
                  <input
                    type="number"
                    className="form-control"
                    required
                    onChange={changeCarbohydrates}
                    min="0"
                  />
                  <small className="hide">Carbs can not be below 0</small>
                </div>
                <div className="form-group mb-3">
                  <label>Fat: (grams)</label>
                  <input
                    type="number"
                    className="form-control"
                    required
                    onChange={changeFats}
                    min="0"
                  />
                  <small className="hide">Fats can not be below 0</small>
                </div>
                <div className="form-group mb-3">
                  <label>Protein: (grams)</label>
                  <input
                    type="number"
                    className="form-control"
                    required
                    onChange={changeProtein}
                    min="0"
                  />
                  <small className="hide">Protein can not be below 0</small>
                </div>
                <div className="form-group mb-3">
                  <label>Size: (grams)</label>
                  <input
                    type="number"
                    className="form-control"
                    required
                    onChange={changeSize}
                    min="0"
                  />
                  <small className="hide">Calories can not be under 0</small>
                </div>
                <p>Group:</p>
                <div className="form-group mb-5 text-center">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input border border-dark"
                      type="radio"
                      value="1"
                      name="group"
                      defaultChecked
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
                <div className="text-center">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
