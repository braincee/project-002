import "react-dropzone-uploader/dist/styles.css";
import Dropzone, {
  IFileWithMeta,
  IUploadParams,
} from "react-dropzone-uploader";

const DragDrop = () => {
  const getUploadParams = ({ meta }: IFileWithMeta): IUploadParams => {
    return { url: "https://httpbin.org/post" };
  };

  const handleChangeStatus = (
    { meta, file }: IFileWithMeta,
    status: string
  ) => {
    console.log(status, meta, file);
  };

  const handleSubmit = (files: IFileWithMeta[]) => {
    console.log(files.map((f) => f.meta));
  };

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      accept="image/*,audio/*,video/*"
    />
  );
};

export default DragDrop;
