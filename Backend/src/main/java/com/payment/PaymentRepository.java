package com.payment;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<PaymentRequest, Long> {
    // Find PaymentRequest by Razorpay order ID
    PaymentRequest findByRazorpayOrderId(String razorpayOrderId);
}
