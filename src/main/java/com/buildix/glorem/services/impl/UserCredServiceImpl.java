package com.buildix.glorem.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.buildix.glorem.jdbc.dao.UserCredDao;
import com.buildix.glorem.models.UserCred;
import com.buildix.glorem.services.UserCredService;

@Service
@Transactional
public class UserCredServiceImpl implements UserCredService {
	
	@Autowired
	private UserCredDao userCredDao;
	
	@Override
	public UserCred getUserCredByName(String name) {
		return userCredDao.getUserCredByName(name);
	}

}
