import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MealsToDisplay from "../../../models/MealsToDisplay";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";
import { Meal } from "./Meal";

export const MealGroup: React.FC<{
  group: string;
  groupId: number;
  email: string;
  date: Date;
}> = (props) => {
  const [meals, setMeals] = useState<MealsToDisplay[]>([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const date: string = props.date.toISOString().split("T")[0];

    const fetchMeals = async () => {
      const url: string = `http://localhost:8080/meal/group=${props.groupId}/user=${props.email}/date=${date}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      const loadedMeals: MealsToDisplay[] = [];

      for (const key in responseData.meals) {
        loadedMeals.push({
          id: responseData.meals[key].id,
          name: responseData.meals[key].name,
          calories: responseData.meals[key].calories,
          group: responseData.meals[key].group,
          size: responseData.meals[key].size,
        });
      }

      setMeals(loadedMeals);
      setTotalCalories(responseData.totalCalories);
      setIsLoading(false);
    };
    fetchMeals().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [props.date]);

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
    <div className="list-group-item rounded-3 py-3">
      <div className="d-flex justify-content-between">
        <div>
          <h3>{props.group}</h3>
        </div>
        <div>
          <h4>{totalCalories}</h4>
        </div>
      </div>
      <ul>
        {meals.map((meal) => (
          <Meal meal={meal} key={meal.id} />
        ))}
      </ul>
      <div className="text-end">
        <Link
          type="button"
          className="btn btn-outline-primary btn-sm"
          to="/add-meal"
        >
          + Add
        </Link>
      </div>
    </div>
  );
};
