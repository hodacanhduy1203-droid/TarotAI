
class SoundService {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private noiseBuffer: AudioBuffer | null = null;

  constructor() {}

  private init() {
    if (!this.ctx) {
      const Ctx = window.AudioContext || (window as any).webkitAudioContext;
      if (Ctx) {
        this.ctx = new Ctx();
        this.createNoiseBuffer();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  private createNoiseBuffer() {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 2;
    this.noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = this.noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      // White noise base for friction sounds
      output[i] = Math.random() * 2 - 1;
    }
  }

  public toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  public resumeContext() {
    this.init();
  }

  /**
   * Tiếng lật trang giấy mềm mại (Soft Paper Flip)
   * Loại bỏ dải tần cao gây chói, tập trung vào tiếng ma sát trầm
   */
  public playFlip() {
    if (this.isMuted || !this.ctx || !this.noiseBuffer) return;

    const t = this.ctx.currentTime;
    const source = this.ctx.createBufferSource();
    source.buffer = this.noiseBuffer;

    // Bộ lọc Lowpass để loại bỏ tiếng xè xè chói tai
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, t); // Cắt toàn bộ tần số trên 800Hz
    filter.Q.setValueAtTime(0.5, t); // Resonance thấp để âm thanh mượt mà

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.08, t + 0.05); // Attack rất chậm và dịu
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25); // Fade out êm

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    source.start(t);
    source.stop(t + 0.3);
  }

  /**
   * Tiếng xào bài nhẹ nhàng (Gentle Book Ruffling)
   */
  public playShuffle() {
    if (this.isMuted || !this.ctx) return;
    this.resumeContext();
    
    let count = 0;
    const interval = setInterval(() => {
      this.playFlip();
      count++;
      if (count > 5) clearInterval(interval);
    }, 150); // Tốc độ lật chậm hơn để nghe tự nhiên
  }

  /**
   * Tiếng lật bài/mở trang lớn (Deep Reveal)
   * Kết hợp tiếng giấy trầm và một chút âm bass cực nhẹ
   */
  public playReveal() {
    if (this.isMuted || !this.ctx || !this.noiseBuffer) return;
    
    const t = this.ctx.currentTime;
    
    // 1. Tiếng ma sát giấy trầm
    const source = this.ctx.createBufferSource();
    source.buffer = this.noiseBuffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, t);
    
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.1, t + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
    
    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    source.start(t);

    // 2. Tiếng "Body" của vật liệu (Subtle low-end thud)
    const thud = this.ctx.createOscillator();
    thud.type = 'sine';
    thud.frequency.setValueAtTime(80, t); // Rất trầm
    thud.frequency.exponentialRampToValueAtTime(30, t + 0.15);
    
    const thudGain = this.ctx.createGain();
    thudGain.gain.setValueAtTime(0.03, t);
    thudGain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
    
    thud.connect(thudGain);
    thudGain.connect(this.ctx.destination);
    thud.start(t);
    thud.stop(t + 0.15);
  }

  /**
   * Tiếng chuông Zen dịu nhẹ (Soft Zen Glow)
   * Hoàn toàn là các nốt trầm ấm, không có hài âm cao
   */
  public playChime() {
    if (this.isMuted || !this.ctx) return;

    const t = this.ctx.currentTime;
    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(0, t);
    masterGain.gain.linearRampToValueAtTime(0.05, t + 2.0); // Tăng âm lượng cực chậm
    masterGain.gain.exponentialRampToValueAtTime(0.001, t + 8.0); 

    // Các nốt trầm ấm (G2, B2, D3)
    const freqs = [98.00, 123.47, 146.83, 196.00]; 
    
    freqs.forEach((f, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, t);
      
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, t); // Lọc sạch các nốt cao
      
      osc.connect(filter);
      filter.connect(masterGain);
      
      osc.start(t + (i * 0.3)); // Arpeggio rất chậm
      osc.stop(t + 8.0);
    });

    masterGain.connect(this.ctx.destination);
  }
}

export const soundService = new SoundService();
