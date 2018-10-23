#!/bin/sh

projectRootPath=$1

cd $projectRootPath
echo $projectRootPath
v=$(npm run build)

echo "OK"