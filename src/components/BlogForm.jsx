import { useState } from 'react';
import { uploadBlogImage } from '../data/blogData';
import './BlogForm.css';

export default function BlogForm({ onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        stack: '',
        readtime: 5,
        series: '',
        series_order: 1,
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [securityKey, setSecurityKey] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (message) setMessage(null);
    };

    const generateSlug = (title) =>
        title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');

    const handleTitleChange = (e) => {
        const title = e.target.value;
        handleChange(e);
        if (!formData.slug || formData.slug === generateSlug(formData.title)) {
            setFormData(prev => ({ ...prev, slug: generateSlug(title) }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const removeImage = () => {
        setImageFile(null);
        setImagePreview(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        if (!formData.title.trim()) { setMessage({ type: 'error', text: 'Title is required' }); setLoading(false); return; }
        if (!formData.slug.trim()) { setMessage({ type: 'error', text: 'Slug is required' }); setLoading(false); return; }
        if (!formData.content.trim()) { setMessage({ type: 'error', text: 'Content is required' }); setLoading(false); return; }
        if (!securityKey.trim()) { setMessage({ type: 'error', text: 'Security key is required' }); setLoading(false); return; }

        try {
            let imageUrl = null;

            if (imageFile) {
                setMessage({ type: 'loading', text: 'Uploading diagram...' });
                imageUrl = await uploadBlogImage(imageFile, securityKey);
            }

            const blog = {
                ...formData,
                stack: formData.stack.split(',').map(s => s.trim()).filter(Boolean),
                series_order: Number(formData.series_order) || 1,
                readtime: Number(formData.readtime) || 5,
                date: new Date().toISOString().split('T')[0],
                image_url: imageUrl,
            };

            setMessage({ type: 'loading', text: 'Publishing blog...' });
            await onSubmit(blog, securityKey);

            setFormData({
                title: '', slug: '', excerpt: '', content: '',
                stack: '', readtime: 5, series: '', series_order: 1,
            });
            setImageFile(null);
            setImagePreview(null);
            setSecurityKey('');
            setMessage({ type: 'success', text: '✓ Blog published successfully!' });

            setTimeout(() => { if (onCancel) onCancel(); }, 1800);
        } catch (error) {
            setMessage({ type: 'error', text: `Error: ${error.message}` });
        }
        setLoading(false);
    };

    return (
        <div className="blog-form-wrapper">
            <form className="blog-form" onSubmit={handleSubmit}>
                <div className="blog-form-header">
                    <h3 className="form-title">Publish New Blog Post</h3>
                    <p className="form-subtitle">Part of a series? Use the same series name to group posts.</p>
                </div>

                <div className="security-notice">
                    <strong>🔒 Security:</strong> This form requires a security key to prevent unauthorized posts.
                </div>

                {message && <div className={`form-message ${message.type}`}>{message.text}</div>}

                <div className="form-group">
                    <label>Security Key <span>*</span></label>
                    <input
                        type="password"
                        value={securityKey}
                        onChange={(e) => setSecurityKey(e.target.value)}
                        placeholder="Enter your secret key"
                        disabled={loading}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Title <span>*</span></label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleTitleChange}
                        placeholder="e.g., Wallet Service — High Level Design"
                        disabled={loading}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>URL Slug <span>*</span></label>
                    <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        placeholder="e.g., wallet-platform-hld"
                        disabled={loading}
                        required
                    />
                </div>

                {/* Series fields — side by side */}
                <div className="form-row">
                    <div className="form-group">
                        <label>Series Name</label>
                        <input
                            type="text"
                            name="series"
                            value={formData.series}
                            onChange={handleChange}
                            placeholder="e.g., wallet-platform"
                            disabled={loading}
                        />
                        <div className="form-helper">Same name groups posts together (e.g. all wallet platform posts)</div>
                    </div>

                    <div className="form-group">
                        <label>Order in Series</label>
                        <input
                            type="number"
                            name="series_order"
                            value={formData.series_order}
                            onChange={handleChange}
                            min="1"
                            disabled={loading}
                        />
                        <div className="form-helper">1 = HLD post, 2 = Wallet LLD, 3 = Fraud LLD, etc.</div>
                    </div>
                </div>

                <div className="form-group">
                    <label>Excerpt</label>
                    <input
                        type="text"
                        name="excerpt"
                        value={formData.excerpt}
                        onChange={handleChange}
                        placeholder="Short summary shown in blog listing"
                        disabled={loading}
                        maxLength="200"
                    />
                    <div className="form-helper">{formData.excerpt.length}/200 characters</div>
                </div>

                {/* Diagram Upload */}
                <div className="form-group">
                    <label>Architecture Diagram (optional)</label>
                    {!imagePreview ? (
                        <div className="image-upload-box">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                disabled={loading}
                                id="diagram-upload"
                                className="image-upload-input"
                            />
                            <label htmlFor="diagram-upload" className="image-upload-label">
                                📊 Click to upload diagram (PNG, JPG)
                            </label>
                        </div>
                    ) : (
                        <div className="image-preview-box">
                            <img src={imagePreview} alt="Preview" className="image-preview" />
                            <button type="button" className="image-remove-btn" onClick={removeImage} disabled={loading}>
                                ✕ Remove
                            </button>
                        </div>
                    )}
                    <div className="form-helper">This image appears at the top of the blog card and full post.</div>
                </div>

                <div className="form-group">
                    <label>Content (Markdown supported) <span>*</span></label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        placeholder="Write your blog content in Markdown..."
                        disabled={loading}
                        required
                    />
                    <div className="form-helper">{formData.content.length} characters</div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Tech Stack (comma-separated)</label>
                        <input
                            type="text"
                            name="stack"
                            value={formData.stack}
                            onChange={handleChange}
                            placeholder="e.g., Kafka, Java, Spring Boot"
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label>Read Time (minutes)</label>
                        <input
                            type="number"
                            name="readtime"
                            value={formData.readtime}
                            onChange={handleChange}
                            min="1"
                            max="60"
                            disabled={loading}
                        />
                    </div>
                </div>

                <div className="form-buttons">
                    <button type="button" className="cancel-btn" onClick={onCancel} disabled={loading}>
                        ✕ Cancel
                    </button>
                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? 'Publishing...' : '↗ Publish Blog'}
                    </button>
                </div>
            </form>
        </div>
    );
}