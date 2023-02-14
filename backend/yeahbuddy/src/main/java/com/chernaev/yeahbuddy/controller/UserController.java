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
        User savedUser = userService.saveUser(user);
        return ResponseEntity.created(new URI("/user/" + savedUser.getId())).body(savedUser);
    }
    @CrossOrigin
    @PutMapping("/email={email}")
    public ResponseEntity<User> updateClient(@PathVariable String email, @RequestBody User user) {
        User currentUser = userService.getClientByEmail(email);
        currentUser.setFirstName(user.getFirstName());
        currentUser.setLastName(user.getLastName());
        currentUser.setAge(user.getAge());
        currentUser.setHeight(user.getHeight());
        currentUser.setWeight(user.getWeight());
        currentUser.setActivity(user.getActivity());
        currentUser.setGoal(user.getGoal());
        currentUser = userService.saveUser(currentUser);

        return ResponseEntity.ok(currentUser);
    }
}
