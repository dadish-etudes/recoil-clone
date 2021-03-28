import "./App.css";
import { atom, useAtom } from "./recoil";

const nameAtom = atom({ key: "name", default: "" });

const Another = () => {
  const [name] = useAtom(nameAtom);
  return <h1>{name}</h1>;
};

function App() {
  const [name, setName] = useAtom(nameAtom);
  return (
    <div className="App">
      <input
        type="text"
        value={name}
        onChange={(ev) => setName(ev.target.value)}
      />
      <br />
      <Another />
      <Another />
      <Another />
      <Another />
      <Another />
      <Another />
      <Another />
      <Another />
      <Another />
      <Another />
      <Another />
    </div>
  );
}

export default App;
