import { useDropzone } from 'react-dropzone'

interface DragDropProps {
  checked: boolean
}

const DragDrop: React.FC<DragDropProps> = ({ checked }) => {
  const { getRootProps, getInputProps } = useDropzone()

  return (
    <div
      {...getRootProps()}
      style={{
        border: '1px solid #cdd7e1',
        borderRadius: '4px',
        padding: '0px 8px',
        display: checked ? 'none' : 'block',
      }}
    >
      <input
        {...getInputProps()}
        required={!checked}
        name='file'
        style={{ display: 'block', padding: '8px' }}
      />
    </div>
  )
}

export default DragDrop
