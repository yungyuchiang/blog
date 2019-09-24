---
title: FLUX
---
### FLUX

---
> Flux is the application architecture that Facebook uses for building client-side web applications. It complements React's composable view components by utilizing a unidirectional data flow. It's more of a pattern rather than a formal framework, and you can start using Flux immediately without a lot of new code.

> React 标榜自己是 MVC 里面 V 的部分，那么 Flux 就相当于添加 M 和 C 的部分。

**一个 Flux 应用主要包含四个部分:**
- **the dispatcher** 处理动作分发,维护Store之间的依赖关系
- **the stores** 数据和逻辑部分
- **the views React** 组件，这一层可以看作 controller-views，作为视图同时响应用户交互
- **the actions** 提供给 dispatcher 传递数据给 store

#### 单向数据流

```
graph LR
Action --> Dispatcher
Dispatcher --> Store
Store --> View
```

更多时候 View 会通过用户交互触发 Action，所以一个简单完整的数据流类似这样：
![image](http://wiki.jikexueyuan.com/project/react-tutorial/images/flux-overview.png)
整个流程如下：
- 首先要有 action，通过定义一些 action creator 方法根据需要创建 Action 提供给 dispatcher
- View 层通过用户交互（比如 onClick）会触发 Action
- Dispatcher 会分发触发的 Action 给所有注册的 Store 的回调函数
- Store 回调函数根据接收的 Action 更新自身数据之后会触发一个 change 事件通知 View 数据更改了
- View 会监听这个 change 事件，拿到对应的新数据并调用 setState 更新组件 UI

**所有的状态都由 Store 来维护，通过 Action 传递数据，构成了如上所述的单向数据流循环，所以应用中的各部分分工就相当明确，高度解耦了。**