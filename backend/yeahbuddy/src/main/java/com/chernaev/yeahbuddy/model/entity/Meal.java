package com.chernaev.yeahbuddy.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "meals")
public class Meal extends BaseEntity{
    private double size;
    private LocalDate date;
    @JsonIgnore
    @ManyToOne
    private Food food;
    @JsonIgnore
    @ManyToOne
    private Group group;
    @JsonIgnore
    @ManyToOne
    private User user;
}
