package com.buildix.glorem.services;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
/**
 * @author aKuznetsov
 *
 */

public class Courier {

	private MailSender mailSender;
	

	/**
	 * @param mailSender
	 */
	public void setMailSender(MailSender mailSender) {
		this.mailSender = mailSender;
	}

	/**
	 * @param to
	 * @param subject
	 * @param msg
	 */
	public void sendMail(String to, String subject, String msg) {

		SimpleMailMessage message = new SimpleMailMessage();

		message.setTo(to);
		message.setSubject(subject);
		message.setText(msg);
		mailSender.send(message);
	}
}
