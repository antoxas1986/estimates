package com.buildix.glorem.jdbc.dao.impl;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import com.buildix.glorem.jdbc.dao.UserCredDao;
import com.buildix.glorem.jdbc.rowmappers.UserCredRowMapper;
import com.buildix.glorem.models.UserCred;

@Component
public class UserCredDaoImpl implements UserCredDao {

	private JdbcTemplate jdbcTemplate;
	private static final String GET_USERCRED_BY_NAME = "select u.id, u.userName,u.password,u.role,u.enabled from userCred as u where u.userName=?";

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
	public UserCred getUserCredByName(String name) {
		return jdbcTemplate.queryForObject(GET_USERCRED_BY_NAME, new Object[] {name}, new UserCredRowMapper());
	}

}
