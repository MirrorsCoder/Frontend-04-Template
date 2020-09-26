学习笔记

非形式语言

- 中文，英文

形式语言（乔姆斯基谱系）

- 0 型 无限制文法（`?::=?`）
- 1 型 上下文相关文法（`?<A>?::=?<B>?`）
- 2 型 上下文无关文法（`<A>::=?`）
- 3 型 正则文法（`<A>::=<A>?`）

产生式（BNF）

- 用尖括号扩起来的名称来表示语法结构
- 语法结构分成基础结构和需要用其他语法结构定义的复合结构
  - 基础结构称终结符
  - 复合结构称非终结符
- 引号和中间的字符表示终结符
- 可以有括号
- `*` 表示重复多次
- `｜` 表示或
- `+` 表示至少一次

- `C++`中`*`可能表示乘号或者指针，具体是哪个，取决于星号前面的标识符是否被声明为类型
- `VB`中，`<`可能是小于号，也可能是 XML 直接量的开始，取决于当前位置是否可以接受 XML 直接量
- `Python`中，行首的 tab 符和空格会根据上一行的行首空白以一定规则被处理成虚拟终结符 indent 或者 decent
- `JavaScript`中，`/`可能是除号，也可能是正则表达式开头，处理方式类似于 VB，字符串模版中也需要特殊处理`}`，还有自动插入分号规则

形式语言--用途

- 数据描述语言（JSON，HTML，XAML，SQL，CSS）
- 编程语言（C，C++，Java，C#，Python，Ruby，Perl，Lisp，T-SQL，Clojure，Haskell，JavaScript）

形式语言--表达方式

- 声明式语言（JSON，HTML，XAML，SQL，CSS，Lisp，Clojure，Haskell）
- 命令型语言（C，C++，Java，C#，Python，Ruby，Perl，JavaScript）

图灵完备性

- 命令式--图灵机（goto ｜ if 和 while）
- 声明式--lambda（递归）

动态与静态
动态：

- 在用户的设备/在线服务器上
- 产品实际运行时
- Runtime

静态：

- 在程序员设备上
- 产品开发时
- Compiletime

类型系统

- 动态类型系统
- 强类型与弱类型（String+Number String==Boolean）
- 复合类型（结构体/函数签名）
- 子类型
- 泛型（逆变/协变）

一般命令式编程语言

- Atom 原子
- Expression 表达式
- Statement 语句
- Structure 结构化
- Program 组织代码

Number、String、Boolean、Object、Null、Undefined、Symbol

Number（IEEE 754 float 表示方法）

- Sign（1）
- Exponent（11）
- Fraction（52）

String

- Character 字符
- Code Point 码点
- Encoding 编码方式

ASCII 0 ～ 127
Unicode
UCS（0000-FFFF）
GB（GB2312，GBK-GB13000，GB18030）
ISO-8859
BIG5

UTF8 一个字节对应一个字符
UTF16 两个字节一个字符

语法（"" '' ``）

Boolean（true false）

null（关键字/变量）：有值但是为空
undefined（非关键字/变量）：未赋值
void 0; ：用来产生 undefined

Object(唯一与状态无关)

- 唯一性的标识
- 状态
- 行为

Class（分类）
