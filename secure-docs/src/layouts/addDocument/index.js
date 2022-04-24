import Grid from "@mui/material/Grid";

import MDBox from "components/MDBox";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import InputForm from "layouts/addDocument/components/InputForm";
import Transactions from "layouts/addDocument/components/Transactions";

function AddDocument() {
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox mt={10}>
                <MDBox mb={3}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8}>
                            <InputForm />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Transactions />
                        </Grid>
                    </Grid>
                </MDBox>
            </MDBox>
            <Footer />
        </DashboardLayout>
    );
}

export default AddDocument;
