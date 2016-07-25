package com.buildix.glorem.models;

/**
 * @author Antoxas
 *
 */
public class Estimate {
	
	private Integer id;
	private String name;
	private JoinEstimateTypeJob join;
	/**
	 * @return the id
	 */
	public Integer getId() {
		return id;
	}
	/**
	 * @param id the id to set
	 */
	public void setId(Integer id) {
		this.id = id;
	}
	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}
	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}
	/**
	 * @return the join
	 */
	public JoinEstimateTypeJob getJoin() {
		return join;
	}
	/**
	 * @param join the join to set
	 */
	public void setJoin(JoinEstimateTypeJob join) {
		this.join = join;
	}

}
