package com.buildix.glorem.jdbc.dao;

import java.util.List;

import com.buildix.glorem.models.SchemaForm;

public interface SchemaFormDao {

	void saveSchemaForm(SchemaForm schemaForm);
	SchemaForm getSchemaFormByName(String name);
	List<String> getSchemaFormNames();
}