package com.chernaev.yeahbuddy.model.service;

import com.chernaev.yeahbuddy.model.entity.Food;
import com.chernaev.yeahbuddy.model.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodService {
    private final FoodRepository foodRepository;

    @Autowired
    public FoodService(FoodRepository foodRepository) {
        this.foodRepository = foodRepository;
    }

    public List<Food> getAllFoods() {
        return foodRepository.findAll();
    }

    public Food getFoodByName(String name){
        return foodRepository.getFoodByName(name);
    }

    public Food saveFood(Food food){
        return foodRepository.save(food);
    }

    public List<Food> getAllFoodsByKeyword(String search) {
        return foodRepository.findByNameContainingIgnoreCase(search);
    }
}
