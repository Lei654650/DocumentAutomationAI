@echo off
setlocal EnableExtensions
set "ROOT=%~dp0"
cd /d "%ROOT%"
title Document Automation AI V9.1 AI Translation Launcher
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%ROOT%Start_All.ps1"
exit /b %errorlevel%
