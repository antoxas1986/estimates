package com.buildix.glorem.jdbc.rowmappers;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.buildix.glorem.models.Chapter;

/**
 * @author Antoxas
 *
 */
public class ChapterRowMapper implements RowMapper<Chapter> {

	@Override
	public Chapter mapRow(ResultSet rs, int rowNum) throws SQLException {
		Chapter ch = new Chapter();
		ch.setId(rs.getInt(1));
		ch.setName(rs.getString(2));
		return ch;
	}

}
