# SETUP EXPRESS SERVER

### First create and fill key and value in <i>.env</i> file, list key can see in <i>.env.example like:</i>
```
DB_HOST=
DB_USER=
DB_PASS=
DB_NAME=
DB_PORT=

JWT_KEY=nexatest
NODE_ENV=DEVELOPMENT

PORT=3000
```

### Dockerfile
```
FROM node:alpine

WORKDIR /usr/src/app

COPY package\*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
```

### docker-compose.yml
<i>fill environment value same as <b>.env</b> file</i>
```
version: "3.7"
services:
    app:
        build:
            context: .
            dockerfile: Dockerfile
        ports: - "3000:3000"
        environment:
            - DB_HOST=
            - DB_USER=
            - DB_PASS=
            - DB_NAME=
            - DB_PORT=
            - JWT_KEY=
            - NODE_ENV=
            - PORT=
```


### runnig docker-compose
```
npm run dcompose:up
```
