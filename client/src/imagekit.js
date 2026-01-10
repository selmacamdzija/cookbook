import ImageKit from "imagekit-javascript";

const imagekit = new ImageKit({
  publicKey: "PUBLIC_KEY",
  urlEndpoint: "https://ik.imagekit.io/XXXX",
  authenticationEndpoint: "http://localhost:5000/api/imagekit-auth",
});

export default imagekit;
