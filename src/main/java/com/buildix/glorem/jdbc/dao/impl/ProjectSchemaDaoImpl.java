package com.buildix.glorem.jdbc.dao.impl;

import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import com.buildix.glorem.jdbc.dao.ProjectSchemaDao;
import com.buildix.glorem.jdbc.rowmappers.ProjectSchemaRowMapper;
import com.buildix.glorem.models.ProjectSchema;

@Component
public class ProjectSchemaDaoImpl implements ProjectSchemaDao {

	private JdbcTemplate jdbcTemplate;

	private static final String GET_ALL_SCHEMA = "select * from projectSchema";
	private static final String GET_BY_SCHEMA_ID = "select * from projectSchema where projectSchemaId = ?";

	private static final String INSERT_SCHEMA = "INSERT INTO projectSchema (`PREP`,`RI`,`EL1`,`SP`,`INSP1`,`SF`,`FG`,`INSP2`,`DRY1`,`TILE`,`DF`,`PR`,`PA1`,`DTB`,`CAB`,`PA2`,`EL2`,`BAT`,`LVT`,`CT`,`FGLASS`,`PA3`,`EL3`,`FIN`,`CAR`,`PTU`,`INSP3`,`AFTER`,`schemaName`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

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
	public List<ProjectSchema> getAllSchemas() {
		return jdbcTemplate.query(GET_ALL_SCHEMA, new Object[] {}, new ProjectSchemaRowMapper());
	}

	@Override
	public ProjectSchema getSchemaById(Integer schemaId) {
		return jdbcTemplate.queryForObject(GET_BY_SCHEMA_ID, new Object[] { schemaId }, new ProjectSchemaRowMapper());
	}

	@Override
	public void create(ProjectSchema schema) {
		jdbcTemplate.update(INSERT_SCHEMA, schema.getPREP(), schema.getRI(), schema.getEL1(), schema.getSP(),
				schema.getINSP1(), schema.getSF(), schema.getFG(), schema.getINSP2(), schema.getDRY1(),
				schema.getTILE(), schema.getDF(), schema.getPR(), schema.getPA1(), schema.getDTB(), schema.getCAB(),
				schema.getPA2(), schema.getEL2(), schema.getBAT(), schema.getLVT(), schema.getCT(), schema.getFGLASS(),
				schema.getPA3(),schema.getEL3(), schema.getFIN(), schema.getCAR(), schema.getPTU(), schema.getINSP3(),
				schema.getAFTER(),schema.getSchemaName());

	}

}
