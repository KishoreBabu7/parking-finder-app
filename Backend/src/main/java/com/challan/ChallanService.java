package com.challan;

import com.challan.Challan;

import com.challan.ChallanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChallanService {

    @Autowired
    private ChallanRepository challanRepository;

    public Challan saveChallan(Challan challan) {
        return challanRepository.save(challan);
    }

    public List<Challan> getAllChallans() {
        return challanRepository.findAll();
    }

    public Optional<Challan> getChallanById(Long id) {
        return challanRepository.findById(id);
    }

    public void deleteChallan(Long id) {
        challanRepository.deleteById(id);
    }
}