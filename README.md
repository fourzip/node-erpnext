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

```

## Item

Create an Item.
For param follow https://frappe.github.io/erpnext/current/models/accounts/sales_invoice_item.

```js

  erpnext.createAnItem({
    "has_variants": 0,
    "is_stock_item": "No",
    "valuation_method": "",
    "min_order_qty": 0,
    "is_asset_item": "No",
    "has_batch_no": "No",
    "has_serial_no": "No",
    "is_purchase_item": "Yes",
    "is_sales_item": "Yes",
    "is_service_item": "No",
    "inspection_required": "No",
    "item_code": "item code",
    "item_name": "item name",
    "description": "description",
    "item_group": "Services"
  })

```

Update an Item.
For param follow https://frappe.github.io/erpnext/current/models/selling/sales_order

```js

erpnext.updateItemByName("item code",{
    "has_variants": 0,
    "is_stock_item": "No",
    "valuation_method": "",
    "min_order_qty": 0,
    "is_asset_item": "No",
    "has_batch_no": "No",
    "has_serial_no": "No",
    "is_purchase_item": "Yes",
    "is_sales_item": "Yes",
    "is_service_item": "No",
    "inspection_required": "No",
    "item_code": "item code",
    "item_name": "item name",
    "description": "description",
    "item_group": "Services"
})

```

## Supplier

Create a Supplier.
For param follow https://frappe.github.io/erpnext/current/models/buying/supplier.

```js

erpnext.createSupplier({"supplier_type":"Services","supplier_name":"ram"});

```
Update Supplier.
For param follow https://frappe.github.io/erpnext/current/models/buying/supplier.

```js

  erpnext.updateSupplierByName("ram",{
    "supplier_type":"Services",
    "supplier_name":"ram"
  })

```

## Purchase Invoice

Create a Purchase Invoice
For param follow https://frappe.github.io/erpnext/current/models/accounts/purchase_invoice

```js

  erpnext.createPurchaseInvoice({
      "supplier": "ram",

      "items": [{
              "item_code": "item code",
              "qty": 4,
              "price_list_rate": 5000,
              "schedule_date": "2017-05-31"
          }]
  })

```

Update Purchase Invoice.
For param follow https://frappe.github.io/erpnext/current/models/accounts/purchase_invoice.

```js

  erpnext.updatePurchaseInvoiceByName("name",{
    "supplier": "ram"
  })

```

## Sales Invoice

Create a Sales Invoice.
For param follow https://frappe.github.io/erpnext/current/models/accounts/sales_invoice

```js

  erpnext.createSalesInvoice(
    {
    "due_date": "2017-05-14",
     "customer": "ram",
    "items":[{
        "item_code": "item code",
        "rate": 15000,
        "qty": 3
    }]
  }
)

```
 Update Sales Invoice.
 For param follow https://frappe.github.io/erpnext/current/models/accounts/sales_invoice

```js

  erpnext.updateSalesInvoiceByName(
    "Sales Invoice",

    {
    "due_date": "2017-05-14",
     "customer": "ram",
    "items":[{
        "item_code": "item code",
        "rate": 15000,
        "qty": 3
    }]
  }
)

```
## Purchase Order

Create a Purchase Order.
For param follow https://frappe.github.io/erpnext/current/models/buying/purchase_order

```js

  erpnext.createPurchaseOrder({
     "supplier": "ram",
     "items": [{

             "item_code": "item code",
             "qty": 4,
             "price_list_rate": 5000,
             "schedule_date": "2017-05-31"
         }
     ]
  })

```

 Update Purchase Order.
 For param follow https://frappe.github.io/erpnext/current/models/buying/purchase_order

 ```js

  erpnext.updatePurchaseOrderByName("name",{
         "supplier": "ram",
          "items": [{

                  "item_code": "item code",
                  "qty": 4,
                  "price_list_rate": 5000,
                  "schedule_date": "2017-05-31"
              }
          ]
  })

 ```

 Get All Purchase Order.

 ```js

  erpnext.getPurchaseOrders()
  .then(function(data){ console.log(data) })

 ```

 Get Info of a Purchase Order by name.

 ```js

  erpnext.getPurchaseOrderByName('PO-00003')
  .then(function(data){ console.log(data) })

 ```

Get List of purchase orders 

```js

erpnext.getPurchaseOrdersName()
.then(function(data){ console.log(data) })

```

