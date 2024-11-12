	package com.payment;
	
	import java.math.BigDecimal;  // For handling monetary values with precision
	import java.time.LocalDateTime;
	
	import com.challan.Challan;  // Assuming Challan is the related entity
	
	import jakarta.persistence.Entity;
	import jakarta.persistence.ForeignKey;
	import jakarta.persistence.GeneratedValue;
	import jakarta.persistence.GenerationType;
	import jakarta.persistence.Id;
	import jakarta.persistence.JoinColumn;
	import jakarta.persistence.ManyToOne;
	import jakarta.persistence.Column;
	
	@Entity
	public class PaymentRequest {
	
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Auto-increment primary key
	    private Long paymentId;  // Primary Key
	
	    @Column(nullable = false)
	    private String status;  // Payment status (Paid/Unpaid)
	
	    @Column(nullable = false, precision = 10, scale = 2)  // Precision for monetary values
	    private BigDecimal amountPaid;  // Amount paid by the user, using BigDecimal for precision
	
	    @Column(nullable = false)
	    private LocalDateTime dateTime;  // Date and time of payment
	
	    @ManyToOne
	    @JoinColumn(name = "tokenId", referencedColumnName = "tokenid", foreignKey = @ForeignKey(name = "FK_tokenid"))
	    private Challan challan;  // Foreign Key from the Challan entity
	
	    private int count;  // Number of users using the application (for report generation)
	
	    @Column(nullable = false, unique = true)
	    private String razorpayOrderId;  // Razorpay Order ID for tracking payment
	
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
	
	    public BigDecimal getAmountPaid() {
	        return amountPaid;
	    }
	
	    public void setAmountPaid(BigDecimal amountPaid) {
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
	
	    public String getRazorpayOrderId() {
	        return razorpayOrderId;
	    }
	
	    public void setRazorpayOrderId(String razorpayOrderId) {
	        this.razorpayOrderId = razorpayOrderId;
	    }
	}
