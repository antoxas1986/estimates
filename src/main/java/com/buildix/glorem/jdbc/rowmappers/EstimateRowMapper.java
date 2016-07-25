package com.buildix.glorem.jdbc.rowmappers;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.buildix.glorem.models.Estimate;

public class EstimateRowMapper implements RowMapper<Estimate> {

	@Override
	public Estimate mapRow(ResultSet rs, int rowNum) throws SQLException {
		Estimate e = new Estimate();
		e.setId(rs.getInt(1));
		e.setName(rs.getString(2));
		return e;
	}

}
