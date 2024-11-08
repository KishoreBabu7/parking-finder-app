package com.report;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MonthlyUsersService {
    @Autowired
    private MonthlyUserRepository monthlyUserRepository;

    public List<MonthlyUser> fetchUsersByYear(int year) {
        return monthlyUserRepository.findAllByYear(year);
    }
}
