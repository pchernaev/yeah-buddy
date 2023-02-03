package com.chernaev.yeahbuddy.controller;

import com.chernaev.yeahbuddy.model.entity.User;
import com.chernaev.yeahbuddy.model.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/id={id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }
    @CrossOrigin
    @GetMapping("/email={email}")
    public User getClientByEmail(@PathVariable String email) {
        return userService.getClientByEmail(email);
    }
    @CrossOrigin
    @PostMapping
    public ResponseEntity<User> createClient(@RequestBody User user) throws URISyntaxException {
        User savedUser = userService.createUser(user);
        return ResponseEntity.created(new URI("/user/" + savedUser.getId())).body(savedUser);
    }
}
