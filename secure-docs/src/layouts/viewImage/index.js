import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import { TextField } from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import DefaultProjectCard from "examples/Cards/DefaultProjectCard";
import ShareIcon from '@mui/icons-material/Share';
// Data
import authorsTableData from "layouts/viewImage/data/authorsTableData";
import User from "layouts/viewImage/data/User";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

import { InitContext } from "context/init";

function ViewImage() {
  const { columns } = authorsTableData();


  const [senderAccount, setSenderAccount] = useState('');
  const [rows, setRows] = useState([]);

  const handleSendChange = event => {
    setSenderAccount(event.target.value);
  };

  const { simpleStorageInstance, profile, account } = useContext(InitContext);

  const { hash } = useParams();

  let title = null;
  let owner = null;

  if (profile != null) {
    profile.forEach(function (val) {
      if (val[0] === hash) {
        owner = val[1];
        title = val[2];
      }
    });
  }

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

  useEffect(() => {
    if (simpleStorageInstance != null) {
      simpleStorageInstance.getImageAccess.call(hash, { from: account })
        .then((result) => {
          // console.log('List of Accounts which have access: ');
          // console.log(result);
          const accounts = convertToStringHashes(result);
          console.log(accounts);
          let newRows = [];
          accounts.forEach((account) => {
            newRows.push({
              user: <User image={team2} name={account} email="Akash Sharma" />,
              date: (
                <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                  02/06/22
                </MDTypography>
              ),
              action: (
                <MDButton variant="text" color="info" size="small" onClick={() => removeImageAccess(account)}>Remove</MDButton>
              ),
            });
          });
          setRows(newRows);
        });
    }
  }, [simpleStorageInstance]);

  //Function to handle 'Sharing Access of Image'
  const sendDocument = (event) => {
    event.preventDefault();

    const ascii_hash = convertToAsciiHash(hash);
    const account_hash = convertToAsciiHash(senderAccount);
    console.log(ascii_hash);

    simpleStorageInstance.shareAccess(senderAccount, ascii_hash, hash, account_hash, { from: account })
      .then((r) => {
        console.log('Success in sharing image');
      }).catch((e) => {
        console.log("error", e);
      });
  };

  const removeImageAccess = (senderAccount) => {
    console.log(senderAccount);

    const ascii_hash = convertToAsciiHash(hash);
    const account_hash = convertToAsciiHash(senderAccount);

    simpleStorageInstance.removeAccess(senderAccount, ascii_hash, hash, account_hash, { from: account })
      .then((r) => {
        console.log('Success in removing image access');
      }).catch((e) => {
        console.log("error", e);
      });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar isMini />
      <MDBox pt={6} pb={3} mb={5}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <DefaultProjectCard
              image={`https://ipfs.io/ipfs/${hash}`}
              label="project #1"
              title={title}
              description="Uploaded using SecureDocs"
              action={[{
                route: `https://rinkeby.etherscan.io/address/${account}`,
                color: "info",
                label: "etherscan",
                type: "external"
              }, {
                route: "/accessibility",
                color: "success",
                label: "Accessibility",
              }]}
              authors={[
                { image: "https://bit.ly/3KxVWll", name: owner }
              ]}
            />
          </Grid>
          {(account != null && owner != null && account === owner) &&
            <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={2}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h6" color="white">
                    Sharing Details
                  </MDTypography>
                </MDBox>
                <MDBox p={3}>
                  <form onSubmit={sendDocument}>
                    <MDBox sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                      <MDBox sx={{ width: '60%' }}>
                        <ShareIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField id="input-with-sx" name='senderAccount' value={senderAccount} label="Share Document" variant="standard" helperText="Please enter username" sx={{ width: '100%' }} onChange={handleSendChange} />
                      </MDBox>
                      <MDBox sx={{ display: 'flex', justifyContent: 'center' }} >
                        <MDButton variant='outlined' size='small' color='success' type="submit">Submit</MDButton>
                      </MDBox>
                    </MDBox>
                  </form>
                </MDBox>
                <MDBox pt={3}>
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                </MDBox>
              </Card>
            </Grid>}
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ViewImage;
