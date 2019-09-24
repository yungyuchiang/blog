title: 常用的js操作
date: 2019-09-23 08:20:34
---
# 常用的js操作

### 1.查看chrome版本
```
navigator.appVersion.match(/.*Chrome\/([0-9\.]+)/)[1]
```
### 2.有趣的js
```
(!(~+[])+{})[--[~+""][+[]]*[~+[]] + ~~!+[]]+({}+[])[[~!+[]]*~+[]]
console.log(([][[]]+[])[+!![]]+([]+{})[!+[]+!![]])

//js错误的处理方法
try {
    something
} catch (e) {
    window.location.href =
        "http://stackoverflow.com/search?q=[js]+" +
        e.message;
}

[].forEach.call($$("*"),function(a){
    a.style.outline="1px solid #"+(~~(Math.random()*(1<<24))).toString(16)
})
或
[].forEach.call($$('*'), a=>{a.style.outline=`1px solid #${(~~(Math.random()*(1<<24))).toString(16)}`})
```