import { Checkbox, TextField } from '@mui/material';
import { useEffect } from 'react';
import MiniDrawer from './components/drawer2';




function App() {
  useEffect(()=>{
    fetch(
      "http://localhost:3000/about")
                  .then((res) => res.json())
                  .then((json) => {
                    console.log(json);
                  })
  },[]);
  
  return (
    <div className="App">
      <MiniDrawer />
    </div>
  );
}

export default App;
