package com.buildix.glorem.jdbc.dao;

import java.util.List;

import com.buildix.glorem.models.Estimate;

/**
 * @author Antoxas
 *
 */
public interface EstimateDao {

	/**
	 * @param estimateId
	 * @return
	 */
	Estimate getEstimateByEstimateId(Integer estimateId);

	/**
	 * @return
	 */
	List<Estimate> getAllEstimates();

	/**
	 * @param estimate
	 */
	void addEstimate(Estimate estimate);

}