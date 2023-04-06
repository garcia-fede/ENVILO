import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Axios from 'axios'
import { useNavigate,useLocation } from 'react-router-dom';

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
    ["link"]
]
}

const Update = () => {

    const ubicacionDatos = useLocation();
    const datosNoticia = ubicacionDatos.state

    const [idnoticia,setIdnoticia] = useState(datosNoticia.idnoticia)
    const [titulo,setTitulo] = useState(datosNoticia.titulo)
    const [info,setInfo] = useState(datosNoticia.info)
    const [categoria,setCategoria] = useState(datosNoticia.categoria)
    const [imagen,setImagen] = useState(datosNoticia.imagen)
    const navegar = useNavigate()

    const enviarNoticia = ()=>{
        if(categoria!=""&&imagen!=""&&titulo!=""){
            Axios.post("https://envilo.com.ar/api/update",{
                idnoticia: idnoticia,
                titulo: titulo, 
                info: info, 
                categoria: categoria,
                imagen: imagen
            }).then(()=>{
                alert("Noticia editada en la base de datos")
                navegar("/")
            }).catch(()=>{
                console.log("Hubo un error al editar la noticia")
            })
        }
        else{
            alert("Complete todos los campos")
        }
    }


    document.title = "Editar noticia";

    const subirImagen = async (e) => {
        const img = e.target.files[0];
        const base64 = await convertirBase64(img);
        setImagen(base64);
    };

    const convertirBase64 = (file) => {
        return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
        resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
        reject(error);
        };
    });
    };

        return (
            <>
                <main>
                    <div className='editorContainer'>
                        <div className="form">
                            <input 
                                type="file"
                                required
                                onChange={(e)=>{
                                    subirImagen(e)
                                }}/>
                                <input 
                                placeholder="Titulo de la noticia..."
                                autoComplete="off"
                                type="text" 
                                name="Titulo"
                                defaultValue={datosNoticia.titulo}
                                onChange={(e)=>{
                                    setTitulo(e.target.value)
                                }}/>
                        </div>
                        <ReactQuill theme="snow" value={info} onChange={setInfo} modules={TOOLBAR_OPTIONS} />
                        <label>Categoria</label>
                        <select 
                        name="Categoria"
                        id=""
                        defaultValue={datosNoticia.categoria}
                        onChange={(e)=>{
                            setCategoria(e.target.value)
                        }}>
                            <option value="" ></option>
                            <option value="Politica">Politica</option>
                            <option value="Deportes">Deportes</option>
                            <option value="Sociedad">Sociedad</option>
                            <option value="Cultura">Cultura</option>
                            <option value="MedioAmbiente">Medio ambiente</option>
                        </select>
                        <button onClick={enviarNoticia}>Publicar</button>
                    </div>
                </main>
            </>
        )
}

export default Update