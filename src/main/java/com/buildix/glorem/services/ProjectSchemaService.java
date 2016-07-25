package com.buildix.glorem.services;

import java.util.List;

import com.buildix.glorem.models.ProjectSchema;

public interface ProjectSchemaService {

	ProjectSchema getSchemaBySchemaId(Integer schemaId);

	List<ProjectSchema> getAllSchemas();
	
	void create(ProjectSchema schema);

}