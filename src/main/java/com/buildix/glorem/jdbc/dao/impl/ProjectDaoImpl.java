package com.buildix.glorem.jdbc.dao.impl;

import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import com.buildix.glorem.jdbc.dao.ProjectDao;
import com.buildix.glorem.jdbc.dao.UserDao;
import com.buildix.glorem.jdbc.rowmappers.ProjectRowMapper;
import com.buildix.glorem.models.Project;

@Component
public class ProjectDaoImpl implements ProjectDao {

	private JdbcTemplate jdbcTemplate;
	@Autowired
	private UserDao userDao;

	private static final String GET_ALL_PROJECT = "select * from project";
	private static final String GET_PROJECT_BY_PROJECT_ID_QUERY = "select p.projectId, p.projectName,p.userId,p.projectStart,p.projectEnd,p.projectStatus,p.projectType from project as p where p.projectId = ? ";
	private static final String INSERT_PROJECT = "INSERT INTO PROJECT (projectName,projectStart,projectEnd,projectStatus,projectType) VALUES (?,?,?,?)";

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
	public Project getProjectByProjectId(Integer projectId) {
		Project project = jdbcTemplate.queryForObject(GET_PROJECT_BY_PROJECT_ID_QUERY, new Object[] { projectId },
				new ProjectRowMapper());
		project.setUser(userDao.getUserByUserId(project.getUserId()));

		return project;
	}

	@Override
	public List<Project> getAllProjects() {
		return jdbcTemplate.query(GET_ALL_PROJECT, new Object[] {}, new ProjectRowMapper());
	}

	@Override
	public void addProject(Project project) {
		jdbcTemplate.update(INSERT_PROJECT, project.getProjectName(), project.getProjectStart(),
				project.getProjectEnd(), project.getProjectStatus(),project.getProjectTypeId());

	}

}
