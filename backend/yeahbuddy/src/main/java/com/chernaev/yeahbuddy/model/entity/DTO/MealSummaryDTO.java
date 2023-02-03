package com.chernaev.yeahbuddy.model.entity.DTO;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MealSummaryDTO {
    private int totalCalories;
    private int goalCalories;
    private int totalCarbs;
    private int totalFats;
    private int totalProtein;
}
