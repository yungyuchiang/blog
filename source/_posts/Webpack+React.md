---
title: Webpack+React简单创建
---
# Webpack+React简单创建

### 需要模块
1. **React, reactDom**
2. **Webpack, Webpack-server-dev**
3. **Babel-core, Babel-loader, Babel-preset-env, Babel-preset-react**
4. **Html-loader, Html-webpack-plugin**

### 安装步骤
1. 初始化项目
```shell
>mkdir react-demo
>cd react-demo
>npm init -y
```
2. 安装Webpack
```shell
>npm install --save-dev webpack
```
创建文件webpack.config.js, 填写内容
```js
const path = require('path');

module.exports = {
  entry: ["./app/app.js"],
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist')
  }
}
```
3. 安装Babel
```
>npm install --save-dev babel-core babel-loader babel-preset-dev babel-preset-react
```
更新webpack.config.js文件
```
const path = require('path');

module.exports = {
  entry: ["./app/app.js"],
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module:{
    rules:[
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
}
```
同时，创建babel的资源文件.babelrc
```
{
    "presets": ["env", "react"]
}
```
4. 安装React
```shell
>npm install --save-dev react react-dom
```
创建react的文件./app/app.js
```js
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
    <h1>jeson, this is me</h1>,
    document.getElementById('root')
);
```
5. 安装Html-loader, Html-webpack-plugin
```
>npm install --save-dev html-loader html-webpack-plugin
```
更新webpack.config.js文件
```
const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: ["./app/app.js"],
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module:{
    rules:[
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },{
        test: /\.html$/,
        use: {
          loader: "html-loader"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};
```
6. 安装webpack-server-dev
```
>npm install --save-dev webpack-server
```
更新webpack.config.js文件
```
const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: ["./app/app.js"],
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module:{
    rules:[
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },{
        test: /\.html$/,
        use: {
          loader: "html-loader"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ],
  devServer: {
    contentBase: "./dist",
    port: 3000,
  }
};
```
7. 发布
修改package.json文件
```json
{
  "name": "react-webpack",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "webpack-dev-server --open",
    "build": "webpack",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-core": "^6.21.0",
    "babel-loader": "^6.2.10",
    "babel-preset-env": "^1.6.1",
    "babel-preset-react": "^6.24.1",
    "html-loader": "^0.5.5",
    "html-webpack-plugin": "^2.30.1",
    "react": "^16.2.0",
    "react-dom": "^16.2.0",
    "webpack": "^2.2.1",
    "webpack-dev-server": "^2.11.1"
  }
}
```
运行
```
>npm start
```