package com.payment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    // Method to send payment confirmation email
    public void sendPaymentConfirmation(PaymentRequest paymentRequest) {
        String to = paymentRequest.getChallan().getEmail();  // Assuming `Challan` has an `email` field
        String subject = "Payment Confirmation";
        String body = "Dear " + paymentRequest.getChallan().getName() + ",\n\n"  // Assuming `Challan` has a `name` field
                + "Thank you for your payment of " + paymentRequest.getAmountPaid() + " INR.\n"
                + "Your transaction ID is: " + paymentRequest.getPaymentId() + "\n\n"
                + "Best Regards,\nYour Company Name";

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        
        mailSender.send(message);
    }
}
