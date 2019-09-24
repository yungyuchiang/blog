---
title: Mysql 分区
---
## Mysql 分区

### 查看是否支持分区
```
SHOW PLUGINS ;
-- 如果支持分区，partition会显示为active
```

### 分区介绍
目前mysql分区可以分为一下几种类型
1. RANGE分区：基于一个给定的连续区间范围，RANGE主要是基于整数的分区，对于非整形的字段需要利用表达式将其转换成整形。

2. LIST分区：是基于列出的枚举值列表进行分区。

3. COLUMNS分区：可以无需通过表达式进行转换直接对非整形字段进行分区，同时COLUMNS分区还支持多个字段组合分区，只有RANGELIST存在COLUMNS分区，COLUMNS是RANGE和LIST分区的升级。

4. HASH分区：基于给定的分区个数，将数据分配到不同的分区，HASH分区只能针对整数进行HASH，对于非整形的字段只能通过表达式将其转换成整数。

5. KEY分区：支持除text和BLOB之外的所有数据类型的分区,key分区可以直接基于字段做分区无需转换成整数。其中hash分区不支持多列分区，key分区支持多列分区

### 删除添加分区表
1. 移除分区表
```
ALTER TABLE tablename
REMOVE PARTITIONING ;
-- 使用remove移除分区是仅仅移除分区的定义，并不会删除数据和drop PARTITION不一样，后者会连同数据一起删除
```
2. 对已经存在记录的表创建分区，以增加range分区为例，和创建表建分区的语法一样。
```
ALTER TABLE `tb_partition`.`tb_varchar` 
PARTITION BY RANGE(id) PARTITIONS 3( PARTITION part0 VALUES LESS THAN (5000),  PARTITION part1 VALUES LESS THAN (10000),  PARTITION part2 VALUES LESS THAN (MAXVALUE)) ;
-- 对已有的表创建分区之后，数据会按照分区的定义分布到各个分区文件当中
```
3. 创建多列分区, hash分区为了分区数据均衡，可以分区数量采用2的n次方来分区
```
ALTER TABLE `tb_partition`.`tb_varchar` PARITION BY KEYS(cp1,cp2,cp3) PARITIONS 8 
```

### 子分区
子分区其实是对每个分区表的每个分区进行再次分隔，目前只有RANGE和LIST分区的表可以再进行子分区，子分区只能是HASH或者KEY分区。子分区可以将原本的数据进行再次的分区划分。
```
CREATE TABLE tb_sub (id INT, purchased DATE)
    PARTITION BY RANGE( YEAR(purchased) )
    SUBPARTITION BY HASH( TO_DAYS(purchased) )
    SUBPARTITIONS 2 (
        PARTITION p0 VALUES LESS THAN (1990),
        PARTITION p1 VALUES LESS THAN (2000),
        PARTITION p2 VALUES LESS THAN MAXVALUE
    );
```