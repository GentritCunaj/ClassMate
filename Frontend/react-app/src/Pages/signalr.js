import * as signalR from "@microsoft/signalr";

export function createConnection(groupId) {
    const connection = new signalR.HubConnectionBuilder()
        .withUrl(`https://localhost:7168/chathub?groupId=${groupId}`, {
            withCredentials: false,
            skipNegotiation: true,
            transport: signalR.HttpTransportType.WebSockets,
            
            accessTokenFactory: () => `${localStorage.getItem("token")}`
        })
        .configureLogging(signalR.LogLevel.Information)
        .build();
    return connection;
}