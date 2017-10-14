package com.player.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Created by hoon on 2017. 9. 11..
 */
@Controller
public class MainController {
    @GetMapping("/")
    public String home() {
        return "home";
    }
}
