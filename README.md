# 🚀 Getting started with ECommerce-Strapi

<br/>

## Install

```
git clone https://github.com/fredaguiar/ecommerce-strapi.git
/ecommerce-strapi/server$ npm i
/ecommerce-strapi/client$ npm i
```

<br/>

#### Developer mode

Developer mode uses an embedded serverless database: `SQLite`.

```
/ecommerce-strapi/server$ npm run develop
/ecommerce-strapi/client$ npm run dev
```

#### Production mode (Docker)

Production mode uses a dockerized `MySQL` database.

```
/ecommerce-strapi/server$ docker-compose up
/ecommerce-strapi/client$ docker-compose up
```

#### `Create Strapi Admin and add items`

- Load http://localhost:1337/admin
- Create a new user admin
- You are now logged in to the Strapi Dashboard
- In the left menu, Click on Media Library
- Click on Add New Assets, select all images from `/ecommerce-strapi/test-data` and upload them
- In the left menu, Click on Content Manager
- Under Collection Types, select Item, and Create New Entry
- Save and Publish it.
- You can create as many items as you want.

#### `Roles & Permissions`

Check if the **Roles and Permission** are set accordingly to prevent `403 Forbidden Error`.

- Click on General Settings icon Settings at the bottom of the main navigation.
- Under Users & Permissions Plugin, choose Roles.
- Select the `Public` role.
- Scroll down under Permissions.
- In the Permissions tab
  - expand `Item` and select `find` and `findOne`.
  - expand `ORder` and select `create` .
- Click Save.

#### `Place an Order`

Only item purchase is currently working.

- Load the app: http://localhost:8080/
- Add one or more items to the cart.
- click on shopping bag at the top left.
- you can remove items, or click on Checkout.
- Enter a Billing Info and Contact Info.
- Click on Place Order.
- Use this fake Credit Card #: 4242424242424242.
- Enter a date in the future.
- For the remaining fields, enter any info.

<br/>
