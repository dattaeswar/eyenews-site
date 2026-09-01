'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

type Article = {
  id: string;
  title: string;
  topic: string;
  body: string;
  author_name: string;
  author_bio: string;
  thumbnail_url: string;
  tags: string[];
  publication_date: string;
  status: string;
};

type Submission = {
  id: string;
  article_id: string;
  submitted_by_email: string;
  admin_notes: string | null;
  reviewed_by_email: string | null;
  reviewed_at: string | null;
  created_at: string;
  articles: Article | null;
};

const REVIEWER_EMAIL = 'eyenewsindiaa@gmail.com';

const SELECT = `
  id, article_id, submitted_by_email, admin_notes, reviewed_by_email, reviewed_at, created_at,
  articles ( id, title, topic, body, author_name, author_bio, thumbnail_url, tags, publication_date, status )
`;

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);
  const [reviewNote, setReviewNote] = useState('');
  const [busy, setBusy] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Article | null>(null);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('submissions')
        .select(SELECT)
        .order('created_at', { ascending: false });
      if (error) throw error;
      setSubmissions((data || []) as unknown as Submission[]);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const setArticleStatus = async (
    submissionId: string,
    articleId: string,
    status: 'approved' | 'rejected',
    note: string
  ) => {
    setBusy(true);
    try {
      const notes = status === 'rejected' ? `Rejected: ${note}` : note || 'Approved';
      await supabase
        .from('submissions')
        .update({
          reviewed_at: new Date().toISOString(),
          reviewed_by_email: REVIEWER_EMAIL,
          admin_notes: notes,
        })
        .eq('id', submissionId);
      await supabase
        .from('articles')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', articleId);
      await supabase.from('audit_logs').insert([
        {
          article_id: articleId,
          action: `article_${status}`,
          performed_by_email: REVIEWER_EMAIL,
          notes,
        },
      ]);
      setOpenId(null);
      setReviewNote('');
      await fetchSubmissions();
    } catch (error) {
      console.error(error);
      alert(`Failed to ${status === 'approved' ? 'approve' : 'reject'} submission`);
    } finally {
      setBusy(false);
    }
  };

  const handleApprove = (s: Submission) =>
    setArticleStatus(s.id, s.article_id, 'approved', reviewNote);

  const handleReject = (s: Submission) => {
    if (!reviewNote.trim()) return alert('Please provide a rejection reason');
    setArticleStatus(s.id, s.article_id, 'rejected', reviewNote);
  };

  const handleDelete = async (s: Submission) => {
    if (
      !confirm(
        `Delete "${s.articles?.title}" permanently? This removes the article and its submission record and cannot be undone.`
      )
    )
      return;
    setBusy(true);
    try {
      await supabase.from('audit_logs').delete().eq('article_id', s.article_id);
      await supabase.from('submissions').delete().eq('article_id', s.article_id);
      const { error } = await supabase.from('articles').delete().eq('id', s.article_id);
      if (error) throw error;
      setOpenId(null);
      await fetchSubmissions();
    } catch (error) {
      console.error(error);
      alert('Failed to delete article');
    } finally {
      setBusy(false);
    }
  };

  const startEdit = (a: Article) => {
    setEditId(a.id);
    setDraft({ ...a, tags: a.tags ?? [] });
  };

  const saveEdit = async (articleId: string) => {
    if (!draft) return;
    setBusy(true);
    try {
      const { error } = await supabase
        .from('articles')
        .update({
          title: draft.title,
          topic: draft.topic,
          body: draft.body,
          author_name: draft.author_name,
          author_bio: draft.author_bio,
          thumbnail_url: draft.thumbnail_url,
          tags: draft.tags,
          publication_date: draft.publication_date,
          updated_at: new Date().toISOString(),
        })
        .eq('id', articleId);
      if (error) throw error;
      await supabase.from('audit_logs').insert([
        {
          article_id: articleId,
          action: 'article_edited',
          performed_by_email: REVIEWER_EMAIL,
          notes: 'Article edited by admin',
        },
      ]);
      setEditId(null);
      setDraft(null);
      await fetchSubmissions();
    } catch (error) {
      console.error(error);
      alert('Failed to save changes');
    } finally {
      setBusy(false);
    }
  };

  const pending = submissions.filter((s) => !s.reviewed_at);
  const reviewed = submissions.filter((s) => s.reviewed_at);

  const renderArticleView = (a: Article) => (
    <div className="mt-4 space-y-3 text-sm">
      {a.thumbnail_url ? (
        <img
          src={a.thumbnail_url}
          alt={a.title}
          className="w-full max-w-lg rounded border border-gray-200 aspect-video object-cover"
        />
      ) : (
        <p className="text-gray-400">No thumbnail uploaded</p>
      )}
      <p><span className="font-semibold">Topic:</span> {a.topic}</p>
      <p><span className="font-semibold">Tags:</span> {a.tags?.join(', ') || '—'}</p>
      <p><span className="font-semibold">Publication date:</span> {new Date(a.publication_date).toLocaleDateString()}</p>
      <p><span className="font-semibold">Author bio:</span> {a.author_bio || '—'}</p>
      <div>
        <p className="font-semibold mb-1">Body ({a.body.length.toLocaleString()} chars)</p>
        <div className="max-h-80 overflow-y-auto whitespace-pre-wrap rounded bg-gray-50 border border-gray-200 p-3 leading-relaxed">
          {a.body}
        </div>
      </div>
    </div>
  );

  const field = (label: string, key: keyof Article, textarea = false) => (
    <label className="block">
      <span className="text-xs font-medium text-gray-600">{label}</span>
      {textarea ? (
        <textarea
          value={(draft?.[key] as string) ?? ''}
          onChange={(e) => setDraft((d) => (d ? { ...d, [key]: e.target.value } : d))}
          rows={key === 'body' ? 10 : 2}
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded text-sm"
        />
      ) : (
        <input
          value={(draft?.[key] as string) ?? ''}
          onChange={(e) => setDraft((d) => (d ? { ...d, [key]: e.target.value } : d))}
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded text-sm"
        />
      )}
    </label>
  );

  const renderEditForm = (articleId: string) => (
    <div className="mt-4 space-y-3">
      {field('Title', 'title')}
      {field('Topic', 'topic')}
      {field('Thumbnail URL', 'thumbnail_url')}
      <label className="block">
        <span className="text-xs font-medium text-gray-600">Tags (comma-separated)</span>
        <input
          value={draft?.tags?.join(', ') ?? ''}
          onChange={(e) =>
            setDraft((d) =>
              d ? { ...d, tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean) } : d
            )
          }
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded text-sm"
        />
      </label>
      <label className="block">
        <span className="text-xs font-medium text-gray-600">Publication date</span>
        <input
          type="date"
          value={draft?.publication_date?.split('T')[0] ?? ''}
          onChange={(e) => setDraft((d) => (d ? { ...d, publication_date: e.target.value } : d))}
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded text-sm"
        />
      </label>
      {field('Author name', 'author_name')}
      {field('Author bio', 'author_bio', true)}
      {field('Body', 'body', true)}
      <div className="flex gap-2">
        <button
          onClick={() => saveEdit(articleId)}
          disabled={busy}
          className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 disabled:opacity-50"
        >
          Save changes
        </button>
        <button
          onClick={() => {
            setEditId(null);
            setDraft(null);
          }}
          className="bg-gray-200 px-4 py-2 rounded text-sm hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </div>
  );

  const renderCard = (s: Submission, isPending: boolean) => {
    const a = s.articles;
    const isOpen = openId === s.id;
    const isEditing = a && editId === a.id;
    return (
      <div key={s.id} className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="text-xl font-semibold">{a?.title ?? '(article missing)'}</h3>
            <p className="text-gray-600">
              By {a?.author_name} • {a?.topic}
            </p>
            <p className="text-sm text-gray-500">Submitted by: {s.submitted_by_email}</p>
            {!isPending && (
              <>
                <p className="text-sm text-gray-500">Status: {a?.status}</p>
                <p className="text-sm text-gray-500">Notes: {s.admin_notes}</p>
              </>
            )}
          </div>
          <button
            onClick={() => {
              setOpenId(isOpen ? null : s.id);
              setEditId(null);
              setReviewNote('');
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 shrink-0"
          >
            {isOpen ? 'Hide' : 'View / Manage'}
          </button>
        </div>

        {isOpen && a && (
          <div className="mt-4 pt-4 border-t">
            {isEditing ? renderEditForm(a.id) : renderArticleView(a)}

            {!isEditing && (
              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  onClick={() => startEdit(a)}
                  className="bg-amber-500 text-white px-4 py-2 rounded text-sm hover:bg-amber-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(s)}
                  disabled={busy}
                  className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700 disabled:opacity-50"
                >
                  Delete
                </button>
                {a.status === 'approved' && (
                  <Link
                    href={`/article/${a.id}`}
                    target="_blank"
                    className="bg-gray-200 px-4 py-2 rounded text-sm hover:bg-gray-300"
                  >
                    Open live page ↗
                  </Link>
                )}
              </div>
            )}

            {isPending && !isEditing && (
              <div className="mt-5 pt-4 border-t">
                <textarea
                  value={reviewNote}
                  onChange={(e) => setReviewNote(e.target.value)}
                  placeholder="Add admin notes or rejection reason..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded mb-3"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleApprove(s)}
                    disabled={busy}
                    className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
                  >
                    {busy ? 'Processing...' : 'Approve & Publish'}
                  </button>
                  <button
                    onClick={() => handleReject(s)}
                    disabled={busy || !reviewNote.trim()}
                    className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 disabled:opacity-50"
                  >
                    {busy ? 'Processing...' : 'Reject'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            Back to Home
          </Link>
        </div>

        {loading ? (
          <p className="text-gray-600 text-center py-12">Loading submissions...</p>
        ) : (
          <>
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-4">Pending Submissions ({pending.length})</h2>
              {pending.length === 0 ? (
                <p className="text-gray-600">No pending submissions</p>
              ) : (
                <div className="space-y-4">{pending.map((s) => renderCard(s, true))}</div>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Reviewed Submissions ({reviewed.length})</h2>
              {reviewed.length === 0 ? (
                <p className="text-gray-600">No reviewed submissions</p>
              ) : (
                <div className="space-y-4">{reviewed.map((s) => renderCard(s, false))}</div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
