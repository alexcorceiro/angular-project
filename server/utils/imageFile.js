const admin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');
const serviceAccount = require("../config/twitter-wish-firebase-adminsdk-ry1aa-a78da8ab31.json");

if (admin.apps.length === 0) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: 'gs://twitter-wish.appspot.com' 
    });
}

const bucket = admin.storage().bucket(); 

async function uploadImageToFirebase(file, userId, type, postId) {
    const fileName = `${uuidv4()}-${file.originalname}`;
    let filePath;
    
    // Correction de la logique conditionnelle pour utiliser '==='
    if (type === "profile") {
        filePath = `users/${userId}/profile/${fileName}`;
    } else if (type === "post") {
        // Assurez-vous que le chemin correspond au format requis
        filePath = `users/${userId}/posts/${postId}/${fileName}`;
    } else {
        throw new Error("Invalid type");
    }
    
    const blob = bucket.file(filePath);

    const blobWriter = blob.createWriteStream({
        metadata: {
            contentType: file.mimetype
        }
    });

    return new Promise((resolve, reject) => {
        blobWriter.on('error', (err) => reject(err));

        blobWriter.on('finish', () => {
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${encodeURIComponent(blob.name)}`;
            resolve(publicUrl);
        });

        blobWriter.end(file.buffer); 
    });
}

module.exports = uploadImageToFirebase;
