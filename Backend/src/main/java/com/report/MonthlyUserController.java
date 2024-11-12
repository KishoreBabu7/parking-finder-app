package com.report;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200") // Allow CORS for your Angular app
public class MonthlyUserController {

    @Autowired
    private MonthlyUsersService monthlyUserService;

    @GetMapping("/monthly-user/{year}")
    public List<MonthlyUser> getMonthlyUsers(@PathVariable int year) {
        return monthlyUserService.fetchUsersByYear(year);
    }
}
