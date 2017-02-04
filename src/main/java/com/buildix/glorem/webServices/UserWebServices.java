package com.buildix.glorem.webServices;

import com.buildix.glorem.models.User;
import com.buildix.glorem.services.UserService;
import com.buildix.glorem.util.HeaderUtil;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.jws.soap.SOAPBinding;
import javax.validation.Valid;
import java.security.Principal;
import java.util.List;
import java.util.Optional;

/**
 * @author Antoxas
 */
@RestController
public class UserWebServices {

    private static final String ROLE_ADMIN = "ROLE_ADMIN";
    private final Logger logger = Logger.getLogger(UserWebServices.class);

    @Secured(ROLE_ADMIN)
    @RequestMapping(value = "/principal", method = RequestMethod.POST)
    public Principal getPrincipal(Principal principal) {
        logger.info("Principal: " + principal.getName());
        return principal;
    }

    @Secured(ROLE_ADMIN)
    @RequestMapping(value = "/validate", method = RequestMethod.GET)
    public boolean validateUser(Principal principal) {
        return principal != null;
    }



}
