package com.buildix.glorem.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.buildix.glorem.jdbc.dao.SchemaFormDao;
import com.buildix.glorem.models.SchemaForm;
import com.buildix.glorem.services.SchemaFormService;

@Service
@Transactional
public class SchemaFormServiceImpl implements SchemaFormService {
	
	@Autowired
	private SchemaFormDao schemaFormDao;
	
	@Override
	public void saveSchemaForm(SchemaForm schemaForm) {
		schemaFormDao.saveSchemaForm(schemaForm);		
	}

	@Override
	public List<String> getSchemaFormNames() {
		return schemaFormDao.getSchemaFormNames();
	}

	@Override
	public void updateTemplateName(String[] names) {
		schemaFormDao.updateTemplateName(names);
	}

	@Override
	public void deleteTemplate(String name) {
		schemaFormDao.deleteTemplate(name);
	}

}
