package com.chernaev.yeahbuddy.model.entity;

import com.chernaev.yeahbuddy.model.entity.enums.GroupEnum;
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
@Table(name = "group_type")
public class Group extends BaseEntity{
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private GroupEnum name;

    @OneToMany(mappedBy = "group",targetEntity = Meal.class)
    private List<Meal> meals = new ArrayList<>();
}
