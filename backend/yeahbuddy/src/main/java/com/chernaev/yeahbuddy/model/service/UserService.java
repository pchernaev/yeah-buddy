package com.chernaev.yeahbuddy.model.service;

import com.chernaev.yeahbuddy.model.entity.User;
import com.chernaev.yeahbuddy.model.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    public User getClientByEmail(String email) {
        User user = userRepository.findUserByEmail(email);
        return user != null ? user : new User();
    }

    public User saveUser(User user){
        if(isValid(user)) return userRepository.save(user);
        throw new IllegalArgumentException("Invalid user data");
    }

    private boolean isValid(User user){
        return user.getAge() >= 16 && user.getWeight() >= 0 && user.getHeight() >= 0;
    }
}
