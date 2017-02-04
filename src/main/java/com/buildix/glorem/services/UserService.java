package com.buildix.glorem.services;

import java.util.List;
import java.util.Optional;

import com.buildix.glorem.models.User;
import com.buildix.glorem.models.UserCred;

/**
 * @author Anton Kuznetsov
 *
 */
public interface UserService {
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

	List<User> getAllUsers();

	void removeUserByUserId(Integer userId);

	boolean validateUser(UserCred userCred) throws Exception;

	Optional<User> customerLookup(String phone);

	List<User> getDeactivateUsers();

	void updateCustomer(User user);
}
