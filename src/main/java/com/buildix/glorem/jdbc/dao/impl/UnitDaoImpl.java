package com.buildix.glorem.jdbc.dao.impl;

import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import com.buildix.glorem.jdbc.dao.UnitDao;
import com.buildix.glorem.jdbc.rowmappers.UnitRowMapper;
import com.buildix.glorem.models.Unit;

@Component
public class UnitDaoImpl implements UnitDao {

	private JdbcTemplate jdbcTemplate;
	private static final String GET_ALL_UNITS = "select u.id, u.name from unit as u";

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
	public List<Unit> getAllUnits() {
		return jdbcTemplate.query(GET_ALL_UNITS, new Object[] {}, new UnitRowMapper());
	}

	

}
