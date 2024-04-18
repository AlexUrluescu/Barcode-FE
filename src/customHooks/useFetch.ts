import { message } from "antd";
import { NoticeType } from "antd/es/message/interface";
import axios from "axios";
import { useState } from "react";

export interface ImageWithData {
  name: string;
  barcode: string;
  image: string;
}

const URL = "http://127.0.0.1:5000";

const useFetch = () => {
  const [files, setFiles] = useState<any>();
  const [imagesWithData, setImagesWithData] = useState<ImageWithData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [messageApi, contextHolder] = message.useMessage();

  const success = (type: NoticeType, content: string) => {
    messageApi.open({
      type: type,
      content: content,
    });
  };

  const handleClick = () => {
    setIsLoading(true);
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
        setFiles([]);

        const customMessage = `${response.data.data.length} images were uploaded successfully`;

        success("success", customMessage);
        setIsLoading(false);
      })

      .catch((error) => {
        console.error("Error uploading PDF:", error);
        const customMessage = `was not possible to uploaded images`;

        success("error", customMessage);
      });
  };

  return {
    imagesWithData,
    contextHolder,
    isLoading,
    setFiles,
    handleClick,
  };
};

export default useFetch;
