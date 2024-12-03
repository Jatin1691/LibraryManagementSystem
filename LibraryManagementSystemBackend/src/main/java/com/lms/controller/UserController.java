package com.lms.controller;

import com.lms.DTO.ResponseDto;
import com.lms.exception.*;
import com.lms.model.LoginRequest;
import com.lms.model.User;
import com.lms.services.UserService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserService userService;


    @GetMapping("/")
    public String welcome(){
        return "This is Java Backend)";
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/users/{id}")
    public User getUserByID(@PathVariable long id) {
        return userService.getUserByID(id);
    }

    @PostMapping("/register")
    public User addUser(@RequestBody User user) {
        User getUser = userService.getUserByEmail(user.getEmail());
        if (getUser == null) {
            if (userService.getUserByPhoneNumber(user.getPhoneNumber()) != null) {
                throw new PhoneNumberAlreadyExistException();
            } else {
                return userService.addUser(user);

            }
        } else {
            throw new UserAlreadyExistException();
        }
    }

    @PutMapping("/users/{id}")
    public User updateUser(@RequestBody User user, @PathVariable long id) {
        User getUser = userService.getUserByID(id);

        getUser.setName(user.getName());
        getUser.setEmail(user.getEmail());
        getUser.setPhoneNumber(user.getPhoneNumber());
        getUser.setPassword(user.getPassword());
        getUser.setNumBookBorrowed(user.getNumBookBorrowed());
        return userService.updateUser(getUser);
    }

    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable long id) {
        User user = userService.getUserByID(id);
        if (user.getId() == id) {
            userService.deleteUser(id);
        } else {
            throw new UserNotFoundException(id);
        }
    }



    @PostMapping("/login")
    public @ResponseBody User login(@RequestBody LoginRequest loginRequest, HttpSession session) {
        User user = userService.getUserByEmail(loginRequest.getEmail());
        System.out.println(loginRequest.getEmail() + " " + loginRequest.getPassword());

        if (user != null && user.getPassword().equals(loginRequest.getPassword())) {
            session.setAttribute("userId", user.getId()); // Store the user ID in the session
            return user;
        } else {
            throw new PasswordNotMatchedException();
        }
    }

    @PostMapping("/sendOtp/{email}")
    public ResponseEntity<ResponseDto> SendOtp(@PathVariable String email) throws MessagingException {
        userService.sendotp(email);
        return new ResponseEntity<>(new ResponseDto("Message Sent Successfully"), HttpStatus.OK);
    }

    @GetMapping("/verifyotp/{email}/{otp}")
    public ResponseEntity<ResponseDto> verifyOtp(@PathVariable String email, @PathVariable String otp) throws OtpNotFoundException {
        userService.verifyotp(email,otp);
        return new ResponseEntity<>(new ResponseDto("Otp verified successfully"), HttpStatus.OK);
    }

    @PostMapping("/changePassword")
    public ResponseEntity<ResponseDto> changePassword(@RequestBody  LoginRequest loginDto) throws UserNotFoundException {

        return new ResponseEntity<>(userService.changePassword(loginDto), HttpStatus.OK);
    }

}

