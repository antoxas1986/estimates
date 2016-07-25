package com.buildix.glorem.jdbc.dao;

import java.util.List;

import com.buildix.glorem.models.State;

/**
 * @author Antoxas
 *
 */
public interface StateDao {
	 
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
