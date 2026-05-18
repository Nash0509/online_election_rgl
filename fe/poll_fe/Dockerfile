# Stage 1: Build the Angular app
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --configuration=production

# Stage 2: Serve the app with Nginx
FROM nginx:alpine
COPY --from=build /app/dist/poll-fe /usr/share/nginx/html
# Custom Nginx configuration to route all requests to index.html for Angular routing
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
