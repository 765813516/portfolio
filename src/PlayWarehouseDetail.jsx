import { useEffect } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import './PlayWarehouseDetail.css';

const asset = `${import.meta.env.BASE_URL}assets/play-warehouse/`;

function CaseFigure({ file, alt, caption, width, height, className = '' }) {
  return (
    <figure className={`case-figure ${className}`}>
      <img src={`${asset}${file}`} alt={alt} width={width} height={height} loading="lazy" decoding="async" />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

export default function PlayWarehouseDetail() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = '玩仓 | 品牌与商业空间视觉 | 郑雅靖';
    window.scrollTo(0, 0);
    return () => { document.title = previousTitle; };
  }, []);

  return (
    <main className="case-study">
      <div className="case-shell">
        <header className="case-nav">
          <a className="case-brand" href="./#projects">ZHENGYAJING <span>/ PORTFOLIO</span></a>
          <a className="case-back" href="./#projects"><ArrowLeft size={18} aria-hidden="true" /> 返回精选项目</a>
        </header>

        <section className="case-intro" aria-labelledby="case-title">
          <img className="case-intro-art" src={`${asset}hero-art.jpg`} alt="" width="2141" height="4368" fetchPriority="high" decoding="async" />
          <p className="case-kicker">SELECTED WORK / BRAND SPACE</p>
          <h1 id="case-title"><img className="case-title-logo" src={`${asset}title-logo.png`} alt="玩仓" width="1643" height="957" /><span>商业空间与品牌视觉</span></h1>
          <div className="case-intro-bottom">
            <p>从品牌识别、传播物料到门店落地，以统一的视觉语言连接潮玩内容与实体空间。</p>
            <dl className="case-meta">
              <div><dt>项目内容</dt><dd>品牌视觉 / 商业空间</dd></div>
              <div><dt>项目地点</dt><dd>深圳 · 华强北</dd></div>
            </dl>
          </div>
        </section>

        <figure className="case-cover">
          <img src={`${asset}cover.png`} alt="玩仓品牌介绍与华强北项目建筑视觉" width="1280" height="720" fetchPriority="high" />
          <figcaption>玩仓 / 品牌背景</figcaption>
        </figure>

        <section className="case-section" aria-labelledby="case-brand-title">
          <div className="case-section-head">
            <span>01</span>
            <div><p>BRAND IDENTITY</p><h2 id="case-brand-title">识别，从品牌开始</h2></div>
            <p>以鲜明的橙红色和高辨识度字形建立玩仓的视觉基底，再延伸到空间和传播触点。</p>
          </div>
          <CaseFigure file="brand-story.png" alt="玩仓品牌介绍与空间视觉" caption="品牌定位与空间语境" width="1280" height="720" />
          <CaseFigure file="identity.jpg" alt="玩仓品牌标识及英文口号设计" caption="标识与品牌主张" width="4312" height="3533" className="case-figure--inset" />
          <CaseFigure file="signage.jpg" alt="玩仓橙红色横幅标识设计" caption="品牌标识在横向物料中的应用" width="2014" height="170" className="case-figure--strip" />
        </section>

        <section className="case-section" aria-labelledby="case-visual-title">
          <div className="case-section-head">
            <span>02</span>
            <div><p>VISUAL APPLICATIONS</p><h2 id="case-visual-title">视觉，进入真实场景</h2></div>
            <p>将品牌语言用于店面概念、宣传画面与灯箱海报，保持不同尺寸和媒介中的一致识别。</p>
          </div>
          <CaseFigure file="campaign-earbuds.jpg" alt="玩仓耳机主题横版视觉设计" caption="横版传播视觉" width="1160" height="598" />
          <div className="case-campaign-pair">
            <CaseFigure file="campaign-face.jpg" alt="玩仓橙色金属人物主题横版视觉" caption="金属人物主题视觉" width="1160" height="598" />
            <CaseFigure file="campaign-flow.jpg" alt="玩仓流动金属纹理主题横版视觉" caption="流动纹理主题视觉" width="1160" height="598" />
          </div>
          <div className="case-visual-pair">
            <CaseFigure file="store-concept.jpg" alt="玩仓潮玩店空间概念设计" caption="空间概念设计" width="1074" height="2192" />
            <CaseFigure file="poster-keychain.png" alt="玩仓橙色品牌挂件主题海报" caption="品牌挂件主题海报" width="1440" height="2560" />
          </div>
          <div className="case-poster-pair">
            <CaseFigure file="poster-bear.jpg" alt="玩仓潮玩公仔主题灯箱海报" caption="公仔主题灯箱海报" width="1074" height="1414" />
            <CaseFigure file="poster-containers.jpg" alt="玩仓橙色集装箱主题灯箱海报" caption="集装箱主题灯箱海报" width="1074" height="1414" />
          </div>
          <div className="case-materials">
            <div className="case-materials-head">
              <span>RETAIL TOUCHPOINTS</span>
              <h3>品牌，延伸到每一次接触</h3>
            </div>
            <CaseFigure file="material-paper-bags.jpg" alt="玩仓三款扁提手纸袋设计" caption="扁提手纸袋 / 三种规格" width="2500" height="1063" />
            <div className="case-materials-pair">
              <CaseFigure file="material-mesh-bag.jpg" alt="玩仓黑色网纱透明购物袋设计" caption="网纱购物袋" width="1406" height="1047" />
              <CaseFigure file="material-badge.jpg" alt="玩仓员工工牌正反面及挂绳设计" caption="员工工牌 / 正反面" width="1922" height="1121" />
            </div>
            <CaseFigure file="material-uniform.jpg" alt="玩仓员工工服正面及背面设计" caption="员工工服 / 正反面" width="2266" height="1094" />
          </div>
        </section>

        <section className="case-section" aria-labelledby="case-site-title">
          <div className="case-section-head">
            <span>03</span>
            <div><p>ON SITE</p><h2 id="case-site-title">从设计到落地</h2></div>
            <p>现场装修与店面照片记录了视觉方案进入施工、陈列和实际商业空间的过程。</p>
          </div>
          <CaseFigure file="site-build.jfif" alt="玩仓门店装修施工现场" caption="装修施工阶段" width="1280" height="720" />
          <div className="case-site-pair">
            <CaseFigure file="site-install.jfif" alt="玩仓门店内部现场装修及灯带施工" caption="空间与灯带安装现场" width="960" height="1280" />
            <CaseFigure file="site-interior.jfif" alt="玩仓门店现场店面与品牌灯箱" caption="店面视觉落地" width="960" height="1280" />
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
