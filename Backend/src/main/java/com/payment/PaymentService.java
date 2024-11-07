package com.payment;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.Utils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class PaymentService {

    @Value("${razorpay.key.id}")
    private String razorpayKeyId;

    @Value("${razorpay.key.secret}")
    private String razorpayKeySecret;

    // Method to create a Razorpay order
    public Map<String, Object> createOrder(Double amount) throws Exception {
        RazorpayClient razorpayClient = new RazorpayClient(razorpayKeyId, razorpayKeySecret);

        // Create a JSON object for order data
        JSONObject orderData = new JSONObject();
        orderData.put("amount", amount * 100); // Amount in paise
        orderData.put("currency", "INR");
        orderData.put("receipt", "receipt#1");
        orderData.put("payment_capture", 1); // Auto capture

        // Create the order
        Order order = razorpayClient.orders.create(orderData);

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

            // Validate signature
            return Utils.verifyPaymentSignature(jsonObject, razorpayKeySecret);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
