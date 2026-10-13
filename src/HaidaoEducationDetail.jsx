import { useEffect } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import './PlayWarehouseDetail.css';
import './HaidaoEducationDetail.css';

const asset = `${import.meta.env.BASE_URL}assets/haidao-education/`;
const packets = ['BU', 'NYU', 'OSU', 'PSU', 'PU', 'RU', 'SBU', 'SU', 'UB', 'UCL', 'UCSB', 'UW'];

function WorkFigure({ file, alt, caption, width, height, className = '' }) {
  return (
    <figure className={`case-figure ${className}`}>
      <a href={`${asset}${file}`} target="_blank" rel="noopener noreferrer" aria-label={`查看${caption}原图`}>
        <img src={`${asset}${file}`} alt={alt} width={width} height={height} loading="lazy" decoding="async" />
      </a>
      <figcaption>{caption}<ArrowUpRight size={16} aria-hidden="true" /></figcaption>
    </figure>
  );
}

export default function HaidaoEducationDetail() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = '海道教育 | 互动 H5 与传播视觉 | 郑雅靖';
    window.scrollTo(0, 0);
    return () => { document.title = previousTitle; };
  }, []);

  return (
    <main className="case-study haidao-study">
      <div className="case-shell">
        <header className="case-nav">
          <a className="case-brand" href="./#projects">ZHENGYAJING <span>/ PORTFOLIO</span></a>
          <a className="case-back" href="./#projects"><ArrowLeft size={18} aria-hidden="true" /> 返回精选项目</a>
        </header>

        <section className="case-intro" aria-labelledby="case-title">
          <img className="case-intro-art" src={`${asset}mid-autumn.webp`} alt="" width="2156" height="1208" fetchPriority="high" decoding="async" />
          <p className="case-kicker">SELECTED WORK / EDUCATION CAMPAIGN</p>
          <h1 id="case-title">海道教育<span>互动 H5 与传播视觉</span></h1>
          <div className="case-intro-bottom">
            <p>以节日互动、留学校园和课程传播为线索，让内容在不同屏幕和场景中保持鲜明表达。</p>
            <dl className="case-meta">
              <div><dt>品牌</dt><dd>海道教育 / HD EDUCATION</dd></div>
              <div><dt>内容</dt><dd>H5 · 活动视觉 · 推文</dd></div>
            </dl>
          </div>
        </section>

        <nav className="haidao-chapters" aria-label="项目章节">
          <a href="#h5"><span>01</span> 互动 H5</a>
          <a href="#campaign"><span>02</span> 传播海报</a>
          <a href="#packets"><span>03</span> 校园红包</a>
          <a href="#whitepaper"><span>04</span> 像素推文</a>
        </nav>

        <section className="case-section" id="h5" aria-labelledby="h5-title">
          <div className="case-section-head">
            <span>01</span>
            <div><p>INTERACTIVE H5</p><h2 id="h5-title">节日，成为一次互动</h2></div>
            <p>中秋游园会与愚人节测试，以不同的画风与交互情境呈现活动入口及页面状态。</p>
          </div>
          <WorkFigure file="mid-autumn.webp" alt="中秋游园会 H5 的多屏界面展示" caption="中秋游园会 / 互动 H5 页面" width="2156" height="1208" />
          <WorkFigure file="april-fools.webp" alt="愚人节趣味测试 H5 的三屏界面展示" caption="愚人节测试 / 互动 H5 页面" width="1962" height="988" className="haidao-spaced" />
        </section>

        <section className="case-section" id="campaign" aria-labelledby="campaign-title">
          <div className="case-section-head">
            <span>02</span>
            <div><p>CAMPAIGN VISUALS</p><h2 id="campaign-title">从节日到课程</h2></div>
            <p>面向节日曝光与留学生 1V1 课程，分别建立温暖的品牌角色叙事和有冲击力的课程画面。</p>
          </div>
          <div className="haidao-poster-layout">
            <WorkFigure file="national-day.webp" alt="海道教育国庆节曝光长海报" caption="国庆节 / 品牌曝光海报" width="1125" height="2436" />
            <WorkFigure file="course-posters.webp" alt="三张留学生 1V1 课程主题海报的组合展示" caption="留学生 1V1 / 课程海报系列" width="2148" height="1196" />
          </div>
        </section>

        <section className="case-section" id="packets" aria-labelledby="packets-title">
          <div className="case-section-head">
            <span>03</span>
            <div><p>CAMPUS SERIES</p><h2 id="packets-title">把校园装进红包</h2></div>
            <p>以高校建筑、吉祥物与留学场景做系列化表达，让每一张封面既属于学校，也属于同一个活动。</p>
          </div>
          <WorkFigure file="red-packets-overview.webp" alt="十二款英美留学生专用红包封面的手机效果展示" caption="留学生专属红包 / 系列展示" width="2108" height="1212" />
          <div className="haidao-subhead"><span>12 DESIGNS</span><h3>校园封面系列</h3></div>
          <div className="haidao-packet-grid">
            {packets.map((code) => (
              <WorkFigure key={code} file={`packet-${code.toLowerCase()}.jpg`} alt={`${code} 校园主题红包封面`} caption={`${code} / 红包封面`} width="440" height="708" />
            ))}
          </div>
        </section>

        <section className="case-section" id="whitepaper" aria-labelledby="whitepaper-title">
          <div className="case-section-head">
            <span>04</span>
            <div><p>PIXEL STORY</p><h2 id="whitepaper-title">像素世界里的新学期</h2></div>
            <p>把新生指南与开学礼内容放进像素风地图，让推文从信息阅读延伸为轻量的探索体验。</p>
          </div>
          <WorkFigure file="whitepaper-overview.webp" alt="像素风新学期礼包推文的多屏展示" caption="新学期礼包 / 公众号长图推文" width="2154" height="1206" />
          <WorkFigure file="whitepaper-cover.webp" alt="像素风草地、道路与校园场景的推文封面" caption="像素世界 / 场景视觉" width="1013" height="546" className="haidao-whitepaper-cover" />
          <div className="haidao-subhead"><span>STORY SEQUENCE</span><h3>从入口到探索</h3></div>
          <div className="haidao-story-grid">
            <WorkFigure file="whitepaper-1.webp" alt="UCL 新生村像素场景与开始冒险入口" caption="01 / 进入新生村" width="1013" height="1217" />
            <WorkFigure file="whitepaper-2.webp" alt="像素风新生村角色对话界面" caption="02 / 角色与对话" width="1013" height="1217" />
            <WorkFigure file="whitepaper-3.webp" alt="像素风地图中的 UCL 向导角色与探索提示" caption="03 / 地图探索" width="1013" height="1390" />
          </div>
          <div className="haidao-subhead"><span>CAMPAIGN EXTENSION</span><h3>开学礼抽奖页</h3></div>
          <WorkFigure file="raffle.webp" alt="百万萌新开学礼像素风抽奖页面长图" caption="百万萌新开学礼 / 活动抽奖页" width="1125" height="3202" className="haidao-raffle" />
        </section>

        <footer className="case-footer">
          <span>ZHENGYAJING / SELECTED WORK</span>
          <a href="./#projects">返回精选项目 <ArrowUpRight size={20} aria-hidden="true" /></a>
        </footer>
      </div>
    </main>
  );
}
