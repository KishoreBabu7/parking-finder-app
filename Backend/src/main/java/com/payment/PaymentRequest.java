package com.payment;

import java.time.LocalDateTime;  // For handling the payment date and time

import com.challan.Challan;     // Assuming Challan is the related entity

import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class PaymentRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Auto-increment primary key
    private Long paymentId;       // Primary Key

    private String status;        // Payment status (Paid/Unpaid)
    private double amountPaid;    // Amount paid by the user
    private LocalDateTime dateTime; // Date and time of payment
    
    @ManyToOne
    @JoinColumn(name = "tokenId", referencedColumnName = "tokenid", foreignKey = @ForeignKey(name = "FK_tokenid"))
    private Challan challan;      // Foreign Key from the Challan entity

    private int count;            // Number of users using the application (to generate the report)

    // Getters and Setters
    public Long getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(Long paymentId) {
        this.paymentId = paymentId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public double getAmountPaid() {
        return amountPaid;
    }

    public void setAmountPaid(double amountPaid) {
        this.amountPaid = amountPaid;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public Challan getChallan() {
        return challan;
    }

    public void setChallan(Challan challan) {
        this.challan = challan;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }
}
