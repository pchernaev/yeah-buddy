package com.chernaev.yeahbuddy.controller;

import com.chernaev.yeahbuddy.model.entity.DTO.MealDTO;
import com.chernaev.yeahbuddy.model.entity.DTO.MealSummaryDTO;
import com.chernaev.yeahbuddy.model.entity.DTO.MealsWithTotalCaloriesDTO;
import com.chernaev.yeahbuddy.model.entity.Meal;
import com.chernaev.yeahbuddy.model.repository.FoodRepository;
import com.chernaev.yeahbuddy.model.repository.GroupRepository;
import com.chernaev.yeahbuddy.model.repository.MealRepository;
import com.chernaev.yeahbuddy.model.repository.UserRepository;
import com.chernaev.yeahbuddy.model.service.MealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/meal")
public class MealController {
    private final MealService mealService;
    @Autowired
    public MealController(MealService mealService) {
        this.mealService = mealService;
    }

    @GetMapping
    @CrossOrigin
    public List<Meal> getMeals(){
        return mealService.getAllMeals();
    }
    @GetMapping("/group={group}/user={email}/date={date}")
    @CrossOrigin
    public MealsWithTotalCaloriesDTO getMealsByUserAndGroupWithTotalCalories(@PathVariable String email, @PathVariable String group, @PathVariable String date){
        return mealService.getMealsWithTotalCalories(email, group, LocalDate.parse(date));
    }

    @CrossOrigin
    @PostMapping
    public ResponseEntity<Meal> addMeal(@RequestBody MealDTO meal) throws URISyntaxException {
        Meal newMeal = mealService.createNewMeal(meal);
        Meal savedMeal = mealService.saveMeal(newMeal);

        return ResponseEntity.created(new URI("/meal/" + savedMeal.getId())).body(savedMeal);
    }
    @CrossOrigin
    @GetMapping("/get-summary={email}/date={date}")
    public MealSummaryDTO getMealSummary(@PathVariable String email,@PathVariable String date){
        return mealService.getMealSummary(email, LocalDate.parse(date));
    }
}
