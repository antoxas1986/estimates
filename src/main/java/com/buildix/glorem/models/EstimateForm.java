package com.buildix.glorem.models;

import java.util.List;

public class EstimateForm {
	
	private String chapterName;
	private List<TypeJob> tjList;
	private Double chapterCount;
	private Double chapterCustTotal;
	
	/**
	 * @return the chapterName
	 */
	public String getChapterName() {
		return chapterName;
	}
	/**
	 * @param chapterName the chapterName to set
	 */
	public void setChapterName(String chapterName) {
		this.chapterName = chapterName;
	}
	/**
	 * @return the tjList
	 */
	public List<TypeJob> getTjList() {
		return tjList;
	}
	/**
	 * @param tjList the tjList to set
	 */
	public void setTjList(List<TypeJob> tjList) {
		this.tjList = tjList;
	}
	/**
	 * @return the chpaterCount
	 */
	public Double getChapterCount() {
		return chapterCount;
	}
	/**
	 * @param chpaterCount the chpaterCount to set
	 */
	public void setChapterCount(Double chpaterCount) {
		this.chapterCount = chpaterCount;
	}
	/**
	 * @return the chapterCustTotal
	 */
	public Double getChapterCustTotal() {
		return chapterCustTotal;
	}
	/**
	 * @param chapterCustTotal the chapterCustTotal to set
	 */
	public void setChapterCustTotal(Double chapterCustTotal) {
		this.chapterCustTotal = chapterCustTotal;
	}
	


}
