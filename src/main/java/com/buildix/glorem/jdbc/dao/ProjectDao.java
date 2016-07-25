package com.buildix.glorem.jdbc.dao;

import java.util.List;

import com.buildix.glorem.models.Project;

public interface ProjectDao {

	Project getProjectByProjectId(Integer projectId);

	List<Project> getAllProjects();
	
	void addProject(Project project);

}