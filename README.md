# 🚀 Getting started with ECommerce-Strapi

### `Install`

```
git clone https://github.com/fredaguiar/ecommerce-strapi.git
/ecommerce-strapi/server$ npm i
/ecommerce-strapi/client$ npm i

```

### `develop mode`

```
/ecommerce-strapi/server$ npm run develop
/ecommerce-strapi/client$ npm run dev
```

### `403 Forbidden Error`

Check if the **Roles and Permission** are set accordingly.

#### Set Roles & Permissions

- Click on General Settings icon Settings at the bottom of the main navigation.
- Under Users & Permissions Plugin, choose Roles.
- Click the Public role.
- Scroll down under Permissions.
- In the Permissions tab, find `Restaurant` and click on it.
- Click the checkboxes next to find and findOne.
- Repeat with `Order`: click the checkboxes next to find.
- Finally, click Save.
