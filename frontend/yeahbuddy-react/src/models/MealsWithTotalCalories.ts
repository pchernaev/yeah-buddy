import MealsToDisplay from "./MealsToDisplay";

class MealsWithTotalCalories {
  id: number;
  meals: MealsToDisplay[];
  totalCalories: number;

  constructor(id: number, meals: MealsToDisplay[], totalCalories: number) {
    this.id = id;
    this.meals = meals;
    this.totalCalories = totalCalories;
  }
}

export default MealsWithTotalCalories;
