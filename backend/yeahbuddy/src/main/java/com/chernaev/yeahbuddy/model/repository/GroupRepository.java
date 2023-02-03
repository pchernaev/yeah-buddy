package com.chernaev.yeahbuddy.model.repository;

import com.chernaev.yeahbuddy.model.entity.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {
    Group getGroupById(long id);
}
