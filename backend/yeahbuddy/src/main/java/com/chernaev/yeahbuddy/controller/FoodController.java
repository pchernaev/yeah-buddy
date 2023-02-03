package com.chernaev.yeahbuddy.controller;

import com.chernaev.yeahbuddy.model.entity.Food;
import com.chernaev.yeahbuddy.model.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
@RestController
@RequestMapping("/food")
public class FoodController {

    private final FoodService foodService;
    @Autowired
    public FoodController(FoodService foodService) {
        this.foodService = foodService;
    }
    @GetMapping
    @CrossOrigin
    public List<Food> getFoods() {
        return foodService.getAllFoods();
    }
    @GetMapping("/search={search}")
    @CrossOrigin
    public List<Food> getFoodsByKeyword(@PathVariable String search) {
        return foodService.getAllFoodsByKeyword(search);
    }
    @GetMapping("/name={name}")
    @CrossOrigin
    public Food getFoodByName(@PathVariable String name){
        return foodService.getFoodByName(name);
    }

    @CrossOrigin
    @PostMapping
    public ResponseEntity<Food> addFood(@RequestBody Food food) throws URISyntaxException {
        Food savedFood = foodService.saveFood(food);
        return ResponseEntity.created(new URI("/food/" + savedFood.getId())).body(savedFood);
    }
}
