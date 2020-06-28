# https://docs.docker.com/engine/examples/dotnetcore/
FROM mcr.microsoft.com/dotnet/core/sdk AS build
WORKDIR /app

COPY . ./
RUN dotnet publish -c Release -o publish

FROM mcr.microsoft.com/dotnet/core/aspnet
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "Game.Api.dll"]