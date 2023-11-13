import { Button, Input } from "@material-tailwind/react";
import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const AddBook = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [book, setBook] = useState();
  const { token } = useSelector((state) => state.user);
  const [error, setError] = useState("");
  const [count, setCount] = useState(1);
  const onChange = (e) => {
    setName(e.target.value);
  };
  const handleImagePreview = (e) => {
    let image_as_base64 = URL.createObjectURL(e.target.files[0]);
    let image_as_files = e.target.files[0];

    setImage({
      image_preview: image_as_base64,
      image_file: image_as_files,
    });
  };
  const handleBook = (e) => {
    setBook(e.target.files[0]);
  };

  const addbook = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("imageURL", image.image_file);
    formData.append("epubURL", book);
    try {
      const response = await axios.post(
        "http://localhost:5000/book/new",
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setError(count + "-" + response.data);
        setCount(count + 1);
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        setError(error.response.data);
      }
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center m-2 p-2 border bg-blue-gray-600 rounded-full text-white">
        Kitap EKLE
      </div>
      {error && (
        <div className="flex items-center justify-center m-2 p-2 border bg-red-200 rounded-full ">
          {error}
        </div>
      )}

      <div className="flex flex-col items-center justify-center gap-3">
        <Input
          onChange={onChange}
          name="name"
          size="lg"
          label="Kitap Adı"
          className="rounded-full"
        />

        <div className="flex gap-3 items-center justify-center">
          <div>Kitap Resmi.. :</div>
          <img
            src={image.image_preview || null}
            alt="preview"
            className="h-24 w-24 "
          />

          <input type="file" onChange={handleImagePreview} />
        </div>
        <div className="flex gap-3 items-center justify-center">
          <div>Kitap dosyası :</div>

          <input type="file" onChange={handleBook} />
        </div>
        <Button onClick={addbook} className="w-52">
          EKLE
        </Button>
      </div>
    </div>
  );
};

export default AddBook;
