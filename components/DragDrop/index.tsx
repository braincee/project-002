import React from "react";
import { FileUploader } from "react-drag-drop-files";

// const fileTypes = ["JPG", "PNG", "GIF"];

function DragDrop({ setFile }: { setFile: any }) {
  const handleChange = (file: any) => {
    setFile(file);
  };
  return (
    <div>
      <FileUploader required handleChange={handleChange} name="file" />
    </div>
  );
}

export default DragDrop;
