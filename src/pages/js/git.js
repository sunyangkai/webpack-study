

/*
   工作区   
    本地项目存放文件的位置
    可以理解成图上的workspace

   暂存区 (Index/Stage)
     顾名思义就是暂时存放文件的地方，通过是通过add命令将工作区的文件添加到缓冲区

   本地仓库（Repository
    通常情况下，我们使用commit命令可以将暂存区的文件添加到本地仓库
    通常而言，HEAD指针指向的就是master分支

   远程仓库（Remote）
    举个例子，当我们使用GitHub托管我们项目时，它就是一个远程仓库。
    通常我们使用clone命令将远程仓库代码拷贝下来，本地代码更新后，通过push托送给远程仓库


    git pull
    git fetch   更新远段分支并合并到本地 等于 git pull + git merge
    git add  提交到暂存区
    git commit 提交到本地分支
    git merge  合并分支 完整提交历史
    git rebase 基于某个分支变基，创造线性提交历史
    git checkout
        git checkout branch-name 切换分支
        git checkout -b new-branch-name 切换并创建分支
        git checkout commit-hash -- path/to/file1 path/to/file2 path/to/file3 将多个文件恢复到指定的提交节点

    git reset  将分支指针移动到指定的提交 --soft 会将更改留存在暂存区 --mixed 会将更改留存在工作区 --hard 重置暂存区和工作目录  
                禁止在公共分支上这样干
    git revert 用于创建一个新的提交，这个提交会撤销一个或多个之前的提交中所做的更改。这是在不重写提交历史的情况下撤销更改的方法。
                推荐在公共分支上这样做
                对于：A - B - C - D - E
                撤销 C到E的所有提交  git revert C^..E   变为 A - B - C - D - E - E' - D' - C'
                产生冲突后，解决冲突。然后git revert --continue 继续
                放弃操作 git revert --abort
    git stash 缓存工作区内容
    git pop 放出缓存区内容到工作区


    git log 提交日志
    git status

    git config
        git config --global user.name "your name"
        git config --global user.email "youremail@github.com"

    git branch 查看本地分支
        git branch -r 查看远程分支
        git branch -a 查看本地和远程分支
    
    git checkout <branch-name> 从当前分支，切换到其他分支

    git checkout -b <branch-name> 创建并切换到新建分支

    git branch -d <branch-name> 删除分支

    git merge <branch-name> 当前分支与指定分支合并

    git branch --merged 查看哪些分支已经合并到当前分支

    git push origin -d <branch-name> 删除远程分支

    git checkout -b 本地分支名x origin/远程分支名x 拉取远程分支并创建本地分支



    https://juejin.cn/post/6869519303864123399?searchId=2023110915024582CD0340DBCA055E2F09



*/