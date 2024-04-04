import "./App.css";
import { Button, Card, Flex, Input } from "antd";
import { BarcodeOutlined } from "@ant-design/icons";
import { SearchProps } from "antd/es/input/Search";
import useFetch from "./customHooks/useFetch";

const { Search } = Input;

function App() {
  const {
    imagesWithData,
    originalImagesWithData,
    contextHolder,
    setImagesWithData,
    setFiles,
    handleClick,
  } = useFetch();

  const onSearch: SearchProps["onSearch"] = (value, _e) => {
    const filteredImages = originalImagesWithData.filter((image) =>
      image.name.includes(value)
    );

    setImagesWithData(filteredImages);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filteredImages = originalImagesWithData.filter((image) =>
      image.name.includes(e.target.value)
    );

    setImagesWithData(filteredImages);
  };

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
            <Flex justify="center">
              {originalImagesWithData.length > 0 ? (
                <Search
                  placeholder="input search text"
                  onSearch={onSearch}
                  onChange={(e) => onChange(e)}
                  style={{ width: 300 }}
                  size="large"
                />
              ) : null}
            </Flex>
            <Flex
              wrap="wrap"
              gap={40}
              justify="space-evenly"
              style={{ margin: 20 }}
            >
              {imagesWithData.map((image, index) => (
                <Card key={index}>
                  <Flex
                    vertical
                    style={{
                      backgroundColor: "white",
                      height: 220,
                      width: 220,
                    }}
                    className="h-100 w-100"
                  >
                    <Flex
                      justify="center"
                      align="center"
                      className="h-50 w-100"
                      style={{
                        borderBottom: "1px solid gray",
                      }}
                    >
                      <div
                        style={{
                          borderRadius: "50%",
                        }}
                      >
                        <img
                          style={{ width: 100, height: 100 }}
                          src={`data:image/jpeg;base64,${image.image}`}
                        />
                      </div>
                    </Flex>
                    <Flex
                      vertical
                      align="center"
                      justify="space-between"
                      className="h-50"
                    >
                      <h5 style={{ fontSize: 16 }}>{image.name}</h5>
                      <Flex gap={10} align="center">
                        <BarcodeOutlined />
                        {image.barcode === "" ? (
                          <span>Don't found</span>
                        ) : (
                          <span>{image.barcode}</span>
                        )}
                      </Flex>
                    </Flex>
                  </Flex>
                </Card>
              ))}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
}

export default App;
