import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Axios from 'axios'

const TOOLBAR_OPTIONS = {
    toolbar:  [
    [{ header: [1, 2, 3, 4, 5, false] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ["image", "blockquote", "code-block"],
    ["clean"],
]
}

const Update = (noticia) => {

    const [titulo,setTitulo] = useState("")
    const [info,setInfo] = useState("")
    const [categoria,setCategoria] = useState("")
    const [imagen,setImagen] = useState("")

    return (
        <div>Update</div>
    )
}

export default Update