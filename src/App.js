import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut } from "firebase/auth";
import './App.css';
import initializeAuthentication from './Firebase/Firebase.init';
import {useState} from 'react';

initializeAuthentication();
const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();

function App() {
const [user, setUser] = useState({});
const auth = getAuth();

  const handleGoogleSignIn = () => {
signInWithPopup(auth, googleProvider)
  .then(result =>{
    const {displayName, email, photoURL} = result.user;
  
  const loggedUser = {
    name: displayName,
    email: email,
    photo: photoURL,
  }
  setUser(loggedUser);
})
.catch(error =>{
  console.log(error.message);
})
}

const handeGitHubSignIn = () => {
  signInWithPopup (auth, gitHubProvider)
  .then(result =>{
    console.log(result.user);
    const {displayName, photoURL, email} = result.user;
    const loggedUser = {
      name: displayName,
      photo: photoURL,
      email: email
    }
    setUser(loggedUser);
  })
}

const handleSignOut =() => {
  signOut(auth)
  .then(() => {
    setUser({});
  })
}
  return (
    <div className="App">

      {!user.name ?
      <div>
      <button onClick={handleGoogleSignIn}>Google Login</button>
      <button onClick={handeGitHubSignIn}>GitHub Login</button>
      </div> :
      <button onClick={handleSignOut}>Sign Out</button> 
      }
      <br/>
      {
        user.name && <div>
          <h2>Welcome {user.name}</h2>
          <h3>Email {user.email}</h3>
          <img src= {user.photo} alt="" />
        </div>
      }
    </div>

  );
  }


export default App;
