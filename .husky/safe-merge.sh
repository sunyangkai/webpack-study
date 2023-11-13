#!/bin/sh

# 获取目标分支名称
target_branch=$1

# 获取当前分支名称
current_branch=$(git rev-parse --abbrev-ref HEAD)
# 检查是否允许合并
if [[ $current_branch == f-* ]] && [[ $target_branch == bg-* ]]; then
    echo "不允许将以 'bg-' 开头的分支合并到以 'f-' 开头的分支"
    exit 1
fi

# 如果检查通过，则执行合并
git merge "$target_branch"
