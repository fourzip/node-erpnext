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




/**
 * Create Customer Group.
 * For param follow https://frappe.github.io/erpnext/current/models/setup/customer_group
 * @param {Object} object customer group data.
 * @return {Promise} resolve with customer group data. 
 */

ERPNext.prototype.createCustomerGroup = function(object){
    var _this = this;
    var formData = querystring.stringify({ data: JSON.stringify(object) });
    var contentLength = formData.length;
    return _this.login().then(function (res) {
        return requestPromise.post({
            url: _this.baseUrl + "/api/resource/Customer Group",
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
 * Update Customer Group by name.
 * For param follow https://frappe.github.io/erpnext/current/models/setup/customer_group
 * @param {String} name customer group name.
 * @param {Object} object customer group data.
 * @return {Promise} resolve with customer group data. 
 */

ERPNext.prototype.updateCustomerGroupByName = function(name, object){
    var _this = this;
    var formData = querystring.stringify({ data: JSON.stringify(object) });
    var contentLength = formData.length;
    return _this.login().then(function (res) {
        return requestPromise.put({
            url: _this.baseUrl + "/api/resource/Customer Group/"+name,
            jar: _this.cookieJar,
            body: formData,
            headers: {
                'Content-Length': contentLength,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (customerGroup) {
            customerGroup = JSON.parse(customerGroup);
            return customerGroup.data;
        })
    })
}


/**
 * Get Customer Group's name.
 * For param follow https://frappe.github.io/erpnext/current/models/setup/customer_group
 * @param {Object} object customer group data.
 * @return {Promise} resolve with customer group data. 
 */

ERPNext.prototype.getCustomerGroupsName = function(){
    var _this = this;
    return _this.login().then(function (res) {
        return requestPromise.get({
            url: _this.baseUrl + "/api/resource/Customer Group",
            jar: _this.cookieJar,
        }).then(function (customer) {
            customer = JSON.parse(customer);
            return customer.data;
        })
    })
}

/**
 * Get Customer Group's info by name.
 * For param follow https://frappe.github.io/erpnext/current/models/setup/customer_group
 * @param {String} name customer group's name.
 * @return {Promise} resolve with customer group data.
 */

ERPNext.prototype.getCustomerGroupByName = function(name){
    var _this = this;
    return _this.login().then(function (res) {
        return requestPromise.get({
            url: _this.baseUrl + "/api/resource/Customer Group/"+ name,
            jar: _this.cookieJar,
        }).then(function (customer) {
            customer = JSON.parse(customer);
            return customer.data;
        })
    })
}

/**
 *  Get Customer Group's info array.
 *  @return {Promise} resolve customer group data array.
 */

ERPNext.prototype.getCustomerGroups = function(){
    var _this = this;
    return _this.getCustomerGroupsName().then(function (customersGroups) {
        return Promise.map(customersGroups, function (group) {
            return _this.getCustomerGroupByName(group.name);
        });
    })
}


/**
 *  Get Sales Order's name array.
 *  @return {Promise} resolve customer group data array.
 */

ERPNext.prototype.getSalesOrdersName = function () {
    var _this = this;
    return _this.login().then(function (res) {
        return requestPromise.get({
            url: _this.baseUrl + "/api/resource/Sales Order",
            jar: _this.cookieJar,
        }).then(function (salesOrder) {
            salesOrder = JSON.parse(salesOrder);
            return salesOrder.data;
        })
    })
}


/**
 *  Get Sales Order's name array.
 *  @param {String} name name of the sales order
 *  @return {Promise} resolve customer group data array.
 */

ERPNext.prototype.getSalesOrderByName = function (name) {
    var _this = this;
    return _this.login().then(function (res) {
        return requestPromise.get({
            url: _this.baseUrl + "/api/resource/Sales Order/"+name,
            jar: _this.cookieJar,
        }).then(function (salesOrder) {
            salesOrder = JSON.parse(salesOrder);
            return salesOrder.data;
        })
    })
}


/**
 * Get Sales Order info array.
 * @return {Promise} resolve Sales Orders array list.
 */

ERPNext.prototype.getSalesOrder = function(){
    var _this = this;
    return _this.getSalesOrdersName().then(function (salesOrders) {
        return Promise.map(salesOrders, function (saleOrder) {
            return _this.getSalesOrderByName(saleOrder.name);
        });
    })
}


/**
 * Create Sales Order.
 * For param follow https://frappe.github.io/erpnext/current/models/selling/sales_order
 * @param {Object} object Sales Order.
 * @return {Promise} resolve Created Sales Order.
 */

ERPNext.prototype.createSalesOrder = function(object){
    var _this = this;
    var formData = querystring.stringify({ data: JSON.stringify(object) });
    var contentLength = formData.length;
    return _this.login().then(function (res) {
        return requestPromise.post({
            url: _this.baseUrl + "/api/resource/Sales Order",
            jar: _this.cookieJar,
            body: formData,
            headers: {
                'Content-Length': contentLength,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (salesOrder) {
            salesOrder = JSON.parse(salesOrder);
            return salesOrder.data;
        })
    })
}


/**
 * Update Sales Order by name.
 * For param follow https://frappe.github.io/erpnext/current/models/selling/sales_order
 * @param {String} name name of the sales order.
 * @param {Object} object data of sales order.
 * @return {Promise} resolve Created Sales Order.
 */

ERPNext.prototype.updateSalesOrderByName = function(name, object){
    var _this = this;
    var formData = querystring.stringify({ data: JSON.stringify(object) });
    var contentLength = formData.length;
    return _this.login().then(function (res) {
        return requestPromise.put({
            url: _this.baseUrl + "/api/resource/Sales Order/"+name,
            jar: _this.cookieJar,
            body: formData,
            headers: {
                'Content-Length': contentLength,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (salesOrder) {
            salesOrder = JSON.parse(salesOrder);
            return salesOrder.data;
        })
    })
}

/**
 * Create an Item.
 * For param follow https://frappe.github.io/erpnext/current/models/accounts/sales_invoice_item.
 * @param {Object} object item object.
 * @return {Promise} resolve Created item.
 */

ERPNext.prototype.createAnItem = function(object){
    var _this = this;
    var formData = querystring.stringify({ data: JSON.stringify(object) });
    var contentLength = formData.length;
    return _this.login().then(function (res) {
        return requestPromise.post({
            url: _this.baseUrl + "/api/resource/Item",
            jar: _this.cookieJar,
            body: formData,
            headers: {
                'Content-Length': contentLength,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (item) {
            item = JSON.parse(item);
            return item.data;
        })
    })
}

/**
 * Update an Item.
 * For param follow https://frappe.github.io/erpnext/current/models/selling/sales_order
 * @param {String} name name of the item.
 * @param {Object} object data of item.
 * @return {Promise} resolve updated item
 */

ERPNext.prototype.updateItemByName = function(name, object){
    var _this = this;
    var formData = querystring.stringify({ data: JSON.stringify(object) });
    var contentLength = formData.length;
    return _this.login().then(function (res) {
        return requestPromise.put({
            url: _this.baseUrl + "/api/resource/Item/"+name,
            jar: _this.cookieJar,
            body: formData,
            headers: {
                'Content-Length': contentLength,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (item) {
            item = JSON.parse(item);
            return item.data;
        })
    })
}


/**
 * Create a Supplier.
 * For param follow https://frappe.github.io/erpnext/current/models/buying/supplier.
 * @param {Object} object Supplier object.
 * @return {Promise} resolve Created Supplier.
 */

ERPNext.prototype.createSupplier = function(object){
    var _this = this;
    var formData = querystring.stringify({ data: JSON.stringify(object) });
    var contentLength = formData.length;
    return _this.login().then(function (res) {
        return requestPromise.post({
            url: _this.baseUrl + "/api/resource/Supplier",
            jar: _this.cookieJar,
            body: formData,
            headers: {
                'Content-Length': contentLength,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (Supplier) {
            Supplier = JSON.parse(Supplier);
            return Supplier.data;
        })
    })
}

/**
 * Update Supplier.
 * For param follow https://frappe.github.io/erpnext/current/models/buying/supplier.
 * @param {String} name name of the Supplier.
 * @param {Object} object data of Supplier.
 * @return {Promise} resolve updated Supplier
 */

ERPNext.prototype.updateSupplierByName = function(name, object){
    var _this = this;
    var formData = querystring.stringify({ data: JSON.stringify(object) });
    var contentLength = formData.length;
    return _this.login().then(function (res) {
        return requestPromise.put({
            url: _this.baseUrl + "/api/resource/Supplier/"+name,
            jar: _this.cookieJar,
            body: formData,
            headers: {
                'Content-Length': contentLength,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (Supplier) {
            Supplier = JSON.parse(Supplier);
            return Supplier.data;
        })
    })
}

/**
 * Create a Purchase Invoice.
 * For param follow https://frappe.github.io/erpnext/current/models/accounts/purchase_invoice.
 * @param {Object} object Purchase Invoice  object.
 * @return {Promise} resolve Created Purchase Invoice .
 */

ERPNext.prototype.createPurchaseInvoice = function(object){
    var _this = this;
    var formData = querystring.stringify({ data: JSON.stringify(object) });
    var contentLength = formData.length;
    return _this.login().then(function (res) {
        return requestPromise.post({
            url: _this.baseUrl + "/api/resource/Purchase Invoice",
            jar: _this.cookieJar,
            body: formData,
            headers: {
                'Content-Length': contentLength,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (PurchaseInvoice ) {
            PurchaseInvoice = JSON.parse(PurchaseInvoice);
            return PurchaseInvoice.data;
        })
    })
}

/**
 * Update Purchase Invoice.
 * For param follow https://frappe.github.io/erpnext/current/models/accounts/purchase_invoice.
 * @param {String} name name of the Purchase Invoice.
 * @param {Object} object data of Purchase Invoice.
 * @return {Promise} resolve updated Purchase Invoice.
 */

ERPNext.prototype.updatePurchaseInvoiceByName = function(name, object){
    var _this = this;
    var formData = querystring.stringify({ data: JSON.stringify(object) });
    var contentLength = formData.length;
    return _this.login().then(function (res) {
        return requestPromise.put({
            url: _this.baseUrl + "/api/resource/Purchase Invoice/"+name,
            jar: _this.cookieJar,
            body: formData,
            headers: {
                'Content-Length': contentLength,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (PurchaseInvoice) {
            PurchaseInvoice = JSON.parse(PurchaseInvoice);
            return PurchaseInvoice.data;
        })
    })
}

/**
 * Create a Sales Invoice.
 * For param follow https://frappe.github.io/erpnext/current/models/accounts/sales_invoice
 * @param {Object} object Sales Invoice  object.
 * @return {Promise} resolve Created Sales Invoice.
 */

ERPNext.prototype.createSalesInvoice = function(object){
    var _this = this;
    var formData = querystring.stringify({ data: JSON.stringify(object) });
    var contentLength = formData.length;
    return _this.login().then(function (res) {
        return requestPromise.post({
            url: _this.baseUrl + "/api/resource/Sales Invoice",
            jar: _this.cookieJar,
            body: formData,
            headers: {
                'Content-Length': contentLength,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (SalesInvoice ) {
            SalesInvoice = JSON.parse(SalesInvoice);
            return SalesInvoice.data;
        })
    })
}

/**
 * Update Sales Invoice.
 * For param follow https://frappe.github.io/erpnext/current/models/accounts/sales_invoice
 * @param {String} name name of the Sales Invoice.
 * @param {Object} object data of Sales Invoice.
 * @return {Promise} resolve updated Sales Invoice.
 */

ERPNext.prototype.updateSalesInvoiceByName = function(name, object){
    var _this = this;
    var formData = querystring.stringify({ data: JSON.stringify(object) });
    var contentLength = formData.length;
    return _this.login().then(function (res) {
        return requestPromise.put({
            url: _this.baseUrl + "/api/resource/Sales Invoice/"+name,
            jar: _this.cookieJar,
            body: formData,
            headers: {
                'Content-Length': contentLength,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (SalesInvoice) {
            SalesInvoice = JSON.parse(SalesInvoice);
            return SalesInvoice.data;
        })
    })
}

/**
 * Create a Purchase Order.
 * For param follow https://frappe.github.io/erpnext/current/models/buying/purchase_order
 * @param {Object} object Purchase Order object.
 * @return {Promise} resolve Created Purchase Order.
 */

ERPNext.prototype.createPurchaseOrder = function(object){
    var _this = this;
    var formData = querystring.stringify({ data: JSON.stringify(object) });
    var contentLength = formData.length;
    return _this.login().then(function (res) {
        return requestPromise.post({
            url: _this.baseUrl + "/api/resource/Purchase Order",
            jar: _this.cookieJar,
            body: formData,
            headers: {
                'Content-Length': contentLength,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (SalesInvoice ) {
            SalesInvoice = JSON.parse(SalesInvoice);
            return SalesInvoice.data;
        })
    })
}

/**
 * Update Purchase Order.
 * For param follow https://frappe.github.io/erpnext/current/models/buying/purchase_order
 * @param {String} name name of the Purchase Order.
 * @param {Object} object data of Purchase Order.
 * @return {Promise} resolve updated Purchase Order.
 */

ERPNext.prototype.updatePurchaseOrderByName = function(name, object){
    var _this = this;
    var formData = querystring.stringify({ data: JSON.stringify(object) });
    var contentLength = formData.length;
    return _this.login().then(function (res) {
        return requestPromise.put({
            url: _this.baseUrl + "/api/resource/Purchase Order/"+name,
            jar: _this.cookieJar,
            body: formData,
            headers: {
                'Content-Length': contentLength,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (PurchaseOrder) {
            PurchaseOrder = JSON.parse(PurchaseOrder);
            return PurchaseOrder.data;
        })
    })
}



/**
 *  Will Call REST API to get Purchase Order list.
 *  @return {Promise} resolve Purchase Order list.
 */

ERPNext.prototype.getPurchaseOrdersName = function () {
    var _this = this;
    return _this.login().then(function (res) {
        return requestPromise.get({
            url: _this.baseUrl + "/api/resource/Purchase Order",
            jar: _this.cookieJar,
        }).then(function (purchaseOrders) {
            purchaseOrders = JSON.parse(purchaseOrders);
            return purchaseOrders.data;
        });
    });
}

/**
 *  Will Call REST API to get Purchase Order detail by name.
 *  @param {String} name name of the Purchase Order.
 */

ERPNext.prototype.getPurchaseOrderByName = function (name) {
    var _this = this;
    return _this.login().then(function (res) {
        return requestPromise.get({
            url: _this.baseUrl + "/api/resource/Purchase Order/" + name,
            jar: _this.cookieJar,
        }).then(function (purchaseOrders) {
            purchaseOrders = JSON.parse(purchaseOrders);
            return purchaseOrders.data;
        })
    });
}


/**
 * Get Purchase Order info array
 * @return {Promise} resolve with array of Purchase Order info
 */

ERPNext.prototype.getPurchaseOrders = function () {
    var _this = this;
    return _this.getPurchaseOrdersName().then(function (PurchaseOrders) {
        return Promise.map(PurchaseOrders, function (PurchaseOrder) {
            return _this.getPurchaseOrderByName(PurchaseOrder.name);
        });
    })
}

module.exports = ERPNext;

