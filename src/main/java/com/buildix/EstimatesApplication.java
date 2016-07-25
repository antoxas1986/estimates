package com.buildix;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.SecurityAutoConfiguration;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication
@PropertySource({ "classpath:application.properties" })
public class EstimatesApplication {

	public static void main(String[] args) {
		SpringApplication.run(EstimatesApplication.class, args);
	}
}
