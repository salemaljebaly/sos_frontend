import { Box, Grid } from "@mui/material";
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
        borderRadius: 1,
        width : '31%',
        p: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: "space-between",
      }}
    >
      
      <Box gap={2}>
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