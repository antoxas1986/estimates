package com.buildix.glorem.jdbc.rowmappers;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.buildix.glorem.models.Project;

/**
 * @author Antoxas
 *
 */
public class ProjectRowMapper implements RowMapper<Project> {
	
	private static final int PROJECT_TYPE_FIELD = 7;
	private static final int PROJECT_STATUS_FIELD = 6;
	private static final int PROJECT_PROJECT_END_FIELD = 5;
	private static final int PROJECT_PROJECT_START_FIELD = 4;
	private static final int PROJECT_USERID_FIELD = 3;
	private static final int PROJECT_NAME_FIELD = 2;
	private static final int PROJECT_ID_FIELD = 1;

	@Override
	public Project mapRow(ResultSet rs, int rowNum) throws SQLException {
		Project project = new Project();
		project.setProjectId(rs.getInt(PROJECT_ID_FIELD));
		project.setProjectName(rs.getString(PROJECT_NAME_FIELD));
		project.setUserId(rs.getInt(PROJECT_USERID_FIELD));
		project.setProjectStart(rs.getDate(PROJECT_PROJECT_START_FIELD));
		project.setProjectEnd(rs.getDate(PROJECT_PROJECT_END_FIELD));
		project.setProjectStatus(rs.getString(PROJECT_STATUS_FIELD));
		project.setProjectTypeId(rs.getInt(PROJECT_TYPE_FIELD));
		return project;
	}

}
