import { useState } from "react";
import axios from "axios";

export const UpLoadImage = () => {
  const [fileToSend, setFileToSend] = useState<File>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(">>>> file to send on submit >>>", fileToSend);
    if (fileToSend) {
      try {
        const formData = new FormData();
        formData.append("foo", "bar");
        formData.append("file", fileToSend);
        const endpoint = "http://localhost:4040/upload";
        const response = await axios({
          method: "post",
          url: endpoint,
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });

        console.log(">>>> cloudinary url >>>", response.data.secure_url)

        console.log(">>>response from image service >>>>", response);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>Charger image ici</label>
      <input
        type="file"
        onChange={(e) => {
          console.log(">>>>file>>> ", e.target.value);
          if(e.target.files){
              setFileToSend(e.target.files[0]);
          }
        }}
      />
      <button type="submit">Envoyer</button>
    </form>
  );
};
