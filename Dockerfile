# syntax=docker/dockerfile:1
# The purpose of this file is that it used in the creation of a Docker
# image for the entire component-containerservice project.

FROM node:14 as build-deps

# /app is inside the container
WORKDIR /app
# Copy files from component-webui dir to app dir within container
COPY . .

# get dependencies and build
RUN yarn install
RUN yarn build

FROM nginx:1.19-alpine
COPY --from=build-deps /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]