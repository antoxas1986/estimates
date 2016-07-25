package com.buildix.glorem.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.buildix.glorem.jdbc.dao.UserDao;
import com.buildix.glorem.models.User;
import com.buildix.glorem.models.UserCred;
import com.buildix.glorem.services.UserService;

@Service
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	private UserDao userDao;

	@Override
	public User getUserByUserId(Integer userId) {
		return userDao.getUserByUserId(userId);
	}

	@Override
	public List<User> getAllActiveUsers() {
		return userDao.getAllActiveUsers();
	}

	@Override
	public void addNewCustomer(User user) {
		if (user.getId()==null){
			userDao.addNewCustomer(user);
		}else if (user.getId() != 0 || user.getId() != null ) {
			userDao.updateCustomer(user);
		} 
	}

	@Override
	public List<User> getAllUsers() {
		return userDao.getAllUsers();
	}

	@Override
	public void changeStatusToAgree(Integer id) {
		userDao.changeStatusToAgree(id);
		
	}
	@Override
	public void changeStatusToDecline(Integer id) {
		userDao.changeStatusToDecline(id);
		
	}

	@Override
	public void removeUserByUserId(Integer id) {
		userDao.removeUserByUserId(id);
		
	}

	@Override
	public boolean validateUser(UserCred userCred) throws Exception {
		return userDao.validateUser(userCred);
	}

}
