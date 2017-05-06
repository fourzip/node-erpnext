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
