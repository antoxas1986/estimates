package com.buildix.glorem.jdbc.rowmappers;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.buildix.glorem.models.ProjectType;

/**
 * @author Antoxas
 *
 */
public class ProjectTypeRowMapper implements RowMapper<ProjectType> {

	private static final int PROJECT_TYPE_NAME_FIELD = 2;
	private static final int PROJECT_TYPE_ID_FIELD = 1;

	@Override
	public ProjectType mapRow(ResultSet rs, int rowNum) throws SQLException {
		ProjectType projectType = new ProjectType();
		projectType.setProjectTypeId(rs.getInt(PROJECT_TYPE_ID_FIELD));
		projectType.setProjectTypeName(rs.getString(PROJECT_TYPE_NAME_FIELD));
		return projectType;
	}

}
