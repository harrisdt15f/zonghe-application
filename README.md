# APK打包流程

# 工具

 1.JDK  下载地址:https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
 
 2.Android Studio 3.5.3 下载地址:http://www.android-studio.org/
 
 3.CocosCreator 2.2.0  下载地址:https://www.cocos.com/creator/
 
 
# 环境安装

#  1.安装JDK
		打开JDK下载地址,如图
![image](http://local.gitlab:8989/cocos-frontend/jianghu_app/blob/master/ReadMeTexture/install1.png)  
    
		下载的时候注意选择一下和本机匹配的操作系统和架构，下载完成后运行安装就可以了。
   
		设置环境设置,参考地址:https://www.cnblogs.com/cnwutianhao/p/5487758.html

#  2.安装Android Studio 3.5.3
		安装Android Studio,直接下一步下一步安装完成。
		
		打开软件进入主界面,找到下载图标 如图
		![image](https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT1qxJ4xoEOxxr1ejRBdnH-bxXW0DrwCdSZ115UvbL6nOmtPBb7) 
		
		点开之后进入分页栏，根据自己想支持的手机版本去下载
		![image](http://local.gitlab:8989/cocos-frontend/jianghu_app/blob/master/ReadMeTexture/install3.png) 
		
		在 SDK Tools 分页栏，如图
		![image](http://local.gitlab:8989/cocos-frontend/jianghu_app/blob/master/ReadMeTexture/install4.png) 
		
		首先勾选右下角的 Show Package Details，显示分版本的工具选择。

		在 Android SDK Build-Tools 里，选择最新的 build tools 版本。

		勾选 Android SDK Platform-Tools, Android SDK Tools 和 Android Support Library

		勾选 NDK，确保版本在 14 以上
		
		点击 OK，根据提示完成安装。
		
#  3.	安装CocosCreator 直接下一步下一步安装完成
		
		打开Cocos,左上角 选择 文件 -> 设置，打开设置窗口：
		![image](http://local.gitlab:8989/cocos-frontend/jianghu_app/blob/master/ReadMeTexture/install5.png) 
		
		在原生开发环境里面要配置两个路径：NDK 路径，选择 Android SDK Location 路径下的 ndk-bundle 文件夹（NDK 是其根目录）
		
		Android SDK 路径，选择刚才在 SDK Manager 中记下的 Android SDK Location 路径（Android SDK 的目录下应该包含 build-tools、platforms 等文件夹）
		
		配置完成后点击 保存 按钮，保存并关闭窗口。

	    点击菜单栏的 项目 -> 构建发布，打开构建发布面板 ，设置如下 
		![image](http://local.gitlab:8989/cocos-frontend/jianghu_app/blob/master/ReadMeTexture/install6.png) 
		
		设置好后关闭窗口
		
#  4.下载git项目	

#  构建发布

   打开git项目中tools文件，鼠标右键记事本打开build.bat文件，
   ![image](http://local.gitlab:8989/cocos-frontend/jianghu_app/blob/master/ReadMeTexture/set1.png) 
   
   替换文件中 "地址1" 为 git项目存放目录,  "地址2" 为cocoscreator安装目录
  
   修改保存并关闭
   
   鼠标右键记事本打开 compile.bat文件，
   ![image](http://local.gitlab:8989/cocos-frontend/jianghu_app/blob/master/ReadMeTexture/set2.png) 
   
   替换文件中 "地址2" 为cocoscreator安装目录
   
   修改保存并关闭
   
   双击运行build.bat文件, 程序自动运行到关闭后，再双击运行compile.bat文件，待自动关闭后，
   
   apk文件在git项目\build\jsb-link\simulator\android目录中提取,
   

### 注意事项。

	一定要注意 执行build.bat ,compile.bat的先后顺序，执行过程中勿手动操作。
	
	
	
	
	
	
	
	
	
	

