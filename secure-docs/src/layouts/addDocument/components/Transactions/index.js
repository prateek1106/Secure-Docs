import Card from "@mui/material/Card";
// import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import MDButton from "components/MDButton";

// Billing page components
import Transaction from "layouts/addDocument/components/Transaction";

function Transactions() {
  return (
    <Card sx={{ height: "100%" }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Your Transaction&apos;s
        </MDTypography>
        <MDBox display="flex" alignItems="flex-start">
          <MDBox color="text" mr={0.5} lineHeight={0}>
            <Icon color="inherit" fontSize="small">
              date_range
            </Icon>
          </MDBox>
          <MDTypography variant="button" color="text" fontWeight="regular">
            June 2022 
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox pt={3} pb={2} px={2}>
        <MDBox mb={2}>
          <MDTypography variant="caption" color="text" fontWeight="bold" textTransform="uppercase">
            newest
          </MDTypography>
        </MDBox>
        <MDBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
          sx={{ listStyle: "none" }}
        >
          <Transaction
            color="error"
            icon="expand_more"
            name="CBSE Document"
            description="02 June 2022, at 12:30 AM"
            value=""
          />
          <Transaction
            color="success"
            icon="expand_less"
            name="SSC Result"
            description="01 June 2022, at 04:30 PM"
            value=""
          />
        </MDBox>
        <MDBox mt={1} mb={2}>
          <MDTypography variant="caption" color="text" fontWeight="bold" textTransform="uppercase">
            yesterday
          </MDTypography>
        </MDBox>
        <MDBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
          sx={{ listStyle: "none" }}
        >
          <Transaction
            color="success"
            icon="expand_less"
            name="GTL Form"
            description="26 March 2022, at 13:45 PM"
            value=""
          />
          <Transaction
            color="success"
            icon="expand_less"
            name="HubSpot"
            description="26 March 2022, at 12:30 PM"
            value=""
          />
          <Transaction
            color="success"
            icon="expand_less"
            name="Secure Document"
            description="26 March 202, at 08:30 AM"
            value=""
          />
          <Transaction
            color="dark"
            icon="priority_high"
            name="Webflow"
            description="12 March 2022, at 05:00 PM"
            value=""
          />
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default Transactions;
