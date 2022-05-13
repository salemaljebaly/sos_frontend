import { Box } from '@mui/system'
import Strings from '../utils/Strings'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import DashBordCardItem from './dashBoardCardItem'
import FileCopyIcon from '@mui/icons-material/FileCopy';

import { red } from '@mui/material/colors';
import { Grid } from '@mui/material';
import { countAll as countCitizens } from '../features/citizens/citizensSlice';
import { countAll as countUsers } from '../features/users/userSlice';
import { countAll as countReports } from '../features/reports/reportSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const DashBoardCards = () => {
  const dispatch = useDispatch();
  let countCitizen : number = 0;
  let countUser : number = 0;
  let countReport : number = 0;
   useSelector(
    (state: any) => {
      countCitizen = state.citizen.count;
      countUser = state.users.count;
      countReport = state.report.count;
    }
  );

  useEffect(()=> {
    console.log(countCitizen)
    dispatch(countCitizens())
    dispatch(countUsers())
    dispatch(countReports())
  }, [dispatch]);

  return (
    <Grid  
    justifyContent="space-between"
    container spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}
    sx={{
      marginBottom : 2
    }}
    >
        
        <DashBordCardItem 
        key={1}
        count={countUser} 
        title={Strings.userCounts} 
        icon={<AdminPanelSettingsIcon sx={{fontSize: 34, alignContent: 'center', color: red[500]}}/>} />

        <DashBordCardItem 
        key={2}
        count={countCitizen} 
        title={Strings.citizenCount} 
        icon={<PeopleAltIcon sx={{fontSize: 34, alignContent: 'center', color: red[500]}}/>} />

        <DashBordCardItem 
        
        key={3}
        count={countReport} 
        title={Strings.reportCount} 
        icon={<FileCopyIcon sx={{fontSize: 34, alignContent: 'center', color: red[500]}}/>} />
    </Grid>
  );
}

export default DashBoardCards;