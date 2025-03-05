@ECHO OFF
:: This file can now be deleted!
:: It was used when setting up the package solution (using https://github.com/LottePitcher/opinionated-package-starter)

:: set up git
git init
git branch -M main
git remote add origin https://github.com/WildSite Creations/WSC.UmbCare.git

:: ensure latest Umbraco templates used
dotnet new install Umbraco.Templates --force

:: use the umbraco-extension dotnet template to add the package project
cd src
dotnet new umbraco-extension -n "WSC.UmbCare" --site-domain 'https://localhost:44301' --include-example --allow-scripts Yes

:: replace package .csproj with the one from the template so has nuget info
cd WSC.UmbCare
del WSC.UmbCare.csproj
ren WSC.UmbCare_nuget.csproj WSC.UmbCare.csproj

:: add project to solution
cd..
dotnet sln add "WSC.UmbCare"

:: add reference to project from test site
dotnet add "WSC.UmbCare.TestSite/WSC.UmbCare.TestSite.csproj" reference "WSC.UmbCare/WSC.UmbCare.csproj"