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
    public void sendPaymentConfirmation(Transaction transaction) {
        String to = transaction.getEmail();
        String subject = "Payment Confirmation";
        String body = "Dear " + transaction.getName() + ",\n\n"
                + "Thank you for your payment of " + transaction.getAmount() + " INR.\n"
                + "Your transaction ID is: " + transaction.getId() + "\n\n"
                + "Best Regards,\nYour Company Name";

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        
        mailSender.send(message);
    }
}
