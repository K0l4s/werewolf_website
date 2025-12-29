import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const TicketView = () => {
    const [searchParams] = useSearchParams();
    const [htmlContent, setHtmlContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');

    // Link gốc từ Discord (lấy từ URL parameter)
    const transcriptUrl = searchParams.get('transcript');

    // Cấu hình URL backend của bạn (Bot đang chạy ở port nào?)
    // Ví dụ bot chạy port 3001, React chạy 3000
    // const API_BASE_URL = "http://localhost:3001"; 
    const baseURL: string = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1/";
    useEffect(() => {
        if (!transcriptUrl) {
            setError("Không tìm thấy đường dẫn file ticket.");
            setLoading(false);
            return;
        }

        const fetchHtml = async () => {
            try {
                // GỌI QUA PROXY BACKEND thay vì gọi trực tiếp
                // Encode URL để truyền an toàn qua query string
                const proxyUrl = `${baseURL}view/transcript?url=${encodeURIComponent(transcriptUrl)}`;
                
                const response = await fetch(proxyUrl);
                
                if (!response.ok) {
                    throw new Error(`Lỗi Server: ${response.statusText}`);
                }
                
                const text = await response.text();
                setHtmlContent(text);
            } catch (err) {
                console.error(err);
                setError("Không thể tải nội dung. Hãy đảm bảo Bot/Backend đang chạy.");
            } finally {
                setLoading(false);
            }
        };

        fetchHtml();
    }, [transcriptUrl]);

    if (loading) return <div className="text-center p-4">Đang tải dữ liệu từ Discord...</div>;
    if (error) return <div className="text-center p-4 text-red-500 font-bold">{error}</div>;

    return (
        <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
            <iframe
                title="Ticket Transcript"
                srcDoc={htmlContent}
                style={{ width: '100%', height: '100%', border: 'none' }}
                // sandbox="allow-scripts" // Bỏ bớt allow-same-origin để an toàn hơn nếu muốn
            />
        </div>
    );
};

export default TicketView;