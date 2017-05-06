'use strict';

/**
 *  ERPNext class will exports public api.
 */

var request = require('request');
var requestPromise = require('request-promise');
var querystring = require('querystring');
var Promise = require('bluebird');

var ERPNext = function (options) {
    this.username = options.username;
    this.password = options.password;
    this.baseUrl = options.baseUrl;
    this.cookieJar = request.jar();
};

ERPNext.prototype.constructor = ERPNext;


/**
 *  Doing Login of a user and stores session cookie into cookieJar.
 *  @return {Promise} resolve response.
 */

ERPNext.prototype.login = function () {
    var _this = this;
    var formData = querystring.stringify({ usr: _this.username, pwd: _this.password });
    var contentLength = formData.length;
    return requestPromise.post({
        url: _this.baseUrl + "/api/method/login",
        jar: _this.cookieJar,
        body: formData,
        headers: {
            'Content-Length': contentLength,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}

/**
 *  Will Call REST API to get customer list.
 *  @return {Promise} resolve customer list.
 */

ERPNext.prototype.getCustomersName = function () {
    var _this = this;
    return _this.login().then(function (res) {
        return requestPromise.get({
            url: _this.baseUrl + "/api/resource/Customer",
            jar: _this.cookieJar,
        }).then(function (customers) {
            customers = JSON.parse(customers);
            return customers.data;
        });
    });
}

/**
 *  Will Call REST API to get Customer detail by name.
 *  @param {String} name name of the customer.
 */

ERPNext.prototype.getCustomerByName = function (name) {
    var _this = this;
    return _this.login().then(function (res) {
        return requestPromise.get({
            url: _this.baseUrl + "/api/resource/Customer/" + name,
            jar: _this.cookieJar,
        }).then(function (customer) {
            customer = JSON.parse(customer);
            return customer.data;
        })
    });
}

/**
 *  Will Call REST API to create customer.
 *  for parameters follow https://frappe.github.io/erpnext/current/models/selling/customer
 *  @param  {Object} customerData customer data object.
 *  @return {Promise} resolve with customer data.
 */

ERPNext.prototype.createCustomer = function (object) {
    var _this = this;
    var formData = querystring.stringify({ data: JSON.stringify(object) });
    var contentLength = formData.length;
    return _this.login().then(function (res) {
        return requestPromise.post({
            url: _this.baseUrl + "/api/resource/Customer",
            jar: _this.cookieJar,
            body: formData,
            headers: {
                'Content-Length': contentLength,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (customer) {
            customer = JSON.parse(customer);
            return customer.data;
        })
    })
}

/**
 * Get Customer info array
 * @return {Promise} resolve with array of clients info
 */

ERPNext.prototype.getCustomers = function () {
    var _this = this;
    return _this.getCustomersName().then(function (customers) {
        return Promise.map(customers, function (customer) {
            return _this.getCustomerByName(customer.name);
        });
    })
}

/**
 *  Update Customer by name.
 *  @param  {String} name name of the customer.
 *  @param  {Object} object data to be update.
 *  @return {Promise} resolve with customer data.
 */

ERPNext.prototype.updateCustomerByName = function(name, object){
    var _this = this;
    var formData = querystring.stringify({ data: JSON.stringify(object) });
    var contentLength = formData.length;
    return _this.login().then(function (res) {
        return requestPromise.put({
            url: _this.baseUrl + "/api/resource/Customer/"+ name,
            jar: _this.cookieJar,
            body: formData,
            headers: {
                'Content-Length': contentLength,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (customer) {
            customer = JSON.parse(customer);
            return customer.data;
        })
    })
}

module.exports = ERPNext;

