import PropTypes from "prop-types";

import Card from "@mui/material/Card";

import Tooltip from "@mui/material/Tooltip";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDAvatar from "components/MDAvatar";

function SimpleBlogCard({ image, title, description, route, author, hash, action }) {

  return (
    <Card>
      <MDBox position="relative" borderRadius="lg" mt={-3} mx={2} height="180px">
        <MDBox
          component="img"
          src={image}
          alt={title}
          borderRadius="lg"
          shadow="md"
          width="100%"
          height="100%"
          position="relative"
          zIndex={1}
        />
        <MDBox
          borderRadius="lg"
          shadow="md"
          width="100%"
          height="100%"
          position="absolute"
          left={0}
          top="3%"
          sx={{
            backgroundImage: `url(${image})`,
            transform: "scale(0.94)",
            filter: "blur(12px)",
            backgroundSize: "cover",
          }}
        />
      </MDBox>
      <MDBox p={3} mb={2} lineHeight={0}>
        <MDTypography display="inline" variant="h5" textTransform="capitalize" fontWeight="bold">
          {title}
        </MDTypography>
        <MDBox mt={1} mb={3} textAlign="justify">
          <MDTypography variant="button" fontWeight="light" color="text">
            {description}
          </MDTypography>
        </MDBox>
        <MDBox display="flex" justifyContent="space-between" alignItems="center">
          <MDButton
            component="a"
            href={route}
            variant="outlined"
            size="medium"
            color="info"
          >
            View
          </MDButton>
          <MDBox display="flex">
            <Tooltip key={author.name} title={author.name} placement="bottom">
              <MDAvatar
                src={author.media}
                alt={author.name}
                size="sm"
                sx={({ borders: { borderWidth }, palette: { white } }) => ({
                  border: `${borderWidth[2]} solid ${white.main}`,
                  position: "relative",
                  ml: -1.25,
                  "&:hover, &:focus": {
                    zIndex: "10",
                  },
                })}
              />
            </Tooltip>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

SimpleBlogCard.defaultProps = {
  authors: [],
};

SimpleBlogCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  author: PropTypes.shape({ 
    media: PropTypes.string.isRequired, 
    name: PropTypes.string.isRequired,
  })
};

export default SimpleBlogCard;
