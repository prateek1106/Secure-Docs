import React, { useContext } from 'react';
import Grid from "@mui/material/Grid";

import MDBox from "components/MDBox";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import SimpleBlogCard from 'examples/Cards/SimpleBlogCard';

import team2 from "assets/images/team-2.jpg";

import { InitContext } from "context/init";


function Dashboard() {

  const { ipfsHashes } = useContext(InitContext);

  let CardArray = null;

  if (ipfsHashes !== null) {
    // console.log(ipfsHashes);
    CardArray = ipfsHashes.slice(0).reverse().map((hash, i) =>
      <Grid item mb={5} xs={12} sm={6} lg={4} xl={3} key={i}>
        <SimpleBlogCard
          image={`https://ipfs.io/ipfs/${hash[0]}`}
          title="Card title"
          description="Lorem ipsum dolor sit amet, consectetur aiis."
          route="#"
          author={{ media: team2, name: "Akash Sharma" }}
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
            {CardArray}
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout >
  );
}

export default Dashboard;
