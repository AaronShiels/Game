import * as React from "react";
import { useState } from "react";

interface TestProps { }

const component = (props: TestProps) => {
    const [pings, setPing] = useState(0);

    return (
        <div>
            <p>Pings: {pings}</p>
            <button onClick={() => setPing(pings + 1)}>
                Click to test
            </button>
        </div>);
};

export default component;