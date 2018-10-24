#!/bin/sh

projectRootPath=$1

cd $projectRootPath
v=$(npm run build)
echo "OK"