#!/bin/bash

if [ $# -eq 0 ]; then
 echo "No arguments supplied"
fi

for ARG in $*; do 
mkdir "ex$ARG"
done

