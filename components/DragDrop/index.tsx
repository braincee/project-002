import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

//! Change this any type to fn
const DragDrop = ({ setFile, checked }: { setFile: any; checked: boolean }) => {
    const [display, setDisplay] = useState<any>(
        "Drag 'n' drop some files here, or click to select files",
    )

    //! Change this any type, dropzone should have types in case they're not simple arrays
    const onDrop = useCallback((acceptedFiles: any) => {
        acceptedFiles.forEach((file: any) => {
            setFile(file)
            setDisplay(file.path)
        })
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div
            {...getRootProps()}
            style={{
                border: '1px solid #cdd7e1',
                padding: '0px 8px',
                display: checked ? 'none' : 'block',
            }}
        >
            <input {...getInputProps()} required={checked ? false : true} />
            {isDragActive ? <p>Drop the files here ...</p> : <p>{display}</p>}
        </div>
    )
}

export default DragDrop
