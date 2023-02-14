package com.chernaev.yeahbuddy.model.service;

import com.chernaev.yeahbuddy.model.entity.DTO.*;
import com.chernaev.yeahbuddy.model.entity.Meal;
import com.chernaev.yeahbuddy.model.entity.User;
import com.chernaev.yeahbuddy.model.entity.enums.ActivityEnum;
import com.chernaev.yeahbuddy.model.entity.enums.GenderEnum;
import com.chernaev.yeahbuddy.model.entity.enums.GoalEnum;
import com.chernaev.yeahbuddy.model.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class MealService {
    private final MealRepository mealRepository;
    private final UserRepository userRepository;
    private final FoodRepository foodRepository;
    private final GroupRepository groupRepository;

    @Autowired
    public MealService(MealRepository mealRepository, UserRepository userRepository, FoodRepository foodRepository, GroupRepository groupRepository) {
        this.mealRepository = mealRepository;
        this.userRepository = userRepository;
        this.foodRepository = foodRepository;
        this.groupRepository = groupRepository;
    }

    private List<MealToDisplayDTO> processMealToDisplay(List<Meal> meals){
        List<MealToDisplayDTO> result = new ArrayList<>();

        for (Meal meal : meals) {
            MealToDisplayDTO mealToDisplayDTO = new MealToDisplayDTO();
            mealToDisplayDTO.setId(meal.getId());
            mealToDisplayDTO.setSize(meal.getSize());
            mealToDisplayDTO.setName(meal.getFood().getName());
            int calories = (int)Math.round((meal.getSize()/100) * meal.getFood().getCalories());
            mealToDisplayDTO.setCalories(calories);

            result.add(mealToDisplayDTO);
        }
        return result;
    }
    private List<MealToDisplayDTO> getMealsByUserAndGroupAndDate(String email, String group, LocalDate date){
        List<Meal> meals = mealRepository.findAllByGroup_IdAndUser_EmailAndDate(Long.parseLong(group),email,date);
        return processMealToDisplay(meals);
    }

    private List<MealToDisplayDTO> processMealForSummary(List<Meal> meals){
        List<MealToDisplayDTO> result = new ArrayList<>();

        for (Meal meal : meals) {
            MealToDisplayDTO mealToDisplayDTO = new MealToDisplayDTO();
            mealToDisplayDTO.setId(meal.getId());
            mealToDisplayDTO.setSize(meal.getSize());
            mealToDisplayDTO.setName(meal.getFood().getName());
            int calories = (int)Math.round((meal.getSize()/100) * meal.getFood().getCalories());
            mealToDisplayDTO.setCalories(calories);
            int carbs = (int)Math.round((meal.getSize()/100) * meal.getFood().getCarbs());
            int fats = (int)Math.round((meal.getSize()/100) * meal.getFood().getFats());
            int protein = (int)Math.round((meal.getSize()/100) * meal.getFood().getProtein());
            mealToDisplayDTO.setCabs(carbs);
            mealToDisplayDTO.setFats(fats);
            mealToDisplayDTO.setProtein(protein);

            result.add(mealToDisplayDTO);
        }
        return result;
    }
    private List<MealToDisplayDTO> getMealsByUserAndDate(String email, LocalDate date){
        List<Meal> meals = mealRepository.findAllByUser_EmailAndDate(email, date);
        return processMealForSummary(meals);
    }

    private int calculateGoalCalories(User user){
        double calorieGoal = 0;
        double BMR = 0;
        int age = user.getAge();
        GenderEnum gender = user.getGender();
        int height = user.getHeight();
        int weight = user.getWeight();
        ActivityEnum activity = user.getActivity();
        GoalEnum goal = user.getGoal();

        if(gender == GenderEnum.MALE){
            BMR = 66.5 + (13.75 * weight) + (5.003 * height) - (6.75 * age);
        } else {
            BMR = 655.1 + (9.563 * weight) + (1.850 * height) - (4.676 * age);
        }

        if(activity == ActivityEnum.SEDENTARY){
            calorieGoal = BMR * 1.2;
        } else if (activity == ActivityEnum.LIGHTLY) {
            calorieGoal = BMR * 1.375;
        } else if (activity == ActivityEnum.MODERATELY) {
            calorieGoal = BMR * 1.55;
        } else if (activity == ActivityEnum.VERY) {
            calorieGoal = BMR * 1.725;
        } else if (activity == ActivityEnum.EXTRA) {
            calorieGoal = BMR * 1.9;
        }

        if(goal == GoalEnum.EXTREAM_CUT){
            calorieGoal -= 500;
        } else if (goal == GoalEnum.CUT) {
            calorieGoal -= 300;
        } else if (goal == GoalEnum.BULK) {
            calorieGoal += 300;
        } else if(goal ==GoalEnum.EXTREAM_BULK){
            calorieGoal += 500;
        }

        return (int)Math.round(calorieGoal);
    }

    public List<Meal> getAllMeals(){
        return mealRepository.findAll();
    }
    public MealsWithTotalCaloriesDTO getMealsWithTotalCalories(String email, String group, LocalDate date){
        List<MealToDisplayDTO> meals = getMealsByUserAndGroupAndDate(email, group, date);
        int totalCalories = meals.stream().mapToInt(MealToDisplayDTO::getCalories).sum();
        MealsWithTotalCaloriesDTO result = new MealsWithTotalCaloriesDTO();

        result.setTotalCalories(totalCalories);
        result.setMeals(meals);

        return result;
    }


    public MealSummaryDTO getMealSummary(String email, LocalDate date){
        List<MealToDisplayDTO> meals = getMealsByUserAndDate(email, date);
        User user = userRepository.findUserByEmail(email);
        MealSummaryDTO result = new MealSummaryDTO();

        int totalCal = meals.stream().mapToInt(MealToDisplayDTO::getCalories).sum();
        int totalCarbs = meals.stream().mapToInt(MealToDisplayDTO::getCabs).sum();
        int totalFats = meals.stream().mapToInt(MealToDisplayDTO::getFats).sum();
        int totalProtein = meals.stream().mapToInt(MealToDisplayDTO::getProtein).sum();
        int goalCalories = calculateGoalCalories(user);

        result.setTotalCalories(totalCal);
        result.setTotalCarbs(totalCarbs);
        result.setTotalFats(totalFats);
        result.setTotalProtein(totalProtein);
        result.setGoalCalories(goalCalories);

        return result;
    }

    public Meal saveMeal(Meal meal){
        if(isValid(meal)) return mealRepository.save(meal);
        throw new IllegalArgumentException("Invalid meal size");
    }

    private boolean isValid(Meal meal){
        return meal.getSize() >= 0;
    }

    public Meal createNewMeal(MealDTO meal){
        Meal newMeal = new Meal();
        newMeal.setSize(meal.getSize());
        newMeal.setDate(meal.getDate());
        newMeal.setFood(foodRepository.getFoodById(meal.getFoodId()));
        newMeal.setGroup(groupRepository.getGroupById(meal.getGroupId()));
        newMeal.setUser(userRepository.findUserByEmail(meal.getUserEmail()));

        return newMeal;
    }
}
