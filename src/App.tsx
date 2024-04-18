import "./App.css";
import { Button, Flex } from "antd";
import useFetch from "./customHooks/useFetch";
import { CustomCard } from "./components/Card";

function App() {
  const { imagesWithData, contextHolder, setFiles, handleClick } = useFetch();

  return (
    <div className="App">
      <header className="header">
        <h1>Barcode App</h1>
        {contextHolder}
      </header>
      <Flex>
        <Flex vertical align="center" gap={70} className="w-100">
          <Flex
            align="center"
            justify="space-between"
            gap={30}
            style={{
              backgroundColor: "white",
              marginTop: 20,
              padding: "30px",
              borderRadius: "6px",
            }}
          >
            <div className="bg-color-white p-10 border-radius-6">
              <input
                className="cursor-pointer"
                type="file"
                multiple
                onChange={(e) => setFiles(e.target.files)}
              />
            </div>

            <Button onClick={handleClick} type="primary">
              Upload Files
            </Button>
          </Flex>

          <Flex vertical gap={25}>
            <Flex
              wrap="wrap"
              gap={40}
              justify="space-evenly"
              style={{ margin: 20 }}
            >
              {imagesWithData.map((image, index) => (
                <CustomCard key={index} image={image} />
              ))}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
}

export default App;
