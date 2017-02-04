package com.buildix.glorem.webServices;

import com.buildix.glorem.models.User;
import com.buildix.glorem.services.UserService;
import com.buildix.glorem.util.HeaderUtil;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

/**
 * Created by AntonK on 2/3/2017.
 */
@RestController
public class CustomerWebService {
    private static final String ROLE_ADMIN = "ROLE_ADMIN";
    private final Logger logger = Logger.getLogger(CustomerWebService.class);

    @Autowired
    UserService userService;

    @Secured(ROLE_ADMIN)
    @RequestMapping(value = "/customers", method = RequestMethod.POST)
    public void saveCustomer(@RequestBody User user) {
        userService.addNewCustomer(user);
    }

    @Secured(ROLE_ADMIN)
    @RequestMapping(value = "/customers", method = RequestMethod.PUT)
    public void updateCustomer(@RequestBody User user) {
        logger.info("Updating customer...");
        userService.updateCustomer(user);
    }

    @Secured(ROLE_ADMIN)
    @RequestMapping(value = "/customers", method = RequestMethod.GET)
    public List<User> getCustomers() {
        return userService.getAllUsers();
    }

    @Secured(ROLE_ADMIN)
    @RequestMapping(value = "/customers/empty", method = RequestMethod.GET)
    public List<User> getCC() {
        return userService.getCCUsers();
    }
    //@Secured(ROLE_ADMIN)
    @RequestMapping(value = "/customers/{id}", method = RequestMethod.GET)
    public User getCustomer(@PathVariable Integer id) {
        return userService.getUserByUserId(id);
    }

    @Secured(ROLE_ADMIN)
    @RequestMapping(value = "/customers/deactivate", method = RequestMethod.GET)
    public List<User> getDeactivateCustomers() {
        return userService.getDeactivateUsers();
    }

    @Secured(ROLE_ADMIN)
    @RequestMapping(value = "/customers/{id}", method = RequestMethod.DELETE)
    public void removeDeactivatedCustomer(@PathVariable("id") Integer userId ) {
        logger.info("Deleting customer..." + userId);
        userService.removeUserByUserId(userId);
    }

    @RequestMapping(value = "/customerLookup", method = RequestMethod.POST)
    public ResponseEntity<String> customerLookup(@Valid @RequestBody String phone) {
        logger.info("Looking for estimate by phone " + phone);
        Optional<User> user = userService.customerLookup(phone);
        if (user.isPresent() && user.get().getId() != null) {
            return ResponseEntity.ok().body(user.get().getId().toString());
        }
        else {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("user", "userNotFound",
                    "User can not be found with this phone number")).body(null);
        }
    }
}
