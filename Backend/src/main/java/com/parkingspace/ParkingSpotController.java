package com.parkingspace;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/parking-spots")
public class ParkingSpotController {

    @Autowired
    private ParkingSpotRepository parkingSpotRepository;

    @Autowired
    private ParkingSlotService parkingSlotService;

    // Get all parking spots
    @GetMapping
    public List<ParkingSpot> getAllParkingSpots() {
        return parkingSpotRepository.findAll();
    }

    // Add a new parking spot
    @PostMapping
    public ResponseEntity<ParkingSpot> addParkingSpot(@RequestBody ParkingSpot parkingSpot) {
        ParkingSpot savedSpot = parkingSpotRepository.save(parkingSpot);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedSpot);
    }

    // Update a parking spot by ID
    @PutMapping("/{id}")
    public ResponseEntity<ParkingSpot> updateParkingSpot(@PathVariable Long id, @RequestBody ParkingSpot parkingSpot) {
        Optional<ParkingSpot> existingSpotOpt = parkingSpotRepository.findById(id);

        if (existingSpotOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        ParkingSpot existingSpot = existingSpotOpt.get();
        existingSpot.setName(parkingSpot.getName());
        existingSpot.setLocation(parkingSpot.getLocation());
        existingSpot.setAvailability(parkingSpot.getAvailability());  // Ensure availability field is in sync if used
        existingSpot.setMapUrl(parkingSpot.getMapUrl());

        ParkingSpot updatedSpot = parkingSpotRepository.save(existingSpot);
        return ResponseEntity.ok(updatedSpot);
    }

    // Delete a parking spot by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteParkingSpot(@PathVariable Long id) {
        if (!parkingSpotRepository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        parkingSpotRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // Book a specific slot within a parking spot
    @PostMapping("/{spotId}/slots/{slotId}/book")
    public ResponseEntity<String> bookParkingSlot(@PathVariable Long spotId, @PathVariable Long slotId) {
        Optional<ParkingSlot> bookedSlot = parkingSlotService.bookSlot(slotId);

        if (bookedSlot.isPresent()) {
            return ResponseEntity.ok("Slot booked successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Slot is already booked or does not exist.");
        }
    }

    // Unbook a specific slot within a parking spot
    @PostMapping("/{spotId}/slots/{slotId}/unbook")
    public ResponseEntity<String> unbookParkingSlot(@PathVariable Long spotId, @PathVariable Long slotId) {
        Optional<ParkingSlot> unbookedSlot = parkingSlotService.unbookSlot(slotId);

        if (unbookedSlot.isPresent()) {
            return ResponseEntity.ok("Slot unbooked successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Slot is not booked or does not exist.");
        }
    }

    // Delete a parking slot by ID
    @DeleteMapping("/slots/{slotId}")
    public ResponseEntity<Void> deleteParkingSlot(@PathVariable Long slotId) {
        if (!parkingSlotService.slotExists(slotId)) { // Add slotExists check in ParkingSlotService
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        parkingSlotService.deleteSlot(slotId);
        return ResponseEntity.noContent().build();
    }
}
