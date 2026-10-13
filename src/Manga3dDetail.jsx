import { useEffect } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import './PlayWarehouseDetail.css';
import './Manga3dDetail.css';

/*
 * 素材目录：public/assets/manga-3d/
 * 连载页来自 D:\作品集内容文件夹\18_哔哩哔哩漫画\
 * 三维练习来自同目录下的 Blender 角色建模与场景渲染截图。
 */
const asset = `${import.meta.env.BASE_URL}assets/manga-3d/`;

function Figure({ file, alt, caption, width, height, className = '' }) {
  return (
    <figure className={`case-figure ${className}`}>
      <a href={`${asset}${file}`} target="_blank" rel="noopener noreferrer" aria-label={`查看${caption}原图`}>
        <img src={`${asset}${file}`} alt={alt} width={width} height={height} loading="lazy" decoding="async" />
      </a>
      <figcaption>{caption}<ArrowUpRight size={16} aria-hidden="true" /></figcaption>
    </figure>
  );
}

const chapters = [
  ['serial', '01', '连载页面'],
  ['platform', '02', '平台与读者'],
  ['blender-character', '03', '角色建模练习'],
  ['blender-scene', '04', '场景渲染练习'],
];

export default function Manga3dDetail() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = '漫画连载和三维练习 | 原创长篇连载 · Blender 建模 | 郑雅靖';
    window.scrollTo(0, 0);
    return () => { document.title = previousTitle; };
  }, []);

  return (
    <main className="case-study manga3d-study">
      <div className="case-shell">
        <header className="case-nav">
          <a className="case-brand" href="./#projects">ZHENGYAJING <span>/ PORTFOLIO</span></a>
          <a className="case-back" href="./#projects"><ArrowLeft size={18} aria-hidden="true" /> 返回精选项目</a>
        </header>

        <section className="case-intro" aria-labelledby="case-title">
          <img className="case-intro-art" src={`${asset}cover.webp`} alt="" width="2150" height="1126" fetchPriority="high" decoding="async" />
          <p className="case-kicker">SELECTED WORK / MANGA SERIAL &amp; 3D PRACTICE</p>
          <h1 id="case-title">漫画连载和三维练习<span>原创长篇连载 / Blender 练习</span></h1>
          <div className="case-intro-bottom">
            <p>承担从剧本到完稿全过程的原创漫画连载签约漫画作者，在哔哩哔哩漫画持续更新；同时保留一部分 Blender 三维软件自学练习，让建模与渲染反哺画面创作。</p>
            <dl className="case-meta">
              <div><dt>连载平台</dt><dd>哔哩哔哩漫画</dd></div>
              <div><dt>内容</dt><dd>长篇连载 / 角色建模 / 场景渲染</dd></div>
            </dl>
          </div>
        </section>

        <nav className="manga3d-chapters" aria-label="项目章节">
          {chapters.map(([id, number, label]) => (
            <a key={id} href={`#${id}`}><span>{number}</span> {label}</a>
          ))}
        </nav>

        <section className="case-section" id="serial" aria-labelledby="serial-title">
          <div className="case-section-head">
            <span>01</span>
            <div><p>SERIAL PAGES</p><h2 id="serial-title">一格一格推进的长篇</h2></div>
            <p>长篇连载最难的是稳定：既要保持画风一致，也要让每一话的信息密度和节奏落在同一个水平线上。</p>
          </div>
          <Figure file="serial-long.webp" alt="原创长篇漫画的长条连载页，可点击放大阅读" caption="长条连载页 / 点击放大" width="1200" height="3699" className="manga3d-strip" />
          <div className="manga3d-page-pair">
            <Figure file="serial-page-1.webp" alt="连载章节手机端阅读页一" caption="连载页 / 章节" width="750" height="2778" />
            <Figure file="serial-page-2.webp" alt="连载章节手机端阅读页二" caption="连载页 / 章节" width="750" height="1523" />
          </div>
        </section>

        <section className="case-section" id="platform" aria-labelledby="platform-title">
          <div className="case-section-head">
            <span>02</span>
            <div><p>PLATFORM</p><h2 id="platform-title">作品与读者见面的地方</h2></div>
            <p>作品在哔哩哔哩漫画持续更新，页面展示的是读者实际看到的阅读入口与作品详情。</p>
          </div>
          <Figure file="platform-page.webp" alt="哔哩哔哩漫画平台上作品详情页的界面展示" caption="哔哩哔哩漫画 / 作品详情页" width="1700" height="1196" />
        </section>

        <section className="case-section" id="blender-character" aria-labelledby="blender-character-title">
          <div className="case-section-head">
            <span>03</span>
            <div><p>CHARACTER MODELING</p><h2 id="blender-character-title">用三维理解角色</h2></div>
            <p>练习性质的建模：从二维设定出发，在 Blender 里把体积、比例和形体转折重新推一遍。</p>
          </div>
          <div className="manga3d-character-split">
            <Figure file="blender-character-1.webp" alt="Blender 中的三只 Q 版小猫角色建模" caption="Q 版角色 / 三维建模" width="1280" height="715" />
            <Figure file="blender-character-2.webp" alt="Blender 中的方块机器人角色建模与材质" caption="机器人角色 / 建模与材质" width="1280" height="877" />
          </div>
        </section>

        <section className="case-section" id="blender-scene" aria-labelledby="blender-scene-title">
          <div className="case-section-head">
            <span>04</span>
            <div><p>SCENE RENDERING</p><h2 id="blender-scene-title">把场景搭到能讲故事</h2></div>
            <p>以露营夜景为主题的三维场景练习，重点在光源分布、材质反射与画面氛围的搭建。</p>
          </div>
          <Figure file="blender-scene-board.webp" alt="三维全场景项目展示板，含项目说明与设计说明" caption="项目展示板 / 全场景" width="2130" height="1156" />
          <div className="manga3d-scene-pair manga3d-spaced">
            <Figure file="blender-scene-1.webp" alt="露营场景的野餐桌与茶具细节渲染" caption="场景细节 / 野餐桌" width="2116" height="1092" />
            <Figure file="blender-scene-2.webp" alt="露营场景的吧台角色与饮料柜细节渲染" caption="场景细节 / 吧台角色" width="2130" height="1114" />
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
