package com.buildix.glorem.services;

import java.util.List;

import com.buildix.glorem.models.TypeJob;

public interface TypeJobService {

	void addTypeJob(TypeJob tj);
	
	List<TypeJob> getAll();
	
	void removeItem(Integer itemId);

}