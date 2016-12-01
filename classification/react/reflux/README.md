
## git获取更新

git clone ...

## 切换跟踪 gh-pages 分支，并获取数据

git checkout -b gh-pages origin/gh-pages

git fetch origin gh-pages

## 本地远程分支合并到本地分支
git merge origin/gh-pages

## browser-sync浏览器自动刷新
npm install --save-dev browser-sync

## gulp-ruby-sass——sass预编译
<p>1、windows 安装 ruby<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
下载地址：http://rubyinstaller.org/downloads/</p>
<p>2、配置环境变量<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
path 添加安装ruby安装目录/bin<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
PATHEXT 添加 .RB 和 .RBW
</p>
<p>3、安装sass<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
gem install sass
</p>
<p>4、sass 浏览器调试<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
npm install --save-dev gulp-sourcemaps
</p>
<p>5、gulpfile.js 中配置 gulp-ruby-sass<br></p>