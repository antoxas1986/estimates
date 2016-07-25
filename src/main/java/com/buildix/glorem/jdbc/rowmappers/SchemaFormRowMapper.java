package com.buildix.glorem.jdbc.rowmappers;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.buildix.glorem.models.SchemaForm;

/**
 * @author Antoxas
 *
 */
public class SchemaFormRowMapper implements RowMapper<SchemaForm> {

	@Override
	public SchemaForm mapRow(ResultSet rs, int rowNum) throws SQLException {
		SchemaForm sf = new SchemaForm();
		sf.setName(rs.getString(1));
		return sf;
	}

}
