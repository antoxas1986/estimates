package com.buildix.glorem.jdbc.dao.impl;

import com.buildix.glorem.jdbc.dao.UserDao;
import com.buildix.glorem.jdbc.rowmappers.UserCredRowMapper;
import com.buildix.glorem.jdbc.rowmappers.UserRowMapper;
import com.buildix.glorem.models.User;
import com.buildix.glorem.models.UserCred;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.util.List;
import java.util.Optional;

@Component
public class UserDaoImpl implements UserDao {

    private static final String INSERT_USER = "insert into user(name,lastName,email,phoneNumber,address,notes,status,typeEstimate,conditionn,date)values(?,?,?,?,?,?,?,?,?,?)";
    private static final String UPDATE_USER = "update user set name=?,lastName=?,email=?,phoneNumber=?,address=?,notes=?,status=?,typeEstimate=?, customerTotal=?, customerDiscount=?, customerGrandTotal=?, updCustomerTotal=?, updCustomerGrandTotal=?, isActive = ?  where id=?";
    private static final String GET_CC_USER = "select * from user where status = 'CC' and isActive = true;";
    private static final String GET_ALL_USER = "select * from user where user.conditionn = 'customer' and isActive = true";
    private static final String GET_USER_BY_USER_ID_QUERY = "select * from user where id = ? ";
    private static final String REMOVE_USER = "delete from user where id=?";
    private static final String VALIDATE = "select * from userCred where userName=? and password=?";
    private static final String CUSTOMER_LOOKUP = "select * from user where phoneNumber = ?";
    private static final String GET_ALL_DEACTIVATED_USER = "select * from user where isActive = false and conditionn='customer';";
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
    public User getUserByUserId(Integer userId) {

        return jdbcTemplate.queryForObject(GET_USER_BY_USER_ID_QUERY, new Object[]{userId}, new UserRowMapper());
    }

    @Override
    public List<User> getCCUsers() {

        return jdbcTemplate.query(GET_CC_USER, new Object[]{}, new UserRowMapper());
    }

    @Override
    public void addNewCustomer(User user) {
        jdbcTemplate.update(INSERT_USER, user.getName(), user.getLastName(), user.getEmail(), user.getPhoneNumber(),
                user.getAddress(), user.getNotes(), user.getStatus(), user.getTypeEstimate(), user.getCondition(),
                user.getDate());
    }

    @Override
    public void updateCustomer(User user) {
        jdbcTemplate.update(UPDATE_USER, user.getName(), user.getLastName(), user.getEmail(), user.getPhoneNumber(),
                user.getAddress(), user.getNotes(), user.getStatus(), user.getTypeEstimate(), user.getCustomerTotal(),
                user.getCustomerDiscount(), user.getCustomerGrandTotal(), user.getUpdCustomerTotal(),
                user.getUpdCustomerGrandTotal(), user.isActive(), user.getId());
    }

    @Override
    public List<User> getAllUsers() {
        return jdbcTemplate.query(GET_ALL_USER, new Object[]{}, new UserRowMapper());
    }


    @Override
    public void removeUserByUserId(Integer userId) {
        jdbcTemplate.update(REMOVE_USER, userId);
    }

    @Override
    public boolean validateUser(UserCred userCred) throws Exception {
        UserCred userC;
        try {
            userC = jdbcTemplate.queryForObject(VALIDATE,
                    new Object[]{userCred.getUsername(), userCred.getPassword()}, new UserCredRowMapper());
        } catch (DataAccessException e) {
            throw new Exception("not found");

        }
        if (userC.getId() == null) {
            return false;
        }
        else {
            return true;
        }
    }

    @Override
    public Optional<User> customerLookup(String phone) {
        User user = null;
        try {
            user = jdbcTemplate.queryForObject(CUSTOMER_LOOKUP, new Object[]{phone}, new UserRowMapper());
        } catch (DataAccessException e) {

        }
        return Optional.ofNullable(user);
    }

    @Override
    public List<User> getDeactivateUsers() {
        return jdbcTemplate.query(GET_ALL_DEACTIVATED_USER, new Object[]{}, new UserRowMapper());
    }

}
