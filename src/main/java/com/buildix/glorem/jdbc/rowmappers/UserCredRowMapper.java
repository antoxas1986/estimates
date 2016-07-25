package com.buildix.glorem.jdbc.rowmappers;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.buildix.glorem.models.UserCred;

public class UserCredRowMapper implements RowMapper<UserCred>{

	@Override
	public UserCred mapRow(ResultSet rs, int rowNum) throws SQLException {
		UserCred u = new UserCred();
		u.setId(rs.getInt(1));
		u.setUsername(rs.getString(2));
		u.setPassword(rs.getString(3));
		u.setRole(rs.getString(4));
		u.setEnabled(rs.getBoolean(5));
		return u;
	}

}
