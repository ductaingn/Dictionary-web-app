import { useEffect, useState } from "react";
import BlogPostThumbnail from "../../components/BlogPostThumbnail";
import "../../css/BlogPage.css";
import { API_URL } from "../../utils/api";

const BlogPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/blog/posts`)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Failed to load posts:", err));
  }, []);

  return (
    <main className="main__container">
      <h2>Phụ lục</h2>
      <div>
        {posts.map((post) => (
          <BlogPostThumbnail key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
};

export default BlogPage;
