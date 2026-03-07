+++
date = '2026-03-07T13:50:50+08:00'
draft = false
title = 'ExpressionEvaluation'
tags = ['算法', '数据结构']

+++
# 1. 中缀表达式 (Infix Notation)

- **书写模式**：`操作数1` `运算符` `操作数2`

- **示例**：`A + B * C` （对应二叉树的**中序遍历**：左 -> 根 -> 右）

- **特点**：这是我们人类最熟悉、日常数学最常用的书写方式。

- **痛点**：对计算机极度不友好。因为它有**优先级**（先乘除后加减）和**结合律**，还经常需要用**括号** `()` 来打破常规优先级（比如 `(A + B) * C`）。计算机在从左向右读取时，无法立刻决定当前遇到的运算符是否应该马上执行，必须向后“偷看”或者借助复杂的逻辑。

# 2. 前缀表达式 (Prefix Notation / 波兰式)

- **书写模式**：`运算符` `操作数1` `操作数2`

- **示例**：`+ A * B C` （对应二叉树的**前序遍历**：根 -> 左 -> 右）

- **特点**：运算符写在前面。它的最大优势是**彻底抛弃了括号和优先级规则**。计算机从右向左扫描扫描前缀表达式时，只要遇到运算符，就可以直接把紧挨着它的两个操作数进行计算。

# 3. 后缀表达式 (Postfix Notation / 逆波兰式 RPN)

- **书写模式**：`操作数1` `操作数2` `运算符`

- **示例**：`A B C * +` （对应二叉树的**后序遍历**：左 -> 右 -> 根）

- **特点**：运算符写在最后。这是**计算机最喜欢的模式**！它不仅不需要括号和优先级规则，而且极其契合 “**栈 (Stack)**”  这种后进先出的数据结构。计算机只需要从左向右“无脑”扫描一遍，就能算出结果。

# 4.中缀表达式向后缀表达式的转换——调度场算法

调度场算法的核心规则

我们从左向右逐个读取中缀表达式的字符（Token）。规则非常机械，严格按照以下四条执行：

**规则 1：遇到数字（操作数）**

- **直接放行**：不进栈，直接排入“输出队列”的末尾。

**规则 2：遇到左括号 `(`**

- **无条件进站**：直接压入“运算符栈”。它是用来标记一个高优先级子表达式的开始。

**规则 3：遇到右括号 `)`**

- **清算括号内的运算符**：不断从“运算符栈”顶部弹出运算符，并排入“输出队列”，**直到栈顶弹出的是左括号 `(` 为止**。

- （注意：左括号弹出后直接丢弃，不进入输出队列；右括号本身也不进栈。这样括号就完美消除了。）

**规则 4：遇到普通运算符（如 `+`, `-`, `*`, `/`）**

- **比较优先级，胜者上位**：看一眼“运算符栈”的栈顶。

  - 如果栈顶是空，或者栈顶是左括号 `(`，直接压栈。

  - 如果当前遇到的运算符，优先级**大于**栈顶运算符，直接压栈。

  - 如果当前运算符优先级**小于或等于**栈顶运算符，就把栈顶的运算符弹出来，排入“输出队列”。然后**继续重复比较**新的栈顶，直到满足压栈条件，最后把当前运算符压入栈中。

- _(简单来说：栈里只能保持下面的优先级低、上面的优先级高。如果来了个辈分小（优先级低或相等）的，就得把上面辈分大或平级的先“挤”出去。)_

**最后收尾：**

- 当整个中缀表达式读取完毕后，把“运算符栈”里剩下的所有运算符，依次弹出并排入“输出队列”。

# 5. **如何比较算术符优先级**：建立“优先级字典”

我们可以事先定义好每个符号的优先级得分。在最基础的数学运算中，我们可以这样量化：

| **运算符** | **优先级得分** | **说明**           |
| ---------- | -------------- | ------------------ |
| `+` , `-`  | 1              | 加减法优先级最低   |
| `*` , `/`  | 2              | 乘除法优先级较高   |
| `^` (指数) | 3              | 指数运算优先级最高 |

有了这个字典，我们在执行调度场算法时，就可以把抽象的“比较优先级”变成极其简单的“比大小”。

假设我们当前读取到的新运算符是 `op_current`，栈顶的运算符是 `op_top`。我们可以设想有一个获取分数的工具函数叫 `get_priority()`。逻辑判断如下：

- **如果 `get_priority(op_current) > get_priority(op_top)`：** 说明新来的运算符优先级更高（比如栈顶是 `+`，新来的是 `*`，即 2 > 1）。那么新运算符直接**压入栈中**。

- **如果 `get_priority(op_current) <= get_priority(op_top)`：** 说明新来的运算符优先级较低或平级（比如栈顶是 `*`，新来的是 `+`，即 1 <= 2）。这时候必须把栈顶的高优先级运算符**弹出来，排进输出队列**。然后继续拿 `op_current` 去和下一个新的栈顶比，直到能压进去为止。

# 6. **实战演示：后缀表达式的计算 `3 4 2 * 1 5 - / +`**

_(对应中缀：`3 + (4 * 2) / (1 - 5)`)_

1. 读 `3`：压栈。栈 = `[3]`

2. 读 `4`：压栈。栈 = `[3, 4]`

3. 读 `2`：压栈。栈 = `[3, 4, 2]`

4. 读 `*`：遇到运算符！弹出 `2` 和 `4`，计算 $4 \times 2 = 8$，将 `8` 压栈。栈 = `[3, 8]`

5. 读 `1`：压栈。栈 = `[3, 8, 1]`

6. 读 `5`：压栈。栈 = `[3, 8, 1, 5]`

7. 读 `-`：遇到运算符！弹出 `5` 和 `1`，计算 $1 - 5 = -4$，将 `-4` 压栈。栈 = `[3, 8, -4]`

8. 读 `/`：遇到运算符！弹出 `-4` 和 `8`，计算 $8 / (-4) = -2$，将 `-2` 压栈。栈 = `[3, -2]`

9. 读 `+`：遇到运算符！弹出 `-2` 和 `3`，计算 $3 + (-2) = 1$，将 `1` 压栈。栈 = `[1]`

10. 扫描结束，栈底结果为 `1`。计算完成！

# 7. 代码实现（c语言）

获取算术符号优先级：

```c
int get_priority(char s)
{
    switch (s)
    {
        case '+':
        case '-':
            return 1;
        case '*':
        case '/':
            return 2;
        default:
            return 0;
    }
}
```

调度场算法转换中缀表达式为后缀表达式：

```c
int *shunting_yard(char *s, int *size)
{
    char *p = s;
    int index = 0;
    char operator[500];
    int *output = (int *)malloc(sizeof(int) * 1000);
    int output_index = 0;int operator_index = -1;
    while (s[index] != '\0')
    {
        if (output_index > 0 && isdigit(s[index - 1]) && isdigit(s[index]))
        {
            output[output_index - 1] = output[output_index - 1] * 10 + s[index] - '0';
        }
        else if (isdigit(s[index]) && (output_index == 0 || (!isdigit(s[index - 1]))))
        {
            output[output_index++] = s[index] - '0';
        }
        else if (s[index] == '(')
        {
            operator[++operator_index] = *p;
        }
        else if (s[index] == ')')
        {
            while (operator[operator_index] != '(')
            {
                if (operator[operator_index] == '+') output[output_index] = OP_SUM;
                else if (operator[operator_index] == '-') output[output_index] = OP_SUB;
                else if (operator[operator_index] == '*') output[output_index] = OP_MUL;
                else if (operator[operator_index] == '/') output[output_index] = OP_DIV;
                output_index++;
                operator_index--;
            }
        }
        else if (s[index] == '+' || s[index] == '-' || s[index] == '*' || s[index] == '/')
        {
            while (operator_index > -1 && get_priority(operator[operator_index]) >= get_priority(s[index]))
            {
                char op = operator[operator_index--];
                if (op == '+') output[output_index++] = OP_SUM;
                else if (op == '-') output[output_index++] = OP_SUB;
                else if (op == '*') output[output_index++] = OP_MUL;
                else if (op == '/') output[output_index++] = OP_DIV;
            }
            operator[++operator_index] = s[index];
        }
        index++;
    }
    while (operator_index > -1)
    {
        char op = operator[operator_index--];
        if (op == '+') output[output_index++] = OP_SUM;
        else if (op == '-') output[output_index++] = OP_SUB;
        else if (op == '*') output[output_index++] = OP_MUL;
        else if (op == '/') output[output_index++] = OP_DIV;
    }
    *size = output_index;
  
    return output;
}
```

后缀表达式计算值：

```c
int calculate(int *s, int size)
{
    int result[100];int index = 0;
    for (int i = 0; i < size; i++)
    {
        if (s[i] >= 0)
            result[index++] = s[i];
        else if (s[i] == OP_MUL)
        {
            int temp = result[index - 1] * result[index - 2];
            index = index - 2;
            result[index++] = temp;
        }
        else if (s[i] == OP_SUM)
        {
            int temp = result[index - 1] + result[index - 2];
            index = index - 2;
            result[index++] = temp;
        }
        else if (s[i] == OP_SUB)
        {
            int temp = result[index - 2] - result[index - 1];
            index = index - 2;
            result[index++] = temp;
        }
        else if (s[i] == OP_DIV)
        {
            int temp = result[index - 2] / result[index - 1];
            index = index - 2;
            result[index++] = temp;
        }
    }
    return result[0];
}
```

**注**：OP_SUM、OP_MUL、OP_DIV、OP_SUB用于表示算术符的类型，可自行define为任意不相同数值