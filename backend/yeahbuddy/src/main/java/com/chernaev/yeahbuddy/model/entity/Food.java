package com.chernaev.yeahbuddy.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "foods")
public class Food extends BaseEntity{
    @Column(nullable = false)
    private String name;
    @Column
    private int calories;
    @Column
    private int carbs;
    @Column
    private int fats;
    @Column
    private int protein;

    @OneToMany(mappedBy = "food",targetEntity = Meal.class)
    private List<Meal> meal =  new ArrayList<>();
}
