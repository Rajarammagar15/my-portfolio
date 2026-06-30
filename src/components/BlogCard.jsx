import React, { useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import './BlogCard.css';

export default function BlogCard({ blog, isExpanded, onExpand, onCollapse }) {
    const cardRef = useRef(null);

    // Collapse when clicking anywhere outside this card
    useEffect(() => {
        if (!isExpanded) return;

        const handleClickOutside = (e) => {
            if (cardRef.current && !cardRef.current.contains(e.target)) {
                onCollapse();
            }
        };

        // mousedown fires before click-driven state changes elsewhere,
        // avoiding a flash where the new target's own click handler fires first
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isExpanded, onCollapse]);

    return (
        <article
            className={`blog-card ${isExpanded ? 'blog-card-expanded' : ''}`}
            ref={cardRef}
        >
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

            {!isExpanded ? (
                <button className="blog-toggle-btn" onClick={onExpand}>
                    ▶ Read Full Article
                </button>
            ) : (
                <div className="blog-content">
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

                    <div className="blog-collapse-hint">
                        Click anywhere outside this post to collapse
                    </div>
                </div>
            )}
        </article>
    );
}