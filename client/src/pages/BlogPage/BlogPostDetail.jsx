import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown"; // ← import
import "../../css/BlogPage.css";

const BlogPostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/api/posts/${postId}`)
      .then((res) => res.json())
      .then((data) => setPost(data))
      .catch((err) => console.error("Failed to load post:", err));
  }, [postId]);

  if (!post) return <p>Loading...</p>;

  return (
    <main className="main__container">
      <article className="post-detail">
        <h1>{post.title}</h1>
        <img src={`http://localhost:3001${post.thumbnail}`} alt={post.title} />
        <ReactMarkdown>{post.content}</ReactMarkdown>{" "}
        {/* ← markdown rendering */}
      </article>
    </main>
  );
};

export default BlogPostDetail;
