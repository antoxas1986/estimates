package com.buildix.glorem.jdbc.dao;

import java.util.List;

import com.buildix.glorem.models.TypeJob;

public interface TypeJobDao {

	void addTypeJob(TypeJob tj);
	
	List<TypeJob> getAll();
	
	void removeItem(Integer itemId);
	
	List<TypeJob> getTypeJobByChapterName(String name);

	TypeJob getTypeJobById(Integer integer);

	void addCustomerTypeJob(TypeJob typeJob);

	List<TypeJob> getTypeJobByCuctomerId(Integer id);

	void updateCustomerTypeJob(TypeJob typeJob);

}
