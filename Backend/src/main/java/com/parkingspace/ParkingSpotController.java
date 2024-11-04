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

    @GetMapping
    public List<ParkingSpot> getAllParkingSpots() {
        return parkingSpotRepository.findAll();
    }

    @PostMapping
    public ParkingSpot addParkingSpot(@RequestBody ParkingSpot parkingSpot) {
        return parkingSpotRepository.save(parkingSpot);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ParkingSpot> updateParkingSpot(@PathVariable Long id, @RequestBody ParkingSpot parkingSpot) {
        ParkingSpot existingSpot = parkingSpotRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Parking Spot not found"));
        existingSpot.setName(parkingSpot.getName());
        existingSpot.setLocation(parkingSpot.getLocation());
        existingSpot.setAvailability(parkingSpot.getAvailability());
        existingSpot.setMapUrl(parkingSpot.getMapUrl());
        return ResponseEntity.ok(parkingSpotRepository.save(existingSpot));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteParkingSpot(@PathVariable Long id) {
        parkingSpotRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{spotId}/slots/{slotId}/book")
    public ResponseEntity<String> bookParkingSlot(@PathVariable Long spotId, @PathVariable Long slotId) {
        Optional<ParkingSlot> bookedSlot = parkingSlotService.bookSlot(slotId);
        if (bookedSlot.isPresent()) {
            return ResponseEntity.ok("Slot booked successfully.");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Slot is already booked or does not exist.");
    }

    @PostMapping("/{spotId}/slots/{slotId}/unbook")
    public ResponseEntity<String> unbookParkingSlot(@PathVariable Long spotId, @PathVariable Long slotId) {
        Optional<ParkingSlot> unbookedSlot = parkingSlotService.unbookSlot(slotId);
        if (unbookedSlot.isPresent()) {
            return ResponseEntity.ok("Slot unbooked successfully.");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Slot is not booked or does not exist.");
    }


    @DeleteMapping("/slots/{slotId}")
    public ResponseEntity<Void> deleteParkingSlot(@PathVariable Long slotId) {
        parkingSlotService.deleteSlot(slotId);
        return ResponseEntity.noContent().build();
    }
}
