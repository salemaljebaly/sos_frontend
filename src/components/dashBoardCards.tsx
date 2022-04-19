import { Box } from '@mui/system'
import Strings from '../utils/Strings'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import DashBordCardItem from './dashBoardCardItem'
import FileCopyIcon from '@mui/icons-material/FileCopy';

import { red } from '@mui/material/colors';

const DashBoardCards = () => {
  return (
    <Box 
        sx={{
            display: 'flex',
            justifyContent: 'space-between'
        }}
    >
        
        <DashBordCardItem 
        count={50} 
        title={Strings.userCounts} 
        icon={<AdminPanelSettingsIcon sx={{fontSize: 34, alignContent: 'center', color: red[500]}}/>} />

        <DashBordCardItem 
        count={50} 
        title={Strings.citizenCount} 
        icon={<PeopleAltIcon sx={{fontSize: 34, alignContent: 'center', color: red[500]}}/>} />

        <DashBordCardItem 
        count={124} 
        title={Strings.reportCount} 
        icon={<FileCopyIcon sx={{fontSize: 34, alignContent: 'center', color: red[500]}}/>} />
    </Box>
  );
}

export default DashBoardCards;