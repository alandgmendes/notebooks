import logo from './logo.svg';
import './App.css';
import {useState, useEffect } from 'react';



function App() {
  const [repos, setRepos] = useState();
  const [arrayRep, setArrayRep] = useState([]);

  const getGitHub = async() =>{
    
        let url = "https://api.github.com/users/alandgmendes/repos";
        return new Promise(resolve =>

            fetch(url, {
                method: 'GET',
                body: JSON.stringify(),
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
            }).then(function (response) {

                if (!response.ok) {
                    return false                    
                }
                if (response.ok) {
                  let answer = response.json();
                  return answer;
                }

            }).then(resolve)
                .catch(function (error) {
                    console.error('Error in github API.', error);
                })
        );
    }
    
    
 const repoFunc = async() =>{
   let result  = await getGitHub();
    if(result){
      let repos = result.map(repo => <div key={repo.id}><a href={repo.html_url}><p>{repo.name}</p></a></div>);
      setArrayRep(repos);
    }
 }
 useEffect(() => {
  repoFunc();
}, []);
 
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>
          My repos:
        </h1>
        <div>
          {arrayRep}
        </div>
      </header>
    </div>
  );
}

export default App;
