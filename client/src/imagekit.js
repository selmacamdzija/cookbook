import ImageKit from "imagekit-javascript";
import  API_URL  from "./api";


const imagekit = new ImageKit({
  publicKey: "PUBLIC_KEY",
  urlEndpoint: "https://ik.imagekit.io/XXXX",
  authenticationEndpoint: `${API_URL}/api/imagekit/auth`,
});

export default imagekit;
