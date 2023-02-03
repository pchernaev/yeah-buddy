package com.chernaev.yeahbuddy.model.entity.DTO;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class MealDTO {
    private double size;
    private LocalDate date;
    private long foodId;
    private long groupId;
    private String userEmail;
}
