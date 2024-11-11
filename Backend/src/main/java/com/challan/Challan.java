package com.challan;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ForeignKey;

import java.time.LocalDateTime;
import java.util.UUID;

import com.user.Vehicle;

@Entity
public class Challan {

    @Id
    private String tokenid;  // tokenid as the primary key
    private String name;
    private String email;     // Added email field
    private String mobile;
    private String vehicleNo;
    
    @ManyToOne
    @JoinColumn(name = "license_plate", referencedColumnName = "licensePlate", foreignKey = @ForeignKey(name = "FK_license_plate"))
    private Vehicle vehicle;  // Foreign key to the Vehicle entity

    private LocalDateTime startTime;  // Changed to LocalDateTime for better time handling
    private LocalDateTime endTime;    // Changed to LocalDateTime
    private LocalDateTime violationTime; // Changed to LocalDateTime
    private int amount;
    
    // Constructor to generate a tokenid automatically
    public Challan() {
        this.tokenid = UUID.randomUUID().toString(); // Automatically generate unique token ID
    }
    // Getters and Setters

    public String getTokenid() {
        return tokenid;
    }

    public void setTokenid(String tokenid) {
        this.tokenid = tokenid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getVehicleType() {
        return vehicleNo; 
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleNo = vehicleType;
    }

    public Vehicle getVehicle() {
        return vehicle;
    }

    public void setVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public LocalDateTime getViolationTime() {
        return violationTime;
    }

    public void setViolationTime(LocalDateTime violationTime) {
        this.violationTime = violationTime;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }
}
