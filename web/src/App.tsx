import { Button, Input, Title } from "./components";

function App() {
  return (
    <div className="App">
      <Title>Title</Title>
      <Input name="name" value="value" onChange={() => {}} />
      <Button>Button</Button>
    </div>
  );
}

export default App;
