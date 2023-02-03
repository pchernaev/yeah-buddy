class UserModel {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  height: number;
  weight: number;
  activity: string;
  goal: string;

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    age: number,
    gender: string,
    height: number,
    weight: number,
    activity: string,
    goal: string,
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.gender = gender;
    this.height = height;
    this.weight = weight;
    this.activity = activity;
    this.goal = goal;
  }
}

export default UserModel;
