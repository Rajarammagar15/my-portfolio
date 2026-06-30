import { useState, useEffect } from 'react';
import { fetchBlogs, addBlog } from '../data/blogData';
import BlogCard from './BlogCard';
import BlogForm from './BlogForm';
import { useFadeIn } from '../hooks/useFadeIn';
import './Blog.css';

export default function Blog() {
    useFadeIn();

    const [blogs, setBlogs] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState(null); // only one post open at a time

    useEffect(() => {
        loadBlogs();
    }, []);

    const loadBlogs = async () => {
        setLoading(true);
        const data = await fetchBlogs();
        setBlogs(data);
        setLoading(false);
    };

    const handleAddBlog = async (blogData, securityKey) => {
        await addBlog(blogData, securityKey);
        await loadBlogs();
    };

    return (
        <section id="blogs">
            <div className="fade-in">
                <p className="section-label">Writing & Insights</p>
                <h2 className="section-title">Blog</h2>
                <div className="section-divider" />
            </div>

            <button className="add-blog-btn fade-in" onClick={() => setShowForm((prev) => !prev)}>
                {showForm ? '✕ Close' : '+ New Blog Post'}
            </button>

            {showForm && <BlogForm onSubmit={handleAddBlog} onCancel={() => setShowForm(false)} />}

            {loading ? (
                <div className="blog-loading">Loading blogs</div>
            ) : blogs.length === 0 ? (
                <div className="blog-empty fade-in">
                    <div className="blog-empty-icon">📝</div>
                    <p>No blogs yet. Check back soon!</p>
                </div>
            ) : (
                <div className="blogs-grid">
                    {blogs.map((blog) => (
                        <div key={blog.id}>
                            <BlogCard
                                blog={blog}
                                isExpanded={expandedId === blog.id}
                                onExpand={() => setExpandedId(blog.id)}
                                onCollapse={() => setExpandedId(null)}
                            />
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}