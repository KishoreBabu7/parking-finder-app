package com.parkingspace;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ParkingSlotService {

    @Autowired
    private ParkingSlotRepository parkingSlotRepository;

    @Autowired
    private ParkingSpotRepository parkingSpotRepository;

    // Method to book a parking slot
    public Optional<ParkingSlot> bookSlot(Long slotId) {
        // Find the parking slot by ID
        Optional<ParkingSlot> parkingSlot = parkingSlotRepository.findById(slotId);
        
        // Check if the slot exists and is not already booked
        if (parkingSlot.isPresent() && !parkingSlot.get().isBooked()) {
            ParkingSlot slot = parkingSlot.get();
            slot.setBooked(true); // Mark the slot as booked
            parkingSlotRepository.save(slot); // Save the updated slot status
            
            // Get the associated parking spot and decrease its availability
            ParkingSpot spot = slot.getParkingSpot();
            spot.setAvailability(spot.getAvailability() - 1); // Decrease availability
            parkingSpotRepository.save(spot); // Save the updated spot
            
            return Optional.of(slot); // Return the booked slot
        }
        
        return Optional.empty(); // If the slot is already booked or does not exist
    }

    // Method to unbook a parking slot
    public Optional<ParkingSlot> unbookSlot(Long slotId) {
        // Find the parking slot by ID
        Optional<ParkingSlot> parkingSlot = parkingSlotRepository.findById(slotId);
        
        // Check if the slot exists and is currently booked
        if (parkingSlot.isPresent() && parkingSlot.get().isBooked()) {
            ParkingSlot slot = parkingSlot.get();
            slot.setBooked(false); // Mark the slot as unbooked
            parkingSlotRepository.save(slot); // Save the updated slot status
            
            // Get the associated parking spot and increase its availability
            ParkingSpot spot = slot.getParkingSpot();
            spot.setAvailability(spot.getAvailability() + 1); // Increase availability
            parkingSpotRepository.save(spot); // Save the updated spot
            
            return Optional.of(slot); // Return the unbooked slot
        }
        
        return Optional.empty(); // If the slot is not booked or does not exist
    }

    // Method to delete a parking slot by its ID
    public void deleteSlot(Long slotId) {
        // Find the slot to delete
        Optional<ParkingSlot> parkingSlot = parkingSlotRepository.findById(slotId);
        
        if (parkingSlot.isPresent()) {
            ParkingSlot slot = parkingSlot.get();
            
            // If the slot is booked, free it before deletion
            if (slot.isBooked()) {
                ParkingSpot spot = slot.getParkingSpot();
                spot.setAvailability(spot.getAvailability() + 1); // Free up the spot
                parkingSpotRepository.save(spot); // Save the updated spot
            }
            
            // Delete the slot
            parkingSlotRepository.deleteById(slotId);
        }
    }
}
