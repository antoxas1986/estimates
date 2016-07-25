package com.buildix.glorem.jdbc.rowmappers;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.buildix.glorem.models.TypeJob;

/**
 * @author Antoxas
 *
 */
public class TypeJobRowMapper implements RowMapper<TypeJob> {

	@Override
	public TypeJob mapRow(ResultSet rs, int rowNum) throws SQLException {
		TypeJob t = new TypeJob();
		t.setId(rs.getInt(1));
		t.setChapterName(rs.getString(2));
		t.setWorkDescription(rs.getString(3));
		t.setPrice(rs.getString(4));
		t.setUnitName(rs.getString(5));
		t.setMinimumCharge(rs.getString(6));
		t.setAmount(rs.getString(7));
		t.setTotal(rs.getString(8));
		t.setCustomerId(rs.getInt(9));
		t.setCustomerAmount(rs.getString(10));
		t.setCustomerTotal(rs.getString(11));
		return t;
	}

}
