import { useState, useCallback, useEffect , useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //use Ref Hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (characterAllowed) {
      str += "!@#$%^&*()_+~{}";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, characterAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0 , 3)// this is for how much range we want to select on click on copy
    window.navigator.clipboard.writeText(password)}, [password])

  useEffect(()=> {passwordGenerator()} , [length , numberAllowed , characterAllowed , passwordGenerator])
  return (
    <>
      <h1 className="text-white text-4xl text-center">Password Generator</h1>
      <div className="w-full h-16 max-w-md mx-auto shadow-md rounded-lg px-8 my-10 text-orange-500 bg-gray-700">
        <div className="flex shadow rounded-lg overflow-hidden p-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 rounded-md"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button 
          onClick={copyPasswordToClipboard}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 rounded-md ml-2">
            COPY
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={22}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              className="cursor-pointer"
              onChange={(e) => {
                setNumberAllowed((prev) => !prev);
              }}
            />
             <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              className="cursor-pointer"
              onChange={(e) => {
                setCharacterAllowed((prev) => !prev);
              }}
            />
             <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
