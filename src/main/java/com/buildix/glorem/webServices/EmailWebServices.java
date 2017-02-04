package com.buildix.glorem.webServices;

import com.buildix.glorem.models.User;
import com.itextpdf.text.DocumentException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
	
	@RequestMapping(value="/sendEstimate", method=RequestMethod.POST)
	public void sendCustomerEmail(@RequestBody User customer ) throws FileNotFoundException, DocumentException {
		msService.sendCustomerEmail(customer);
	}
	
	@RequestMapping(value="/emailEstimateFromCustomer/{id}", method=RequestMethod.GET)
	public void emailFromCustomer(@PathVariable Integer id){
		msService.emailEstimateFromCustomer(id);
	}
}
