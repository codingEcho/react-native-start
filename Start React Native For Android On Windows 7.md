# react-native-start(在Windows下搭建React Native Android开发环境)

react-native start with windows 7 system

**本文参考自React Native 中文社区**

- [在Windows下搭建React Native Android开发环境](http://bbs.reactnative.cn/topic/10/%E5%9C%A8windows%E4%B8%8B%E6%90%AD%E5%BB%BAreact-native-android%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83)

- [React Native的常见问题](http://bbs.reactnative.cn/topic/130/%E6%96%B0%E6%89%8B%E6%8F%90%E9%97%AE%E5%89%8D%E5%85%88%E6%9D%A5%E8%BF%99%E9%87%8C%E7%9C%8B%E7%9C%8B-react-native%E7%9A%84%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98)

- [在mac上搭建的视频教程](http://v.youku.com/v_show/id_XMTQ4OTYyMjg4MA==.html?from=s1.8-1-1.2#paction)

## 安装Java JDK

1. 在[Java官网](http://www.oracle.com/technetwork/java/javase/downloads/index-jsp-138363.html)下载相应版本的JDK安装。

2. **注意：虽然安装的是Java8，但是还是最好设置JAVA_HOME,Path,clsspath环境变量**
如系统变量设置如下：

- `JAVA_HOME` `D:\Java\jdk\jdk1.8`

- `classpath` `D:\Java\jdk\jdk1.8\lib\tools.jar`（说明：*笔者因没有设置classpath，导致踩坑*）

- `Path` （新版本的JDK不用手动设置）

## 安装Android SDK
通过安装Android Studio 来安装Android SDK。推荐下载地址[androiddevtools.cn](http://androiddevtools.cn/)
然后进入SDKManager(可通过Android Studio菜单Tools-Android-SDK Manager)，确保以下项目已经安装并更新到最新：

- SDK Platforms/Android 6.0(Marshmallow) (`API Level 23`)

- SDK Tools/Android SDK Tools (`25.1.3`(最新版了，不知如何切换到低版本))

- SDK Tools/Android SDK Platform-tools (`23.1.0`)

- SDK Tools/Android SDK Build-tools(`23.0.1`)（这个必须版本严格匹配23.0.1,笔者安装时已经比这个要高了，可以通过底部“运行独立SDK管理工具”来写在并安装此版本）

- SDK Tools/Android Support Library(`23.2.1`)

- SDK Tools/Android Support Repository(`30.0.0`)

推荐使用腾讯Bugly的镜像加速下载。[查看腾讯的说明](http://android-mirror.bugly.qq.com:8080/include/usage.html)

腾讯的说明是两个选项卡（Android SDK 和 Android Studio），而且截图也是Mac的（屌丝真伤不起啊！）

在Windows版本的在第三个选项卡（SDK Update Sites）点击右边（+）添加即可，代理在`HTTP Proxy`中设置。

推荐将`Android SDK`的`platform-tools(D:\Android\SDK\platform-tools)`子目录加入系统`PATH`环境变量。

最后，把`ANDROID_HOME(D:\Android\SDK)`环境变量设置为你Android SDK所在目录。

##安装C++环境
**编译node.js的C++模块时需要用到**
推荐从[Itellyou](http://www.itellyou.cn/)下载并安装Visual Studio for desktop(这里不建议安装Visual Studio 2013或者2015，如果只是需要C++模块，那Desktop版本应该满足了)。也可选择Windows SDK、cygwin或mingw等其他C++环境（笔者自己安装的是Visual Studio 2013，因为在此之前一直喜欢用VS2013来写JavaScript和HTML）。

**注意：**如果使用VS2015，你需要在命令行中设置`npm config set msvs_version 2015 --global`

##安装Git
[Git下载地址](https://git-for-windows.github.io/)
不知道干嘛用的，估计是每次初始化(`init`)项目时拉取项目模板（纯属臆测）。

##安装Python

从[官网](https://www.python.org/)下载并安装python 2.7.x（**3.x版本不行**，笔者安装的是`python-2.7.10`）

##安装node.js

从[NODE.JS官网](https://nodejs.org/en/)下载node.js的官方`5.11`版本或更高版本。

建议设置npm镜像以加速后面的过程。

`npm config set registry https://registry.npm.taobao.org --global`

`npm config set disturl https://npm.taobao.org/dist --global`

##安装react-native命令行工具

`npm install -g react-native-cli`

##创建项目

在DOS命令行`win+R` --> `cmd` 中进入你的工作目录（如：`cd /d D:\Java\AndroidStudio\React-Native`），运行
`react-native init HiReactNative` 
并耐心等待数（或数十）分钟,结束后可以在系统文件夹中看到家建立好的目录及文件。

##运行packager
进入到HiReactNative目录 `cd /d D:\Java\AndroidStudio\React-Native HiReactNative`紧接以上步骤运行
`react-native start`

可以用浏览器访问[http://localhost:8081/index.android.bundle?platform=android](http://localhost:8081/index.android.bundle?platform=android)看看是否可以看到打包后的脚本（看到很长的js代码就对了）。第一次访问通常需要十几秒，并且在packager的命令行可以看到形如[====]的进度条。

如果你遇到了`ERROR Watcher took too long to load`的报错，请尝试修改`node_modules/react-native/packager/react-packager/src/FileWatcher/index.js`，将其中的MAX_WAIT_TIME 从`25000`改为更大的值（单位是毫秒）

##运行模拟器

推荐使用`BlueStacks`(**该软件提供的是4.4版本的模拟器，如果不报错需要设置本机IP+8081，而且第一次我是手动加载编译好的Reac-Native apk**)

如果有真机(笔者还真没有真机啊，一个`Nokia N1`就是没进入到开发者模式)，可以不必运行模拟器，要配置好驱动，使得adb devices可以看到对应的设备。

##安卓运行

保持packager开启，另外打开一个命令行窗口，然后在工程目录（`cd /d D:\Java\AndroidStudio\React-Native\HiReactNative`）下运行
`react-native run-android`
首次运行需要等待数分钟并从网上下载gradle依赖。（这个过程屏幕上可能出现很多小数点，表示下载进度。这个时间可能耗时很久，也可能会不停报错链接超时、连接中断等等——取决于你的网络状况和墙的不特定阻断。总之要顺利下载，请使用稳定有效的科学上网工具。）

运行完毕后可以在模拟器或真机上看到应用自动启动了。

如果apk安装运行出现报错，请检查上文中安装SDK的环节里所有依赖是否都已装全，platform-tools是否已经设到了PATH环境变量中，运行adb devices能否看到设备。

至此，应该能看到APP红屏报错，这是正常的，我们还需要让app能够正确访问pc端的packager服务。

摇晃设备或按Menu键（Bluestacks模拟器按键盘上的菜单键，通常在右Ctrl的左边 或者左Windows键旁边），可以打开调试菜单，点击Dev Settings，选Debug server host for device，输入你的正在运行packager的那台电脑的局域网IP加:8081（同时要保证手机和电脑在同一网段，且没有防火墙阻拦），再按back键返回，再按Menu键，在调试菜单中选择Reload JS，就应该可以看到运行的结果了。

如果真实设备白屏但没有弹出任何报错，可以在安全中心里看看是不是应用的“悬浮窗”的权限被禁止了。

##安卓调试

打开Chrome，访问 [http://localhost:8081/debugger-ui](http://localhost:8081/debugger-ui)，应当能看到一个页面。按F12打开开发者菜单。

在模拟器或真机菜单中选择Debug JS，即可开始调试。

**如果出错，记得看顶上的链接方便找到便解决问题**
