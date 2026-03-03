+++
date = '2026-03-03T08:41:33+08:00'
draft = true
title = 'Calculus Part1'

+++

# 一、导数

## 1. 导数的定义

$$f'(x_0) = \lim_{\Delta x \to 0} \frac{f(x_0 + \Delta x) - f(x_0)}{\Delta x}$$

**几何意义**：曲线 $y=f(x)$ 在点 $(x_0, f(x_0))$ 处切线的斜率。

**物理意义**：瞬时变化率（速度、加速度等）。

## 2. 基本求导公式

| 函数        | 导数                       |
| ----------- | -------------------------- |
| $C$（常数） | $0$                        |
| $x^n$       | $nx^{n-1}$                 |
| $e^x$       | $e^x$                      |
| $a^x$       | $a^x \ln a$                |
| $\ln x$     | $\dfrac{1}{x}$             |
| $\log_a x$  | $\dfrac{1}{x \ln a}$       |
| $\sin x$    | $\cos x$                   |
| $\cos x$    | $-\sin x$                  |
| $\tan x$    | $\sec^2 x$                 |
| $\cot x$    | $-\csc^2 x$                |
| $\arcsin x$ | $\dfrac{1}{\sqrt{1-x^2}}$  |
| $\arccos x$ | $-\dfrac{1}{\sqrt{1-x^2}}$ |
| $\arctan x$ | $\dfrac{1}{1+x^2}$         |

## 3. 求导法则

- **四则运算**：$(u \pm v)' = u' \pm v'$，$(uv)' = u'v + uv'$，$\left(\dfrac{u}{v}\right)' = \dfrac{u'v - uv'}{v^2}$
- **链式法则**：$[f(g(x))]' = f'(g(x)) \cdot g'(x)$
- **隐函数求导**：两边对 $x$ 求导，$y$ 视为 $x$ 的函数。
- **参数方程求导**：$\dfrac{dy}{dx} = \dfrac{y'_t}{x'_t}$

## 4. 高阶导数

- $(\sin x)^{(n)} = \sin!\left(x + \dfrac{n\pi}{2}\right)$
- $(e^x)^{(n)} = e^x$
- $(x^m)^{(n)} = m(m-1)\cdots(m-n+1)x^{m-n}$
- **莱布尼茨公式**：$(uv)^{(n)} = \displaystyle\sum_{k=0}^{n} C_n^k u^{(k)} v^{(n-k)}$

## 5. 微分中值定理

- **罗尔定理**：$f$ 在 $[a,b]$ 连续，$(a,b)$ 可导，$f(a)=f(b)$，则 $\exists, \xi \in (a,b)$，使 $f'(\xi)=0$。
- **拉格朗日中值定理**：$f(b)-f(a) = f'(\xi)(b-a)$，$\xi \in (a,b)$。
- **柯西中值定理**：$\dfrac{f(b)-f(a)}{g(b)-g(a)} = \dfrac{f'(\xi)}{g'(\xi)}$

## 6. 洛必达法则

适用于 $\dfrac{0}{0}$ 型或 $\dfrac{\infty}{\infty}$ 型：

$$\lim \frac{f(x)}{g(x)} = \lim \frac{f'(x)}{g'(x)}$$

其他不定式 $0\cdot\infty$，$\infty - \infty$，$0^0$，$1^\infty$，$\infty^0$ 均需化为以上两型再用。

------

# 二、泰勒公式

## 1. 一般形式（带拉格朗日余项）

$$f(x) = \sum_{k=0}^{n} \frac{f^{(k)}(x_0)}{k!}(x-x_0)^k + R_n(x)$$

余项 $R_n(x) = \dfrac{f^{(n+1)}(\xi)}{(n+1)!}(x-x_0)^{n+1}$，$\xi$ 在 $x_0$ 与 $x$ 之间。

展开点 $x_0=0$ 时称为 **麦克劳林公式**。

## 2. 常用麦克劳林展开式

$$e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots + \frac{x^n}{n!} + o(x^n)$$

$$\sin x = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \cdots + \frac{(-1)^n x^{2n+1}}{(2n+1)!} + o(x^{2n+1})$$

$$\cos x = 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \cdots + \frac{(-1)^n x^{2n}}{(2n)!} + o(x^{2n})$$

$$\ln(1+x) = x - \frac{x^2}{2} + \frac{x^3}{3} - \cdots + \frac{(-1)^{n-1}x^n}{n} + o(x^n)$$

$$(1+x)^\alpha = 1 + \alpha x + \frac{\alpha(\alpha-1)}{2!}x^2 + \cdots \quad (\text{广义二项式})$$

$$\frac{1}{1-x} = 1 + x + x^2 + x^3 + \cdots + x^n + o(x^n)$$

## 3. 泰勒公式的应用

- 求极限（代替洛必达）
- 近似计算
- 证明不等式
- 求高阶导数值：$f^{(n)}(0) = n! \cdot a_n$（$a_n$ 为展开式中 $x^n$ 的系数）

------

# 三、不定积分

## 1. 定义

若 $F'(x) = f(x)$，则称 $F(x)$ 为 $f(x)$ 的原函数，$f(x)$ 的不定积分为：

$$\int f(x),dx = F(x) + C$$

## 2. 基本积分公式

| 积分                                | 结果                                                |
| ----------------------------------- | --------------------------------------------------- |
| $\int x^n,dx$                       | $\dfrac{x^{n+1}}{n+1} + C$，$n\neq -1$              |
| $\int \dfrac{1}{x},dx$              | $\ln|x| + C$                                        |
| $\int e^x,dx$                       | $e^x + C$                                           |
| $\int a^x,dx$                       | $\dfrac{a^x}{\ln a} + C$                            |
| $\int \sin x,dx$                    | $-\cos x + C$                                       |
| $\int \cos x,dx$                    | $\sin x + C$                                        |
| $\int \sec^2 x,dx$                  | $\tan x + C$                                        |
| $\int \csc^2 x,dx$                  | $-\cot x + C$                                       |
| $\int \dfrac{1}{\sqrt{1-x^2}},dx$   | $\arcsin x + C$                                     |
| $\int \dfrac{1}{1+x^2},dx$          | $\arctan x + C$                                     |
| $\int \dfrac{1}{a^2+x^2},dx$        | $\dfrac{1}{a}\arctan\dfrac{x}{a} + C$               |
| $\int \dfrac{1}{\sqrt{a^2-x^2}},dx$ | $\arcsin\dfrac{x}{a} + C$                           |
| $\int \dfrac{1}{x^2-a^2},dx$        | $\dfrac{1}{2a}\ln\left|\dfrac{x-a}{x+a}\right| + C$ |

## 3. 三大积分方法

**① 换元法（第一换元/凑微分）**

$$\int f(g(x))g'(x),dx = \left[\int f(u),du\right]_{u=g(x)}$$

**② 换元法（第二换元/三角代换）**

- $\sqrt{a^2-x^2}$：令 $x = a\sin t$
- $\sqrt{a^2+x^2}$：令 $x = a\tan t$
- $\sqrt{x^2-a^2}$：令 $x = a\sec t$

**③ 分部积分法**

$$\int u,dv = uv - \int v,du$$

口诀记忆顺序（谁做 $u$）：**反、对、幂、三、指**（反三角 > 对数 > 幂 > 三角 > 指数）

## 4. 有理函数积分

将有理分式分解为**部分分数**之和，再逐项积分。

------

# 四、定积分

## 1. 定义（黎曼和）

$$\int_a^b f(x),dx = \lim_{\lambda \to 0} \sum_{i=1}^n f(\xi_i)\Delta x_i$$

**几何意义**：曲线与 $x$ 轴围成的有向面积。

## 2. 牛顿-莱布尼茨公式（微积分基本定理）

$$\int_a^b f(x),dx = F(b) - F(a)$$

其中 $F'(x)=f(x)$。

变上限积分的导数：

$$\left[\int_a^{g(x)} f(t),dt\right]' = f(g(x)) \cdot g'(x)$$

## 3. 定积分性质

- 线性性
- 区间可加性：$\int_a^b = \int_a^c + \int_c^b$
- 保号性：$f(x) \geq 0 \Rightarrow \int_a^b f(x),dx \geq 0$
- **积分中值定理**：$\int_a^b f(x),dx = f(\xi)(b-a)$，$\xi \in (a,b)$

## 4. 换元法与分部积分

与不定积分类似，但换元时**上下限也要相应改变**。

**奇偶函数在对称区间上**（$[-a,a]$）：

- $f(x)$ 为奇函数：$\int_{-a}^{a} f(x),dx = 0$
- $f(x)$ 为偶函数：$\int_{-a}^{a} f(x),dx = 2\int_0^a f(x),dx$

**周期函数**（周期为 $T$）：$\int_a^{a+T} f(x),dx = \int_0^T f(x),dx$

## 5. 定积分的应用

| 应用                          | 公式                                 |
| ----------------------------- | ------------------------------------ |
| 平面面积                      | $S = \int_a^b |f(x)-g(x)|,dx$        |
| 旋转体体积（绕 $x$ 轴）       | $V = \pi\int_a^b [f(x)]^2,dx$        |
| 旋转体体积（绕 $y$ 轴，壳法） | $V = 2\pi\int_a^b x f(x),dx$         |
| 弧长                          | $L = \int_a^b \sqrt{1+[f'(x)]^2},dx$ |

------

# 五、广义积分（反常积分）

## 1. 无穷限的反常积分

$$\int_a^{+\infty} f(x),dx = \lim_{t\to+\infty} \int_a^t f(x),dx$$

若极限存在则称**收敛**，否则称**发散**。

$$\int_{-\infty}^{+\infty} f(x),dx = \int_{-\infty}^c f(x),dx + \int_c^{+\infty} f(x),dx$$

**重要结论**：$\displaystyle\int_1^{+\infty} \frac{1}{x^p},dx$ 当 $p>1$ 时收敛，$p\leq 1$ 时发散。

## 2. 无界函数的反常积分（瑕积分）

设 $x=b$ 为瑕点（即 $f(x)\to\infty$）：

$$\int_a^b f(x),dx = \lim_{\varepsilon\to 0^+} \int_a^{b-\varepsilon} f(x),dx$$

**重要结论**：$\displaystyle\int_0^1 \frac{1}{x^p},dx$ 当 $p<1$ 时收敛，$p\geq 1$ 时发散。

## 3. $\Gamma$ 函数（常考）

$$\Gamma(\alpha) = \int_0^{+\infty} x^{\alpha-1}e^{-x},dx \quad (\alpha > 0)$$

重要性质：

- $\Gamma(\alpha+1) = \alpha,\Gamma(\alpha)$（递推公式）
- $\Gamma(n+1) = n!$（$n$ 为正整数）
- $\Gamma!\left(\dfrac{1}{2}\right) = \sqrt{\pi}$

## 4. 收敛判别法

**比较判别法**：若 $0 \leq f(x) \leq g(x)$，则 $\int g$ 收敛 $\Rightarrow$ $\int f$ 收敛；$\int f$ 发散 $\Rightarrow$ $\int g$ 发散。

**比较极限判别法**：若 $\displaystyle\lim_{x\to+\infty}\dfrac{f(x)}{g(x)} = \lambda \in (0,+\infty)$，则 $\int f$ 与 $\int g$ 同敛散。

------

## 🔑 综合记忆要点

1. **导数是局部性质**，积分是整体性质，两者通过微积分基本定理联系。
2. **泰勒展开**是"用多项式逼近函数"的核心工具，记住6个常用展式。
3. **不定积分无上下限**，结果加 $C$；**定积分有上下限**，结果是数。
4. **广义积分**先判断是否为反常积分（无穷限或瑕点），再判敛散。
5. $p$ 积分是广义积分收敛判断的"标尺"，$p>1$ 收敛，$p\leq1$ 发散（无穷限），$p<1$ 收敛，$p\geq1$ 发散（瑕积分）。
