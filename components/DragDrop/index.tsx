import { useCallback, useState } from 'react';
import { useDropzone, FileWithPath } from 'react-dropzone';

interface DragDropProps {
  setFile: (file: FileWithPath) => void;
  checked: boolean;
}

const DragDrop: React.FC<DragDropProps> = ({ setFile, checked }) => {
  const [display, setDisplay] = useState<string>(
    "Drag 'n' drop some files here, or click to select files"
  );

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    acceptedFiles.forEach((file: FileWithPath) => {
      setFile(file);
      setDisplay(file.path);
    });
  }, [setFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={{
        border: '1px solid #cdd7e1',
        padding: '0px 8px',
        display: checked ? 'none' : 'block',
      }}
    >
      <input {...getInputProps()} required={!checked} />
      {isDragActive ? <p>Drop the files here ...</p> : <p>{display}</p>}
    </div>
  );
};

export default DragDrop;
