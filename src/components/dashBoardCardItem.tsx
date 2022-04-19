import { Box } from "@mui/material";
import * as React from "react";

interface Props{
  title: String;
  count:number;
  icon: JSX.Element;
}
const DashBordCardItem: React.FC<Props> = (props) => {
  const {title, count, icon} = props;
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        boxShadow: 1,
        borderRadius: 2,
        p: 2,
        minWidth: 400,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: "space-between",
      }}
    >
      <Box>
        <Box sx={{ color: "text.secondary" ,}}>{title}</Box>
        <Box sx={{ color: "text.primary", fontSize: 34, fontWeight: "bold" }}>
          {count}
        </Box>
      </Box>
      <Box sx={{display: 'flex', justifyContent:'center', alignItems: 'center'}}>
              {icon}
      </Box>
    </Box>
  );
}

export default DashBordCardItem;