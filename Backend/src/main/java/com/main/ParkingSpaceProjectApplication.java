package com.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.user", "com.challan", "com.parkingspace", "com.payment","com.report"})
@EntityScan(basePackages = {"com.user", "com.challan", "com.parkingspace", "com.payment","com.report"})
public class ParkingSpaceProjectApplication {

    public static void main(String[] args) {
        SpringApplication.run(ParkingSpaceProjectApplication.class, args);
    }
}
