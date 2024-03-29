import { createContext, useState } from "react";
// import { useStateWithCallbackLazy } from 'use-state-with-callback';

export const InitContext = createContext();

export const InitProvider = (props) => {
    const [ipfsHashes, setIpfsHashes] = useState([]);
    const [shared, setShared] = useState([]);
    const [account, setAccount] = useState(null);
    const[profile, setProfile] = useState(null);
    const [simpleStorageInstance, setSimpleStorageInstance] = useState(null);

    return (
        <InitContext.Provider value={{ ipfsHashes, setIpfsHashes, account, setAccount, shared, setShared, profile, setProfile, simpleStorageInstance, setSimpleStorageInstance}}>
            {props.children}
        </InitContext.Provider>
    );
};

export default InitContext;