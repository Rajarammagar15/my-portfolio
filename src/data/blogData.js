import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const SECRET_KEY = import.meta.env.VITE_BLOG_SECRET_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export async function fetchBlogs() {
    const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('published', true)
        .order('series', { ascending: true })
        .order('series_order', { ascending: true })
        .order('date', { ascending: false });

    if (error) console.error('Error fetching blogs:', error);
    return data || [];
}

// Upload image to Supabase Storage, returns public URL
export async function uploadBlogImage(file, securityKey) {
    if (securityKey !== SECRET_KEY) {
        throw new Error('Invalid security key');
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

    return data.publicUrl;
}

export async function addBlog(blog, securityKey) {
    if (securityKey !== SECRET_KEY) {
        throw new Error('Invalid security key');
    }

    const { data, error } = await supabase
        .from('blogs')
        .insert([blog]);

    if (error) throw error;
    return data;
}

export async function deleteBlog(id, securityKey) {
    if (securityKey !== SECRET_KEY) {
        throw new Error('Invalid security key');
    }

    const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id);

    if (error) throw error;
}