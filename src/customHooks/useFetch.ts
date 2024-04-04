import { message } from "antd";
import { NoticeType } from "antd/es/message/interface";
import axios from "axios";
import { useState } from "react";

interface ImageWithData {
  name: string;
  barcode: string;
  image: string;
}

const URL = process.env.REACT_APP_SERVER_URL;

const useFetch = () => {
  const [files, setFiles] = useState<any>();
  const [imagesWithData, setImagesWithData] = useState<ImageWithData[]>([]);
  const [originalImagesWithData, setOriginalImagesWithData] = useState<
    ImageWithData[]
  >([]);

  const [messageApi, contextHolder] = message.useMessage();

  const success = (type: NoticeType, content: string) => {
    messageApi.open({
      type: type,
      content: content,
    });
  };

  const handleClick = () => {
    if (files === undefined) {
      return;
    }
    const formData = new FormData();

    Object.values(files).forEach((file: any) => {
      formData.append("images", file);
    });

    axios
      .post(`${URL}/extract`, formData)
      .then((response) => {
        setImagesWithData(response.data.data);
        setOriginalImagesWithData(response.data.data);

        setFiles([]);

        const customMessage = `${response.data.data.length} images were uploaded successfully`;

        success("success", customMessage);
      })
      .catch((error) => {
        console.error("Error uploading PDF:", error);
        const customMessage = `was not possible to uploaded images`;

        success("error", customMessage);
      });
  };

  return {
    files,
    imagesWithData,
    originalImagesWithData,
    contextHolder,
    setImagesWithData,
    setFiles,
    handleClick,
  };
};

export default useFetch;
