import { Button } from "./components/Button";
import { Input } from "./components/Input";

function App() {
  return (
    <div className="App">
      <Input name="name" value="value" onChange={() => {}} />
      <Button>Button</Button>
    </div>
  );
}

export default App;
