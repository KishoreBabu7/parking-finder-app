package com.challan;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ChallanRepository extends JpaRepository<Challan, String> {  // String as ID type
}
