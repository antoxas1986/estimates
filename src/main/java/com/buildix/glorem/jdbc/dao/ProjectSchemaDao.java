package com.buildix.glorem.jdbc.dao;

import java.util.List;

import com.buildix.glorem.models.ProjectSchema;

/**
 * @author Antoxas
 *
 */
public interface ProjectSchemaDao {

	/**
	 * @return
	 */
	List<ProjectSchema> getAllSchemas();

	/**
	 * @param schemaId
	 * @return
	 */
	ProjectSchema getSchemaById(Integer schemaId);
	
	void create(ProjectSchema schema);

}