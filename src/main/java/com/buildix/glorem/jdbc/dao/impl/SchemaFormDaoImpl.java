package com.buildix.glorem.jdbc.dao.impl;

import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import com.buildix.glorem.jdbc.dao.SchemaFormDao;
import com.buildix.glorem.models.SchemaForm;

@Component
public class SchemaFormDaoImpl implements SchemaFormDao  {

	private static final String SELECT_SCHEMA_COL_NUM = "Select schemaColNum from schemaForm where schemaName = ?";
	private static final String SELECT_SCHEMA_NAMES = "Select schemaName from schemaForm group by schemaName;";
	private static final String INSERT_INTO_SCHEMA_FORM = "insert into schemaForm(schemaName,schemaColNum) values(?,?)";
	private JdbcTemplate jdbcTemplate;
	

	/**
	 * Sets the JdbcTemplate using the provided dataSource.
	 * 
	 * @param dataSource
	 */
	@Autowired
	public void setJdbcTemplate(DataSource dataSource) {
		this.jdbcTemplate = new JdbcTemplate(dataSource);
	}

	@Override
	public void saveSchemaForm(SchemaForm schemaForm) {
		for (int i=0;i<schemaForm.getIds().size();i++){
			jdbcTemplate.update(INSERT_INTO_SCHEMA_FORM,schemaForm.getName(),schemaForm.getIds().get(i));
		}		
	}

	@Override
	public SchemaForm getSchemaFormByName(String name) {
		SchemaForm sForm = new SchemaForm();
		sForm.setName(name);
		sForm.setIds(jdbcTemplate.queryForList(SELECT_SCHEMA_COL_NUM, new Object[]{name},Integer.class));
		return sForm; 
	}

	@Override
	public List<String> getSchemaFormNames() {
		return jdbcTemplate.queryForList(SELECT_SCHEMA_NAMES, new Object[]{}, String.class);
	}
	

	

}
