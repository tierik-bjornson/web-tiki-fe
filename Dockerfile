FROM node:23-alpine AS build
WORKDIR /app

# Copy package.json và package-lock.json trước để tối ưu cache
COPY package*.json ./

# Cài đặt tất cả dependencies bao gồm cả devDependencies
RUN npm ci --include=dev

# Copy toàn bộ mã nguồn vào container
COPY . .

# Build ứng dụng
RUN npm run build

# Sử dụng Nginx để serve ứng dụng
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Mở cổng 80
EXPOSE 80

# Chạy Nginx
CMD ["nginx", "-g", "daemon off;"]
