import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Axios from 'axios'
import moment from "moment";
import 'moment/locale/es'; //Importar moment en español
import { useNavigate } from 'react-router-dom';

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

const Editor = () => {
    const [titulo,setTitulo] = useState("")
    const [info,setInfo] = useState("")
    const [categoria,setCategoria] = useState("")
    const [imagen,setImagen] = useState("")
    const [keywords,setKeywords] = useState([])
    const [SEOdesc, setSEOdesc] = useState("")
    const navegar = useNavigate()

    const agregarKeyword = ()=>{
        const keyword = document.getElementById('keyword')
        const keywordValue = keyword.value
        if(keywordValue!=""){
            setKeywords([...keywords, keywordValue])
            keyword.value = ""
        }
    }

    const eliminarKeyword = (e)=>{
        let reemplazo = keywords.filter(keyword=>keyword!=e.target.textContent)
        setKeywords(reemplazo)
    }

    const enviarNoticia = ()=>{
        let fecha = moment().format("LL")
        let fechaformato = moment().format()
        if(categoria!=""&&imagen!=""&&titulo!=""){
            Axios.post("https://envilo.com.ar/api/insert",{
                titulo: titulo, 
                info: info, 
                categoria: categoria,
                imagen: imagen,
                fechatexto: fecha,
                fechaformato: fechaformato
            }).then(()=>{
                alert("Noticia almacenada en la base de datos")
                navegar("/")
            }).catch(()=>{
                console.log("Hubo un error al almacenar la noticia")
            })
        }
        else{
            alert("Complete todos los campos")
        }
    }

    document.title = "Subir noticia";

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
                                onChange={(e)=>{
                                    setTitulo(e.target.value)
                                }}/>
                        </div>
                        <ReactQuill theme="snow" value={info} onChange={setInfo} modules={TOOLBAR_OPTIONS} />
                        <div className="containerSEO">
                            <div className="descripcionSEO" id=''>
                                <label htmlFor="">Descripcion para SEO</label>
                                <p>
                                    <span
                                    className="textarea"
                                    role="textbox"
                                    required
                                    contentEditable
                                    onChange={(e)=>{
                                        setSEOdesc(e.target.value)
                                    }}
                                    ></span>
                                </p>                            
                            </div>
                            <div className='keywordsSEO'>
                                <label htmlFor="keywords">Keywords SEO</label>
                                <input 
                                name='keywords'
                                id="keyword"
                                type="text"
                                placeholder="keyword"
                                />
                                <button onClick={agregarKeyword}>Agregar</button>
                            </div>
                            <div className="keywordsDisplay">
                                {keywords.map(keyword=>{
                                    return <button onClick={eliminarKeyword}>
                                        {keyword}
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                            <line x1="18" y1="6" x2="6" y2="18" />
                                            <line x1="6" y1="6" x2="18" y2="18" />
                                        </svg>
                                        </button>
                                })}
                            </div>
                        </div>
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