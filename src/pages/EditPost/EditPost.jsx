import styles from "./EditPost.module.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useUpdateDocument } from "../../hooks/useUpdateDocmunte";
import { useFetchDocument } from "../../hooks/useFetchDocument";


const EditPost = () => {
  const {id} = useParams();
  const { document:post} = useFetchDocument("posts", id);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if(post){
      setTitle(post.title);
      setBody(post.body);
      setImage(post.image);
      
      const textTags = post.tagsArray.join(", ");

      setTags(textTags);
    }
  }, [post])

  const {user} = useAuthValue();

  const {updateDocument, response} = useUpdateDocument("posts");

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

    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    }

    updateDocument(id , data);

    //redirect Home page
    navigate("/dashboard");

  }


  return (
    <>
      <div className={styles["editPost"]}>
        {post && (
          <>
            <h2>Editar post: {post.title}</h2>
        <p>altere os dados do post como desejar</p>
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
          <p className={styles["preview_title"]}>Preview da imagem atual:</p>
          <img className={styles["image_preview"]} src={post.image} alt={post.title} />
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
          {!response.loading && <button className="btn" type="submit">Editar</button>}
          {response.loading && <button className="btn" type="submit" disabled>Aguarde...</button>}
          {response.error && <p className='error'>{response.error}</p>}
          {formError && <p className='error'>{formError}</p>}
        </form>
          </>
        )}
      </div>
    </>
  )
}

export default EditPost;