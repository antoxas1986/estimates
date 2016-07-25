package com.buildix.glorem.services;

import java.util.List;

import com.buildix.glorem.models.State;


/**
 * @author Anton Kuznetsov
 *
 */
public interface StateService {
	/**
	 * @param userId
	 * @return
	 */
	State getStateByStateId(Integer stateId);
	
	/**
	 * @return
	 */
	List<State> getAllStates();

}
