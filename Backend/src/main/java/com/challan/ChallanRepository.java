package com.challan;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChallanRepository extends JpaRepository<Challan, Long> {
}