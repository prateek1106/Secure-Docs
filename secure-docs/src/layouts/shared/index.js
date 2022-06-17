import { useContext, useEffect } from 'react';
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import SimpleBlogCard from 'examples/Cards/SimpleBlogCard';


// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import team2 from "assets/images/team-2.jpg";

import { InitContext } from "context/init";

function Shared() {

  const { shared } = useContext(InitContext);

  let SharedCardArray = null;

  // useEffect(() => {
  //   console.log(shared);
  // }, [shared]);

  if (shared !== null) {
    // console.log(ipfsHashes);
    SharedCardArray = shared.slice(0).reverse().map((hash, i) =>
      <Grid item mb={5} xs={12} sm={6} lg={4} xl={3} key={i}>
        <SimpleBlogCard
          image={`https://ipfs.io/ipfs/${hash[0]}`}
          title={hash[2]}
          description=""
          route={`/image/${hash[0]}`}
          author={{ media: team2, name: hash[1] }}
          hash={hash}
        />
      </Grid>
    );
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox MDBox py={3} mt={4.5} >
          <Grid container spacing={3}>
            {SharedCardArray}
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Shared;
