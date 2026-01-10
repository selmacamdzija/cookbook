
import imagekit from "../imagekit";

function UploadImage({ onSuccess }) {
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    imagekit.upload(
      {
        file,
        fileName: file.name,
      },
      function (err, result) {
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
