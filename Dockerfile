FROM node:latest AS build

WORKDIR /app

COPY . .
RUN npm ci
RUN npm run build

FROM nginx:latest
COPY --from=build /app/dist /usr/share/nginx/html
