package com.chernaev.yeahbuddy.model.repository;

import com.chernaev.yeahbuddy.model.entity.Meal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface MealRepository extends JpaRepository<Meal, Long> {
    List<Meal> findAllByGroup_IdAndUser_EmailAndDate(long groupId, String email, LocalDate date);
    List<Meal> findAllByUser_EmailAndDate(String email,LocalDate date);
}
