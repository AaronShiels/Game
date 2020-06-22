import { HubConnectionBuilder, LogLevel } from "@microsoft/signalR";

interface API {
    connect(onPing: (from: string) => void): Promise<boolean>;
    ping(from: string): Promise<void>;
}

const hubConnection = new HubConnectionBuilder()
    .withUrl("/api/game")
    .configureLogging(LogLevel.Information)
    .build();

const connect = async (onPing: (from: string) => void): Promise<boolean> => {
    if (hubConnection.state !== "Disconnected")
        return true;

    try {
        console.log("Connecting...")
        await hubConnection.start();

        hubConnection.on("ping", (from) => {
            console.log(`Ping received from '${from}'.`);
            onPing(from);
        });

        console.log("Connection started.");
        return true;
    } catch (err) {
        if (err instanceof Error)
            console.log(err.message);
        else
            console.log(err);

        return false;
    }
};

const ping = async (from: string): Promise<void> => {
    await hubConnection.send("ping", from)
    console.log(`Ping sent from '${from}'.`);
};

const api: API = {
    connect,
    ping
}

export default api;