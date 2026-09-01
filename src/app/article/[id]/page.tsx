'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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
  created_at: string;
};

export default function ArticlePage() {
  const params = useParams();
  const id = params.id as string;
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .eq('status', 'approved')
        .single();

      if (error) throw error;
      setArticle(data);
    } catch (error) {
      console.error('Error fetching article:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {
    if (!article) return;

    setDownloading(true);
    try {
      const element = document.getElementById('article-content');
      if (!element) throw new Error('Article content not found');

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
      });

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= 297;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= 297;
      }

      pdf.save(`${article.title.replace(/\s+/g, '-')}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to download PDF');
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">Loading article...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">Article not found or not published yet</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Article Content for PDF */}
        <div id="article-content" className="space-y-8">
          {/* Thumbnail */}
          {article.thumbnail_url && (
            <div className="relative w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={article.thumbnail_url}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Heading */}
          <h1 className="text-5xl font-bold leading-tight">{article.title}</h1>

          {/* Topic */}
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-lg font-semibold text-blue-600">{article.topic}</span>
            {article.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>

          {/* Metadata */}
          <div className="border-t border-b border-gray-200 py-4">
            <p className="text-gray-600">
              By <span className="font-semibold">{article.author_name}</span>
            </p>
            <p className="text-gray-600">
              Published on {new Date(article.publication_date).toLocaleDateString()}
            </p>
            {article.author_bio && <p className="text-gray-600 mt-2">{article.author_bio}</p>}
          </div>

          {/* Body */}
          <div className="prose prose-lg max-w-none whitespace-pre-wrap leading-relaxed">
            {article.body}
          </div>
        </div>

        {/* Download Button */}
        <div className="mt-12 flex gap-4 justify-center sticky bottom-8">
          <button
            onClick={downloadPDF}
            disabled={downloading}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
          >
            {downloading ? 'Generating PDF...' : 'Download as PDF'}
          </button>
          <a
            href="/"
            className="bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
