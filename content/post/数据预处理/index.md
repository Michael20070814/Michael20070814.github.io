+++
date = '2026-03-04T17:10:55+08:00'
draft = false
title = '数据预处理'
tags = ["深度学习", "PyTorch", "d2l"]

+++

# Pandas 数据预处理总结

## 1. 读取 CSV 文件

```python
import pandas as pd

data = pd.read_csv('文件.csv')
```

**常用参数：**

- `na_values=['NA']` — 指定额外的缺失值字符串
- `skipinitialspace=True` — 去掉逗号后面的空格（列名和值都会处理）

```python
data = pd.read_csv('文件.csv', na_values=['NA'], skipinitialspace=True)
```

------

## 2. 写入 CSV 文件

```python
import os

os.makedirs(os.path.join('..', 'data'), exist_ok=True)
data_file = os.path.join('..', 'data', 'Student.csv')

with open(data_file, 'w') as f:
    f.write('Name,Index,Score,Order\n')  # 逗号后不要加空格
    f.write('Yang,14,90.88,6\n')
    f.write('NA,4,91.26,3\n')
```

> ⚠️ 逗号后面不要加空格，否则列名和值都会带空格，导致 `na_values` 匹配失败。

------

## 3. 查看数据

```python
print(data)           # 打印整个表
data.head()           # 前5行
data.shape            # (行数, 列数)
data.dtypes           # 每列的数据类型
data.isnull().sum()   # 每列缺失值数量
```

------

## 4. 拆分输入和输出

```python
inputs = data.iloc[:, 0:2]   # 前两列作为输入
outputs = data.iloc[:, 2]    # 第三列作为输出
```

------

## 5. 处理缺失值

### 数值列：用均值填充

```python
inputs = inputs.fillna(inputs.mean(numeric_only=True))
```

> `numeric_only=True` — 只对数值列求均值，跳过字符串列，避免报错。

### 字符串列：用众数或固定值填充

```python
inputs['Name'] = inputs['Name'].fillna(inputs['Name'].mode()[0])
inputs['Name'] = inputs['Name'].fillna('Unknown')
```

### 直接删除含缺失值的行

```python
data.dropna()                        # 删除任意列有缺失值的行
data.dropna(subset=['Score'])        # 只看某列有缺失值的行
```

------

## 6. 删除列

```python
data.drop(columns=['列名'])            # 删除单列
data.drop(columns=['列名1', '列名2'])  # 删除多列
```

### 找到缺失值最多的列并删除

```python
worst_col = data.isnull().sum().idxmax()  # 找缺失值最多的列名
data = data.drop(columns=[worst_col])     # 删除它
```

------

## 7. 转换为 Tensor

```python
import torch

inputs = inputs.astype(float)           # 先确保是数值类型
X = torch.tensor(inputs.values, dtype=torch.float32)
y = torch.tensor(outputs.values, dtype=torch.float32)
```

------

## 常见坑总结

| 问题                   | 原因                            | 解决方法                   |
| ---------------------- | ------------------------------- | -------------------------- |
| `mean()` 报 TypeError  | 列含字符串，类型是 object       | 加 `numeric_only=True`     |
| `na_values` 不生效     | CSV 里值带空格，如 `' NA'`      | 加 `skipinitialspace=True` |
| 数字列的 `NA` 没被识别 | pandas 对数字列不做默认 NA 识别 | 加 `na_values=['NA']`      |
| 变量名拼写错误         | `date_file` 写成了 `data_file`  | 注意区分                   |
