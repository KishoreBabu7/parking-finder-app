package com.challan;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/challan")
@CrossOrigin(origins = "http://localhost:4200")
public class ChallanController {

    @Autowired
    private ChallanService challanService;

    @PostMapping()
    public ResponseEntity<?> createChallan(@RequestBody Challan challan) {
        try {
            Challan savedChallan = challanService.saveChallan(challan);
            return new ResponseEntity<>(savedChallan, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to create challan: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<List<Challan>> getAllChallans() {
        List<Challan> challans = challanService.getAllChallans();
        return new ResponseEntity<>(challans, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getChallanById(@PathVariable String id) {  // String as the type for tokenid
        Optional<Challan> optionalChallan = challanService.getChallanById(id);
        
        if (optionalChallan.isPresent()) {
            return new ResponseEntity<>(optionalChallan.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Challan not found with tokenid: " + id, HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/payNow/{id}")
    public ResponseEntity<?> payNow(@PathVariable String id) {  // String as the type for tokenid
        Optional<Challan> optionalChallan = challanService.getChallanById(id);
        if (optionalChallan.isPresent()) {
            Challan challan = optionalChallan.get();
            // Here we should update the status in the Payment entity, not the Challan
            // Assuming PaymentService is handling the status update, you can call it here
            return new ResponseEntity<>("Payment processed successfully.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Challan not found with tokenid: " + id, HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/payAtStation/{id}")
    public ResponseEntity<?> payAtStation(@PathVariable String id) {  // String as the type for tokenid
        Optional<Challan> optionalChallan = challanService.getChallanById(id);
        if (optionalChallan.isPresent()) {
            Challan challan = optionalChallan.get();
            // Similarly, update the payment status in Payment entity
            return new ResponseEntity<>("Challan submitted for payment at station.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Challan not found with tokenid: " + id, HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateChallan(@PathVariable String id, @RequestBody Challan updatedChallan) {  // String as the type for tokenid
        Optional<Challan> existingChallan = challanService.getChallanById(id);
        if (existingChallan.isPresent()) {
            updatedChallan.setTokenid(id);  // Using tokenid to update Challan
            Challan savedChallan = challanService.saveChallan(updatedChallan);
            return new ResponseEntity<>(savedChallan, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Challan not found with tokenid: " + id, HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteChallan(@PathVariable String id) {  // String as the type for tokenid
        Optional<Challan> challan = challanService.getChallanById(id);
        if (challan.isPresent()) {
            challanService.deleteChallan(id);
            return new ResponseEntity<>("Challan deleted successfully.", HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>("Challan not found with tokenid: " + id, HttpStatus.NOT_FOUND);
        }
    }
}
