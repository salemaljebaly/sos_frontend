import { useEffect } from 'react';
import './App.css';




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
      testsdfsf
    </div>
  );
}

export default App;
