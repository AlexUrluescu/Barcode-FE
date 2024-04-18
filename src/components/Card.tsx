import { Flex, Card } from "antd";
import { BarcodeOutlined } from "@ant-design/icons";
import { ImageWithData } from "../customHooks/useFetch";
import React from "react";

interface ICustomCard {
  
  image: ImageWithData;
}

export const CustomCard: React.FC<ICustomCard> = ({ image }) => {
  return (
    <Card>
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
              alt=""
              style={{ width: 100, height: 100 }}
              src={`data:image/jpeg;base64,${image.image}`}
            />
          </div>
        </Flex>
        <Flex vertical align="center" justify="space-between" className="h-50">
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
  );
};
