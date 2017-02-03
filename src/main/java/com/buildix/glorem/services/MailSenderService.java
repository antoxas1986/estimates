package com.buildix.glorem.services;

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
	void sendCustomerEmail(Integer id) throws DocumentException, FileNotFoundException;

	void emailEstimateFromCustomer(Integer id);
	
}
