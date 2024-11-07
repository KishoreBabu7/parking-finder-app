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

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "http://localhost:4200")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private EmailService emailService;

    // 1. Initiate Payment
    @PostMapping("/initiate-payment")
    public ResponseEntity<Map<String, Object>> initiatePayment(@RequestBody PaymentRequest paymentRequest) {
        try {
            // Create a new transaction with "PENDING" status
            Transaction transaction = new Transaction();
            transaction.setName(paymentRequest.getName());
            transaction.setEmail(paymentRequest.getEmail());
            transaction.setAmount(paymentRequest.getAmount());
            transaction.setStatus("PENDING");
            transactionService.saveTransaction(transaction);

            // Generate a Razorpay order and include transaction ID for tracking
            Map<String, Object> orderResponse = paymentService.createOrder(paymentRequest.getAmount());
            orderResponse.put("transactionId", transaction.getId()); // Attach transaction ID

            return ResponseEntity.ok(orderResponse);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    // 2. Get all transactions for display
    @GetMapping
    public ResponseEntity<List<Transaction>> getTransactions() {
        List<Transaction> transactions = transactionService.getAllTransactions();
        return ResponseEntity.ok(transactions);
    }

    // 3. Verify Payment
    @PostMapping("/verify-payment")
    public ResponseEntity<?> verifyPayment(@RequestBody Map<String, Object> paymentDetails) {
        try {
            // Validate payment
            boolean isValid = paymentService.verifyPayment(paymentDetails);
            Long transactionId = Long.parseLong(paymentDetails.get("transactionId").toString());

            if (isValid) {
                // Update transaction status to "SUCCESS" and save
                Transaction transaction = transactionService.getTransactionById(transactionId);
                transaction.setStatus("SUCCESS");
                transactionService.saveTransaction(transaction);

                // Send confirmation email
                emailService.sendPaymentConfirmation(transaction);
                
                return ResponseEntity.ok("Payment verified and transaction updated successfully.");
            } else {
                return ResponseEntity.status(400).body("Payment verification failed.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error verifying payment.");
        }
    }

    // 4. Delete Transaction by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTransaction(@PathVariable Long id) {
        try {
            // Check if the transaction exists
            if (transactionService.getTransactionById(id) != null) {
                transactionService.deleteTransactionById(id);
                return ResponseEntity.ok("Transaction deleted successfully.");
            } else {
                return ResponseEntity.status(404).body("Transaction not found.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error deleting transaction.");
        }
    }
}

