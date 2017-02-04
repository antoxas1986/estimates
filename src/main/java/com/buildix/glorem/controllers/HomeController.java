package com.buildix.glorem.controllers;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@Controller
public class HomeController {

    private final Logger logger = Logger.getLogger(HomeController.class);

    @RequestMapping(value = {"/", "/login"}, method = RequestMethod.GET)
    public String login() {
        logger.info("Serving index page...");
        return "index.html";
    }

    @RequestMapping(value = "/403", method = RequestMethod.GET)
    public String errorForbidden() {
        logger.info("Serving 403 page...");
        return "403";
    }
}
