import { useEffect } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import './PlayWarehouseDetail.css';
import './DuelAcademyDetail.css';

const asset = `${import.meta.env.BASE_URL}assets/duel-academy/`;

function Figure({ file, alt, caption, width, height, className = '', priority = false }) {
  return (
    <figure className={`case-figure ${className}`}>
      <img src={`${asset}${file}`} alt={alt} width={width} height={height} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : undefined} decoding="async" />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

const motionClips = [
  { file: 'motion-hero.mp4', poster: 'motion-hero.jpg', label: '董卓角色动态立绘' },
  { file: 'motion-cai-wenji.mp4', poster: 'motion-cai-wenji.jpg', label: '蔡文姬角色动态立绘' },
  { file: 'motion-capture.mp4', poster: 'motion-capture.jpg', label: '九曜玄凰动态效果录屏' },
];

export default function DuelAcademyDetail() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = '决斗学院 | 游戏美术与动态立绘 | 郑雅靖';
    window.scrollTo(0, 0);
    return () => { document.title = previousTitle; };
  }, []);

  return (
    <main className="case-study duel-study">
      <div className="case-shell">
        <header className="case-nav">
          <a className="case-brand" href="./#projects">ZHENGYAJING <span>/ PORTFOLIO</span></a>
          <a className="case-back" href="./#projects"><ArrowLeft size={18} aria-hidden="true" /> 返回精选项目</a>
        </header>

        <section className="case-intro" aria-labelledby="duel-title">
          <img className="case-intro-art" src={`${asset}diaochan-hero.png`} alt="" width="3008" height="1396" decoding="async" />
          <p className="case-kicker">SELECTED WORK / GAME ART</p>
          <h1 id="duel-title"><img className="case-title-logo" src={`${asset}title-logo.png`} alt="决斗学院" width="407" height="265" fetchPriority="high" decoding="async" /><span>原画设计</span></h1>
          <div className="case-intro-bottom">
            <p>从角色造型、神兽设定到动态立绘与游戏内画面，串联概念设计和最终呈现。</p>
            <dl className="case-meta">
              <div><dt>创作内容</dt><dd>角色原画 / 神兽设计</dd></div>
              <div><dt>呈现形式</dt><dd>美宣 / 游戏实机 / 动态立绘</dd></div>
            </dl>
          </div>
        </section>

        <section className="case-section" aria-labelledby="duel-character-title">
          <div className="case-section-head">
            <span>01</span>
            <div><p>CHARACTER DESIGN</p><h2 id="duel-character-title">角色设定与美宣</h2></div>
            <p>以清晰的轮廓和服装细节塑造角色辨识度，并延伸到游戏宣传与界面画面。</p>
          </div>
          <Figure file="character-key-art.jpg" alt="多位幻想角色组合宣传立绘" caption="游戏开屏封面" width="592" height="1280" className="duel-portrait-inset" priority />
          <Figure file="huang-yueying.jpg" alt="黄月英角色立绘与游戏内展示设计" caption="黄月英 / 角色立绘与应用" width="1920" height="1080" className="duel-spaced" />
          <Figure file="dong-zhuo.webp" alt="董卓角色原画、战斗小人与礼包界面设计" caption="董卓 / 角色设计与界面应用" width="2880" height="1620" className="duel-spaced" />
          <Figure file="character-pair-2.jpg" alt="绿色与红色幻想角色立绘设计" caption="角色造型方向" width="1920" height="1080" className="duel-spaced" />
        </section>

        <Figure file="character-pair.jpg" alt="金色与蓝色幻想角色概念原画" caption="角色视觉探索" width="1920" height="1080" className="duel-spaced" />

        <section className="case-section" aria-labelledby="duel-creature-title">
          <div className="case-section-head">
            <span>02</span>
            <div><p>CREATURE DESIGN</p><h2 id="duel-creature-title">神兽与世界观</h2></div>
            <p>从主视觉、草图到头像和礼包界面，让神兽设定在不同使用场景中保持一致。</p>
          </div>
          <Figure file="phoenix.webp" alt="九曜玄凰神兽主视觉、草图、头像与礼包界面" caption="九曜玄凰 / 神兽设定" width="2880" height="1620" />
          <Figure file="dragon.webp" alt="奥雷瑟兰龙形神兽主视觉、草图与游戏内效果" caption="奥雷瑟兰 / 神兽设定" width="2880" height="1620" className="duel-spaced" />
        </section>

        <section className="case-section" aria-labelledby="duel-scene-title">
          <div className="case-section-head">
            <span>03</span>
            <div><p>ENVIRONMENT DESIGN</p><h2 id="duel-scene-title">场景设计</h2></div>
            <p>从建筑单体、地图界面到昼夜环境，梳理游戏世界的空间层次与场景氛围。</p>
          </div>
          <Figure file="scene-design.jpg" alt="建筑设计、天空之城地图及 AI 辅助环境场景探索板" caption="场景设计与 AI 辅助环境探索" width="1920" height="1080" />
          <div className="duel-scene-pair">
            <Figure file="main-city-night.webp" alt="蓝紫色星空下的漂浮主城夜晚场景原画" caption="主城夜景 / 一测版" width="1080" height="2448" />
            <Figure file="world-in-game.jpg" alt="游戏世界主场景与入口界面实机画面" caption="主城夜景 / 游戏实机" width="1179" height="2556" />
          </div>
        </section>

        <section className="case-section" aria-labelledby="duel-motion-title">
          <div className="case-section-head">
            <span>04</span>
            <div><p>CHARACTER MOTION</p><h2 id="duel-motion-title">立绘，开始呼吸</h2></div>
            <p>角色动作与神兽特效为静态原画增加节奏和表现力，呈现设计在动态画面中的状态。</p>
          </div>
          <div className="duel-motion-grid">
            {motionClips.map((clip) => (
              <figure className="case-figure" key={clip.file}>
                <video controls playsInline preload="none" loop poster={`${asset}${clip.poster}`} aria-label={clip.label}>
                  <source src={`${asset}${clip.file}`} type="video/mp4" />
                </video>
                <figcaption>{clip.label}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="case-section" aria-labelledby="duel-game-title">
          <div className="case-section-head">
            <span>05</span>
            <div><p>IN GAME</p><h2 id="duel-game-title">设计进入游戏</h2></div>
            <p>角色表现与战斗结算的实机画面，记录设计在产品中的最终呈现。</p>
          </div>
          <div className="duel-gameplay-grid">
            <Figure file="cover.jpg" alt="黄月英角色战斗胜利结算实机画面" caption="战斗结算" width="1179" height="2556" />
            <Figure file="character-in-game.jpg" alt="董卓角色游戏内立绘与战斗界面" caption="董卓 / 角色实机" width="1179" height="2556" />
            <Figure file="guo-jia-in-game.jpg" alt="郭嘉角色立绘与游戏内展示画面" caption="郭嘉 / 角色实机" width="1179" height="2556" />
            <Figure file="cai-wenji-in-game.jpg" alt="蔡文姬角色立绘与游戏内展示画面" caption="蔡文姬 / 角色实机" width="1179" height="2556" />
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
