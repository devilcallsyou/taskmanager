package com.ritikesh.taskmanager.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/hello")
    public String hello(){
        return "Spring Boot app is running fine!";
    }
    /*@GetMapping("/")
    public String home() {
        return "Welcome to my app!";
    }*/
    @GetMapping("/kk")
    public String hii(){
        return "Spring Boot app is running fine!";
    }

}
