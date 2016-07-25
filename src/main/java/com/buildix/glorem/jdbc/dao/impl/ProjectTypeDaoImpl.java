package com.buildix.glorem.jdbc.dao.impl;

import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import com.buildix.glorem.jdbc.dao.ProjectTypeDao;
import com.buildix.glorem.jdbc.rowmappers.ProjectTypeRowMapper;
import com.buildix.glorem.models.ProjectType;

@Component
public class ProjectTypeDaoImpl implements ProjectTypeDao{
	
	

	private JdbcTemplate jdbcTemplate;
	
	
	private static final String GET_ALL_PROJECT = "select * from projectType";
	private static final String GET_PROJECT_BY_PROJECT_ID_QUERY = "select p.projectId, p.projectName,p.userId,p.projectStart,p.projectEnd from project as p where p.projectId = ? ";

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
	public ProjectType getProjectTypeByProjectTypeId(Integer projectTypeId) {
		ProjectType projectType = jdbcTemplate.queryForObject(GET_PROJECT_BY_PROJECT_ID_QUERY, new Object[] { projectTypeId }, new ProjectTypeRowMapper());
		return projectType;
	}

	
	
	@Override
	public List<ProjectType> getAllProjectTypes() {
		return jdbcTemplate.query(GET_ALL_PROJECT, new Object[]{}, new ProjectTypeRowMapper());
	}
	


}
