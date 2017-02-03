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
	List<User> getAllActiveUsers();

	void addNewCustomer(User user);

	void updateCustomer(User user);

	List<User> getAllUsers();
	
	void changeStatusToAgree(Integer id);

	void changeStatusToDecline(Integer id);

	void changeStatusToSend(Integer id);

	void changeStatusToEstimateCustomerModify(Integer id);

	void removeUserByUserId(Integer id);

	boolean validateUser(UserCred userCred) throws Exception;

	Optional<User> customerLookup(String phone);
	

}
