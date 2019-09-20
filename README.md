# Orderking API

API for Orderking mobile and web application.

## Prerequisite

- Node.js version v10.6.3 or above.
- Docker 19.03.2 or above.

1. Install node modules.
```
$ npm install
```

2. Run build
```
$ npm run build
```

3. Run docker script to create containers.
```
$ docker-compose up -d
```

(The first time will took some time since it download images)

4. Migrate.
```
$ npm run migrate
```

## How to run locally

(continue from the above step)

1. Run the application.
```
$ npm start
```

To see the application: http://localhost:3000/

To see the database: http://localhost:8080/

(all informations to access adminer is in src/datasources/db.datasource.json)

## How to stop localhost

1. To stop the server press [ctrl+c].

2. Stop docker containers. (Stopping the container will clear every data so if you want to run again you have to run the second command in prerequisite again.)
```
$ docker-compose down
```

## Authors

1. Piyawat Setthitikun
2. Natawat Kwanpoom