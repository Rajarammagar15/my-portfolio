import { useState, useEffect } from 'react';
import { fetchBlogs, addBlog } from '../data/blogData';
import './Blog.css';
import BlogForm from './BlogForm';
import BlogCard from './BlogCard';

export default function Blog() {
    const [blogs, setBlogs] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);

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
        try {
            await addBlog(blogData, securityKey);
            await loadBlogs(); // Refresh list
            setShowForm(false);
            alert('Blog added successfully!');
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <section id="blogs">
            <div className="fade-in">
                <p className="section-label">Writing & Insights</p>
                <h2 className="section-title">Blogs</h2>
                <div className="section-divider" />
            </div>

            <button
                className="add-blog-btn"
                onClick={() => setShowForm(!showForm)}
            >
                {showForm ? '✕ Close' : '+ New Blog Post'}
            </button>

            {showForm && (
                <BlogForm onSubmit={handleAddBlog} />
            )}

            {loading ? (
                <p>Loading blogs...</p>
            ) : blogs.length === 0 ? (
                <p>No blogs yet. Check back soon!</p>
            ) : (
                <div className="blogs-grid">
                    {blogs.map((blog) => (
                        <BlogCard key={blog.id} blog={blog} />
                    ))}
                </div>
            )}
        </section>
    );
}