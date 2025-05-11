# ビルドステージ
FROM node:22-slim AS build

WORKDIR /workspace

# package.json と package-lock.json を先にコピーして依存関係をインストール
COPY package*.json ./
RUN npm install

# ソースコードをコピーし、ビルドを実行
COPY . .
RUN npm run build

# プロダクションステージ
FROM nginx:latest AS production

# Nginxでパスワード生成に必要なツールをインストール
RUN apt-get update && apt-get install -y apache2-utils bash && rm -rf /var/lib/apt/lists/*

# ビルド成果物をコピー
COPY --from=build /workspace/dist /usr/share/nginx/html

# Nginx設定とパスワード生成スクリプトをコピー
COPY default.conf /etc/nginx/conf.d/default.conf
COPY create_htpasswd.sh /etc/nginx/create_htpasswd.sh

# 実行権限を付与
RUN chmod +x /etc/nginx/create_htpasswd.sh

# コンテナ起動時にBasic認証ファイルを作成しNginx起動
CMD ["/bin/bash", "-c", "/etc/nginx/create_htpasswd.sh && nginx -g 'daemon off;'"]
