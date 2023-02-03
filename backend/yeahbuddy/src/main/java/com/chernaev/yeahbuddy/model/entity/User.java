package com.chernaev.yeahbuddy.model.entity;


import com.chernaev.yeahbuddy.model.entity.enums.ActivityEnum;
import com.chernaev.yeahbuddy.model.entity.enums.GenderEnum;
import com.chernaev.yeahbuddy.model.entity.enums.GoalEnum;
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
@Table(name = "users")
public class User extends BaseEntity {
    @Column
    private String email;
    @Column(name = "first_name", nullable = false)
    private String firstName;
    @Column(name = "last_name", nullable = false)
    private String lastName;
    @Column
    private int age;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private GenderEnum gender;
    @Column
    private int height;
    @Column
    private int weight;
    @Column
    @Enumerated(EnumType.STRING)
    private ActivityEnum activity;
    @Column
    @Enumerated(EnumType.STRING)
    private GoalEnum goal;
    @OneToMany(targetEntity = Meal.class, mappedBy = "user")
    private List<Meal> meals = new ArrayList<>();
}
