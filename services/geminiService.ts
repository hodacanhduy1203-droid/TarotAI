import { GoogleGenAI } from '@google/genai';
import { DrawnCard } from '../types';

export const interpretReading = async (
  question: string,
  drawnCards: DrawnCard[]
): Promise<ReadableStream<string>> => {
  try {
    // Priority: 
    // 1. Manually entered key in localStorage (for custom domains like Vercel)
    // 2. User selected key (API_KEY from AI Studio)
    // 3. System provided key (GEMINI_API_KEY)
    const manualKey = typeof window !== 'undefined' ? localStorage.getItem('MANUAL_GEMINI_API_KEY') : null;
    const apiKey = manualKey || process.env.API_KEY || process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      throw new Error('Chưa có API Key. Vui lòng kết nối tài khoản Google hoặc nhập Key cá nhân.');
    }

    const ai = new GoogleGenAI({ apiKey });
    const modelId = "gemini-2.5-flash";

    const cardsDescription = drawnCards.map((c: any, index: number) => 
      `${index + 1}. Vị trí: ${c.positionName}\n   - Lá bài: ${c.card.name_vi} (${c.card.name_en}) [${c.isReversed ? 'Ngược' : 'Xuôi'}]\n   - Ý nghĩa cơ bản: ${c.isReversed ? c.card.meaning_reversed : c.card.meaning_upright}`
    ).join('\n');

    const systemInstruction = `
      Bạn là một Tarot Reader chuyên nghiệp, sâu sắc và tận tâm.
      Nhiệm vụ của bạn gồm 2 phần rõ ràng:
      1. PHÂN TÍCH CHI TIẾT TỪNG LÁ BÀI:
         - Đi sâu vào ý nghĩa của từng lá bài cụ thể trong bối cảnh của vị trí nó xuất hiện.
         - Giải thích hình ảnh hoặc biểu tượng nổi bật của lá bài.
      
      2. TỔNG HỢP VÀ LỜI KHUYÊN:
         - Kết nối các lá bài lại với nhau.
         - Đưa ra lời khuyên hành động cụ thể cho người hỏi.
      Phong cách:
      - Giọng văn huyền bí, nhẹ nhàng nhưng thực tế và mang tính chữa lành.
      - Trình bày rõ ràng, tách đoạn để dễ đọc trên điện thoại.
      - Ngôn ngữ: Tiếng Việt.
    `;

    const userPrompt = `
      Câu hỏi của người xem: "${question || "Xem tổng quan vận mệnh/lời khuyên hiện tại"}"
      Các lá bài đã rút được theo trải bài:\n${cardsDescription}
      Hãy bắt đầu buổi xem bài ngay.
    `;

    const responseStream = await ai.models.generateContentStream({
      model: modelId,
      contents: userPrompt,
      config: {
        temperature: 0.7,
        systemInstruction: systemInstruction,
      }
    });

    return new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of responseStream) {
            if (chunk.text) {
              controller.enqueue(chunk.text);
            }
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      }
    });
  } catch (error) {
    console.error('Error fetching tarot reading:', error);
    return new ReadableStream({
        start(controller) {
            controller.enqueue("Không thể kết nối với Vũ trụ (Lỗi máy chủ hoặc API Key). Tuy nhiên, bạn vẫn có thể tự chiêm nghiệm qua ý nghĩa các lá bài đã trổ hiện.");
            controller.close();
        }
    });
  }
};