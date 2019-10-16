title: Jvm内存模型
---

# 运行时数据
![jvm](http://www.yungyuweb.xyz/blog/images/jvm/jvm.png)

## 堆
1. JVM中最大内存空间，被所有内存共享，几乎所有对象和数组都分配到堆中
2. 堆被分为老年代和新生代。
3. 永久代
    * Java6中，在非堆内存中
    * Java7中，静态变量和运行常量池被合并到堆中
    * Java8中，被元空间取代

## 程序计数器
1. 是一块很小的内存空间，主要用来记录各个线程的字节码地址
2. Java是多线程语言，当执行的线程数量超过CPU数量时，线程之间会根据时间片轮询争夺CPU资源
    * 但一个线程的时间片用完了，或者其他原因导致线程的CPU资源被提前抢夺
    * 那么退出的线程需要单独的程序计数器来记录下一条运行的指令

## 方法区：
1. 方法区主要用来存放已被虚拟机加载的类相关信息
    * 类信息（类的版本、字段、方法、接口和父类等信息）、运行常量池、字符串常量池
2. JVM在执行某个类的时候，必须经过加载、链接（验证、准备、解析）、初始化
    * 常量池：用来存放编译生成的各种字面量和符号引用
    * 字面量：字符串、基本类型的常量（final修饰）
    * 符号引用：类和方法的全限定名称、字段的名称和描述符、方法的名称和描述符
3. 运行常量池是全局共享的，多个类公用一个运行时常量池
    * class文件中的常量池多个相同的字符串在运行时常量池只会存在一份
4. 方法区和堆类似，都是一个共享内存区，多个类共用一个运行时常量池
    * 假设两个线程都试图访问方法区中同一个类信息，而这个类还没有装入JVM
    * 那么此时只允许一个线程去加载该类，另一个线程必须等待
5. JVM的内存模型只是一个规范，方法区也是一个规范，一个逻辑分区，并不是一个物理分区
6. 在Java8中已经用元空间替代永久代实现方法区，并且元空间的存储位置时本地内存

## 虚拟机栈
1. Java虚拟机栈是一个线程私有的内存空间，和Java线程一起创建
2. 当创建一个线程时，会在虚拟机栈中申请一个线程栈
    * 用来保存方法的局部变量、操作数帧、动态链接方法和返回地址等信息，并参与方法的调用和返回
3. 每一个方法的调用都伴随着栈帧的入栈操作，每一个方法的返回都伴随着栈帧的出栈操作

## 本地方法栈
1. 本地方法栈跟Java虚拟机栈的功能类似
2. Java虚拟机栈用来管理Java函数的调用，而本地方法栈用来管理本地方法（C语言实现）的调用

# JVM运行原理
```
public class JVMCase {
    // 常量
    private final static String MAN_SEX_TYPE = "man";
    // 静态变量
    public static String WOMAN_SEX_TYPE = "woman";

    public static void main(String[] args) {
        Student student = new Student();
        student.setName("nick");
        student.setSexType(MAN_SEX_TYPE);
        student.setAge(20);

        JVMCase jvmCase = new JVMCase();
        // 调用非静态方法
        jvmCase.sayHello(student);
        // 调用静态方法
        print(student);
    }
    
    // 非静态方法
    private void sayHello(Student student) {
        System.out.println(student.getName() + " say: hello");
    }

    // 常规静态方法
    private static void print(Student student) {
        System.out.println(student);
    }
}

@Data
class Student {
    private String name;
    private String sexType;
    private int age;
}
```

## JVM向操作系统中申请内存
1. JVM第一步是通过参数配置或者默认配置参数向操作系统中申请内存空间，根据内存大小找出具体的内存分配表
2. JVM然后把内存段的起始地址和终止地址分配给JVM，最后JVM进行内部分配

## JVM获得内存空间后，会根据参数分配堆、栈以及方法区的内存大小

## class文件的加载、验证、准备和解析
1. 其中准备阶段会为类的静态成员（字段和方法）分配内存，初始化为系统初始值

## 初始化
1. JVM首先会执行构造方法，编译器会在.java文件被编译成.class文件，收集所有类的初始化代码
2. 初始化代码：静态变量赋值语句，静态代码块，静态方法

## 执行方法
1. 启用main线程，执行main方法，执行第一行代码
2. 在堆内存中会创建一个Student对象, 对象引用存放在栈中
3. 再创建一个JVMCase对象，并调用sayHello方法
    * sayHello方法属于对象jvmCase, 此时sayHello方法入栈，并调用栈中Student引用调用堆中的Studen对象
4. 调用静态方法print
    * print方法属于JVMcase类，从静态方法中获取后放入到栈中，通过Student引用调用堆中的Student对象。

引用：[Java性能 -- JVM内存模型](http://zhongmingmao.me/2019/09/07/java-performance-jvm-memory-model/)