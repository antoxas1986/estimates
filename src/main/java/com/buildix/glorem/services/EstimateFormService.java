package com.buildix.glorem.services;

import java.util.List;

import com.buildix.glorem.models.EstimateForm;

public interface EstimateFormService {

	List<EstimateForm> getForm();

	List<EstimateForm> getSchemaForm(String name);

	void saveCustomerEstimate(List<EstimateForm> estimate);

	List<EstimateForm> getCustomerEstimate(Integer id);

	void updateCustomerEstimate(List<EstimateForm> estimate);

}