package com.buildix.glorem.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.buildix.glorem.jdbc.dao.TypeJobDao;
import com.buildix.glorem.models.TypeJob;
import com.buildix.glorem.services.TypeJobService;


@Service
@Transactional
public class TypeJobServiceImpl implements TypeJobService {
	@Autowired
	TypeJobDao tjDao;
	
	@Override
	public void addTypeJob(TypeJob tj){
		tjDao.addTypeJob(tj);
	}

	@Override
	public List<TypeJob> getAll() {
		return tjDao.getAll();
	}

	@Override
	public void removeItem(Integer itemId) {
		tjDao.removeItem(itemId);
		
	}

}
