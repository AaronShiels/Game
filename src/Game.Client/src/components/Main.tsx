import * as React from "react";
import { useState, FC, useEffect, ChangeEvent } from "react";
import api from "../services/api";

interface TestProps { }

const component: FC<TestProps> = props => {
    const [connected, setConnected] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [pings, setPings] = useState<Record<string, number>>({});
    useEffect(() => { connect(); });

    const connect = async () => {
        const connected = await api.connect(handlePing);
        setConnected(connected);
    }

    const sendPing = () => api.ping(name);

    const handlePing = (from: string): void => setPings(p => {
        const pingsFromUser = p[from] || 0;
        return { ...p, [from]: pingsFromUser + 1 };
    });

    const handleNameChange = (ev: ChangeEvent<HTMLInputElement>) => setName(ev.target.value);

    return (
        <div>
            <input type="text" name="name" placeholder="Name" value={name} onChange={handleNameChange} />
            <p>Connected: {connected ? "true" : "false"}</p>
            <p>Pings: {JSON.stringify(pings)}</p>
            <button onClick={sendPing}>
                Click to test
            </button>
        </div>);
};

export default component;