# Étape de construction
FROM node:lts-alpine AS build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY ./tsconfig.json ./tsconfig.json
COPY ./src ./src
COPY ./public ./public

RUN npm run build

# Étape de production
FROM nginx:alpine

COPY --from=build-stage /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]