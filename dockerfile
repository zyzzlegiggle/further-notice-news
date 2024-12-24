# react client
FROM node:20-alpine AS client-build
WORKDIR /app/client
COPY reactapp2.client/ ./
RUN npm install
RUN npm run build

# build server
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS server-build
WORKDIR /app
COPY ReactApp2.Server/ ./ReactApp2.Server/
COPY --from=client-build /app/client/dist ./ReactApp2.Server/wwwroot
RUN dotnet publish ReactApp2.Server/ReactApp2.Server.csproj -c Release -o out

# runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=server-build /app/out ./
ENTRYPOINT ["dotnet", "ReactApp2.Server.dll"]