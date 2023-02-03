class MealsToDisplay {
  id: number;
  name: string;
  calories: number;
  group: number;
  size: number;

  constructor(
    id: number,
    name: string,
    calories: number,
    group: number,
    size: number,
  ) {
    this.id = id;
    this.name = name;
    this.calories = calories;
    this.group = group;
    this.size = size;
  }
}

export default MealsToDisplay;
