package com.buildix.glorem.services;

import com.buildix.glorem.models.User;
import com.itextpdf.text.DocumentException;

import java.io.FileNotFoundException;

/**
 * @author Antoxas
 *
 */
public interface MailSenderService {
	/**
	 * @param id
	 */
	void sendCustomerEmail(User customer) throws DocumentException, FileNotFoundException;

	void emailEstimateFromCustomer(Integer id);
	
}
