import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Axios from 'axios'
import moment from "moment";
import 'moment/locale/es'; //Importar moment en español

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

const Editor = () => {
    const [titulo,setTitulo] = useState("")
    const [info,setInfo] = useState("")
    const [categoria,setCategoria] = useState("")
    const [imagen,setImagen] = useState("")

    let fecha = moment().format("LL")
    let fechaformato = moment().format()

    const enviarNoticia = ()=>{
        let fecha = moment().format("LL")
        let fechaformato = moment().format()
        if(categoria!=""&&imagen!=""&&titulo!=""){
            Axios.post("http://localhost:3001/api/insert",{
                titulo: titulo, 
                info: info, 
                categoria: categoria,
                imagen: imagen,
                fechatexto: fecha,
                fechaformato: fechaformato
            }).then(()=>{
                alert("Noticia almacenada en la base de datos")
            }).catch(()=>{
                console.log("Hubo un error al almacenar la noticia")
            })
        }
        else{
            alert("Complete todos los campos")
        }
    }

    const subirImagen = async (e) => {
        const img = e.target.files[0];
        const base64 = await convertirBase64(img);
        console.log(base64)
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
                                onChange={(e)=>{
                                    setTitulo(e.target.value)
                                }}/>
                                
                        </div>
                        <ReactQuill theme="snow" value={info} onChange={setInfo} modules={TOOLBAR_OPTIONS} />
                        <label>Categoria</label>
                        <select 
                        name="Categoria"
                        id=""
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

export default Editor