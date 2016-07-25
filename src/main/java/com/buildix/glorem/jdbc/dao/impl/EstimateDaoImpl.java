package com.buildix.glorem.jdbc.dao.impl;

import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import com.buildix.glorem.jdbc.dao.EstimateDao;
import com.buildix.glorem.jdbc.rowmappers.EstimateRowMapper;
import com.buildix.glorem.models.Estimate;

@Component
public class EstimateDaoImpl implements EstimateDao {

	private JdbcTemplate jdbcTemplate;
	

	private static final String GET_ALL_ESTIMATE = "select e.id, e.name from estimate";
	private static final String GET_ESTIMATE_BY_ESTIMATE_ID_QUERY = "select e.id, e.name from estimate as e where e.id = ? ";
	private static final String INSERT_Estimate = "INSERT INTO estimate (name) VALUES (?)";

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
	public Estimate getEstimateByEstimateId(Integer estimateId) {
		Estimate estimate = jdbcTemplate.queryForObject(GET_ESTIMATE_BY_ESTIMATE_ID_QUERY, new Object[] { estimateId },
				new EstimateRowMapper());
		
		return estimate;
	}

	@Override
	public List<Estimate> getAllEstimates() {
		return jdbcTemplate.query(GET_ALL_ESTIMATE, new Object[] {}, new EstimateRowMapper());
	}

	
	@Override
	public void addEstimate(Estimate estimate) {
		jdbcTemplate.update(INSERT_Estimate, estimate.getName());

	}

}
