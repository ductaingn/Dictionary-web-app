import { Link } from "react-router-dom";
import "../css/BlogPage.css";

const BlogPostThumbnail = ({ post }) => {
  return (
    <Link to={`/blog-page/${post.id}`}>
      <div className="blog_post-thumbnail">
        <img
          src={`http://localhost:3001${post.thumbnail}`}
          alt={post.title}
          className="blog_post-thumbnail__image"
        />
        <h3 className="blog_post-thumbnai__label">{post.title}</h3>
        <p className="blog_post-thumbnai__excerpt">{post.excerpt}</p>
      </div>
    </Link>
  );
};

export default BlogPostThumbnail;
