import ImageKit from "imagekit-javascript";
import API_URL from "../api";

const imagekit = new ImageKit({
  publicKey: "TVOJ_PUBLIC_KEY",
  urlEndpoint: "https://ik.imagekit.io/TVOJ_ID",
  authenticationEndpoint: `${API_URL}/api/imagekit/auth`,
});

function UploadImage({ onSuccess }) {
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    imagekit.upload(
      {
        file,
        fileName: file.name,
      },
      (err, result) => {
        if (err) {
          console.error("Upload error:", err);
        } else {
          onSuccess(result.url);
        }
      }
    );
  };

  return (
    <div style={{ marginBottom: "16px" }}>
      <input type="file" accept="image/*" onChange={handleUpload} />
    </div>
  );
}

export default UploadImage;
