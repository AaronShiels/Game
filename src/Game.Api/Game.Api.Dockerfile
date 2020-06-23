# https://docs.docker.com/engine/examples/dotnetcore/
FROM mcr.microsoft.com/dotnet/core/sdk AS build

COPY . ./
RUN dotnet publish -c Release -o publish

FROM mcr.microsoft.com/dotnet/core/aspnet
COPY --from=build /publish .
ENV ASPNETCORE_ENVIRONMENT=Production
ENTRYPOINT ["dotnet", "Game.Api.dll"]