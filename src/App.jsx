import { useCallback, useEffect, useState, useRef } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [length, setLength] = useState(12);
  const [password, setPassword] = useState("");
  const [useNumber, setUseNumber] = useState(false);
  const [useSpecialChar, setSpecialChar] = useState(false);

  const passwordRef = useRef(null);

  const passwordGenerate = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHJIKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (useNumber) str += "0123456789";
    if (useSpecialChar) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, useNumber, useSpecialChar, setPassword]);

  const copyToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
    toast.success("Your password has been copied", {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }, [password]);

  useEffect(() => {
    passwordGenerate();
    console.log(useNumber);
  }, [length, useNumber, useSpecialChar, passwordGenerate]);

  return (
    <div className="app">
      <div className="header">
        <h2>Password Generator</h2>
      </div>
      <div className="generatepass">
        <h3>Generate a password</h3>
        <p className="subtitle">
          Let the app create a unique password for you. Once you're done, click
          the <strong>Copy</strong> button
        </p>
        <div className="inputfield">
          <input
            type="text"
            name="password"
            readOnly
            value={password}
            ref={passwordRef}
          />
          <button onClick={copyToClipBoard}>Copy</button>
        </div>
        <div className="pass-length">
          <p>Password Length</p>
          <div className="passrange">
            <input
              type="range"
              name="length"
              id="passlength"
              min="6"
              max="100"
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <p>{length}</p>
          </div>
        </div>
        <div className="numbers">
          <p>Use Numbers</p>
          <input
            type="checkbox"
            name="number"
            className="number-check"
            value={useNumber}
            onChange={() => {
              setUseNumber((prev) => !prev);
            }}
          />
        </div>
        <div className="specialchar">
          <p>Use Special Characters</p>
          <input
            type="checkbox"
            name="specialchar"
            className="specialchar-check"
            value={useSpecialChar}
            onChange={() => {
              setSpecialChar((prev) => !prev);
            }}
          />
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
