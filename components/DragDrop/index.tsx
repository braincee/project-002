import React from "react";
import { FileUploader } from "react-drag-drop-files";

// const fileTypes = ["JPG", "PNG", "GIF"];

function DragDrop({ setFile, checked }: { setFile: any; checked: boolean }) {
  const handleChange = (file: any) => {
    setFile(file);
  };
  return (
    <div style={{ display: checked ? "none" : "block" }}>
      <FileUploader required handleChange={handleChange} name="file" />
    </div>
  );
}

export default DragDrop;
