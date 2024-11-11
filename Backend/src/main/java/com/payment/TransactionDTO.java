package com.payment;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class TransactionDTO {

    private String tokenId;
    private BigDecimal amountPaid;
    private String status;
    private LocalDateTime dateTime;

    // Constructor
    public TransactionDTO(String tokenId, BigDecimal amountPaid, String status, LocalDateTime dateTime) {
        this.tokenId = tokenId;
        this.amountPaid = amountPaid;
        this.status = status;
        this.dateTime = dateTime;
    }

    // Getters and Setters
    public String getTokenId() {
        return tokenId;
    }

    public void setTokenId(String tokenId) {
        this.tokenId = tokenId;
    }

    public BigDecimal getAmountPaid() {
        return amountPaid;
    }

    public void setAmountPaid(BigDecimal amountPaid) {
        this.amountPaid = amountPaid;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }
}
