package com.parkingspace;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "parking_spot")
public class ParkingSpot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Primary key

    @Column(nullable = false)
    private String name; // Name of the parking spot location

    @Column(nullable = false)
    private String location; // Address or general location

    private String mapUrl; // Optional: URL to a map location for the parking spot

    @OneToMany(mappedBy = "parkingSpot", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<ParkingSlot> slots = new ArrayList<>(); // List of associated slots

    // Constructors
    public ParkingSpot() {
    }

    public ParkingSpot(String name, String location, String mapUrl) {
        this.name = name;
        this.location = location;
        this.mapUrl = mapUrl;
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

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getMapUrl() {
        return mapUrl;
    }

    public void setMapUrl(String mapUrl) {
        this.mapUrl = mapUrl;
    }

    public List<ParkingSlot> getSlots() {
        return slots;
    }

    public void setSlots(List<ParkingSlot> slots) {
        this.slots = slots;
    }

    // Add a slot to this parking spot
    public void addSlot(ParkingSlot slot) {
        slot.setParkingSpot(this);
        this.slots.add(slot);
    }

    // Remove a slot from this parking spot
    public void removeSlot(ParkingSlot slot) {
        slot.setParkingSpot(null);
        this.slots.remove(slot);
    }

    @Override
    public String toString() {
        return "ParkingSpot{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", location='" + location + '\'' +
                ", mapUrl='" + mapUrl + '\'' +
                ", totalSlots=" + slots.size() +
                '}';
    }
}
