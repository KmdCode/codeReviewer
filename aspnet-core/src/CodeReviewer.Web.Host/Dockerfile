FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src
COPY ["src/CodeReviewer.Web.Host/CodeReviewer.Web.Host.csproj", "src/CodeReviewer.Web.Host/"]
COPY ["src/CodeReviewer.Web.Core/CodeReviewer.Web.Core.csproj", "src/CodeReviewer.Web.Core/"]
COPY ["src/CodeReviewer.Application/CodeReviewer.Application.csproj", "src/CodeReviewer.Application/"]
COPY ["src/CodeReviewer.Core/CodeReviewer.Core.csproj", "src/CodeReviewer.Core/"]
COPY ["src/CodeReviewer.EntityFrameworkCore/CodeReviewer.EntityFrameworkCore.csproj", "src/CodeReviewer.EntityFrameworkCore/"]
WORKDIR "/src/src/CodeReviewer.Web.Host"
RUN dotnet restore 

WORKDIR /src
COPY ["src/CodeReviewer.Web.Host", "src/CodeReviewer.Web.Host"]
COPY ["src/CodeReviewer.Web.Core", "src/CodeReviewer.Web.Core"]
COPY ["src/CodeReviewer.Application", "src/CodeReviewer.Application"]
COPY ["src/CodeReviewer.Core", "src/CodeReviewer.Core"]
COPY ["src/CodeReviewer.EntityFrameworkCore", "src/CodeReviewer.EntityFrameworkCore"]
WORKDIR "/src/src/CodeReviewer.Web.Host"
RUN dotnet publish -c Release -o /publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:8.0
EXPOSE 80
WORKDIR /app
COPY --from=build /publish .
ENTRYPOINT ["dotnet", "CodeReviewer.Web.Host.dll"]
