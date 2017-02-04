package com.buildix.glorem.models;

import java.sql.Date;

/**
 * @author Antoxas
 */
public class User {

    private Integer id;
    private String name;
    private String lastName;
    private String email;
    private String phoneNumber;
    private Integer userCredId;
    private String address;
    private String notes;
    private String status;
    private String typeEstimate;
    private String customerTotal;
    private String customerDiscount;
    private String customerGrandTotal;
    private String updCustomerTotal;
    private String updCustomerGrandTotal;
    private String condition;
    private Date date;
    private boolean isActive;

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    /**
     * @return the id
     */
    public Integer getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * @return the name
     */
    public String getName() {
        return name;
    }

    /**
     * @param name the name to set
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @return the lastName
     */
    public String getLastName() {
        return lastName;
    }

    /**
     * @param lastName the lastName to set
     */
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    /**
     * @return the email
     */
    public String getEmail() {
        return email;
    }

    /**
     * @param email the email to set
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * @return the phoneNumber
     */
    public String getPhoneNumber() {
        return phoneNumber;
    }

    /**
     * @param phoneNumber the phoneNumber to set
     */
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    /**
     * @return the userCredId
     */
    public Integer getUserCredId() {
        return userCredId;
    }

    /**
     * @param userCredId the userCredId to set
     */
    public void setUserCredId(Integer userCredId) {
        this.userCredId = userCredId;
    }

    /**
     * @return the address
     */
    public String getAddress() {
        return address;
    }

    /**
     * @param address the address to set
     */
    public void setAddress(String address) {
        this.address = address;
    }

    /**
     * @return the notes
     */
    public String getNotes() {
        return notes;
    }

    /**
     * @param notes the notes to set
     */
    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    /**
     * @return the typeEstimate
     */
    public String getTypeEstimate() {
        return typeEstimate;
    }

    /**
     * @param typeEstimate the typeEstimate to set
     */
    public void setTypeEstimate(String typeEstimate) {
        this.typeEstimate = typeEstimate;
    }

    /**
     * @return the customerTotal
     */
    public String getCustomerTotal() {
        return customerTotal;
    }

    /**
     * @param customerTotal the customerTotal to set
     */
    public void setCustomerTotal(String customerTotal) {
        this.customerTotal = customerTotal;
    }

    /**
     * @return the customerDiscount
     */
    public String getCustomerDiscount() {
        return customerDiscount;
    }

    /**
     * @param customerDiscount the customerDiscount to set
     */
    public void setCustomerDiscount(String customerDiscount) {
        this.customerDiscount = customerDiscount;
    }

    /**
     * @return the customerGrandTotal
     */
    public String getCustomerGrandTotal() {
        return customerGrandTotal;
    }

    /**
     * @param customerGrandTotal the customerGrandTotal to set
     */
    public void setCustomerGrandTotal(String customerGrandTotal) {
        this.customerGrandTotal = customerGrandTotal;
    }

    /**
     * @return the updCustomerTotal
     */
    public String getUpdCustomerTotal() {
        return updCustomerTotal;
    }

    /**
     * @param updCustomerTotal the updCustomerTotal to set
     */
    public void setUpdCustomerTotal(String updCustomerTotal) {
        this.updCustomerTotal = updCustomerTotal;
    }

    /**
     * @return the updCustomerGrandTotal
     */
    public String getUpdCustomerGrandTotal() {
        return updCustomerGrandTotal;
    }

    /**
     * @param updCustomerGrandTotal the updCustomerGrandTotal to set
     */
    public void setUpdCustomerGrandTotal(String updCustomerGrandTotal) {
        this.updCustomerGrandTotal = updCustomerGrandTotal;
    }

    /**
     * @return the condition
     */
    public String getCondition() {
        return condition;
    }

    /**
     * @param condition the condition to set
     */
    public void setCondition(String condition) {
        this.condition = condition;
    }

    /**
     * @return the date
     */
    public Date getDate() {
        return date;
    }

    /**
     * @param date the date to set
     */
    public void setDate(Date date) {
        this.date = date;
    }


}
