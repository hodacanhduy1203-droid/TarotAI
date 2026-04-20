import { TarotCardData, SpreadType } from './types';

// Bộ Ẩn Chính (Major Arcana) - 22 lá - Đầy đủ với ý nghĩa chi tiết hơn
export const MAJOR_ARCANA: TarotCardData[] = [
  { 
    id: 'ar00', name_vi: 'Chàng Khờ', name_en: 'The Fool', type: 'major', number: 0, 
    meaningKeywords: ['Khởi đầu mới', 'Ngây thơ', 'Tự do'],
    meaning_upright: 'Đại diện cho những khởi đầu mới đầy hứng khởi và niềm tin thuần khiết vào vũ trụ. Bạn đang đứng trước một hành trình mới với trái tim rộng mở, sẵn sàng đón nhận những bất ngờ mà không sợ hãi rủi ro. Hãy lắng nghe đứa trẻ bên trong bạn.',
    meaning_reversed: 'Cảnh báo về sự liều lĩnh, ngây ngô hoặc thiếu chuẩn bị. Bạn có thể đang lao vào một tình huống mà không suy xét kỹ hậu quả, hoặc đang chần chừ không dám bước đi vì sợ hãi.'
  },
  { 
    id: 'ar01', name_vi: 'Nhà Ảo Thuật', name_en: 'The Magician', type: 'major', number: 1, 
    meaningKeywords: ['Sức mạnh', 'Kỹ năng', 'Hành động'],
    meaning_upright: 'Bạn có đầy đủ mọi công cụ, kỹ năng và nguồn lực cần thiết để biến ước mơ thành hiện thực. Đây là thời điểm vàng để hành động, tập trung ý chí và thể hiện năng lực bản thân.',
    meaning_reversed: 'Dấu hiệu của tài năng chưa được khai phá, sự trì hoãn hoặc lạm dụng quyền lực để thao túng người khác. Có thể bạn đang thiếu tự tin hoặc có ý định không trung thực.'
  },
  { 
    id: 'ar02', name_vi: 'Nữ Tư Tế', name_en: 'The High Priestess', type: 'major', number: 2, 
    meaningKeywords: ['Trực giác', 'Bí ẩn', 'Tiềm thức'],
    meaning_upright: 'Hãy tĩnh lặng và lắng nghe tiếng nói trực giác bên trong. Câu trả lời bạn tìm kiếm không nằm ở thế giới bên ngoài mà ẩn sâu trong tiềm thức. Có những bí ẩn chưa đến lúc được tiết lộ.',
    meaning_reversed: 'Bạn đang phớt lờ trực giác của mình hoặc quá tập trung vào ý kiến của người khác. Cẩn thận với những bí mật bị che giấu hoặc sự hời hợt trong cảm xúc.'
  },
  { 
    id: 'ar03', name_vi: 'Nữ Hoàng', name_en: 'The Empress', type: 'major', number: 3, 
    meaningKeywords: ['Màu mỡ', 'Thiên nhiên', 'Sáng tạo'],
    meaning_upright: 'Biểu tượng của sự trù phú, vẻ đẹp và tình mẫu tử. Đây là thời gian tuyệt vời để nuôi dưỡng các dự án sáng tạo, chăm sóc bản thân và kết nối với thiên nhiên. Mọi thứ đang phát triển tốt đẹp.',
    meaning_reversed: 'Cảm giác thiếu thốn tình cảm, cạn kiệt năng lượng sáng tạo hoặc sự phụ thuộc quá mức. Bạn có thể đang bỏ bê bản thân hoặc gặp khó khăn trong việc bày tỏ cảm xúc.'
  },
  { 
    id: 'ar04', name_vi: 'Hoàng Đế', name_en: 'The Emperor', type: 'major', number: 4, 
    meaningKeywords: ['Quyền lực', 'Cấu trúc', 'Ổn định'],
    meaning_upright: 'Đại diện cho cấu trúc, luật lệ và sự ổn định. Bạn cần áp dụng kỷ luật và tư duy logic để giải quyết vấn đề. Vai trò lãnh đạo hoặc một người đàn ông quyền lực có thể ảnh hưởng đến bạn lúc này.',
    meaning_reversed: 'Sự độc đoán, cứng nhắc và lạm quyền. Có thể bạn đang thiếu kỷ luật tự giác dẫn đến hỗn loạn, hoặc đang bị kìm kẹp bởi những quy tắc quá khắt khe.'
  },
  { 
    id: 'ar05', name_vi: 'Giáo Hoàng', name_en: 'The Hierophant', type: 'major', number: 5, 
    meaningKeywords: ['Truyền thống', 'Niềm tin', 'Giáo dục'],
    meaning_upright: 'Khuyên bạn nên tuân theo các giá trị truyền thống, tìm kiếm lời khuyên từ người thầy hoặc tham gia vào các tổ chức đã được thiết lập. Sự học hỏi và niềm tin tâm linh là chìa khóa.',
    meaning_reversed: 'Sự phá vỡ các quy tắc cũ kỹ, thách thức hiện trạng hoặc cảm thấy bị gò bó bởi các chuẩn mực xã hội. Bạn muốn tìm con đường riêng thay vì đi theo lối mòn.'
  },
  { 
    id: 'ar06', name_vi: 'Tình Nhân', name_en: 'The Lovers', type: 'major', number: 6, 
    meaningKeywords: ['Tình yêu', 'Sự lựa chọn', 'Hòa hợp'],
    meaning_upright: 'Tình yêu đôi lứa, sự hòa hợp sâu sắc và những mối quan hệ ý nghĩa. Lá bài cũng nói về những ngã rẽ quan trọng, nơi bạn phải lựa chọn dựa trên tiếng gọi của trái tim.',
    meaning_reversed: 'Sự mất cân bằng, mâu thuẫn trong nội tâm hoặc rạn nứt trong mối quan hệ. Bạn có thể đang đứng trước một lựa chọn sai lầm hoặc trốn tránh trách nhiệm tình cảm.'
  },
  { 
    id: 'ar07', name_vi: 'Chiến Xa', name_en: 'The Chariot', type: 'major', number: 7, 
    meaningKeywords: ['Chiến thắng', 'Ý chí', 'Kiểm soát'],
    meaning_upright: 'Chiến thắng sẽ đến thông qua ý chí kiên cường và sự kiểm soát bản thân. Hãy tập trung cao độ vào mục tiêu, giữ vững tay lái và vượt qua mọi trở ngại đang chắn đường.',
    meaning_reversed: 'Mất kiểm soát tình hình, sự hung hăng thiếu suy nghĩ hoặc bị phân tán tư tưởng. Bạn có thể đang đi sai hướng hoặc để cảm xúc chi phối hành động.'
  },
  { 
    id: 'ar08', name_vi: 'Sức Mạnh', name_en: 'Strength', type: 'major', number: 8, 
    meaningKeywords: ['Can đảm', 'Kiên nhẫn', 'Lòng trắc ẩn'],
    meaning_upright: 'Sức mạnh thực sự không đến từ cơ bắp mà từ nội tâm vững chãi. Sự kiên nhẫn, lòng trắc ẩn và khả năng kiểm soát bản năng sẽ giúp bạn vượt qua thử thách nhẹ nhàng.',
    meaning_reversed: 'Sự yếu đuối, thiếu tự tin hoặc để nỗi sợ hãi lấn át. Bạn có thể đang nghi ngờ khả năng của chính mình hoặc phản ứng thái quá trước khó khăn.'
  },
  { 
    id: 'ar09', name_vi: 'Ẩn Sĩ', name_en: 'The Hermit', type: 'major', number: 9, 
    meaningKeywords: ['Cô độc', 'Suy ngẫm', 'Hướng nội'],
    meaning_upright: 'Thời gian để rút lui khỏi ồn ào bên ngoài, tìm về sự tĩnh lặng để suy ngẫm và tìm kiếm ánh sáng chân lý bên trong. Sự cô đơn lúc này là cần thiết và chữa lành.',
    meaning_reversed: 'Sự cô lập tiêu cực, xa lánh xã hội hoặc từ chối nhìn nhận sự thật. Bạn có thể đang cảm thấy lạc lõng, cô đơn không mong muốn.'
  },
  { 
    id: 'ar10', name_vi: 'Bánh Xe Số Phận', name_en: 'Wheel of Fortune', type: 'major', number: 10, 
    meaningKeywords: ['May mắn', 'Thay đổi', 'Chu kỳ'],
    meaning_upright: 'Vận mệnh đang xoay chuyển, mang đến những cơ hội bất ngờ và may mắn. Hãy chấp nhận sự thay đổi như một phần tất yếu của cuộc sống và nắm bắt thời cơ.',
    meaning_reversed: 'Giai đoạn khó khăn, vận rủi hoặc sự kháng cự lại thay đổi. Cảm giác mất kiểm soát trước hoàn cảnh, nhưng hãy nhớ rằng bánh xe sẽ tiếp tục quay.'
  },
  { 
    id: 'ar11', name_vi: 'Công Lý', name_en: 'Justice', type: 'major', number: 11, 
    meaningKeywords: ['Công bằng', 'Sự thật', 'Luật nhân quả'],
    meaning_upright: 'Sự công bằng sẽ được thực thi. Mọi hành động đều có hệ quả (Karma). Nếu bạn hành động đúng đắn, bạn sẽ nhận được kết quả xứng đáng. Hãy trung thực và khách quan.',
    meaning_reversed: 'Sự bất công, thiên vị hoặc thiếu trung thực. Có thể bạn đang trốn tránh trách nhiệm về hành động của mình hoặc bị đối xử không công bằng.'
  },
  { 
    id: 'ar12', name_vi: 'Người Treo Ngược', name_en: 'The Hanged Man', type: 'major', number: 12, 
    meaningKeywords: ['Hy sinh', 'Góc nhìn mới', 'Chờ đợi'],
    meaning_upright: 'Đôi khi cần phải dừng lại, hy sinh một điều gì đó hoặc chấp nhận lùi một bước để nhìn nhận vấn đề ở góc độ hoàn toàn mới. Sự giác ngộ đến từ việc buông bỏ.',
    meaning_reversed: 'Sự trì hoãn vô ích, hy sinh không đáng hoặc cố chấp giữ quan điểm cũ kỹ. Bạn đang vùng vẫy nhưng không thoát ra được vì chưa chịu thay đổi tư duy.'
  },
  { 
    id: 'ar13', name_vi: 'Tử Thần', name_en: 'Death', type: 'major', number: 13, 
    meaningKeywords: ['Kết thúc', 'Chuyển đổi', 'Tái sinh'],
    meaning_upright: 'Đừng sợ hãi, lá bài này hiếm khi nói về cái chết vật lý. Nó báo hiệu sự kết thúc của một giai đoạn cũ kỹ để mở đường cho sự tái sinh và chuyển đổi mạnh mẽ.',
    meaning_reversed: 'Sự kháng cự lại thay đổi, níu kéo quá khứ đã chết. Nỗi sợ hãi trước những điều mới mẻ đang kìm hãm sự phát triển của bạn.'
  },
  { 
    id: 'ar14', name_vi: 'Cân Bằng', name_en: 'Temperance', type: 'major', number: 14, 
    meaningKeywords: ['Cân bằng', 'Điều độ', 'Hòa hợp'],
    meaning_upright: 'Hãy tìm kiếm sự cân bằng và điều độ trong mọi việc. Sự kiên nhẫn, hòa hợp các mặt đối lập và chữa lành dòng chảy năng lượng là thông điệp chính.',
    meaning_reversed: 'Mất cân bằng cuộc sống, hành động thái quá hoặc thiếu kiên nhẫn. Sự xung đột nội tâm hoặc lối sống thiếu lành mạnh đang ảnh hưởng đến bạn.'
  },
  { 
    id: 'ar15', name_vi: 'Ác Quỷ', name_en: 'The Devil', type: 'major', number: 15, 
    meaningKeywords: ['Ràng buộc', 'Cám dỗ', 'Vật chất'],
    meaning_upright: 'Bạn đang bị trói buộc bởi những ham muốn vật chất, sự nghiện ngập hoặc những suy nghĩ tiêu cực. Tuy nhiên, sợi dây xích thường lỏng lẻo, bạn có thể tự giải thoát nếu muốn.',
    meaning_reversed: 'Dấu hiệu của sự thức tỉnh, phá bỏ xiềng xích và thoát khỏi sự kiểm soát độc hại. Bạn đang dần nhận ra giá trị thực sự và tìm lại tự do.'
  },
  { 
    id: 'ar16', name_vi: 'Tòa Tháp', name_en: 'The Tower', type: 'major', number: 16, 
    meaningKeywords: ['Sụp đổ', 'Thảm họa', 'Thay đổi bất ngờ'],
    meaning_upright: 'Sự thay đổi đột ngột, chấn động phá vỡ những nền tảng không vững chắc. Dù đau đớn, sự sụp đổ này là cần thiết để loại bỏ những điều giả tạo và xây dựng lại từ đầu.',
    meaning_reversed: 'Bạn đang cố gắng ngăn chặn một sự thay đổi tất yếu, hoặc thảm họa đã qua đi nhẹ nhàng hơn dự kiến. Đừng trốn tránh sự thật.'
  },
  { 
    id: 'ar17', name_vi: 'Ngôi Sao', name_en: 'The Star', type: 'major', number: 17, 
    meaningKeywords: ['Hy vọng', 'Cảm hứng', 'Thanh bình'],
    meaning_upright: 'Sau cơn bão Tòa Tháp, Ngôi Sao mang đến niềm hy vọng, sự chữa lành và cảm hứng. Hãy giữ vững niềm tin, tương lai tươi sáng và bình yên đang chờ đón bạn.',
    meaning_reversed: 'Cảm giác tuyệt vọng, mất niềm tin vào bản thân hoặc cuộc sống. Bạn đang cảm thấy lạc lõng, thiếu cảm hứng nhưng hãy nhớ ánh sao vẫn luôn ở đó.'
  },
  { 
    id: 'ar18', name_vi: 'Mặt Trăng', name_en: 'The Moon', type: 'major', number: 18, 
    meaningKeywords: ['Ảo ảnh', 'Sợ hãi', 'Vô thức'],
    meaning_upright: 'Mọi thứ không như vẻ bề ngoài. Trực giác, giấc mơ và những nỗi sợ vô thức đang trỗi dậy. Hãy cẩn thận với sự lừa dối hoặc những ảo tưởng mơ hồ.',
    meaning_reversed: 'Sự thật dần được phơi bày, màn sương mù tan biến. Bạn đang dần giải tỏa được những nỗi sợ hãi và nhìn nhận vấn đề rõ ràng hơn.'
  },
  { 
    id: 'ar19', name_vi: 'Mặt Trời', name_en: 'The Sun', type: 'major', number: 19, 
    meaningKeywords: ['Niềm vui', 'Thành công', 'Sinh lực'],
    meaning_upright: 'Lá bài tích cực nhất bộ bài. Niềm vui, thành công rực rỡ, sức sống dồi dào và sự rõ ràng. Mọi bóng tối đều bị xua tan bởi ánh mặt trời ấm áp.',
    meaning_reversed: 'Vẫn là sự tích cực nhưng có thể bị trì hoãn một chút, hoặc bạn đang không nhìn thấy niềm vui giản dị xung quanh mình. Đừng quá bi quan.'
  },
  { 
    id: 'ar20', name_vi: 'Phán Xét', name_en: 'Judgement', type: 'major', number: 20, 
    meaningKeywords: ['Đánh giá', 'Thức tỉnh', 'Tha thứ'],
    meaning_upright: 'Thời điểm của sự thức tỉnh và tái sinh. Tiếng gọi nội tâm thúc giục bạn đánh giá lại quá khứ, tha thứ cho bản thân và bước sang một chương mới cao cả hơn.',
    meaning_reversed: 'Sự nghi ngờ bản thân, chần chừ không dám thay đổi hoặc từ chối lắng nghe tiếng gọi của lương tâm. Bạn đang bị mắc kẹt bởi những hối tiếc.'
  },
  { 
    id: 'ar21', name_vi: 'Thế Giới', name_en: 'The World', type: 'major', number: 21, 
    meaningKeywords: ['Hoàn thành', 'Thành tựu', 'Du lịch'],
    meaning_upright: 'Sự hoàn thành trọn vẹn một chu kỳ lớn. Bạn đã học được bài học, đạt được thành tựu và cảm thấy sự viên mãn. Một cánh cửa mới đang mở ra, có thể liên quan đến du lịch.',
    meaning_reversed: 'Cảm giác thiếu sót, công việc chưa hoàn thành hoặc sự trì hoãn ngay trước vạch đích. Bạn cần giải quyết nốt những vấn đề tồn đọng để thực sự tiến lên.'
  },
];

// Dữ liệu ý nghĩa ngắn gọn cho 56 lá Ẩn Phụ
const MINOR_MEANINGS: Record<string, { up: string, rev: string }> = {
  // WANDS (Gậy) - Lửa, Hành động, Đam mê
  'wands_1': { up: 'Khởi đầu mới tràn đầy năng lượng, cảm hứng sáng tạo và cơ hội hành động.', rev: 'Thiếu định hướng, trì hoãn hoặc năng lượng bị chặn lại.' },
  'wands_2': { up: 'Lập kế hoạch cho tương lai, tầm nhìn xa và quyết định hướng đi.', rev: 'Sợ hãi những điều chưa biết, kế hoạch kém hoặc thiếu tự tin.' },
  'wands_3': { up: 'Mở rộng tầm nhìn, cơ hội từ xa và sự tiến bộ vững chắc.', rev: 'Trở ngại, trì hoãn hoặc thất vọng với kết quả mong đợi.' },
  'wands_4': { up: 'Ăn mừng, niềm vui, sự ổn định và hạnh phúc gia đình.', rev: 'Mâu thuẫn gia đình, cảm giác không ổn định hoặc lễ kỷ niệm bị hủy.' },
  'wands_5': { up: 'Cạnh tranh, xung đột ý kiến hoặc thử thách cần vượt qua.', rev: 'Tránh né xung đột, thỏa hiệp hoặc kết thúc tranh cãi.' },
  'wands_6': { up: 'Chiến thắng, sự công nhận và thành công công khai.', rev: 'Thất bại, thiếu sự công nhận hoặc kiêu ngạo.' },
  'wands_7': { up: 'Đứng vững bảo vệ quan điểm, kiên định trước áp lực.', rev: 'Bỏ cuộc, bị áp đảo hoặc cảm thấy yếu thế.' },
  'wands_8': { up: 'Hành động nhanh chóng, tin tức đến dồn dập, sự di chuyển.', rev: 'Trì hoãn, hiểu lầm hoặc hành động quá vội vàng.' },
  'wands_9': { up: 'Kiên cường, bền bỉ dù mệt mỏi, bảo vệ thành quả.', rev: 'Kiệt sức, cứng đầu hoặc từ bỏ ngay trước đích đến.' },
  'wands_10': { up: 'Gánh nặng trách nhiệm, áp lực lớn nhưng sắp hoàn thành.', rev: 'Buông bỏ gánh nặng, kiệt sức hoàn toàn hoặc trốn tránh trách nhiệm.' },
  'wands_11': { up: 'Tin tức thú vị, sự nhiệt tình trẻ trung và khám phá mới.', rev: 'Tin xấu, thiếu kiên nhẫn hoặc một người trẻ tuổi gây rắc rối.' },
  'wands_12': { up: 'Hành động táo bạo, phiêu lưu và theo đuổi đam mê.', rev: 'Bốc đồng, liều lĩnh hoặc hành động thiếu suy nghĩ.' },
  'wands_13': { up: 'Quyến rũ, tự tin, độc lập và năng lượng thu hút.', rev: 'Ghen tuông, ích kỷ hoặc mất tự tin.' },
  'wands_14': { up: 'Lãnh đạo, tầm nhìn lớn, truyền cảm hứng cho người khác.', rev: 'Độc đoán, bốc đồng hoặc đặt kỳ vọng quá cao.' },

  // CUPS (Ly) - Nước, Cảm xúc, Mối quan hệ
  'cups_1': { up: 'Khởi đầu mới trong tình cảm, tình yêu chớm nở hoặc trực giác mạnh mẽ.', rev: 'Cảm xúc bị kìm nén, thất vọng hoặc tình yêu đơn phương.' },
  'cups_2': { up: 'Kết nối sâu sắc, đối tác ăn ý và sự hòa hợp trong mối quan hệ.', rev: 'Mất cân bằng, chia rẽ hoặc thiếu sự thấu hiểu.' },
  'cups_3': { up: 'Tình bạn, tụ họp vui vẻ và sự sẻ chia cộng đồng.', rev: 'Tin đồn, bị cô lập hoặc tiệc tùng quá đà.' },
  'cups_4': { up: 'Thờ ơ, chán nản hoặc bỏ lỡ cơ hội đang ở ngay trước mắt.', rev: 'Tỉnh ngộ, nắm bắt cơ hội mới hoặc thoát khỏi sự trầm cảm.' },
  'cups_5': { up: 'Đau buồn, mất mát và tập trung vào những điều tiêu cực.', rev: 'Chấp nhận mất mát, chữa lành và nhìn thấy hy vọng còn lại.' },
  'cups_6': { up: 'Hoài niệm, ký ức tuổi thơ và sự ngây thơ vui vẻ.', rev: 'Mắc kẹt trong quá khứ, không chịu trưởng thành.' },
  'cups_7': { up: 'Nhiều lựa chọn, ảo tưởng và mơ mộng viển vông.', rev: 'Lựa chọn thực tế, nhìn rõ sự thật và quyết đoán hơn.' },
  'cups_8': { up: 'Bỏ lại quá khứ để tìm kiếm ý nghĩa cao cả hơn, sự ra đi.', rev: 'Sợ thay đổi, quay lại tình huống cũ hoặc do dự.' },
  'cups_9': { up: 'Mãn nguyện, ước mơ thành hiện thực và hạnh phúc cá nhân.', rev: 'Tham lam, không bao giờ thấy đủ hoặc tự mãn.' },
  'cups_10': { up: 'Hạnh phúc trọn vẹn, gia đình viên mãn và bình yên lâu dài.', rev: 'Gia đình bất hòa, hình ảnh hạnh phúc giả tạo.' },
  'cups_11': { up: 'Thông điệp tình cảm, sự sáng tạo và trực giác nhạy bén.', rev: 'Cảm xúc non nớt, thất vọng hoặc tin tức không vui.' },
  'cups_12': { up: 'Lãng mạn, quyến rũ và theo đuổi lý tưởng.', rev: 'Thay đổi tâm trạng thất thường, lừa dối hoặc ảo tưởng.' },
  'cups_13': { up: 'Thấu cảm, trực giác sâu sắc và sự quan tâm dịu dàng.', rev: 'Phụ thuộc cảm xúc, bất an hoặc lạnh lùng.' },
  'cups_14': { up: 'Cân bằng cảm xúc, rộng lượng và kiểm soát tốt tâm trạng.', rev: 'Thao túng cảm xúc, tâm trạng thất thường hoặc lừa dối.' },

  // SWORDS (Kiếm) - Khí, Trí tuệ, Xung đột
  'swords_1': { up: 'Sự thật sáng tỏ, ý tưởng đột phá và tư duy sắc bén.', rev: 'Suy nghĩ rối rắm, thiếu rõ ràng hoặc ý tưởng cực đoan.' },
  'swords_2': { up: 'Do dự, bế tắc và trốn tránh đưa ra quyết định khó khăn.', rev: 'Đưa ra quyết định, nhìn thấy sự thật hoặc bị ép buộc lựa chọn.' },
  'swords_3': { up: 'Đau lòng, tổn thương và nỗi buồn sâu sắc.', rev: 'Chữa lành, vượt qua nỗi đau hoặc kìm nén cảm xúc.' },
  'swords_4': { up: 'Nghỉ ngơi, hồi phục và tĩnh tâm sau căng thẳng.', rev: 'Kiệt sức, không chịu nghỉ ngơi hoặc thức tỉnh trở lại.' },
  'swords_5': { up: 'Chiến thắng rỗng tuếch, xung đột và mất mát danh dự.', rev: 'Hòa giải, hối hận hoặc chấm dứt xung đột vô nghĩa.' },
  'swords_6': { up: 'Rời bỏ khó khăn, chuyển sang giai đoạn bình yên hơn.', rev: 'Khó khăn kéo dài, không thể buông bỏ hoặc chuyến đi trắc trở.' },
  'swords_7': { up: 'Lén lút, chiến thuật và hành động khôn khéo (hoặc lừa dối).', rev: 'Bị phát hiện, thú nhận sự thật hoặc thay đổi chiến thuật.' },
  'swords_8': { up: 'Bế tắc, tự giới hạn bản thân bởi nỗi sợ hãi.', rev: 'Giải thoát, tìm ra lối thoát hoặc đối mặt với nỗi sợ.' },
  'swords_9': { up: 'Lo âu, mất ngủ và ác mộng do suy nghĩ quá nhiều.', rev: 'Giải tỏa lo lắng, tìm kiếm sự giúp đỡ hoặc nỗi sợ vô căn cứ.' },
  'swords_10': { up: 'Kết thúc đau đớn, chạm đáy nhưng là dấu hiệu của sự khởi đầu mới.', rev: 'Hồi phục chậm chạp, từ chối chấp nhận kết thúc.' },
  'swords_11': { up: 'Tò mò, năng động và tư duy sắc bén.', rev: 'Nói nhiều làm ít, tin đồn nhảm hoặc do thám.' },
  'swords_12': { up: 'Hành động nhanh, quyết đoán và tư duy logic.', rev: 'Hung hăng, lời nói gây tổn thương hoặc hành động thiếu suy nghĩ.' },
  'swords_13': { up: 'Sắc sảo, độc lập và nhìn thấu sự thật.', rev: 'Cay nghiệt, lạnh lùng hoặc phán xét người khác.' },
  'swords_14': { up: 'Trí tuệ, quyền lực và sự công bằng lý trí.', rev: 'Lạm quyền, độc đoán hoặc tàn nhẫn.' },

  // PENTACLES (Tiền) - Đất, Vật chất, Sự nghiệp
  'pentacles_1': { up: 'Cơ hội tài chính mới, thịnh vượng và khởi đầu vững chắc.', rev: 'Cơ hội bị bỏ lỡ, chi tiêu hoang phí hoặc đầu tư kém.' },
  'pentacles_2': { up: 'Cân bằng nhiều trách nhiệm, linh hoạt và thích ứng.', rev: 'Mất cân bằng, quá tải hoặc quản lý tài chính kém.' },
  'pentacles_3': { up: 'Hợp tác, làm việc nhóm và kỹ năng chuyên môn được công nhận.', rev: 'Thiếu hợp tác, làm việc kém hiệu quả hoặc xung đột nhóm.' },
  'pentacles_4': { up: 'Tiết kiệm, kiểm soát và bảo vệ tài sản.', rev: 'Keo kiệt, tham lam hoặc buông bỏ sự kiểm soát.' },
  'pentacles_5': { up: 'Khó khăn tài chính, cô đơn hoặc cảm thấy bị bỏ rơi.', rev: 'Phục hồi tài chính, tìm thấy sự giúp đỡ hoặc hy vọng mới.' },
  'pentacles_6': { up: 'Cho đi và nhận lại, sự hào phóng và cân bằng tài chính.', rev: 'Nợ nần, ích kỷ hoặc lợi dụng lòng tốt.' },
  'pentacles_7': { up: 'Kiên nhẫn chờ đợi kết quả, đánh giá lại tiến độ.', rev: 'Nóng vội, công sức đổ sông đổ bể hoặc lười biếng.' },
  'pentacles_8': { up: 'Chăm chỉ, rèn luyện kỹ năng và tỉ mỉ trong công việc.', rev: 'Thiếu tập trung, làm việc cẩu thả hoặc quá cầu toàn.' },
  'pentacles_9': { up: 'Độc lập tài chính, hưởng thụ thành quả và sang trọng.', rev: 'Phụ thuộc tài chính, chi tiêu quá mức hoặc làm việc quá sức.' },
  'pentacles_10': { up: 'Di sản, sự giàu có lâu dài và gia đình sung túc.', rev: 'Tranh chấp gia đình, mất mát tài sản hoặc nợ nần.' },
  'pentacles_11': { up: 'Cơ hội học tập, chăm chỉ và thực tế.', rev: 'Thiếu tập trung, lười biếng hoặc bỏ lỡ cơ hội.' },
  'pentacles_12': { up: 'Chăm chỉ, đáng tin cậy và kiên định.', rev: 'Làm việc không hiệu quả, trì trệ hoặc bảo thủ.' },
  'pentacles_13': { up: 'Thực tế, nuôi dưỡng và quản lý tài chính tốt.', rev: 'Quá coi trọng vật chất, bỏ bê bản thân hoặc ghen tị.' },
  'pentacles_14': { up: 'Thành công, giàu có và lãnh đạo doanh nghiệp.', rev: 'Tham lam, hối lộ hoặc quản lý kém.' },
};

// Helper to generate Minor Arcana properly with correct IDs
const generateMinorArcana = (): TarotCardData[] => {
  const suits: { id: 'wands'|'cups'|'swords'|'pentacles', nameVi: string, nameEn: string, prefix: string }[] = [
    { id: 'wands', nameVi: 'Gậy', nameEn: 'Wands', prefix: 'wa' },
    { id: 'cups', nameVi: 'Ly', nameEn: 'Cups', prefix: 'cu' },
    { id: 'swords', nameVi: 'Kiếm', nameEn: 'Swords', prefix: 'sw' },
    { id: 'pentacles', nameVi: 'Tiền', nameEn: 'Pentacles', prefix: 'pe' }
  ];

  const cards: TarotCardData[] = [];

  suits.forEach(suit => {
    for (let i = 1; i <= 14; i++) {
      let nameEn = '';
      let nameVi = '';
      let idSuffix = '';
      
      // Determine standardized suffixes for Sacred Texts filenames
      // 01 -> ac, 02..10 -> 02..10, 11 -> pa, 12 -> kn, 13 -> qu, 14 -> ki
      if (i === 1) {
          idSuffix = 'ac';
          nameEn = `Ace of ${suit.nameEn}`; 
          nameVi = `Ách ${suit.nameVi}`;
      } else if (i <= 10) {
          idSuffix = i.toString().padStart(2, '0');
          nameEn = `${i} of ${suit.nameEn}`; 
          nameVi = `${i} ${suit.nameVi}`;
      } else if (i === 11) {
          idSuffix = 'pa';
          nameEn = `Page of ${suit.nameEn}`; 
          nameVi = `Tiểu Đồng ${suit.nameVi}`;
      } else if (i === 12) {
          idSuffix = 'kn';
          nameEn = `Knight of ${suit.nameEn}`; 
          nameVi = `Hiệp Sĩ ${suit.nameVi}`;
      } else if (i === 13) {
          idSuffix = 'qu';
          nameEn = `Queen of ${suit.nameEn}`; 
          nameVi = `Nữ Hoàng ${suit.nameVi}`;
      } else if (i === 14) {
          idSuffix = 'ki';
          nameEn = `King of ${suit.nameEn}`; 
          nameVi = `Vua ${suit.nameVi}`;
      }

      const id = `${suit.prefix}${idSuffix}`; // e.g., waac, wa02, waki

      // Get meaning
      const meaningKey = `${suit.id}_${i}`;
      const meaningData = MINOR_MEANINGS[meaningKey] || { up: 'Đang cập nhật...', rev: 'Đang cập nhật...' };

      cards.push({
        id,
        name_vi: nameVi,
        name_en: nameEn,
        type: 'minor',
        suit: suit.id,
        number: i,
        meaningKeywords: [suit.nameVi, nameVi],
        meaning_upright: meaningData.up,
        meaning_reversed: meaningData.rev
      });
    }
  });

  return cards;
};

export const MINOR_ARCANA = generateMinorArcana();
export const FULL_DECK = [...MAJOR_ARCANA, ...MINOR_ARCANA];

export const SPREAD_INFO = {
  [SpreadType.ONE_CARD]: {
    name: 'Rút 1 Lá',
    description: 'Thích hợp cho câu hỏi Có/Không hoặc lời khuyên trong ngày.',
    positions: ['Lời khuyên / Kết quả'],
    count: 1
  },
  [SpreadType.THREE_CARD]: {
    name: 'Trải Bài 3 Lá',
    description: 'Quá khứ - Hiện tại - Tương lai. Một góc nhìn tổng quan.',
    positions: ['Quá khứ', 'Hiện tại', 'Tương lai'],
    count: 3
  },
  [SpreadType.FIVE_CARD]: {
    name: 'Ngôi Sao 5 Cánh',
    description: 'Phân tích sâu về tình huống, thử thách và kết quả.',
    positions: ['Tình huống hiện tại', 'Thử thách', 'Lời khuyên', 'Kết quả tiềm năng', 'Tổng quan'],
    count: 5
  }
};