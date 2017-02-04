package com.buildix.glorem.services;

import java.util.List;

import com.buildix.glorem.models.SchemaForm;

public interface SchemaFormService {

	void saveSchemaForm(SchemaForm schemaForm);
	List<String> getSchemaFormNames();

	void updateTemplateName(String[] names);

    void deleteTemplate(String name);

}