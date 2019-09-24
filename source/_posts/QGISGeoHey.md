---
title: QGIS火星坐标转换插件的使用方法
---
## QGIS火星坐标转换插件的使用方法

我们都知道在日常使用中，根据国家测绘局的规定，需要使用国家测绘局制定的GCJ02坐标系统，而该坐标系统是在原始的WGS84的经纬度坐标上经过一系列的非线性运算得到的，而百度在GCJ02坐标系上又进行了一次偏移，形成了百度09坐标系，因此在国内常用的坐标系有三套：WGS84，GCJ02，BD09，其三者的转换关系如下图所示。

![image](https://pic1.zhimg.com/50/v2-280bbed487cf68e58f633d73f906068a_hd.jpg)

但是在我们日常的数据处理中经常碰到各种坐标系的数据，在不同数据间相互转换着实麻烦， 为了方便大家在各种坐标之间互相转换，我们极海提供了一个三者之间坐标互相转换的QGIS插件，支持点、线、面、多点、多线、多面，具体安装方法如下：

1. 打开QGIS后，到菜单plugins中选择Manage and Instal Plugins... 在打开的窗口中输入：**geohey**，即可找到**GeoHey Toolbox**，在右下角选择**install plugin**即可安装成功。

![image](https://pic2.zhimg.com/50/v2-6290c7e95b3846fb9e3bbe5bd9dcf9b4_hd.jpg)

2. 安装成功后到**installed**中勾选前面的插件前面的复选框，将插件加载到QGIS中。

![image](https://pic1.zhimg.com/50/v2-e3bf17ef93fb415f258999ec81eb00f9_hd.jpg)

3. 到菜单processing中选择勾选**Toolbox**，打开**processing toolbox**面板。然后打开processing菜单中的**Options**，找到Providers。再打开下面的**GeoHey Toolbox**，勾选**Activate**，即可在右侧的processing toolbox面板看到GeoHey Toolbox提供的算法。

![image](https://pic3.zhimg.com/50/v2-3dda9c2ceef45777b2335e6e774343ef_hd.jpg)

图中红色的是**偏移后的GCJ02坐标系**，绿色的是**未偏移的WGS84坐标系。**

![image](https://pic2.zhimg.com/50/v2-d9ea91e6ad26aeec7f194491fe39bf3d_hd.jpg)

如果出现在下面的错误：

![image](https://pic4.zhimg.com/50/v2-77a659aae5ef6947c2bc59052a9b77a4_hd.jpg)

请将Providers中的**GRASS commands**中的GRASS folder目录设置为空，重启QGIS即可。

![image](https://pic2.zhimg.com/50/v2-8475e7c5616afef1c8c24d40f543a70d_hd.jpg)

转载：文/ sshuair
url: [link](https://zhuanlan.zhihu.com/p/30504809)
