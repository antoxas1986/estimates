package com.buildix.glorem.jdbc.rowmappers;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.buildix.glorem.models.User;

/**
 * @author Antoxas
 *
 */
public class UserRowMapper implements RowMapper<User> {

	private static final int USER_CRED_ID = 6;
	private static final int USER_PHONE_FIELD = 5;
	private static final int USER_EMAIL_FIELD = 4;
	private static final int USER_LASTNAME_FIELD = 3;
	private static final int USER_FIRSTNAME_FIELD = 2;
	private static final int USER_ID_FIELD = 1;

	@Override
	public User mapRow(ResultSet rs, int rowNum) throws SQLException {
		User user = new User();
		user.setId(rs.getInt(USER_ID_FIELD));
		user.setName(rs.getString(USER_FIRSTNAME_FIELD));
		user.setLastName(rs.getString(USER_LASTNAME_FIELD));
		user.setEmail(rs.getString(USER_EMAIL_FIELD));
		user.setPhoneNumber(rs.getString(USER_PHONE_FIELD));
		user.setUserCredId(rs.getInt(USER_CRED_ID));
		user.setAddress(rs.getString(7));
		user.setNotes(rs.getString(8));
		user.setStatus(rs.getString(9));
		user.setTypeEstimate(rs.getString(10));
		user.setCustomerTotal(rs.getString(11));
		user.setCustomerDiscount(rs.getString(12));
		user.setCustomerGrandTotal(rs.getString(13));
		user.setUpdCustomerTotal(rs.getString(14));
		user.setUpdCustomerGrandTotal(rs.getString(15));
		user.setCondition(rs.getString(16));
		user.setDate(rs.getDate(17));
		return user;
	}

}
