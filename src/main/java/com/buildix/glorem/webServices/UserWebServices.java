package com.buildix.glorem.webServices;

import java.security.Principal;
import java.util.List;

import com.buildix.glorem.controllers.HomeController;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.buildix.glorem.models.User;
import com.buildix.glorem.models.UserCred;
import com.buildix.glorem.services.UserService;

/**
 * @author Antoxas
 */
@RestController
public class UserWebServices {

    private static final String ROLE_ADMIN = "ROLE_ADMIN";
    private final Logger logger = Logger.getLogger(UserWebServices.class);

    @Autowired
    UserService userService;

    @Secured(ROLE_ADMIN)
    @RequestMapping(value = "/principal", method = RequestMethod.POST)
    public Principal getPrincipal(Principal principal) {
        logger.info("Principal: " + principal.getName());
        return principal;
    }

    @Secured(ROLE_ADMIN)
    @RequestMapping(value = "/customer", method = RequestMethod.POST)
    public void saveCustomer(@RequestBody User user) {
        userService.addNewCustomer(user);
    }

    @Secured(ROLE_ADMIN)
    @RequestMapping(value = "/customer", method = RequestMethod.GET)
    public List<User> getCustomers() {
        return userService.getAllUsers();
    }

    @Secured(ROLE_ADMIN)
    @RequestMapping(value = "/CC", method = RequestMethod.GET)
    public List<User> getCC() {
        return userService.getAllActiveUsers();
    }

    @Secured(ROLE_ADMIN)
    @RequestMapping(value = "/customer/{id}", method = RequestMethod.GET)
    public User getCustomer(@PathVariable Integer id) {
        return userService.getUserByUserId(id);
    }

    @Secured(ROLE_ADMIN)
    @RequestMapping(value = "/customer/{id}", method = RequestMethod.POST)
    public void removeCustomer(@PathVariable Integer id) {
        userService.removeUserByUserId(id);
    }

    @Secured(ROLE_ADMIN)
    @RequestMapping(value = "/customerAgree/{id}", method = RequestMethod.GET)
    public void customerAgree(@PathVariable Integer id) {
        userService.changeStatusToAgree(id);
    }

    @Secured(ROLE_ADMIN)
    @RequestMapping(value = "/customerDecline/{id}", method = RequestMethod.GET)
    public void customerDicline(@PathVariable Integer id) {
        userService.changeStatusToDecline(id);
    }



}
