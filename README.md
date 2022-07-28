# An Express NodeJS Service

A node-js backend Service Template

### Pre-Requisite

- NodeJS (https://computingforgeeks.com/install-node-js-14-on-ubuntu-debian-linux/)
- Redis (https://redis.io/docs/getting-started/installation/install-redis-on-linux/) | Make sure you dont add any AUTH
- Linux/Debian (Ubuntu )

### Installation

- Run the command `npm install --verbose`
- Update the .env file with following values :

  ```
  SQL_DB_HOST=127.0.0.1
  SQL_DB_PORT=3306
  SQL_LOCALADDRESS=127.0.0.1
  SQL_DB_USER=root
  SQL_DB_PASSWORD=
  SQL_DB_DATABASE=
  SQL_DB_CHARSET=utf8mb4
  MAIL_HOST=
  MAIL_PORT=
  MAIL_SECURE=
  MAIL_USERNAME=
  MAIL_PASSWORD=
  MAIL_FROM=
  MAIL_ENCRYPTION=tls
  MAIL_DRIVER=smtp
  AWS_ACCESS_KEY_ID=
  AWS_SECRET_KEY=
  AWS_REGION=
  AWS_S3_BUCKET_NAME=
  AWS_S3_FOLDER_NAME=
  AWS_S3_TRANSCRIPT_BUCKET_PATH=
  JWT_SECRET=nz26KX*MV4gp71alZHF^yAyZ
  MONGODB_USERNAME=
  MONGODB_PASSWORD=
  MONGODB_HOST=
  MONGODB_PORT=
  MONGODB_DB=
  QUEUE_SERVER_PORT=3002
  SERVICE_PORT=4004

   CHARSET=utf8mb4 <YOUR MYSQL DATABASE CHARSET>
  ```

- [OPTIONAL] To install dev-dependencies
  ```
  $ sudo npm install -g nodemon
  $ sudo npm install -g pm2
  ```

### Execution

- ##### [NOTE] RUN THE COMMANDS IN SPECIFIED WAY ONLY!
- `For Dev mode (Hot-Reloading Enabled) / Local Testing:`
  ```
  $ nodemon server.js
  ```
- `For Deployment (PM2/ Instance):`
  - In root directory execute the below commands :
  ```
  $ pm2 start server.js --name your-service
  ```
