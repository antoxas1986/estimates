package com.buildix.glorem.webServices;

import com.itextpdf.text.DocumentException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.buildix.glorem.services.MailSenderService;

import java.io.FileNotFoundException;

/**
 * @author Antoxas
 *
 */
@RestController
public class EmailWebServices {
	
	@Autowired
	MailSenderService msService;
	
	/**
	 * @param id
	 */
	@RequestMapping(value="/sendEstimate/{id}", method=RequestMethod.GET)
	public void sendCustomerEmail(@PathVariable("id") Integer id ) throws FileNotFoundException, DocumentException {
		msService.sendCustomerEmail(id);
	}
	
	@RequestMapping(value="/emailEstimateFromCustomer/{id}", method=RequestMethod.GET)
	public void emailFromCustomer(@PathVariable Integer id){
		msService.emailEstimateFromCustomer(id);
	}
}
