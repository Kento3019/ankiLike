# ビルドステージ
FROM node:22-slim AS build

WORKDIR /workspace

# package.json と package-lock.json を先にコピーして、依存関係をインストール
COPY package*.json ./
RUN npm install

# ソースコードをコピーし、ビルドを実行
COPY . .
RUN npm run build

# プロダクションステージ
FROM nginx:latest AS production

# ビルド結果をNginxのサーバーにコピー
COPY --from=build /workspace/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Nginxを起動
CMD ["nginx", "-g", "daemon off;"]
