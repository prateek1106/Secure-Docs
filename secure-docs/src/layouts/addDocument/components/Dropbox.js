import React from 'react'
import { DropzoneArea } from 'material-ui-dropzone'

function Dropbox({ setFiles, setBuffer }) {


    const captureFile = (file) => {
        if (file.length) {
            setFiles(file);
            console.log(file[0]);
            const reader = new window.FileReader();
            reader.readAsArrayBuffer(file[0]);
            reader.onloadend = () => {
                setBuffer(Buffer(reader.result));
            };
        }
    };

    return (
        <DropzoneArea
            onChange={captureFile}
            clearOnUnmount={true}
            filesLimit={1}
            showAlerts={false}
            acceptedFiles={['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']}
            showFileNames={true}
            dropzoneText="Drag and Drop or Select a Document to upload (png/jpg/pdf)"
        />
    )
}

export default Dropbox;