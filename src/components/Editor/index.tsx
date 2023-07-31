import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface EditorParams{
    value: string;
    onChange: (newValue: string) => void;
    placeholder?: string;
}

export function Editor({value, onChange, placeholder}:EditorParams){
    const modules = {
        toolbar: [
          [{ 'header': [1, 2, 3, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean'],
          [{ 'color': [] }, { 'background': [] }],   
          [{ 'font': [] }],
          [{ 'align': [] }],        
        ],
    }
    
    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image',
        'color', 'background',
        'font', 'aling'
      ]

    return <ReactQuill theme="snow" value={value} onChange={onChange} modules={modules}
    formats={formats} placeholder={placeholder} />;
}