# Colony_architect

Colony-building game 用のレイアウト・プランナー（グリッドシミュレーター）です。

## 開発

```bash
npm install
npm run dev
```

## ビルド

```bash
npm run build
```

`dist/` に静的ファイルが出力されます。`npm run preview` でビルド結果をローカル確認できます。

## GitHub Pages へのデプロイ

1. リポジトリの **Settings → Pages** を開く
2. **Build and deployment** の **Source** で **GitHub Actions** を選択
3. `main` ブランチに push するか、Actions タブから「Deploy to GitHub Pages」ワークフローを手動実行

公開 URL: `https://<あなたのユーザー名>.github.io/Colony_architect/`

> リポジトリ名を変えた場合は `vite.config.ts` の `base` を同じ名前に合わせてください。
