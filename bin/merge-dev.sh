#!/usr/bin/env bash

OLD_BRANCH=$(git symbolic-ref --short -q HEAD)
DEPLOY_BRANCH=dev

echo "Merge ${OLD_BRANCH} >>> ${DEPLOY_BRANCH}"

git checkout ${DEPLOY_BRANCH}
git pull
git merge ${OLD_BRANCH}
git push -u origin ${DEPLOY_BRANCH}

git checkout ${OLD_BRANCH}

