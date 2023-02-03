package com.chernaev.yeahbuddy.model.entity.DTO;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
@NoArgsConstructor
public class MealsWithTotalCaloriesDTO {
    private List<MealToDisplayDTO> meals;
    private int totalCalories;
    private int goalCalories;
}
