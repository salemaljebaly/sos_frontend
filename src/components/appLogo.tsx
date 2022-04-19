
import { Box } from "@mui/material";

// Props interface
// with username set to string
interface Props {
  imageSize: number;
}

const AppLogo : React.FC<Props> = (props) => {
  const { imageSize } = props;
  return (
    <Box
      sx={{
          margin:2,
        textAlign: "center",
      }}
    >
      <Box
        component="img"
        src="/images/icons/sos_logo.svg"
        alt="Picture of the author"
        width={imageSize}
        height={imageSize}
        sx={{
          maxWidth: '100%'
      }}
      />
    </Box>
  );
};

export default AppLogo;
