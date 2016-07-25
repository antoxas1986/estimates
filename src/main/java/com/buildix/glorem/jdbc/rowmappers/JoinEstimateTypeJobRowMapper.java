package com.buildix.glorem.jdbc.rowmappers;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.buildix.glorem.models.JoinEstimateTypeJob;

/**
 * @author Antoxas
 *
 */
public class JoinEstimateTypeJobRowMapper  implements RowMapper<JoinEstimateTypeJob>{

	@Override
	public JoinEstimateTypeJob mapRow(ResultSet rs, int rowNum) throws SQLException {
		JoinEstimateTypeJob j = new JoinEstimateTypeJob();
		j.setId(rs.getInt(1));
		j.setEstimateId(rs.getInt(2));
		j.setTypeJobId(rs.getInt(3));
		j.setAmount(rs.getInt(4));
		j.setTotal(rs.getInt(5));
		j.setCustomerAmount(rs.getInt(6));
		j.setCustomerTotal(rs.getInt(7));
		return j;
	}

}
