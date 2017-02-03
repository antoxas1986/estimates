package com.buildix.glorem.controllers;

import com.buildix.glorem.models.UserCred;
import com.buildix.glorem.services.EstimateFormService;
import com.buildix.glorem.services.UserCredService;
import com.buildix.glorem.services.UserService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.security.Principal;



@Controller
public class HomeController {

    private final Logger logger = Logger.getLogger(HomeController.class);
    private static final String ROLE_ADMIN = "ROLE_ADMIN";
    @Autowired
    private UserCredService userCredService;
    @Autowired
    UserService userService;
    @Autowired
    EstimateFormService estimateFormService;


    @Secured(ROLE_ADMIN)
    @RequestMapping(value = "/afterAuth", method = RequestMethod.GET)
    public String afterAuth(Principal principal) {
        logger.info("afterAuth");
        UserCred userCred = userCredService.getUserCredByName(principal.getName());
        if (userCred.getRole().equals(ROLE_ADMIN)) {
            return "";
        }
        else if (userCred.getRole().equals("ROLE_USER")) {
            return "user";
        }
        return "login";
    }


    @RequestMapping(value = {"/", "/login"}, method = RequestMethod.GET)
    public String main() {
        logger.info("Serving index page");
        return "index.html";
    }

//    @Secured(ROLE_ADMIN)
//    @RequestMapping(value = "/createEstimate", method = RequestMethod.GET)
//    public String createEstimate() {
//        return "createEstimate";
//    }
//
//    @Secured(ROLE_ADMIN)
//    @RequestMapping(value = "/estimateForm", method = RequestMethod.GET)
//    public String estimateFormGET() {
//        return "estimateForm";
//    }
//
//    @Secured(ROLE_ADMIN)
//    @RequestMapping(value = "/editCustomerEstimate*", method = RequestMethod.GET)
//    public String editCustomerEstimate() {
//        return "editEstimate";
//    }

    
//    @RequestMapping(value = "/customerEstimate/{id}", method = RequestMethod.GET)
//    public String customerEstimate() {
//        return "customerEstimate";
//    }

//    @Secured(ROLE_ADMIN)
//    @RequestMapping(value = "/createChapter", method = RequestMethod.GET)
//    public String createChapter() {
//        return "createChapter";
//    }


    @RequestMapping(value = "/403", method = RequestMethod.GET)
    public String errorForbidden() {
        return "403";
    }
}
