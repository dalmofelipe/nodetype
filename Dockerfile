ARG NODE_VERSION=14
ARG APP_VERSION=0.1.0

FROM node:${NODE_VERSION}-alpine as builder

WORKDIR /usr/src/app
COPY package*.json ./
RUN apk add --no-cache --virtual .gyp python3 make g++
RUN npm install
RUN apk del .gyp
COPY . .
RUN npm run build

# Multstage Builder
FROM node:alpine

ENV DB_STRING_CONN=mysql://root:dbpass123@localhost:3306/localdb
ENV PORT=3333

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE ${PORT}
CMD ["npm", "start"]
