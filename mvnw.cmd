@echo off
setlocal
where mvn >nul 2>nul
if errorlevel 1 (
  echo Maven was not found on PATH. Install Maven 3.9+ or run mvnw from Linux/macOS. 1>&2
  exit /b 1
)
mvn %*
exit /b %errorlevel%
