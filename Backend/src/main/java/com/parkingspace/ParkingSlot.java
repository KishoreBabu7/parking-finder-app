package com.parkingspace;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "parking_slot")
public class ParkingSlot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Primary key

    @Column(nullable = false)
    private String name; // Slot name, e.g., "A1", "B2"

    @ManyToOne
    @JoinColumn(name = "parking_spot_id", nullable = false)
    private ParkingSpot parkingSpot; // Foreign key to ParkingSpot

    @Column(nullable = false)
    private boolean booked = false; // Default to not booked

    // Constructors
    public ParkingSlot() {
    }

    public ParkingSlot(String name, ParkingSpot parkingSpot) {
        this.name = name;
        this.parkingSpot = parkingSpot;
        this.booked = false; // Default to not booked
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ParkingSpot getParkingSpot() {
        return parkingSpot;
    }

    public void setParkingSpot(ParkingSpot parkingSpot) {
        this.parkingSpot = parkingSpot;
    }

    public boolean isBooked() {
        return booked;
    }

    public void setBooked(boolean booked) {
        this.booked = booked;
    }

    // Toggle booking status
    public void toggleBooking() {
        this.booked = !this.booked;
    }

    @Override
    public String toString() {
        return "ParkingSlot{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", booked=" + booked +
                ", parkingSpot=" + (parkingSpot != null ? parkingSpot.getId() : null) +
                '}';
    }
}
