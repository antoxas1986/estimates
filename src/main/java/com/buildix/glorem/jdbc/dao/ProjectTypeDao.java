package com.buildix.glorem.jdbc.dao;

import java.util.List;

import com.buildix.glorem.models.ProjectType;

/**
 * @author Antoxas
 *
 */
public interface ProjectTypeDao {

	/**
	 * @param projectTypeId
	 * @return
	 */
	ProjectType getProjectTypeByProjectTypeId(Integer projectTypeId);

	/**
	 * @return
	 */
	List<ProjectType> getAllProjectTypes();

}