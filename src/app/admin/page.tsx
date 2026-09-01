'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

type Submission = {
  id: string;
  article_id: string;
  submitted_by_email: string;
  admin_notes: string | null;
  reviewed_by_email: string | null;
  reviewed_at: string | null;
  created_at: string;
  articles: {
    id: string;
    title: string;
    topic: string;
    author_name: string;
    status: string;
  } | null;
};

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [reviewNote, setReviewNote] = useState('');
  const [approving, setApproving] = useState(false);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('submissions')
        .select(
          `
          id,
          article_id,
          submitted_by_email,
          admin_notes,
          reviewed_by_email,
          reviewed_at,
          created_at,
          articles (
            id,
            title,
            topic,
            author_name,
            status
          )
        `
        )
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubmissions((data || []) as unknown as Submission[]);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (submissionId: string, articleId: string) => {
    setApproving(true);
    try {
      const { error: updateError } = await supabase
        .from('submissions')
        .update({
          reviewed_at: new Date().toISOString(),
          reviewed_by_email: 'eyenewsindiaa@gmail.com',
          admin_notes: reviewNote || 'Approved',
        })
        .eq('id', submissionId);

      if (updateError) throw updateError;

      const { error: articleError } = await supabase
        .from('articles')
        .update({
          status: 'approved',
          updated_at: new Date().toISOString(),
        })
        .eq('id', articleId);

      if (articleError) throw articleError;

      const { error: auditError } = await supabase.from('audit_logs').insert([
        {
          article_id: articleId,
          action: 'article_approved',
          performed_by_email: 'eyenewsindiaa@gmail.com',
          notes: reviewNote || 'Article approved for publication',
        },
      ]);

      if (auditError) throw auditError;

      setSelectedId(null);
      setReviewNote('');
      fetchSubmissions();
    } catch (error) {
      console.error('Error approving submission:', error);
      alert('Failed to approve submission');
    } finally {
      setApproving(false);
    }
  };

  const handleReject = async (submissionId: string, articleId: string) => {
    if (!reviewNote.trim()) {
      alert('Please provide a rejection reason');
      return;
    }

    setApproving(true);
    try {
      const { error: updateError } = await supabase
        .from('submissions')
        .update({
          reviewed_at: new Date().toISOString(),
          reviewed_by_email: 'eyenewsindiaa@gmail.com',
          admin_notes: `Rejected: ${reviewNote}`,
        })
        .eq('id', submissionId);

      if (updateError) throw updateError;

      const { error: articleError } = await supabase
        .from('articles')
        .update({
          status: 'rejected',
          updated_at: new Date().toISOString(),
        })
        .eq('id', articleId);

      if (articleError) throw articleError;

      const { error: auditError } = await supabase.from('audit_logs').insert([
        {
          article_id: articleId,
          action: 'article_rejected',
          performed_by_email: 'eyenewsindiaa@gmail.com',
          notes: `Rejected: ${reviewNote}`,
        },
      ]);

      if (auditError) throw auditError;

      setSelectedId(null);
      setReviewNote('');
      fetchSubmissions();
    } catch (error) {
      console.error('Error rejecting submission:', error);
      alert('Failed to reject submission');
    } finally {
      setApproving(false);
    }
  };

  const pendingSubmissions = submissions.filter((s) => !s.reviewed_at);
  const reviewedSubmissions = submissions.filter((s) => s.reviewed_at);

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
          <div className="text-center py-12">
            <p className="text-gray-600">Loading submissions...</p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Pending Submissions ({pendingSubmissions.length})</h2>
              {pendingSubmissions.length === 0 ? (
                <p className="text-gray-600">No pending submissions</p>
              ) : (
                <div className="space-y-4">
                  {pendingSubmissions.map((submission) => (
                    <div key={submission.id} className="bg-white p-6 rounded-lg shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold">{submission.articles?.title}</h3>
                          <p className="text-gray-600">
                            By {submission.articles?.author_name} • {submission.articles?.topic}
                          </p>
                          <p className="text-sm text-gray-500">
                            Submitted by: {submission.submitted_by_email}
                          </p>
                        </div>
                        <button
                          onClick={() => setSelectedId(selectedId === submission.id ? null : submission.id)}
                          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                          {selectedId === submission.id ? 'Hide' : 'Review'}
                        </button>
                      </div>

                      {selectedId === submission.id && (
                        <div className="mt-4 pt-4 border-t">
                          <textarea
                            value={reviewNote}
                            onChange={(e) => setReviewNote(e.target.value)}
                            placeholder="Add admin notes or rejection reason..."
                            rows={3}
                            className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleApprove(submission.id, submission.article_id)}
                              disabled={approving}
                              className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
                            >
                              {approving ? 'Processing...' : 'Approve'}
                            </button>
                            <button
                              onClick={() => handleReject(submission.id, submission.article_id)}
                              disabled={approving || !reviewNote.trim()}
                              className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 disabled:opacity-50"
                            >
                              {approving ? 'Processing...' : 'Reject'}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Reviewed Submissions ({reviewedSubmissions.length})</h2>
              {reviewedSubmissions.length === 0 ? (
                <p className="text-gray-600">No reviewed submissions</p>
              ) : (
                <div className="space-y-4">
                  {reviewedSubmissions.map((submission) => (
                    <div key={submission.id} className="bg-white p-6 rounded-lg shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold">{submission.articles?.title}</h3>
                          <p className="text-gray-600">Status: {submission.articles?.status}</p>
                          <p className="text-sm text-gray-500">
                            Reviewed by: {submission.reviewed_by_email}
                          </p>
                          <p className="text-sm text-gray-500">
                            Notes: {submission.admin_notes}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
