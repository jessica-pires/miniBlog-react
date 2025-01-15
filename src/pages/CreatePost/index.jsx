import styles from './styles.module.css'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useInsertDocument } from '../../hooks/useInsertDocument'

const CreatePost = () => {
    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [body, setBody] = useState("")
    const [tags, setTags] = useState("")
    const [formError, setFormError] = useState("")
    const {insertDocument, response} = useInsertDocument("posts")
    const navigate = useNavigate()
    const {user} = useAuthValue()

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormError("")

        
        //validate image URL
        try {
            new URL(image)
        } catch (error) {
            setFormError("A imagem precisa ser uma URL.")
        }
        
        //criar um array de tags
        const tagsArray = tags.split(",").map((tag) => tag.trim().toLocaleLowerCase())

        //checar todos os valores
        if(!title || !image || !tags || !body){
            setFormError("Por favor, preencha todos os campos")
        }

        if(formError)return

        insertDocument({
            title,
            image,
            body, 
            tagsArray, 
            uid: user.uid,
            createdBy: user.displayName
        })

        //redirect
        navigate("/")
    }

    return (
    <div className={styles.create_post}>
        <h2>Criar post </h2>
        <p>Compartilhe suas ideias e conhecimentos sobre qualquer assunto que desejar!</p>
        <form onSubmit={handleSubmit}>
            <label>
                <span>Título</span>
                <input 
                type="text" 
                name='title' 
                required
                placeholder='Pense em um bom título'
                onChange={(e)=> setTitle(e.target.value)}
                value={title || ""}
                />
            </label>

            <label>
                <span>URL da imagem: </span>
                <input 
                type="text" 
                name='image' 
                required 
                placeholder="Insira uma imagem"
                onChange={(e) => setImage(e.target.value)}
                value={image || ""}
                />
            </label>

            <label>
                <span>Conteúdo</span>
                <textarea 
                name="body" 
                required
                placeholder="Insira o conteúdo do post"
                onChange={(e) => setBody(e.target.value)}
                value={body  || ""}
                ></textarea>
            </label>
            <label>
                <span>Tags: </span>
                <input type="text" 
                name='tags'
                required
                placeholder="Insira as tags separadas por vígula"
                onChange={(e) => setTags(e.target.value)}
                value={tags || ""}
                />
            </label>

            {!response.loading && <button className='btn'>Cadastrar</button>}
            {response.loading && (<button className='btn'>Aguarde...</button>)}
            {response.error && <p className="error">{response.error}</p>}
            {formError && <p className="error">{formError}</p>}

        </form>
    </div>
    )
}

export default CreatePost