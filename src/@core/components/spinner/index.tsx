// ** MUI Imports
import { styled, useTheme } from "@mui/material/styles";
import Box, { BoxProps } from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const FallbackSpinner = ({ sx }: { sx?: BoxProps["sx"] }) => {
  // ** Hook
  const theme = useTheme();

  // ** Styled Components
const Logo = styled("img")(({ theme }) => ({
  zIndex: 1,
  maxHeight: "10%",
  maxWidth: "10%",
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down(1540)]: {
    maxHeight: 550,
  },
  [theme.breakpoints.down("lg")]: {
    maxHeight: 500,
  },
}));


  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        ...sx,
      }}
    >
       <Logo
                  alt="login-illustration"
                  src={`/images/pages/logo.svg`}
                />
      <CircularProgress disableShrink sx={{ mt: 6 }} />
    </Box>
  );
};

export default FallbackSpinner;
