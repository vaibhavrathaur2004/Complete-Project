const ImageKit = require("imagekit");
require("dotenv").config()

const imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey :process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT
});

exports.fileUpload =async (file,fileName )=>{
    try{

        const result = await imagekit.upload({
            file:file,
            fileName:fileName
        })
        return result;
    }
    catch (error) {
        console.error("ImageKit upload error:", error);
        throw error;
    }
    
   
}