class FoodModel{
    id: number;
    name: string;
    calories: number;
    carbs?: number;
    fats?: number;
    protein?: number;

    constructor (id: number, name: string, calories: number,
         carbs: number, fats: number, protein: number) {
        this.id = id;
        this.name = name;
        this.calories = calories;
        this.carbs = carbs;
        this.fats = fats;
        this.protein = protein;
    }
}

export default FoodModel;