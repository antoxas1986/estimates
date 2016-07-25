package com.buildix.glorem.jdbc.rowmappers;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.buildix.glorem.models.State;

/**
 * @author Antoxas
 *
 */
public class StateRowMapper implements RowMapper<State> {

	
	private static final int STATE_STATENAME_FIELD = 2;
	private static final int STATE_ID_FIELD = 1;

	@Override
	public State mapRow(ResultSet rs, int rowNum) throws SQLException {
		State state = new State();
		state.setStateId(rs.getInt(STATE_ID_FIELD));
		state.setStateName(rs.getString(STATE_STATENAME_FIELD));
		
		return state;
	}

}
