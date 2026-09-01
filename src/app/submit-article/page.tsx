'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function SubmitArticle() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    topic: '',
    body: '',
    author_name: '',
    author_bio: '',
    thumbnail_url: '',
    tags: '',
    publication_date: new Date().toISOString().split('T')[0],
    author_email: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const fileName = `${Date.now()}-${file.name}`;
      const { data, error: uploadError } = await supabase.storage
        .from('article-thumbnails')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('article-thumbnails')
        .getPublicUrl(fileName);

      setFormData((prev) => ({
        ...prev,
        thumbnail_url: publicUrlData.publicUrl,
      }));
    } catch (err) {
      setError(`Image upload failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!formData.author_email) {
        throw new Error('Author email is required');
      }

      const today = new Date().toISOString().split('T')[0];
      if (formData.publication_date < today) {
        throw new Error('Publication date cannot be in the past');
      }

      if (formData.title.length > 200) {
        throw new Error('Title must be under 200 characters');
      }

      if (formData.body.length > 50000) {
        throw new Error('Article body must be under 50,000 characters');
      }

      const tags = formData.tags
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      const { data: article, error: articleError } = await supabase
        .from('articles')
        .insert([
          {
            title: formData.title,
            topic: formData.topic,
            body: formData.body,
            author_name: formData.author_name,
            author_bio: formData.author_bio,
            thumbnail_url: formData.thumbnail_url,
            tags,
            publication_date: formData.publication_date,
            status: 'pending',
          },
        ])
        .select()
        .single();

      if (articleError) throw articleError;

      const { error: submissionError } = await supabase.from('submissions').insert([
        {
          article_id: article.id,
          submitted_by_email: formData.author_email,
        },
      ]);

      if (submissionError) throw submissionError;

      const { error: auditError } = await supabase.from('audit_logs').insert([
        {
          article_id: article.id,
          action: 'article_submitted',
          performed_by_email: formData.author_email,
          notes: `Article "${formData.title}" submitted for review`,
        },
      ]);

      if (auditError) throw auditError;

      setSuccess(true);
      setFormData({
        title: '',
        topic: '',
        body: '',
        author_name: '',
        author_bio: '',
        thumbnail_url: '',
        tags: '',
        publication_date: new Date().toISOString().split('T')[0],
        author_email: '',
      });

      setTimeout(() => router.push('/'), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Submit Your Article</h1>

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            Article submitted successfully! Redirecting...
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Author Email</label>
            <input
              type="email"
              name="author_email"
              value={formData.author_email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Author Name</label>
            <input
              type="text"
              name="author_name"
              value={formData.author_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Author Bio</label>
            <textarea
              name="author_bio"
              value={formData.author_bio}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Article Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              maxLength={200}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
            <p className="text-xs text-gray-500 mt-1">{formData.title.length}/200 characters</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Topic</label>
            <input
              type="text"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Thumbnail Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
            {formData.thumbnail_url && (
              <img src={formData.thumbnail_url} alt="Thumbnail preview" className="mt-4 max-w-xs" />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Article Body</label>
            <textarea
              name="body"
              value={formData.body}
              onChange={handleChange}
              required
              maxLength={50000}
              rows={10}
              className="w-full px-4 py-2 border border-gray-300 rounded font-mono text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.body.length}/50,000 characters (~{Math.round(formData.body.length / 5.5)} words)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="politics, delhi, news"
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Publication Date</label>
            <input
              type="date"
              name="publication_date"
              value={formData.publication_date}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
            <p className="text-xs text-gray-500 mt-1">Must be today or a future date</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Article'}
          </button>
        </form>
      </div>
    </div>
  );
}
