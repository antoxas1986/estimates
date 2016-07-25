package com.buildix.glorem.services;

import java.util.List;

import com.buildix.glorem.models.Project;

public interface ProjectService {

	Project getProjectByProjectId(Integer projectId);

	List<Project> getAllProjects();
	
	void addProject(Project project);

}