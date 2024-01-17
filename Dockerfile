ARG NODE_VERSION=14
FROM node:${NODE_VERSION}-alpine

ARG APP_VERSION=0.1.0

ENV DB_STRING_CONN=mysql://root:dbpass123@localhost:3306/localdb
ENV PORT=3333

WORKDIR /usr/src/app
COPY package*.json ./
RUN apk add --no-cache --virtual .gyp python3 make g++
RUN npm install
RUN apk del .gyp
COPY . .
RUN npm run build
EXPOSE ${PORT}
CMD ["npm", "run", "start"]
