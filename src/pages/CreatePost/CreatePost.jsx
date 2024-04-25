import styles from "./CreatePost.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";

const CreatePost = () => {

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const {user} = useAuthValue();

  const {insertDocument, response} = useInsertDocument("posts");

  const navigate = useNavigate();

  const handleSubmit = (e) =>{
    e.preventDefault();
    setFormError("");

    // validate image URL
    try {
      new URL(image)
    }catch (error){
      setFormError("A imagem precisa ser uma URL.")
    }

    //criar o array de tags
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase()); 

    //checar todos os valores
    if(!title || !image || !tags || !body) {
      setFormError("Por favor, preencha todos os campos!")
    }

    if(formError) return;

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    });

    //redirect Home page
    navigate("/");

  }


  return (
    <>
      <div className={styles["createPost"]}>
        <h2>Criar post</h2>
        <p>Escreva sobre o que quiser e compartilhe seu conhecimento</p>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Título:</span>
            <input 
            type="text" 
            name="title" 
            required 
            placeholder="Pense num bom título..."
            value={title}
            onChange={(e) => setTitle(e.target.value)} 
          />
          </label>
          <label>
            <span>URL da imagem:</span>
            <input 
            type="text" 
            name="image" 
            required 
            placeholder="Insira uma imagem"
            value={image}
            onChange={(e) => setImage(e.target.value)} 
          />
          </label>
          <label>
            <span>Conteudo:</span>
            <textarea name="title" 
            required 
            placeholder="Insira o conteúdo do post"
            value={body}
            onChange={(e) => setBody(e.target.value)} />
          </label>
          <label>
            <span>Tags:</span>
            <input 
            type="text" 
            name="tags" 
            required 
            placeholder="Insiara as tags separadas por virgula"
            value={tags}
            onChange={(e) => setTags(e.target.value)} 
          />
          </label>
          {!response.loading && <button className="btn" type="submit">Cadastrar</button>}
          {response.loading && <button className="btn" type="submit" disabled>Aguarde...</button>}
          {response.error && <p className='error'>{response.error}</p>}
          {formError && <p className='error'>{formError}</p>}
        </form>
      </div>
    </>
  )
}

export default CreatePost