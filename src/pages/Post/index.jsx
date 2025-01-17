import styles from './styles.module.css'

//hooks
import { useParams } from 'react-router-dom'
import { useSinglePost } from '../../hooks/useSinglePost'

const Post = () => {
    const {id}=  useParams()
    const {document: post , loading, error} = useSinglePost("posts" ,id)

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro ao carregar o post: {error}</p>;

    return (
        <div className={styles.post_container}>

        {post && (
            <>
                <h1>{post.title}</h1>
                <img  src={post.image} alt={post.title}/>
                <p>{post.body}</p>
                <h3>Este post trata sobre:</h3>
                <div className={styles.tags}>
                    {post.tagsArray.map((tag) => (
                            <p key={tag}>
                                <span>#</span>
                                {tag}
                            </p>
                        ))}
                </div>
            </>
        )}
    
    </div>
    )
}

export default Post