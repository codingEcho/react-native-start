## Mac IOS 环境搭建



### 必需的软件

#### Homebrew

[Homebrew](http://brew.sh/), Mac系统的包管理器，用于安装NodeJS和一些其他必需的工具软件。

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

```

译注：在Max OS X 10.11（El Capitan)版本中，homebrew在安装软件时可能会碰到`/usr/local`目录不可写的权限问题。可以使用下面的命令修复：

```
sudo chown -R `whoami` /usr/local

```

#### Node

使用Homebrew来安装[Node.js](https://nodejs.org/).(**使用Homebrew安装，会提示失败，可以使用官网安装包安装**)

> React Native需要NodeJS 4.0或更高版本。本文发布时Homebrew默认安装的是6.x版本，完全满足要求。

```
brew install node

```

## [Node.js官网](https://nodejs.org/en/)

根据引导界面，按步骤操作，一般默认选项即可。

安装完成后，关闭当前所有的终端。再打开终端输入

```shell
node -v
# 笔者本机的输出
#➜  ~ node -v
#v6.5.0
```

来查看是否安装成功

**效率：**mac自带的终端不是很好用，可以使用[iterm](http://www.iterm2.com/)+[Oh My Zsh](http://ohmyz.sh/),[zsh配置教程](http://yijiebuyi.com/blog/b9b5e1ebb719f22475c38c4819ab8151.html)

如果需要配置环境变量

在`.bash_profile`中加入相应的路径（**如果mac开发Android，请在将环境变量配在该文件中**）

```shell
# Android 相关
export ANDROID_HOME=/usr/local/opt/android-sdk
GRADLE_HOME=/usr/local/bin/gradle-2.4;
export GRADLE_HOME
export PATH=$PATH:$GRADLE_HOME/bin
#maven 3.3.9 
export M2_HOME=/Users/mlwills/Dev/Maven
export PATH=$PATH:$M2_HOME/bin
export PATH="$(brew --prefix homebrew/php/php70)/bin:$PATH"
export PATH="$(brew --prefix homebrew/php/php70)/sbin:$PATH"
export PATH="/usr/local/bin:/usr/local/sbin:$PATH"

```



#### React Native的命令行工具（react-native-cli）

React Native的命令行工具用于执行创建、初始化、更新项目、运行打包服务（packager）等任务。

```
npm install -g react-native-cli

```

如果你看到`EACCES: permission denied`这样的权限报错，那么请参照上文的homebrew译注，修复`/usr/local`目录的所有权：

```
sudo chown -R `whoami` /usr/local

```

#### Xcode

React Native目前需要[Xcode](https://developer.apple.com/xcode/downloads/) 7.0 或更高版本。你可以通过App Store或是到[Apple开发者官网](https://developer.apple.com/xcode/downloads/)上下载。这一步骤会同时安装Xcode IDE和Xcode的命令行工具。

> 虽然一般来说命令行工具都是默认安装了，但你最好还是启动Xcode，并在`Xcode | Preferences | Locations`菜单中检查一下是否装有某个版本的`Command Line Tools`。Xcode的命令行工具中也包含一些必须的工具，比如`git`等。

### 推荐安装的工具

#### Watchman

[Watchman](https://facebook.github.io/watchman/docs/install.html)是由Facebook提供的监视文件系统变更的工具。安装此工具可以提高开发时的性能（packager可以快速捕捉文件的变化从而实现实时刷新）。

```
brew install watchman

```

#### Flow

[Flow](http://www.flowtype.org/)是一个静态的JS类型检查工具。译注：你在很多示例中看到的奇奇怪怪的冒号问号，以及方法参数中像类型一样的写法，都是属于这个flow工具的语法。这一语法并不属于ES标准，只是Facebook自家的代码规范。所以新手可以直接跳过（即不需要安装这一工具，也不建议去费力学习flow相关语法）。

```
brew install flow

```

#### Nuclide(轻量级IDE)

**译注：我们更推荐使用**

- [Visual Studio Code](https://code.visualstudio.com/)(插件：React Native Tools、jsx、vscode-icons、beautify)
- [WebStorm](https://www.jetbrains.com/webstorm/)或[Sublime Text](http://www.sublimetext.com/)来编写React Native应用。

[Nuclide](http://nuclide.io/)（此链接需要科学上网）是由Facebook提供的基于atom的集成开发环境，可用于编写、[运行](http://nuclide.io/docs/platforms/react-native/#running-applications)和 [调试](http://nuclide.io/docs/platforms/react-native/#debugging)React Native应用。

点击这里阅读[Nuclide的入门文档](http://nuclide.io/docs/quick-start/getting-started/)。

## 测试安装

```
react-native init AwesomeProject
cd AwesomeProject
react-native run-ios
```

你也可以在[Nuclide](http://nuclide.io/)中打开[`AwesomeProject`](http://nuclide.io/docs/quick-start/getting-started/#adding-a-project)文件夹 然后[运行](http://nuclide.io/docs/platforms/react-native/#command-line)，或是双击`ios/AwesomeProject.xcodeproj`文件然后在Xcode中点击`Run`按钮。

### 修改项目

现在你已经成功运行了项目，我们可以开始尝试动手改一改了：

- 使用你喜欢的编辑器打开`index.ios.js`并随便改上几行。
- 在iOS Emulator中按下`⌘-R`就可以刷新APP并看到你的最新修改！

### 完成了！

恭喜！你已经成功运行并修改了你的第一个React Native应用。