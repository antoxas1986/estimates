package com.buildix.glorem.util;

import org.springframework.http.HttpHeaders;
import org.apache.log4j.Logger;

public class HeaderUtil {
	
	private static final Logger logger = Logger.getLogger(HeaderUtil.class);

	public static HttpHeaders createAlert(String message, String param) {
		HttpHeaders headers = new HttpHeaders();
		headers.add("X-gameTrackerAdvancedApp-alert", message);
		headers.add("X-gameTrackerAdvancedApp-params", param);
		return headers;
	}

	public static HttpHeaders createEntityCreationAlert(String entityName, String param) {
		return createAlert("A new " + entityName + " is created with identifier " + param, param);
	}

	public static HttpHeaders createEntityUpdateAlert(String entityName, String param) {
		return createAlert("A " + entityName + " is updated with identifier " + param, param);
	}

	public static HttpHeaders createEntityDeletionAlert(String entityName, String param) {
		return createAlert("A " + entityName + " is deleted with identifier " + param, param);
	}

	public static HttpHeaders createFailureAlert(String entityName, String errorKey, String defaultMessage) {
		logger.error(defaultMessage);
		HttpHeaders headers = new HttpHeaders();
		headers.add("X-error", defaultMessage);
		headers.add("X-params", entityName);
		return headers;
	}
}
