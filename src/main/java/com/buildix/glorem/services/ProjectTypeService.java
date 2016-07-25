package com.buildix.glorem.services;

import java.util.List;

import com.buildix.glorem.models.ProjectType;

/**
 * @author Antoxas
 *
 */
public interface ProjectTypeService {

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