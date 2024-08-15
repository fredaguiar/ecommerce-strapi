# 🚀 Getting started with ECommerce-Strapi

<br/>

## Install Node 18 lts

```
nvm install 18 --lts
nvm list (copy the 18 lts)
nvm use 18.x.x
```

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
/ecommerce-strapi/server$ docker compose up -d
/ecommerce-strapi/client$ docker compose up -d
```

Make sure that this IP address matches the assigned IP in the Vultr container matches the domain name fredaguiarteixeira.xyz (www.namecheap.com)
STRAPI_HOST=http://fredaguiarteixeira.xyz:1337

#### `Create Strapi Admin and add items`

- Load
  - dev: http://localhost:1337/admin
  - prod: http://fredaguiarteixeira.xyz:1337/admin
- fred.aguiar.teixeira@hotmail.com / Strapi2\*\*\*\*
- Create a new user admin
- You are now logged in to the Strapi Dashboard
- In the left menu, Click on Media Library
- Click on Add New Assets, select all images from `/ecommerce-strapi/test-data` and upload them
- In the left menu, Click on Content Manager
- Under Collection Types, select Item, and Create New Entry
- Save and Publish it.
- You can create as many items as you want.

#### `Roles & Permissions`

Check if the **Roles and Permission** are set accordingly to grant Find Items and Order Items, and prevent `403 Forbidden Error`.

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

- Load the app:
  - dev: http://localhost/3000
  - prod: http://fredaguiarteixeira.xyz:3000
- Add one or more items to the cart.
- click on shopping bag at the top left.
- you can remove items, or click on Checkout.
- Enter a Billing Info and Contact Info.
- Click on Place Order.
- Use this fake Credit Card #: 4242424242424242
- Enter a date in the future.
- For the remaining fields, enter any info.
- Problem! After placing an order in dev mode, it redirects to port 8080. http://localhost:8080/confirmation, which leads to a blank page. This error still needs to be addressed.

<br/>

## `Docker command for developers`

Build and run

```
docker-compose build --no-cache & docker-compose up -d
```

Remove all containers and Images

```
docker-compose stop
docker-compose rm -f
docker rmi -f $(docker images -q 'nodejs-client') $(docker images -q 'nginx-client')
```
