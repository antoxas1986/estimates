package com.buildix.glorem.jdbc.rowmappers;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.buildix.glorem.models.Unit;

public class UnitRowMapper implements RowMapper<Unit>{

	@Override
	public Unit mapRow(ResultSet rs, int rowNum) throws SQLException {
		Unit u = new Unit();
		u.setId(rs.getInt(1));
		u.setName(rs.getString(2));
		return u;
	}

}
