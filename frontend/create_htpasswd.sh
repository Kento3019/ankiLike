#!/bin/bash

# パスワードが未設定なら終了
if [ -z "$USER_NAME_1" ] || [ -z "$PASSWD_1" ]; then
  echo "USER_NAME_1 または PASSWD_1 が設定されていません。"
  exit 1
fi

# htpasswd コマンドで .htpasswd を作成
htpasswd -bc /etc/nginx/.htpasswd "$USER_NAME_1" "$PASSWD_1"

echo ".htpasswd を作成しました。"
