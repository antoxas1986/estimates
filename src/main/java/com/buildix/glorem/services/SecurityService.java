package com.buildix.glorem.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.buildix.glorem.jdbc.dao.UserCredDao;

import com.buildix.glorem.models.UserCred;


/**
 * @author aKuznetsov
 *
 */
@Service
public class SecurityService implements UserDetailsService {
	@Autowired
	private UserCredDao userCredDao;

	/* (non-Javadoc)
	 * @see org.springframework.security.core.userdetails.UserDetailsService#loadUserByUsername(java.lang.String)
	 */
	public UserDetails loadUserByUsername(final String userName)
			throws UsernameNotFoundException {
		UserCred userCred = userCredDao.getUserCredByName(userName);
		List<GrantedAuthority> authorities = buildUserAuthority(Arrays.asList(userCred));
		return buildUserForAuthentication(userCred, authorities);
	}

	/**
	 * Get user (entity) and build user for authorization
	 * 
	 * @param user
	 * @param authorities
	 * @return User object
	 */
	private User buildUserForAuthentication(UserCred user,
			List<GrantedAuthority> authorities) {
		return new User(user.getUsername(), user.getPassword(),
				user.getEnabled(), true, true, true, authorities);
	}

	/**
	 * Create list of user Granted Authorities
	 * 
	 * @param userRoles
	 * @return List<GrantedAuthority>
	 */
	private List<GrantedAuthority> buildUserAuthority(List <UserCred> userCreds) {

		Set<GrantedAuthority> setAuths = new HashSet<GrantedAuthority>();

		// Build user's authorities
		for (UserCred userCred : userCreds) {
			setAuths.add(new SimpleGrantedAuthority(userCred.getRole()));
		}

		List<GrantedAuthority> result = new ArrayList<GrantedAuthority>(
				setAuths);

		return result;
	}

}
