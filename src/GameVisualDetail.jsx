import { useEffect } from 'react';
import { ArrowLeft, ArrowUpRight, Maximize2 } from 'lucide-react';
import './PlayWarehouseDetail.css';
import './GameVisualDetail.css';

const asset = `${import.meta.env.BASE_URL}assets/game-visual/`;
const chapters = [
  ['wangyue', '诗悦网络 · 望月'],
  ['forgotten-sea', '网易 · 遗忘之海'],
  ['nsh', '网易 · 逆水寒'],
  ['sky', '光遇 · 那家游戏公司'],
];

function WorkImage({ file, alt, caption, width, height, openable = false }) {
  const image = <img src={`${asset}${file}`} alt={alt} width={width} height={height} loading="lazy" decoding="async" />;
  return (
    <figure className="game-figure">
      {openable ? <a href={`${asset}${file}`} target="_blank" rel="noopener noreferrer" aria-label={`查看大图：${caption}`}>{image}</a> : image}
      <figcaption>{caption}{openable && <Maximize2 size={15} aria-hidden="true" />}</figcaption>
    </figure>
  );
}

function ChapterHead({ number, label, title, description, id }) {
  return (
    <div className="game-chapter-head">
      <p><span>{number}</span> / {label}</p>
      <h2 id={id}>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

export default function GameVisualDetail() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = '游戏视觉与品牌设计 | 郑雅靖';
    window.scrollTo(0, 0);
    return () => { document.title = previousTitle; };
  }, []);

  return (
    <main className="case-study game-case">
      <div className="case-shell">
        <header className="case-nav">
          <a className="case-brand" href="./#projects">ZHENGYAJING <span>/ PORTFOLIO</span></a>
          <a className="case-back" href="./#projects"><ArrowLeft size={18} aria-hidden="true" /> 返回精选项目</a>
        </header>

        <section className="case-intro game-intro" aria-labelledby="game-title">
          <img className="case-intro-art" src={`${asset}molly-poster.webp`} alt="" width="5992" height="3160" fetchPriority="high" decoding="async" />
          <p className="case-kicker">SELECTED WORK / GAME VISUAL</p>
          <h1 id="game-title">游戏视觉与品牌设计</h1>
          <p>从界面氛围、角色海报到联名美宣与字形探索，呈现四组不同气质的游戏视觉项目。</p>
        </section>

        <nav className="game-index" aria-label="项目章节">
          {chapters.map(([id, title], index) => <a href={`#${id}`} key={id}><span>{String(index + 1).padStart(2, '0')}</span>{title}</a>)}
        </nav>

        <section className="game-section" id="wangyue" aria-labelledby="wangyue-title">
          <ChapterHead number="01" label="WANGYUE" title="诗悦网络 · 望月" id="wangyue-title" description="心弦系列界面背景视觉。以角色、桌面物件和材质细节建立人物气质，留出界面信息的展示空间。" />
          <WorkImage file="wangyue-zhao.webp" alt="望月心弦昭的界面背景，暖黄桌面与角色玩偶" caption="心弦 / 昭" width="2400" height="1350" />
          <WorkImage file="wangyue-hero.webp" alt="望月心弦男主角的界面背景，黄色桌面与角色玩偶" caption="心弦 / 男主" width="2400" height="1350" />
          <WorkImage file="wangyue-luli.webp" alt="望月心弦陆离的界面背景，紫色桌面与角色玩偶" caption="心弦 / 陆离" width="2400" height="1350" />
        </section>

        <section className="game-section" id="forgotten-sea" aria-labelledby="forgotten-title">
          <ChapterHead number="02" label="SEA OF REMNANTS" title="网易 · 遗忘之海" id="forgotten-title" description="茉莉角色海报与前期构图方案；并展示饿猫角色的动作、神情探索。" />
          <WorkImage file="molly-poster.webp" alt="遗忘之海茉莉角色海报成品" caption="茉莉 / 角色海报成品" width="5992" height="3160" />
          <h3 className="game-subhead">茉莉 / 构图方案</h3>
          <div className="game-process">
            {[1, 2, 3].map((page) => <WorkImage key={page} file={`molly-process-${page}.jpg`} alt={`遗忘之海茉莉角色海报构图方案第${page}页`} caption={`茉莉方案 / ${String(page).padStart(2, '0')}`} width="1800" height="1080" openable />)}
          </div>
          <h3 className="game-subhead">饿猫 / 角色海报</h3>
          <WorkImage file="cat-poster.webp" alt="遗忘之海饿猫角色海报最终效果" caption="饿猫 / 角色海报成品" width="1726" height="873" openable />
          <h3 className="game-subhead">饿猫 / 动作探索</h3>
          <div className="game-process">
            {[1, 2].map((page) => <WorkImage key={page} file={`cat-process-${page}.jpg`} alt={`遗忘之海饿猫角色动作方案第${page}页`} caption={`饿猫方案 / ${String(page).padStart(2, '0')}`} width="1800" height="1080" openable />)}
          </div>
        </section>

        <section className="game-section" id="nsh" aria-labelledby="nsh-title">
          <ChapterHead number="03" label="NISHUIHAN" title="网易 · 逆水寒" id="nsh-title" description="三丽鸥联名角色美宣、展示画面与宣传视频，将角色造型延展到不同传播场景。" />
          <figure className="game-figure">
            <video controls preload="none" playsInline poster={`${asset}nsh-male.webp`} aria-label="逆水寒三丽鸥联名宣传视频">
              <source src={`${asset}nsh-video.mp4`} type="video/mp4" />
              当前浏览器无法播放此视频。
            </video>
            <figcaption>逆水寒 / 联名宣传视频</figcaption>
          </figure>
          <WorkImage file="nsh-male.webp" alt="逆水寒库洛米联名男角色的吉他主题视觉" caption="库洛米 / 男角色视觉" width="8000" height="4460" />
          <div className="game-pair">
            <WorkImage file="nsh-kuromi.webp" alt="逆水寒库洛米联名女角色全身视觉" caption="库洛米 / 女角色视觉" width="5099" height="2868" />
            <WorkImage file="nsh-hello-kitty.webp" alt="逆水寒 Hello Kitty 联名女角色视觉" caption="Hello Kitty / 角色视觉" width="6207" height="3933" />
          </div>
          <WorkImage file="nsh-detail.webp" alt="逆水寒库洛米联名展示界面与服饰细节" caption="库洛米 / 展示界面与造型细节" width="2214" height="1269" />
        </section>

        <section className="game-section" id="sky" aria-labelledby="sky-title">
          <ChapterHead number="04" label="THATGAMECOMPANY" title="光遇 · 那家游戏公司 LOGO 设计" id="sky-title" description="从《光遇》的陪伴、自由与轻盈气质出发，探索中文标识的四种字形方向及场景应用。以下为方案阶段展示。" />
          <WorkImage file="sky-01.webp" alt="光遇视觉关键词与场景参考" caption="视觉语境 / 光遇" width="1920" height="1080" openable />
          {[2, 3, 4, 5, 6, 7, 8, 9].map((page) => (
            <WorkImage key={page} file={`sky-${String(page).padStart(2, '0')}.webp`} alt={`那家游戏公司字形设计方案第${page}页`} caption={page % 2 === 0 ? `字形方案 / 0${page / 2}` : `场景应用 / 0${(page - 1) / 2}`} width="1920" height="1080" openable />
          ))}
        </section>

        <footer className="case-footer">
          <span>ZHENGYAJING / SELECTED WORK</span>
          <a href="./#projects">返回精选项目 <ArrowUpRight size={20} aria-hidden="true" /></a>
        </footer>
      </div>
    </main>
  );
}
