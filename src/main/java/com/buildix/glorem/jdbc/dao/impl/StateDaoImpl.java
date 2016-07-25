package com.buildix.glorem.jdbc.dao.impl;

import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import com.buildix.glorem.jdbc.dao.StateDao;
import com.buildix.glorem.jdbc.rowmappers.StateRowMapper;
import com.buildix.glorem.models.State;

@Component
public class StateDaoImpl implements StateDao{
	
	

	private JdbcTemplate jdbcTemplate;
	
	private static final String GET_ALL_STATE = "select * from state";
	private static final String GET_STATE_BY_STATE_ID = "select s.stateId,s.stateName from state as s where s.stateId = ? ";

	/**
     * Sets the JdbcTemplate using the provided dataSource.
     * 
     * @param dataSource
     */
    @Autowired
    public void setJdbcTemplate(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }
	
	

	@Override
	public State getStateByStateId(Integer stateId) {
		
		return jdbcTemplate.queryForObject(GET_STATE_BY_STATE_ID, new Object[] { stateId }, new StateRowMapper());
	}

	@Override
	public List<State> getAllStates() {
		
		return jdbcTemplate.query(GET_ALL_STATE, new Object[]{}, new StateRowMapper());
	}
	


}
