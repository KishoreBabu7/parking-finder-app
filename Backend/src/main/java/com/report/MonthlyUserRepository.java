package com.report;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MonthlyUserRepository extends JpaRepository<MonthlyUser, String> {

    @Query("SELECT m FROM MonthlyUser m WHERE m.year = :year ORDER BY " +
           "FIELD(m.month, 'January', 'February', 'March', 'April', 'May', 'June', " +
           "'July', 'August', 'September', 'October', 'November', 'December')")
    List<MonthlyUser> findAllByYear(int year);
}
