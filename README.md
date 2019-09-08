# Orderking API

API for Orderking mobile and web application.

## Prerequisite

1. Node.js version v10.6.3 or above.
2. Docker 19.03.2 or above.

## How to run locally

1. Install node modules.
```
$ npm install
```

2. Run docker script to create containers.
```
$ docker-compose up -d
```

3. Run the application.
```
$ npm start
```

To see the application: http://localhost:3000/

To see the database: http://localhost:8080/

(all informations to access adminer is in src/datasources/db.datasource.json)

## Authors

1. Piyawat Setthitikun
2. Natawat Kwanpoom