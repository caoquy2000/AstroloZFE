import firebase from "./firebase";
import { storage } from "./firebase";

export const  uploadFile = (file) => {
    console.log(file);
    let imgLink;
    let metaData = {
        contentType: 'image/jpeg',
    };

    let uploadTask = storage.ref(`images/${file.name}`).put(file, metaData);
    uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        function(snapshot) {
            var progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
            progressBar.value = progress;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        },
        function(error) {
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;

                case 'storage/canceled':
                    // User canceled the upload
                    break;

                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
            }
        },
        function() {
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                console.log('File available at', downloadURL);
                imgLink = downloadURL;

            });

        }
    );
    return imgLink;
};

