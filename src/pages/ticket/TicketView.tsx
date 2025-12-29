// src/pages/TicketView.jsx
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const TicketView = () => {
    const [searchParams] = useSearchParams();
    const [htmlContent, setHtmlContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');

    // Lấy link file từ URL (ví dụ: localhost:3000/ticket?transcript=https://cdn.discord...)
    const transcriptUrl = searchParams.get('transcript');

    useEffect(() => {
        if (!transcriptUrl) {
            setError("Không tìm thấy đường dẫn file ticket.");
            setLoading(false);
            return;
        }

        const fetchHtml = async () => {
            try {
                // Fetch nội dung file HTML từ Discord CDN
                const response = await fetch(transcriptUrl);
                
                if (!response.ok) throw new Error("Không thể tải file ticket");
                
                const text = await response.text();
                setHtmlContent(text);
            } catch (err) {
                console.error(err);
                setError("Có lỗi khi tải file log. Link có thể đã hết hạn hoặc bị chặn CORS.");
            } finally {
                setLoading(false);
            }
        };

        fetchHtml();
    }, [transcriptUrl]);

    if (loading) return <div className="p-10 text-center">Đang tải ticket...</div>;
    if (error) return <div className="p-10 text-center text-red-500">{error}</div>;

    return (
        <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
            {/* Sử dụng iframe để render HTML nguyên bản mà không bị vỡ style */}
            <iframe
                title="Ticket Transcript"
                srcDoc={htmlContent}
                style={{ width: '100%', height: '100%', border: 'none' }}
                sandbox="allow-scripts allow-same-origin" // Cho phép script cơ bản của discord-transcripts chạy
            />
        </div>
    );
};

export default TicketView;