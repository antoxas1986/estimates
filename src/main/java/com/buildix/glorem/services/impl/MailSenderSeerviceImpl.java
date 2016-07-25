package com.buildix.glorem.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.buildix.glorem.jdbc.dao.UserDao;
import com.buildix.glorem.models.User;
import com.buildix.glorem.services.Courier;
import com.buildix.glorem.services.MailSenderService;

@Service
@Transactional
public class MailSenderSeerviceImpl implements MailSenderService {

	@Autowired
	private UserDao userDao;

	@Override
	public void sendCustomerEmail(Integer id) {
		userDao.changeStatusToSend(id);
		User user = userDao.getUserByUserId(id);
		ApplicationContext mailContext = new ClassPathXmlApplicationContext("Spring-Mail.xml");

		try {
			Courier courier = (Courier) mailContext.getBean("courier");
			courier.sendMail("kuznetsov74@gmail.com", "Estimate ready!",
					"Dear " + user.getName() + " " + user.getLastName() + ", \n\nYour estimate ready to view "
							+ ".  You will be notified through this email on the status of your estimate.\n\n" 
							+ " Go to http://projects-glorem.rhcloud.com/customerEstimate/"+user.getId()+" to see your estimate."
							+ "\n\nGlorem LLC\nClean. Beautifull. In time\n(123) 456-7890");
		} finally {
			((AbstractApplicationContext) mailContext).close();
		}
	}

	@Override
	public void emailEstimateFromCustomer(Integer id) {
		
		User user = userDao.getUserByUserId(id);
		ApplicationContext mailContext = new ClassPathXmlApplicationContext("Spring-Mail.xml");

		try {
			Courier courier = (Courier) mailContext.getBean("courier");
			courier.sendMail("kuznetsov74@gmail.com", "Estimate has been modifyed!",
					"Dear manager. \n\n" + user.getName() + " " + user.getLastName() + " has modify his\\her estimate.\n\n "
							+ "Please login to web-application to http://projects-glorem.rhcloud.com to see changes in estimate."
							+ "\n\nGlorem LLC\nClean. Beautifull. In time\n(123) 456-7890");
		} finally {
			((AbstractApplicationContext) mailContext).close();
		}
		
	}

}
