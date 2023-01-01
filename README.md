# React_Firebase test

React✖️Firebase の環境

## 事前準備

- VS Code のインストール
- GitHub のアカウント登録
- Node.js のインストール(v16.14.0)
- Firebase のプロジェクト作成

## 必要な環境

- Node.js
- npm
- Git
- Java

## 環境構築

1. GitHub から`git clone`
2. `cd react_firebase` でルートディレクトリに移動
3. `make setup`で環境構築

## デプロイする場合

4. FIrebase 環境を設定
5. `firebase login`で Firebase で登録した Google アカウントと接続
6. `firebase use --add`でプロジェクト選択
7. `make deploy`で公開

参考
[React×Firebase でちゃんと開発するときの環境構築手順と解説](https://zenn.dev/tentel/articles/488dd8765fb059#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)
