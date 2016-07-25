package com.buildix.glorem.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.buildix.glorem.jdbc.dao.StateDao;
import com.buildix.glorem.models.State;
import com.buildix.glorem.services.StateService;

@Service
@Transactional
public class StateServiceImpl implements StateService {
	
	@Autowired
	private StateDao stateDao;

	

	@Override
	public State getStateByStateId(Integer stateId) {
		
		return stateDao.getStateByStateId(stateId);
	}

	@Override
	public List<State> getAllStates() {
		
		return stateDao.getAllStates();
	}

}
