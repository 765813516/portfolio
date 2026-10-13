import { useEffect } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import './PlayWarehouseDetail.css';
import './ClockFutureDetail.css';

const asset = `${import.meta.env.BASE_URL}assets/clock-future/`;

function ImageFigure({ file, alt, caption, width, height, className = '' }) {
  return (
    <figure className={`case-figure ${className}`}>
      <img src={`${asset}${file}`} alt={alt} width={width} height={height} loading="lazy" decoding="async" />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function VideoFigure({ file, poster, label, caption, width, height }) {
  return (
    <figure className="case-figure clock-video">
      <video controls playsInline preload="none" poster={`${asset}${poster}`} width={width} height={height} aria-label={label}>
        <source src={`${asset}${file}`} type="video/mp4" />
      </video>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export default function ClockFutureDetail() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = '时钟未来 | 游戏视觉设计 | 郑雅靖';
    window.scrollTo(0, 0);
    return () => { document.title = previousTitle; };
  }, []);

  return (
    <main className="case-study clock-study">
      <div className="case-shell">
        <header className="case-nav">
          <a className="case-brand" href="./#projects">ZHENGYAJING <span>/ PORTFOLIO</span></a>
          <a className="case-back" href="./#projects"><ArrowLeft size={18} aria-hidden="true" /> 返回精选项目</a>
        </header>

        <section className="case-intro" aria-labelledby="clock-title">
          <img className="case-intro-art" src={`${asset}cover.png`} alt="" width="1071" height="570" fetchPriority="high" decoding="async" />
          <p className="case-kicker">SELECTED WORK / GAME ART</p>
          <h1 id="clock-title">时钟未来<span>角色与剧情视觉</span></h1>
          <div className="case-intro-bottom">
            <p>从剧情原画、角色动态到游戏内呈现，以连续的视觉叙事建立《时钟未来》的世界氛围。</p>
            <dl className="case-meta">
              <div><dt>创作内容</dt><dd>角色原画 / 剧情分镜</dd></div>
              <div><dt>呈现形式</dt><dd>剧情 PV / 动态特效 / 游戏实机</dd></div>
            </dl>
          </div>
        </section>

        <section className="case-section" aria-labelledby="clock-pv-title">
          <div className="case-section-head">
            <span>01</span>
            <div><p>PROLOGUE / PV</p><h2 id="clock-pv-title">序章剧情 PV</h2></div>
            <p>以开场影像建立角色关系与叙事基调，衔接关键剧情原画。</p>
          </div>
          <VideoFigure file="prologue-pv.mp4" poster="prologue-poster.jpg" label="时钟未来序章剧情 PV" caption="序章剧情 / PV" width="1600" height="728" />
          <ImageFigure file="falling-man.jpg" alt="在蓝紫色星空中坠落的男性角色剧情原画" caption="取名页面 剧情原画" width="1700" height="750" className="clock-following-art" />
          <div className="clock-media-pair clock-media-stack clock-following-art">
            <ImageFigure file="concept-art.jpg" alt="蓝紫色光影中的绿色短发角色概念原画" caption="角色视觉探索" width="1280" height="720" />
            <ImageFigure file="story-ruins.jpg" alt="披着斗篷的角色立于夕照下的废墟中" caption="剧情原画 / 废墟" width="3000" height="1141" />
            <ImageFigure file="story-clock.jpg" alt="蓝金色钟盘与指针的近景原画" caption="剧情原画 / 时钟" width="2909" height="1344" />
          </div>
        </section>

        <section className="case-section" aria-labelledby="clock-cat-title">
          <div className="case-section-head">
            <span>02</span>
            <div><p>CHARACTER MOTION</p><h2 id="clock-cat-title">蝾螈猫动态与实机</h2></div>
            <p>将角色动态效果与局内画面并置，呈现从设计到游戏的落地状态。</p>
          </div>
          <div className="clock-media-pair">
            <ImageFigure file="axolotl-in-game.jpg" alt="蝾螈猫角色与队伍出现在游戏局内场景" caption="蝾螈猫 / 局内效果" width="3132" height="1583" />
            <VideoFigure file="axolotl-motion.mp4" poster="axolotl-poster.jpg" label="蝾螈猫动态效果" caption="蝾螈猫 / 动态效果" width="1634" height="1080" />
          </div>
        </section>

        <section className="case-section" aria-labelledby="clock-story-title">
          <div className="case-section-head">
            <span>03</span>
            <div><p>STORYBOARD / MOTION</p><h2 id="clock-story-title">角色PV故事分镜</h2></div>
            <p>分镜节奏与角色片段相互参照，展示动态叙事的设计过程。</p>
          </div>
          <div className="clock-media-pair clock-media-stack">
            <ImageFigure file="storyboard.jpg" alt="角色 PV 的九格故事分镜与场景节奏设计" caption="动态分镜 / 故事板" width="1920" height="1080" />
            <VideoFigure file="maryida-motion.mp4" poster="maryida-poster.jpg" label="玛丽妲角色 PV 片段" caption="玛丽妲 / 角色 PV" width="1280" height="720" />
          </div>
        </section>

        <section className="case-section" aria-labelledby="clock-platform-title">
          <div className="case-section-head">
            <span>04</span>
            <div><p>GAME RELEASE</p><h2 id="clock-platform-title">平台呈现</h2></div>
            <p>宣传视觉在 TapTap 游戏与预约页面中的实际应用。</p>
          </div>
          <div className="clock-media-pair clock-media-stack clock-platform-stack">
            <ImageFigure file="taptap-game.png" alt="时钟未来 TapTap 游戏页面与宣传主视觉" caption="TapTap / 游戏页面" width="2466" height="1188" />
            <ImageFigure file="taptap-reservation.png" alt="时钟未来 TapTap 预约页面与剧情视觉" caption="TapTap / 预约页面" width="2446" height="1244" />
          </div>
        </section>

        <footer className="case-footer">
          <span>ZHENGYAJING / SELECTED WORK</span>
          <a href="./#projects">返回精选项目 <ArrowUpRight size={20} aria-hidden="true" /></a>
        </footer>
      </div>
    </main>
  );
}
