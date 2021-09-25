# React 版

vue で実装した main ブランチの内容を React で書き直したバージョン。UI には material-ui を用いた。  
[netlify](https://happy-perlman-a1e969.netlify.app)に自動デプロイされるようになっている。

## 使い方

netlify にホストしているものではクロスオリジン関係でうまくいかないことが多い。

1. Clone

```bash
git clone -b react https://github.com/hmdyt/js_monitor.git
```

2. node.js の必要なパッケージをインストール

```bash
cd js_monitor
```

```bash
yarn install
```

3. build してどこかにホストする or ローカルで起動

```bash
yarn build
```

```bash
yarn start
```
