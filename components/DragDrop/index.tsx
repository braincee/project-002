import { useCallback, useState } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";

interface DragDropProps {
  // setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  checked: boolean;
}

const DragDrop: React.FC<DragDropProps> = ({ checked }) => {
  const [display, setDisplay] = useState<string | undefined>(
    "Drag 'n' drop some files here, or click to select files"
  );

  // const onDrop = useCallback(
  //   (acceptedFiles: FileWithPath[]) => {
  //     acceptedFiles.forEach((file: FileWithPath) => {
  //       setFile(file);
  //       setDisplay(file.path);
  //     });
  //   },
  //   [setFile]
  // );

  const { getRootProps, getInputProps, isDragActive } = useDropzone();

  return (
    <div
      {...getRootProps()}
      style={{
        border: "1px solid #cdd7e1",
        borderRadius: "4px",
        padding: "0px 8px",
        display: checked ? "none" : "block",
      }}
    >
      <input
        {...getInputProps()}
        required={!checked}
        name="file"
        style={{ display: "block", padding: "8px" }}
      />
    </div>
  );
};

export default DragDrop;
