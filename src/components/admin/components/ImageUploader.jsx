import { useState } from "react";
import { uploadImage } from "../../../api/adminApi";

const ImageUploader = ({ images, setImages }) => {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);
    const res = await uploadImage(formData);
    setImages((prev) => [...prev, res.data.imageUrl]);
    setLoading(false);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleUpload} />
      {loading && <p>Uploading...</p>}

      <div className="flex gap-3 mt-3">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            className="w-20 h-20 object-cover rounded border"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
