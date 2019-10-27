# thinking-generator

「と思う〇〇であった」という画像を合成してTwitterでシェアすることができるWebアプリケーションです。

TwitterでログインするとTwitterアカウントのアイコンとユーザー名を取得して画像をCanvasに表示します。
呟きたい内容を入力して「ツイートする！」ボタンを押すとTwitter投稿画面に遷移し、リンクとともにツイート内容が表示されます。

リンクを消さずに投稿するとTwitterのOGP表示の機能でさきほどCanvasに表示されていた画像がTwitterのタイムラインに表示されるようになります。

## 使用技術

### フロントエンド

- TypeScript

静的言語を好んでいるのでTypeScriptを採用しています。

- React

宣言的UIがとてもしっくり来ています。普通のHTMLが書けません。

状態管理は[Unstated](https://github.com/jamiebuilds/unstated)を使っています。
シンプルに書けて非常に便利で愛用しています。

- Material-UI

Google Material Designを実装したReact専用のコンポーネントライブラリ。
このアプリケーションではButtonとAvatarのみそのまま使い、同梱されているmakeStylesメソッドで

### バックエンド

- Firebase Hosting

Reactで作成したSingle Page Appをデプロイします。

- Firebase Functions

SPA構成では動的にTwitterCardを表示することができないので、Hostingの特定のURLにアクセスした場合はFunctionsが実行されるように設定して動的コンテンツの配信を実現しています。

- Firebase Storage

クライアントがCanvasで作成した画像を保存しています。

## アプリケーションの流れ

1. ユーザーが「ツイートする！」ボタンをクリックする

1. Canvasの画像をjpegに変換してStorageの"ogp-images/{uid}.jpg"に保存する

1. Tweet投稿画面に"hostURL/share/{uid}"を付与して遷移する

1. "hostURL/share/{uid}"にアクセスした場合、Firebase Hostingの設定によりFunctionsの"share"関数がコールされ、metaタグとscriptタグのみ記述されたHTMLを返却する

1. 上記のアクセス者がTwitterのクローラーの場合、metaタグを解析してTwitterCardを生成する

1. 上記のアクセス者がブラウザの場合、scriptタグを実行して"hostURL"にリダイレクトする

1. metaタグの"image"には"hostURL/ogp/{uid}"が記載されており、Firebase Hostingの設定によりFunctionsの"getOgpImage"がコールされ、Storageに保存された該当の画像を返却する

## TODO

- TwitterアイコンをCanvasに合成する際に丸形を選択できるようにしたい