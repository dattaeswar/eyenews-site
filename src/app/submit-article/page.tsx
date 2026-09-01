'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { THUMBNAIL_RULES, BODY_RULES } from '@/lib/articles';

const GMAIL_RE = /^[^\s@]+@gmail\.com$/i;

export default function SubmitArticle() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const readImageSize = (file: File) =>
    new Promise<{ width: number; height: number }>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
      img.onerror = () => reject(new Error('Could not read the image file'));
      img.src = URL.createObjectURL(file);
    });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');
    setUploadingImage(true);
    try {
      if (!THUMBNAIL_RULES.acceptedTypes.includes(file.type)) {
        throw new Error('Thumbnail must be a JPG, PNG or WebP image');
      }
      if (file.size > THUMBNAIL_RULES.maxBytes) {
        throw new Error(
          `Thumbnail is ${(file.size / 1024 / 1024).toFixed(1)} MB — the limit is ${
            THUMBNAIL_RULES.maxBytes / 1024 / 1024
          } MB`
        );
      }

      const { width, height } = await readImageSize(file);
      if (width < THUMBNAIL_RULES.minWidth || height < THUMBNAIL_RULES.minHeight) {
        throw new Error(
          `Thumbnail is ${width}×${height}px — it must be at least ${THUMBNAIL_RULES.minWidth}×${THUMBNAIL_RULES.minHeight}px`
        );
      }

      const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const { error: uploadError } = await supabase.storage
        .from('article-thumbnails')
        .upload(fileName, file);
      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('article-thumbnails')
        .getPublicUrl(fileName);

      setFormData((prev) => ({ ...prev, thumbnail_url: publicUrlData.publicUrl }));
    } catch (err) {
      setFormData((prev) => ({ ...prev, thumbnail_url: '' }));
      setError(`Image upload failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!GMAIL_RE.test(formData.author_email.trim())) {
        throw new Error('Author email must be a valid @gmail.com address');
      }

      const today = new Date().toISOString().split('T')[0];
      if (formData.publication_date < today) {
        throw new Error('Publication date cannot be in the past');
      }

      if (formData.title.length > 200) {
        throw new Error('Title must be under 200 characters');
      }

      if (formData.body.trim().length < BODY_RULES.min) {
        throw new Error(`Article body must be at least ${BODY_RULES.min} characters`);
      }
      if (formData.body.length > BODY_RULES.max) {
        throw new Error(`Article body must be under ${BODY_RULES.max.toLocaleString()} characters`);
      }

      if (!formData.thumbnail_url) {
        throw new Error('Please upload a thumbnail image');
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
        { article_id: article.id, submitted_by_email: formData.author_email.trim() },
      ]);
      if (submissionError) throw submissionError;

      await supabase.from('audit_logs').insert([
        {
          article_id: article.id,
          action: 'article_submitted',
          performed_by_email: formData.author_email.trim(),
          notes: `Article "${formData.title}" submitted for review`,
        },
      ]);

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

  const emailValid = formData.author_email === '' || GMAIL_RE.test(formData.author_email.trim());
  const bodyLen = formData.body.length;
  const bodyOver = bodyLen > BODY_RULES.max;

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Submit Your Article</h1>
        <p className="text-sm text-gray-500 mb-8">
          Submissions are reviewed by an editor before they appear in Insights.
        </p>

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
            <label className="block text-sm font-medium mb-2">Author Email (Gmail only)</label>
            <input
              type="email"
              name="author_email"
              value={formData.author_email}
              onChange={handleChange}
              required
              placeholder="yourname@gmail.com"
              className={`w-full px-4 py-2 border rounded ${
                emailValid ? 'border-gray-300' : 'border-red-400'
              }`}
            />
            {!emailValid && (
              <p className="text-xs text-red-600 mt-1">Must be a @gmail.com address</p>
            )}
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
            <div className="text-xs text-gray-600 mb-2 rounded bg-gray-50 border border-gray-200 p-3 space-y-1">
              <p>
                <strong>Required size:</strong> {THUMBNAIL_RULES.recommendedWidth} ×{' '}
                {THUMBNAIL_RULES.recommendedHeight} px (16:9 landscape)
              </p>
              <p>
                <strong>Minimum:</strong> {THUMBNAIL_RULES.minWidth} × {THUMBNAIL_RULES.minHeight} px
              </p>
              <p>
                <strong>Format:</strong> JPG, PNG or WebP • <strong>Max file size:</strong>{' '}
                {THUMBNAIL_RULES.maxBytes / 1024 / 1024} MB
              </p>
            </div>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageUpload}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
            {uploadingImage && <p className="text-xs text-gray-500 mt-1">Uploading…</p>}
            {formData.thumbnail_url && (
              <img
                src={formData.thumbnail_url}
                alt="Thumbnail preview"
                className="mt-4 w-full max-w-md rounded border border-gray-200 aspect-video object-cover"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Article Body</label>
            <textarea
              name="body"
              value={formData.body}
              onChange={handleChange}
              required
              maxLength={BODY_RULES.max}
              rows={12}
              className="w-full px-4 py-2 border border-gray-300 rounded font-mono text-sm"
            />
            <p className={`text-xs mt-1 ${bodyOver ? 'text-red-600' : 'text-gray-500'}`}>
              {bodyLen.toLocaleString()} / {BODY_RULES.max.toLocaleString()} characters maximum
              {' '}(~{Math.round(bodyLen / 5.5).toLocaleString()} words) • minimum{' '}
              {BODY_RULES.min} characters
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
            disabled={loading || uploadingImage}
            className="w-full bg-blue-600 text-white py-3 rounded font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Article'}
          </button>
        </form>
      </div>
    </div>
  );
}
