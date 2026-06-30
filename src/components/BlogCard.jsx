import React from 'react';
import ReactMarkdown from 'react-markdown';
import './BlogCard.css';

export default function BlogCard({ blog }) {
    return (
        <article className="blog-card">
            {/* Diagram / Header Image */}
            {blog.image_url && (
                <div className="blog-image-wrapper">
                    <img src={blog.image_url} alt={blog.title} className="blog-image" />
                </div>
            )}

            <div className="blog-header">
                {blog.series && (
                    <span className="blog-series-badge">
                        {blog.series} {blog.series_order ? `· Part ${blog.series_order}` : ''}
                    </span>
                )}
                <h3 className="blog-title">{blog.title}</h3>
                <div className="blog-meta">
                    {blog.date} • {blog.readTime || 5} min read
                </div>
            </div>

            {blog.excerpt && <p className="blog-excerpt">{blog.excerpt}</p>}

            {blog.stack && blog.stack.length > 0 && (
                <div className="blog-stack">
                    {blog.stack.map((tag) => (
                        <span key={tag} className="blog-tag">{tag}</span>
                    ))}
                </div>
            )}

            <details className="blog-content">
                <summary>Read Full Article</summary>

                {blog.image_url && (
                    <img src={blog.image_url} alt={`${blog.title} diagram`} className="blog-content-image" />
                )}

                <ReactMarkdown
                    components={{
                        a: ({ node, href, ...props }) => (
                            <a href={href} target="_blank" rel="noreferrer" {...props} />
                        ),
                    }}
                >
                    {blog.content}
                </ReactMarkdown>
            </details>
        </article>
    );
}