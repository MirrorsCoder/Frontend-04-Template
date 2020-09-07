学习笔记

地图编辑器

二维数组开销较大，采用一维数组

寻路问题（广度优先搜索）

JavaScript 中的数组是天然的队列/栈
shift(删除数组的第一个元素，并返回被删除的元素)
unshift(向数组的开头添加一个或者多个元素，并返回新的长度)
pop(删除数组的最后一个元素，并返回被删除的元素)
push(向数组末尾添加一个或者多个元素，并返回新的长度)

push + shift ==> 队列（这里采用）
pop + unshift ==> 队列
push + pop ==> 栈
shift + unshift ==> 栈

1. 算法过程无法清晰理解 + 加入动画
2. 路径没找出来（只获得 true/false）+ 标注前驱节点即可

启发式寻路

- 将先进先出的 queue 变成一个能以一定的优先级来提供点的数据结构

将 Sorted 替换成更好的数据结构。（推荐使用二叉堆）

LL 算法构建 AST（抽象语法树）语法分析
核心思想两种：
1.LL 算法
2.LR 算法

四则运算的分析

词法

1. TokenNumber：1234567890 的组合
2. Operator：+ - \* /
3. Whitespace：`<SP>`
4. LineTerminator: `<LF> <CR>`

语法

```
<Expression> ::=
  <AdditiveExpression><EOF>

<AdditiveExpression> ::=
  <MulticativeExpression>
  |<AdditiveExpression><+><MulticativeExpression>
  |<AdditiveExpression><-><MulticativeExpression>

<MulticativeExpression> ::=
  <Number>
  |<MulticativeExpression><*><Number>
  |<MulticativeExpression></><Number>
```
