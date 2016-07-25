package com.buildix.glorem.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.buildix.glorem.jdbc.dao.ProjectDao;
import com.buildix.glorem.models.Project;
import com.buildix.glorem.services.ProjectService;

@Service
@Transactional
public class ProjectServiceImpl implements ProjectService {
	
	@Autowired
	private ProjectDao projectDao;

	

	
	@Override
	public Project getProjectByProjectId(Integer projectId) {
		
		return projectDao.getProjectByProjectId(projectId);
	}

	@Override
	public List<Project> getAllProjects() {
		return projectDao.getAllProjects();
	}

	@Override
	public void addProject(Project project) {
		projectDao.addProject(project);
		
	}

}
