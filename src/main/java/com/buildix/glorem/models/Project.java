package com.buildix.glorem.models;

import java.sql.Date;

/**
 * @author Antoxas
 *
 */
public class Project {
	
	private Integer projectId;
	private String projectName;
	private Integer userId;
	private User user;
	private Date projectStart;
	private Date projectEnd;
	private String projectStatus;
	private Integer projectTypeId;
	private ProjectType projectType;
	/**
	 * @return the projectId
	 */
	public Integer getProjectId() {
		return projectId;
	}
	/**
	 * @param projectId the projectId to set
	 */
	public void setProjectId(Integer projectId) {
		this.projectId = projectId;
	}
	/**
	 * @return the projectName
	 */
	public String getProjectName() {
		return projectName;
	}
	/**
	 * @param projectName the projectName to set
	 */
	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}
	/**
	 * @return the userId
	 */
	public Integer getUserId() {
		return userId;
	}
	/**
	 * @param userId the userId to set
	 */
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	/**
	 * @return the user
	 */
	public User getUser() {
		return user;
	}
	/**
	 * @param user the user to set
	 */
	public void setUser(User user) {
		this.user = user;
	}
	/**
	 * @return the projectStart
	 */
	public Date getProjectStart() {
		return projectStart;
	}
	/**
	 * @param projectStart the projectStart to set
	 */
	public void setProjectStart(Date projectStart) {
		this.projectStart = projectStart;
	}
	/**
	 * @return the projectEnd
	 */
	public Date getProjectEnd() {
		return projectEnd;
	}
	/**
	 * @param projectEnd the projectEnd to set
	 */
	public void setProjectEnd(Date projectEnd) {
		this.projectEnd = projectEnd;
	}
	/**
	 * @return the projectStatus
	 */
	public String getProjectStatus() {
		return projectStatus;
	}
	/**
	 * @param projectStatus the projectStatus to set
	 */
	public void setProjectStatus(String projectStatus) {
		this.projectStatus = projectStatus;
	}
	/**
	 * @return the projectTypeId
	 */
	public Integer getProjectTypeId() {
		return projectTypeId;
	}
	/**
	 * @param projectTypeId the projectTypeId to set
	 */
	public void setProjectTypeId(Integer projectTypeId) {
		this.projectTypeId = projectTypeId;
	}
	/**
	 * @return the projectType
	 */
	public ProjectType getProjectType() {
		return projectType;
	}
	/**
	 * @param projectType the projectType to set
	 */
	public void setProjectType(ProjectType projectType) {
		this.projectType = projectType;
	}
}
