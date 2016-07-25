package com.buildix.glorem.services;

/**
 * @author Antoxas
 *
 */
public interface MailSenderService {
	/**
	 * @param id
	 */
	void sendCustomerEmail(Integer id);

	void emailEstimateFromCustomer(Integer id);
	
}
