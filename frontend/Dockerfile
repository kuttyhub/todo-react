# syntax=docker/dockerfile:experimental

FROM node:16.8-alpine3.13
WORKDIR /frontend

COPY package*.json ./
RUN npm i

COPY . .
EXPOSE 3000