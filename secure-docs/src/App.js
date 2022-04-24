import { React, useState, useContext, useEffect } from "react";

import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Sidenav from "examples/Sidenav";

import theme from "assets/theme";

import routes from "routes";

import { useMaterialUIController, setMiniSidenav } from "context";

import brand from "assets/images/logo.png";

import getWeb3 from "utils/getWeb3";

import SimpleStorageContract from 'build/contracts/SimpleStorage.json';

import { InitContext } from "context/init";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();

  const {
    miniSidenav,
    layout,
    sidenavColor
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();

  const { setIpfsHashes, setAccount, setSimpleStorageInstance } = useContext(InitContext);


  useEffect(() => {
    let web3 = null;

    getWeb3
      .then(results => {
        web3 = results.web3;
        instantiateContract(web3);
      })
      .catch(() => {
        console.log('Error finding web3.');
      });
  }, []);

  //Helper Function
  //Takes Array of [BigInt] as Input and returns Array of Strings as Output
  const convertToStringHashes = (ipfsHashList) => {
    let hashes_array = [];
    for (var j = 0; j < ipfsHashList.length; j++) {
      let latesthash = "";
      for (var i = 0; i < ipfsHashList[j].length; i++) {
        let num = ipfsHashList[j][i].c[0];
        if (num !== 0) {
          latesthash += (String.fromCharCode(num));
        }
      }
      hashes_array.push(latesthash);
    }
    return hashes_array;
  };

  const findOwner = async (instance, acc, hash) => {
    let owner;
    console.log("simpleStorageInstance", instance);
    await instance.getOwner.call(hash, { from: acc })
      .then((result) => {
        owner = result;
      });
    return owner;
  };


  const instantiateContract = (web3) => {
    // Instantiate contract once web3 provided.
    console.log("Instantiate Contract");
    const contract = require('truffle-contract');
    const simpleStorage = contract(SimpleStorageContract);
    simpleStorage.setProvider(web3.currentProvider);
    // Get accounts.
    web3.eth.getAccounts((error, accounts) => {
      simpleStorage.at('0xA384Abce590ef2AB0266A09d6086AFB8f30c9017').then((instance) => {
        // simpleStorage.at("0x3497a137e8056cB54ECa2D63d189c60E6ba3Ed72").then((instance) => {
        // simpleStorage.deployed().then((instance) => {
        // console.log("instance", instance);
        setSimpleStorageInstance(instance);
        setAccount(accounts[0]);

        //Getting the IPFS Hash String array
        console.log('Requesting for IPFS Hashes String Array:');
        console.log(instance.getIpfsHashes.call(accounts[0]));
        setHashes(instance, accounts[0]);
      });
    });
  };


  const setHashes = (instance, acc) => {
    console.log("temp", instance, acc);
    instance.getIpfsHashes.call(acc).then((ipfsHashList) => {

      const hashes = convertToStringHashes(ipfsHashList);

      let owner_list = [];
      for (var i = 0; i < hashes.length; i++) {
        let hash = hashes[i];
        findOwner(instance, acc, hash).then((r) => {
          owner_list.push([hash, r]);
          setIpfsHashes(owner_list);
        });
      }
    });
  };

  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={brand}
            brandName="Secure Document"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
        </>
      )}
      {layout === "vr"}
      <Routes>
        {getRoutes(routes)}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </ThemeProvider>
  );
}
