package com.buildix.glorem.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.buildix.glorem.jdbc.dao.ProjectTypeDao;
import com.buildix.glorem.models.ProjectType;
import com.buildix.glorem.services.ProjectTypeService;

@Service
@Transactional
public class ProjectTypeServiceImpl implements ProjectTypeService {
	
	@Autowired
	private ProjectTypeDao projectTypeDao;
	
	@Override
	public ProjectType getProjectTypeByProjectTypeId(Integer projectTypeId) {
		
		return projectTypeDao.getProjectTypeByProjectTypeId(projectTypeId);
	}

	@Override
	public List<ProjectType> getAllProjectTypes() {
		return projectTypeDao.getAllProjectTypes();
	}

}
