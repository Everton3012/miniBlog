import styles from "./Dashboard.module.css";

import { Link } from "react-router-dom";

// Hooks
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";

const Dashboard = () => {

  const { user } = useAuthValue();
  const uid = user.id;
  const { documents: posts, loading } = useFetchDocuments("posts", null, uid);

  const { deleteDocument } = useDeleteDocument("posts");

  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <section className={styles["dashboard"]}>
      <h2>Dashboard</h2>
      <p>Gerencie os seus posts</p>
      {posts && posts.length === 0 ? (
        <div className={styles["noposts"]}>
          <p>Não foram encontrados posts</p>
          <Link className="btn" to={"/posts/create"}>Criar primeiro post</Link>
        </div>
      ) : (
        <>
          <div className={styles["post_header"]}>
            <span>Titulos</span>
            <span>Ações</span>
          </div>
          {posts && posts
            .filter((post) => post.uid === uid) // garante que só mostre os posts do usuário logado
            .map((post) => {
              return (
                <div className={styles["post_row"]} key={post.id}>
                  <p>{post.title}</p>
                  <div>
                    <Link to={`/posts/${post.id}`} className="btn btn-outline">Ver</Link>
                    <Link to={`/post/edit/${post.id}`} className="btn btn-outline">Editar</Link>
                    <button className="btn btn-danger btn-outline" onClick={() => deleteDocument(post.id)}>Excluir</button>
                  </div>
                </div>
              )
            }

            )}
        </>
      )}



    </section>
  )
}

export default Dashboard