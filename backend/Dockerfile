FROM openjdk:17-slim

WORKDIR /app
COPY . .

# RUN毎にimage layerが作られる
#
RUN apt-get update && apt-get install -y findutils && chmod +x ./gradlew

#コンテナ起動時のデフォルトコマンドを指定
CMD ["./gradlew", "bootRun"]
