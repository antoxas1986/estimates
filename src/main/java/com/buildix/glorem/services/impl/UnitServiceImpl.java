package com.buildix.glorem.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.buildix.glorem.jdbc.dao.UnitDao;
import com.buildix.glorem.models.Unit;
import com.buildix.glorem.services.UnitService;

@Service
@Transactional
public class UnitServiceImpl implements UnitService {
	
	@Autowired
	private UnitDao unitDao;
	
	@Override
	public List<Unit> getAllUnits() {
		return unitDao.getAllUnits();
	}

}
