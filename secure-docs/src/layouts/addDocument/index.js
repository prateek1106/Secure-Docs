import React from 'react';
import Grid from "@mui/material/Grid";

import MDBox from "components/MDBox";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import InputForm from "layouts/addDocument/components/InputForm";
import Transactions from "layouts/addDocument/components/Transactions";

import Procedure from "layouts/addDocument/components/Procedure";

function AddDocument() {

    const [num, setNum] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    
    const handleClose = () => setOpen(false);

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox mt={10}>
                <MDBox mb={3}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8}>
                            <InputForm setOpen={setOpen} setNum={setNum} />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Transactions />
                        </Grid>
                    </Grid>
                </MDBox>
            </MDBox>
            {open && <Procedure open={open} num={num} handleClose={handleClose} />}
            <Footer />
        </DashboardLayout>
    );
}

export default AddDocument;
