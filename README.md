## Environment
Node v9.4.0 and MongoDB v3.6.2

## Prerequisites
enter **npm install** in terminal to install dependencies

```
npm install
```

## How to run the app
To run the simple API server in port 3000
```
npm run start
```

To run the mongodb and create data/db in the current app folder
```
npm run start_db
```

To stop the mongodb
```
npm run stop_db
```

To reset mongodb data in data/db in the current app folder
```
npm run reset_db
```

To insert sample data into mongodb data in data/db in the current app folder, remember to run **npm run start_db** first
```
npm run start_db
npm run seed_db
```

To run the test
```
npm run test
```
