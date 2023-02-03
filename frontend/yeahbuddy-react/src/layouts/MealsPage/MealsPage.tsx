import { MealGroup } from "./components/MealGroup";
import { useOktaAuth } from "@okta/okta-react";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const MealsPage = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalCarbs, setTotalCarbs] = useState(0);
  const [totalFats, setTotalFats] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [goalCalories, setGoalCalories] = useState(0);

  const email: string = getEmail();

  useEffect(() => {
    const fetchMeals = async () => {
      const date: string = selectedDate.toISOString().split("T")[0];

      const url: string = `http://localhost:8080/meal/get-summary=${email}/date=${date}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      setTotalCalories(responseData.totalCalories);
      setTotalCarbs(responseData.totalCarbs);
      setTotalFats(responseData.totalFats);
      setTotalProtein(responseData.totalProtein);
      setGoalCalories(responseData.goalCalories);
      setIsLoading(false);
    };
    fetchMeals().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [selectedDate]);

  if (!authState) {
    return <SpinnerLoading />;
  }

  function getEmail() {
    return authState?.idToken?.claims.email == undefined
      ? ""
      : authState.idToken.claims.email;
  }

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
    <div className="container my-5">
      <div className="text-center mb-4">
        <DatePicker
          selected={selectedDate}
          onChange={(date: any) => setSelectedDate(date)}
          withPortal
        />
      </div>
      <div className="row">
        <div className="list-group d-grid gap-2 border-0 w-auto col">
          <MealGroup
            group={"Breakfast"}
            groupId={1}
            email={email}
            date={selectedDate}
          />
          <MealGroup
            group={"Lunch"}
            groupId={2}
            email={email}
            date={selectedDate}
          />
          <MealGroup
            group={"Dinner"}
            groupId={3}
            email={email}
            date={selectedDate}
          />
          <MealGroup
            group={"Snacks"}
            groupId={4}
            email={email}
            date={selectedDate}
          />
        </div>
        <div className="col ">
          <div className="bg-white rounded">
            <div className="text-end border-bottom border-2 border-dark">
              <h3 className="p-2">
                {totalCalories} / {goalCalories} cal
              </h3>
            </div>
            <div className="">
              <p className="pt-3 px-3 h5">Carbohydrates: {totalCarbs}</p>
              <p className="p-3 h5">Fats: {totalFats}</p>
              <p className="pb-3 px-3 h5">Protein: {totalProtein}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
