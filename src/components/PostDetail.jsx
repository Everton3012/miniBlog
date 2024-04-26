import { Link } from "react-router-dom";

import styles from "./PostDetail.module.css";

const PostsDetails = ({post}) => {
  return (
    <>
        <section className={styles["post_detail"]}>
            <img src={post.image} alt={post.title} />
            <h2 className={styles["createdBy"]}>{post.title}</h2>
            <div className={styles["tags"]}>
                {post.tagsArray.map((tag) => (
                    <p key={tag}><span>#</span>{tag}</p>
                ))}
            </div>
            <Link to={`/posts/${post.id}`} className="btn btn-outline">Ler</Link>
        </section>
    </>
  )
}

export default PostsDetails