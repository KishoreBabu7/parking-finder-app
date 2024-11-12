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

    // Method to check if a slot exists by its ID
    public boolean slotExists(Long slotId) {
        return parkingSlotRepository.existsById(slotId);
    }

    // Method to book a parking slot
    public Optional<ParkingSlot> bookSlot(Long slotId) {
        Optional<ParkingSlot> parkingSlot = parkingSlotRepository.findById(slotId);

        if (parkingSlot.isPresent() && !parkingSlot.get().isBooked()) {
            ParkingSlot slot = parkingSlot.get();
            slot.setBooked(true);
            parkingSlotRepository.save(slot);

            ParkingSpot spot = slot.getParkingSpot();
            spot.setAvailability(spot.getAvailability() - 1);
            parkingSpotRepository.save(spot);

            return Optional.of(slot);
        }

        return Optional.empty();
    }

    // Method to unbook a parking slot
    public Optional<ParkingSlot> unbookSlot(Long slotId) {
        Optional<ParkingSlot> parkingSlot = parkingSlotRepository.findById(slotId);

        if (parkingSlot.isPresent() && parkingSlot.get().isBooked()) {
            ParkingSlot slot = parkingSlot.get();
            slot.setBooked(false);
            parkingSlotRepository.save(slot);

            ParkingSpot spot = slot.getParkingSpot();
            spot.setAvailability(spot.getAvailability() + 1);
            parkingSpotRepository.save(spot);

            return Optional.of(slot);
        }

        return Optional.empty();
    }

    // Method to delete a parking slot by its ID
    public void deleteSlot(Long slotId) {
        Optional<ParkingSlot> parkingSlot = parkingSlotRepository.findById(slotId);

        if (parkingSlot.isPresent()) {
            ParkingSlot slot = parkingSlot.get();

            if (slot.isBooked()) {
                ParkingSpot spot = slot.getParkingSpot();
                spot.setAvailability(spot.getAvailability() + 1);
                parkingSpotRepository.save(spot);
            }

            parkingSlotRepository.deleteById(slotId);
        }
    }
}
