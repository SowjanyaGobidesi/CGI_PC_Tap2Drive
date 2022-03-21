#!/bin/sh

export LC_ALL=C # must use consistent collation order

# usage: scriptname -T tempDir -W workDir
error()
{
  for arg in "$@"; do
    echo Directory $arg does not exist
  done
  echo !Error: Please specify temporary and working directories.
  echo usage: scriptname -T tempDir -W workDir
  echo Exiting.
  exit 1
}

while [ $# -gt 1 ]; do
arg="$1"
case $arg in
  -T)
  tempDir="$2"
  shift
  ;;
  -W)
  workDir="$2"
  shift
  ;;
  *)
       # ignore unknown options
  ;;
  esac
  shift
done

if [ ! $tempDir -o ! $workDir ]; then
  error
fi

if [ ! -d "$tempDir" -o ! -d "$workDir" ]; then
  error $tempDir $workDir
fi

# NOTE: if XML output changes (e.g. because query is modified) these columns may change
urnField=7,8
sliceDateField=5,6r
termNumberField=9,10rn

sort -T $tempDir --stable --key=$urnField --key=$sliceDateField --key=$termNumberField "--field-separator=>" | \
sort -T $tempDir --unique --key=$urnField                                              "--field-separator=>"