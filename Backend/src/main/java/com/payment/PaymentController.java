package com.payment;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.challan.ChallanService;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "http://localhost:4200")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private ChallanService challanService;

    // 1. Initiate Payment
    @PostMapping("/initiate-payment")
    public ResponseEntity<Map<String, Object>> initiatePayment(@RequestBody PaymentRequest paymentRequest) {
        try {
            // Create a new PaymentRequest with "PENDING" status
            paymentRequest.setStatus("PENDING");
            paymentRequest.setDateTime(java.time.LocalDateTime.now());  // Set current timestamp
            paymentService.savePayment(paymentRequest);

            // Generate Razorpay order and include payment ID for tracking
            Map<String, Object> orderResponse = paymentService.createOrder(paymentRequest.getAmount());
            orderResponse.put("paymentId", paymentRequest.getPaymentId()); // Attach payment ID

            return ResponseEntity.ok(orderResponse);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    // 2. Get all payments for display
    @GetMapping
    public ResponseEntity<List<PaymentRequest>> getPayments() {
        List<PaymentRequest> payments = paymentService.getAllPayments();
        return ResponseEntity.ok(payments);
    }

    // 3. Verify Payment
    @PostMapping("/verify-payment")
    public ResponseEntity<?> verifyPayment(@RequestBody Map<String, Object> paymentDetails) {
        try {
            // Validate payment
            boolean isValid = paymentService.verifyPayment(paymentDetails);
            Long paymentId = Long.parseLong(paymentDetails.get("paymentId").toString());

            if (isValid) {
                // Update payment status to "SUCCESS" and save
                PaymentRequest paymentRequest = paymentService.getPaymentById(paymentId);
                paymentRequest.setStatus("SUCCESS");
                paymentService.savePayment(paymentRequest);

                // Send confirmation email
                emailService.sendPaymentConfirmation(paymentRequest);
                
                return ResponseEntity.ok("Payment verified and payment updated successfully.");
            } else {
                return ResponseEntity.status(400).body("Payment verification failed.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error verifying payment.");
        }
    }

    // 4. Delete Payment by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePayment(@PathVariable Long id) {
        try {
            // Check if the payment exists
            PaymentRequest paymentRequest = paymentService.getPaymentById(id);
            if (paymentRequest != null) {
                paymentService.deletePaymentById(id);
                return ResponseEntity.ok("Payment deleted successfully.");
            } else {
                return ResponseEntity.status(404).body("Payment not found.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error deleting payment.");
        }
    }
}
