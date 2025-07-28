package com.syncora.servicesimpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSendException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.syncora.exceptions.InvaliMailException;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EmailService {
	 
	    private JavaMailSender mailSender;
	


	    public void sendSimpleMessage(String to, String subject, String text) {
	    	 //regex to check email format
	        if (!isValidGmail(to)) {
	            throw new IllegalArgumentException("Email format is incorrect");
	        }
	    	   try {
	               SimpleMailMessage message = new SimpleMailMessage();
	               message.setFrom("priyanshuanand1425@gmail.com");
	               message.setTo(to);
	               message.setSubject(subject);
	               message.setText(text);
	               mailSender.send(message);
	           } 
	    	   catch(MailSendException e) {
	    		   throw new InvaliMailException("Email is incorrect") ;
	    	   }
	    	   
	    	   
	    	   catch (MailException e) {
	               throw new IllegalArgumentException("Email is incorrect or undeliverable");
	           }
	    }
	    private boolean isValidGmail(String email) {
	        return email != null && email.matches("^[a-zA-Z0-9._%+-]+@gmail\\.com$");
	    }
}
