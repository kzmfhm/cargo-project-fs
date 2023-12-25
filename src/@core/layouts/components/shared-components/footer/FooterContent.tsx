// ** MUI Imports
import Box from "@mui/material/Box";
import MuiLink from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const FooterContent = () => {

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography sx={{ mr: 2 }}>
        {`© ${new Date().getFullYear()}, Made with `}
        <Box component="span" sx={{ color: "error.main" }}>
          ❤️
        </Box>
        {` by `}
        <MuiLink target="_blank" href="https://maalbardaar.com/">
          Maalbardaar
        </MuiLink>
      </Typography>
      
    </Box>
  );
};

export default FooterContent;
