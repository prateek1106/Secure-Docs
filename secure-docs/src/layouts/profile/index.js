import { useContext } from "react";

import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";


// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DefaultProjectCard from "examples/Cards/DefaultProjectCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import MasterCard from "examples/Cards/MasterCard";

import { InitContext } from "context/init";


function Overview() {


  const { profile, account } = useContext(InitContext);

  let NewArray = null;

  if (profile !== null) {
    console.log(profile);
    NewArray = profile.map((hash, i) => (
      (hash[1] === account) &&
      (<Grid item mb={5} xs={12} sm={6} lg={4} xl={3} key={i}>
        <DefaultProjectCard
          image={`https://ipfs.io/ipfs/${hash[0]}`}
          label="project #1"
          title={hash[2]}
          description="Lorem ipsum dolor sit amet, consectetur aiis."
          key={hash[0]}
          action={[{
            route: `/image/${hash[0]}`,
            color: "info",
            label: "view",
          }]}
          authors={[
            { image: "https://bit.ly/3KxVWll", name: hash[1] }
          ]}
        />
      </Grid>)
    )
    );
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>
        <Divider />
        <MDBox mt={5} mb={3}>
          <MasterCard
            number={account}
            holder="Akash Sharma"
            expires=""
          />
        </MDBox>
        <Divider />
        <MDBox pt={2} px={2} lineHeight={1.25}>
          <MDTypography variant="h6" fontWeight="medium">
            My Uploads
          </MDTypography>
        </MDBox>
        <MDBox p={2}>
          <Grid container spacing={6}>
            {NewArray}
          </Grid>
        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
