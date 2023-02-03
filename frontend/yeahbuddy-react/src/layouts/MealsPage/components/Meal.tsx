import MealsToDisplay from "../../../models/MealsToDisplay";

export const Meal: React.FC<{meal: MealsToDisplay}> = (props) => {
    return (
      <li>
        <div className="d-flex justify-content-between">
          <div className="h5">{`${props.meal.name} ${props.meal.size} g.`}</div>
          <div className="h5">{`${props.meal.calories} cal`}</div>
        </div>
      </li>
    );
}