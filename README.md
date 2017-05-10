# node-erpnext
This library let you call REST API of erpnext.

```js
var ERPNext = require('node-erpnext');

var erpnext = new ERPNext({
    username : 'username',
    password : 'password',
    baseUrl  : 'http://localhost:8000'
})

```

## Installation

```bash
$ npm install node-erpnext
```

## Customers

Get list of customers 

```js 

erpnext.getCustomers().then(function(customers){
    console.log(customers);
})

```
Get customer's name list.

```js

erpnext.getCustomersName().then(function(customers){
    console.log(customers);
})

```
Get customer's info by customer name

```js

 erpnext.getCustomerByName('ram').then(function(customer){
     console.log(customer);
 })

```
Create customer for parameters follow [this](https://frappe.github.io/erpnext/current/models/selling/customer).

```js

  erpnext.createCustomer({
    "naming_series": "CUST-",
    "customer_group": "Commercial",
    "doctype": "Customer",
    "communications": [],
    "customer_type": "Company",
    "accounts": [],
    "docstatus": 0,
    "territory": "India",
    "sales_team": [],
    "customer_name": "ram"
  })

```
update customer by name. for parameters follow [this](https://frappe.github.io/erpnext/current/models/selling/customer).

```js

  erpnext.updateCustomerByName('ram',{
    "customer_name": "shyam",
  })

```

## Customer Group

Create a new customer group.
For parameters follow [this](https://frappe.github.io/erpnext/current/models/setup/customer_group).

```js

  erpnext.createCustomerGroup({
     'customer_group_name' : 'new Group',
    'parent_customer_group': 'All Customer Groups',
    'is_group': 'No'
  })

```

update an existing customer group by group name.
For parameters follow [this](https://frappe.github.io/erpnext/current/models/setup/customer_group).

```js

  erpnext.updateCustomerGroupByName('new Group',{
    'customer_group_name' : 'new group',
    'parent_customer_group': 'All Customer Groups',
    'is_group': 'No'
  })

```

Get list of customer groups.

```js 

erpnext.getCustomerGroups().then(function(customerGroups){
    console.log(customerGroups);
})

```
Get customer group's name list.

```js

erpnext.getCustomerGroupsName().then(function(customerGroups){
    console.log(customerGroups);
})

```
Get customer group's info by group name

```js

 erpnext.getCustomerGroupByName('new Group').then(function(customerGroups){
     console.log(customerGroups);
 })

```

 ## Sales Order


Create a Sales Order.
For parameters follow [this](https://frappe.github.io/erpnext/current/models/selling/sales_order).

```js

  erpnext.createSalesOrder({
    "status": "Draft",
    "naming_series": "SO-",
    "currency": "INR",
    "billing_status": "Not Billed",
    "order_type": "Sales",
    "transaction_date": "2017-05-10",
    "territory": "India",
    "delivery_status": "Not Delivered",
    "customer": "Camelport Internal",
    "items": [
      {
        "qty": 5,
        "rate": 2000,
        "stock_uom": "Nos",
        "item_code": "i01",
        "parentfield": "items"
      }
    ],
    "delivery_date": "2017-05-18",
    "sales_team": []
  })

```

update an existing sales order by sales order name.
For parameters follow [this](https://frappe.github.io/erpnext/current/models/selling/sales_order).
```js

  erpnext.updateSalesOrderByName('SO-00003',{
    "status": "Submitted",
    "docstatus" : 1
  })

```

Get list of sales order.

```js 

erpnext.getSalesOrder().then(function(salesOrder){
    console.log(salesOrder);
})

```
Get sales order's name list.

```js

erpnext.getSalesOrdersName().then(function(salesOrder){
    console.log(salesOrder);
})

```
Get sales order's info by order name

```js

 erpnext.getSalesOrderByName('new Group').then(function(customer){
     console.log(customer);
 })



