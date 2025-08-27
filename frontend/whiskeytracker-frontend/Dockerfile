# Stage 1: Build Angular app
FROM node:20 AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build -- --configuration=production

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=build /app/dist/whiskeytracker-frontend/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
