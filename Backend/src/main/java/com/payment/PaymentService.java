package com.payment;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.Utils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PaymentService {

    @Value("${razorpay.key.id}")
    private String razorpayKeyId;

    @Value("${razorpay.key.secret}")
    private String razorpayKeySecret;

    @Autowired
    private PaymentRepository paymentRepository;

    // Method to create a Razorpay order
    public Map<String, Object> createOrder(Double amount) throws Exception {
        RazorpayClient razorpayClient = new RazorpayClient(razorpayKeyId, razorpayKeySecret);

        // Create a JSON object for order data
        JSONObject orderData = new JSONObject();
        orderData.put("amount", amount * 100); // Amount in paise (Razorpay expects paise for INR)
        orderData.put("currency", "INR");
        orderData.put("receipt", "receipt#1");
        orderData.put("payment_capture", 1); // Auto capture

        // Create the order in Razorpay
        Order order = razorpayClient.orders.create(orderData);

        // Save payment details to the database (optional, if required)
        PaymentRequest paymentRequest = new PaymentRequest();
        paymentRequest.setAmount(amount);
        paymentRequest.setStatus("PENDING");
        paymentRequest.setRazorpayOrderId(order.get("id").toString());
        paymentRepository.save(paymentRequest);

        // Prepare response with order details
        Map<String, Object> response = new HashMap<>();
        response.put("id", order.get("id"));
        response.put("amount", order.get("amount"));
        response.put("currency", order.get("currency"));
        response.put("status", order.get("status"));

        return response;
    }

    // Method to verify payment signature
    public boolean verifyPayment(Map<String, Object> paymentDetails) {
        try {
            String razorpayOrderId = paymentDetails.get("razorpay_order_id").toString();
            String razorpayPaymentId = paymentDetails.get("razorpay_payment_id").toString();
            String razorpaySignature = paymentDetails.get("razorpay_signature").toString();

            // Create a JSONObject for signature verification
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("razorpay_order_id", razorpayOrderId);
            jsonObject.put("razorpay_payment_id", razorpayPaymentId);
            jsonObject.put("razorpay_signature", razorpaySignature);

            // Validate the payment signature
            return Utils.verifyPaymentSignature(jsonObject, razorpayKeySecret);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    // Method to fetch payment details by Razorpay order ID
    public PaymentRequest getPaymentDetails(String razorpayOrderId) {
        return paymentRepository.findByRazorpayOrderId(razorpayOrderId);
    }

    // Method to update the payment status (e.g., "SUCCESS", "FAILED")
    public PaymentRequest updatePaymentStatus(String razorpayOrderId, String status) {
        PaymentRequest paymentRequest = paymentRepository.findByRazorpayOrderId(razorpayOrderId);
        if (paymentRequest != null) {
            paymentRequest.setStatus(status);
            return paymentRepository.save(paymentRequest);
        }
        return null; // Return null if no payment found
    }

    // Method to fetch all payments
    public List<PaymentRequest> getAllPayments() {
        return paymentRepository.findAll();
    }

    // Method to fetch payment by ID
    public PaymentRequest getPaymentById(Long id) {
        return paymentRepository.findById(id).orElse(null);
    }

    // Method to save payment details
    public PaymentRequest savePayment(PaymentRequest paymentRequest) {
        return paymentRepository.save(paymentRequest);
    }

    // Method to delete payment by ID
    public void deletePaymentById(Long id) {
        paymentRepository.deleteById(id);
    }
}
