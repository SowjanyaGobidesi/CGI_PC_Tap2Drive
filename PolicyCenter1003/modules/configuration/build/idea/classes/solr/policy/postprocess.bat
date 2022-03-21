@echo off
setlocal

rem change this directory path to match where coreutils is installed.
set CoreUtils=c:\cygwin

set path=%CoreUtils%\bin;%path%

goto argloop

rem usage: scriptname -T tempDir -W workDir
:error
  echo !Error: Please specify temporary and working directories.
  echo usage: scriptname -T tempDir -W workDir
  echo Exiting.& exit /b 1

:argloop
if not "%1"=="" (
  if "%1"=="-T" (
    set tempDir=%2
    shift
  )
  if "%1"=="-W" (
    set workDir=%2
    shift
  )
  shift
  goto argloop
)

if "%tempDir%"=="" goto error
if "%workDir%"=="" goto error

rem NOTE: if XML output changes (e.g. because query is modified) these columns may change
set urnField=7,8
set sliceDateField=5,6r
set termNumberField=9,10rn

sort -T %tempDir% --stable --key=%urnField% --key=%sliceDateField% --key=%termNumberField% "--field-separator=>" | ^
sort -T %tempDir% --unique --key=%urnField%                                                "--field-separator=>"