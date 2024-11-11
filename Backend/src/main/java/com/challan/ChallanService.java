package com.challan;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChallanService {

    @Autowired
    private ChallanRepository challanRepository;

    // Save or update Challan
    public Challan saveChallan(Challan challan) {
        return challanRepository.save(challan);
    }

    // Get all Challans
    public List<Challan> getAllChallans() {
        return challanRepository.findAll();
    }

    // Get Challan by tokenid (String)
    public Optional<Challan> getChallanById(String tokenid) {  // Changed from Long to String
        return challanRepository.findById(tokenid);
    }

    // Delete Challan by tokenid (String)
    public void deleteChallan(String tokenid) {  // Changed from Long to String
        challanRepository.deleteById(tokenid);
    }
}
