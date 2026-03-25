import logo from './logo.svg';
import './App.css';

function Login() {
  return (
    <div className="App"
    style={{
        backgroundColor: "#0021A5",
        minHeight: "100vh",
        color: "white"
      }}
    >

      

        {/*Create Account Header*/} 
        {/*//Username label + input box*/}
        <label>
        Username: <input name="username" />
        </label>
        <br />
        <br />

        {/*//Password label + input box*/}
        <label>
         Password: <input name="password" />
        </label>
        <br />
        <br />

        {/*//Confirm Password label + input box*/}
        <label>
         Confirm Password: <input name="confirm_password" />
        </label>
        <br />
        <br />

        {/*//Login button*/}
        <button>
        Login
        </button>

    </div>
  );
}

export default App;