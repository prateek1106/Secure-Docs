import React, { useContext } from 'react';

import MDBox from "components/MDBox";
import Box from '@mui/material/Box';
import MDInput from "components/MDInput";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import Switch from "@mui/material/Switch";

import ipfs from 'utils/ipfs';
import Dropbox from "layouts/addDocument/components/Dropbox";
import { InitContext } from "context/init";

const InputForm = () => {


    const [title, setTitle] = React.useState("");
    const [files, setFiles] = React.useState([]);
    const [accessibility, setAccessibility] = React.useState(false);
    const [buffer, setBuffer] = React.useState(null);

    const { account, simpleStorageInstance } = useContext(InitContext);

    // React.useEffect(() => {
    //     console.log(simpleStorageInstance);
    // }, [simpleStorageInstance]);

    const handleChange = (event) => {
        setTitle(event.target.value);
    };


    //Helper Function
    //Takes String as Input and return [BigInt] as Output
    const convertToAsciiHash = (hash) => {
        let str = hash;
        let ascii_hash = [];
        for (var i = 0; i < str.length; i++) {
            ascii_hash.push(str.charAt(i).charCodeAt(0));
        }
        return ascii_hash;
    };


    const onSubmit = (event) => {
        event.preventDefault();

        console.log('submit');
        // Sending buffer to IPFS and getting result hash
        ipfs.files.add(buffer, (error, result) => {
            if (error) {
                console.error(error);
                return;
            }

            const ascii_hash = convertToAsciiHash(result[0].hash);

            console.log("ASCII Hash ", ascii_hash);

            console.log("simpleStorageInstance", simpleStorageInstance);

            if (accessibility) {
                //Upload To Public 
                simpleStorageInstance.uploadToPublic(ascii_hash, result[0].hash, account,
                    { from: account }).then((r) => {
                        console.log('Successfully Uploaded to Public');
                    });
            }
            else {
                //Upload To Private
                simpleStorageInstance.uploadToPrivate(ascii_hash, result[0].hash, account,
                    { from: account }).then((r) => {
                        console.log('Successfully Uploaded to Private');
                    });
            }
        });
    };


    return (
        <Card sx={{ height: "100%" }}>
            <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={2}>
                <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                    Upload Form
                </MDTypography>
            </MDBox>
            <MDBox display="flex" flexDirection="column" sx={{ height: "100%" }} pt={3} px={2}>
                <Box component="form" autoComplete="off" onSubmit={onSubmit}>
                    <MDBox mt={1}>
                        <MDInput type="text" label="Enter Title for Document" value={title} onChange={handleChange} required sx={{ width: "100%" }} />
                    </MDBox>
                    <MDBox display="flex" alignItems="center" mt={3}>
                        <MDBox ml={0.5}>
                            <MDTypography variant="button" fontWeight="medium" color="primary">
                                Accessibility
                            </MDTypography>
                        </MDBox>
                        <MDBox ml={5}>
                            <MDTypography variant="button" fontWeight="regular" color="text">
                                Private
                            </MDTypography>
                        </MDBox>
                        <MDBox mt={0.5}>
                            <Switch checked={accessibility} onChange={() => setAccessibility(!accessibility)} />
                        </MDBox>
                        <MDBox ml={0.5}>
                            <MDTypography variant="button" fontWeight="regular" color="text">
                                Public
                            </MDTypography>
                        </MDBox>
                    </MDBox>
                    <MDBox mt={3}>
                        <Dropbox setFiles={setFiles} setBuffer={setBuffer} on />
                    </MDBox>

                    <MDBox mt={4} display="flex" alignItems="center" justifyContent="center">
                        <MDButton variant="gradient" color="info" size="large" type="submit">
                            <Icon>file_upload</Icon>&nbsp;
                            Upload
                        </MDButton>
                    </MDBox>
                </Box>
            </MDBox>
        </Card >
    )
}

export default InputForm