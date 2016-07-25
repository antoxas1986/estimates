package com.buildix.glorem.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.buildix.glorem.jdbc.dao.ProjectSchemaDao;
import com.buildix.glorem.models.ProjectSchema;
import com.buildix.glorem.services.ProjectSchemaService;

@Service
@Transactional
public class ProjectSchemaServiceImpl implements ProjectSchemaService  {
	
	@Autowired
	private ProjectSchemaDao schemaDao;
	
	
	@Override
	public ProjectSchema getSchemaBySchemaId(Integer schemaId) {
		return schemaDao.getSchemaById(schemaId);
	}

	
	@Override
	public List<ProjectSchema> getAllSchemas() {
		return schemaDao.getAllSchemas();
	}


	@Override
	public void create(ProjectSchema schema) {
		schemaDao.create(schema);
		
	}

}
