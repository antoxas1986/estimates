package com.buildix.glorem.jdbc.dao;

import java.util.List;
import java.util.Optional;

import com.buildix.glorem.models.User;
import com.buildix.glorem.models.UserCred;

/**
 * @author Antoxas
 *
 */
public interface UserDao {
	 
	/**
	 * @param userId
	 * @return
	 */
	User getUserByUserId(Integer userId);
	
	/**
	 * @return
	 */
	List<User> getCCUsers();

	void addNewCustomer(User user);

	void updateCustomer(User user);

	List<User> getAllUsers();
	
	void removeUserByUserId(Integer userId);

	boolean validateUser(UserCred userCred) throws Exception;

	Optional<User> customerLookup(String phone);

	List<User> getDeactivateUsers();

}
