package com.report;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Table;

@Entity
@Table(name = "monthly_user")
public class MonthlyUser {

    @Id
    @Column(name = "month")
    private String month;

    @Column(name = "count")
    private int count;

    @Column(name = "year")
    private int year;

    public MonthlyUser() {}

    public MonthlyUser(String month, int count, int year) {
        this.month = month;
        this.count = count;
        this.year = year;
    }

    // Getters and Setters
    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }
}
