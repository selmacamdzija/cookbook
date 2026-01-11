import ImageKit from "imagekit-javascript";
import API_URL from "../api";

function UploadImage({ onSuccess, onError }) {
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      // 1️⃣ Dohvati auth podatke sa backenda (Render)
      const res = await fetch(`${API_URL}/api/imagekit/auth`);
      const auth = await res.json();

      // 2️⃣ Inicijalizuj ImageKit sa PODACIMA SA SERVERA
      const imagekit = new ImageKit({
        publicKey: auth.publicKey,
        urlEndpoint: auth.urlEndpoint,
        authenticationEndpoint: `${API_URL}/api/imagekit/auth`,
      });

      // 3️⃣ Upload slike
      imagekit.upload(
        {
          file,
          fileName: file.name,
        },
        (err, result) => {
          if (err) {
            console.error("Upload error:", err);
            onError && onError(err);
          } else {
            onSuccess(result.url);
          }
        }
      );
    } catch (err) {
      console.error("Auth fetch error:", err);
      onError && onError(err);
    }
  };

  return (
    <div style={{ marginBottom: "16px" }}>
      <input type="file" accept="image/*" onChange={handleUpload} />
    </div>
  );
}

export default UploadImage;
