# AnkiLike 環境構築手順(EC2 t2.micro)

このドキュメントは、Amazon EC2 の t2.micro インスタンスを使用して開発環境を構築する際の手順をまとめたものです。メモリが限られている t2.micro 環境での効率的な設定やインストール方法を紹介します。

---

## 1. システムの更新

```bash
sudo yum update -y
```

## 2. スワップメモリの設定（4GB）

```bash
# スワップファイルの作成
sudo dd if=/dev/zero of=/swapfile bs=1M count=4096

# アクセス権の設定
sudo chmod 600 /swapfile

# スワップ領域の作成
sudo mkswap /swapfile

# スワップの有効化
sudo swapon /swapfile

# スワップの確認
sudo swapon -s
free -m

#起動時にスワップを有効にするため、/etc/fstab に以下を追記します。
/swapfile swap swap defaults 0 0
```

## 3. Docker & Docker Compose のインストール

```bash
# Docker のインストール
sudo yum install docker -y

# Docker の起動
sudo service docker start

# ec2-user を docker グループに追加
sudo usermod -a -G docker ec2-user

# Docker の自動起動設定
sudo systemctl enable docker

```

## 4. ワークディレクトに資材の配置

```bash
# optディレクトリ移動
cd /opt

### ワークディレクトリ作成
mkdir ankilike_project

### 権限追加
chmod 777 ankilike_project

### 確認
cd /opt/ankilike_project; pwd; ls -ltr

### SCPやSSHで資材転送
/opt/ankilike_projectディレクトリにankilike.tar.gzを転送

### tar.gzを解凍
tar -zxvf ankilike.tar.gz
```

## 5. docker 起動

```bash

### docker-compose.ymlと同ディレクトリに移動
cd /opt/ankilike_project/ankilike

### docker起動
docker-compose up -d

```
