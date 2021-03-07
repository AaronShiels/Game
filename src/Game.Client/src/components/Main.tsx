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
        <section className="section">
            <div className="container">
                <div className="columns">
                    <div className="column left">
                        <h1 className="title is-1">Goon Sack Games</h1>
                        <p className="description">Sickest dicks on the internet</p>
                    </div>
                    <div className="column right has-text-centered">
                        <h1 className="title is-4">Play now</h1>
                        <form>
                            <div className="field">
                                <div className="control">
                                    <input className="input is-large" type="text" placeholder="Name" value={name} onChange={handleNameChange} />
                                </div>
                            </div>
                            <div className="field">
                                <button className="button is-block is-primary is-fullwidth is-large">Join Game</button>
                            </div>
                            <div className="field">
                                <button className="button is-block is-light is-fullwidth is-large">Create Game</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div>
                <p>Connected: {connected ? "true" : "false"}</p>
                <p>Pings: {JSON.stringify(pings)}</p>
                <button onClick={sendPing}>
                    Click to test
                </button>
            </div>
        </section>
    );
};

export default component;