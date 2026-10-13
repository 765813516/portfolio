import { useEffect } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import './PlayWarehouseDetail.css';
import './MallIpDetail.css';

/*
 * 素材目录：public/assets/mall-ip/
 * 来源 D:\作品集内容文件夹\13_IP\漫展，商城IP设计\，全量转 WebP（86MB → 3MB）。
 * 已按用户要求跳过：PSD/AI/CLIP 源文件、企业微信缩略截图、冬日光之娘重复三版（留一）、
 * 三楼建模近似四版（留二）、2L 无动线版、1.0 同 KV 低分辨率两版、AI 参考图。
 * 档案袋 PDF 已提取单页为 merch-file-pdf.webp。
 */
const asset = `${import.meta.env.BASE_URL}assets/mall-ip/`;

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

function VideoFigure({ file, poster, label, caption, width, height, className = '' }) {
  return (
    <figure className={`case-figure mallip-video ${className}`}>
      <video controls playsInline preload="none" poster={`${asset}${poster}`} width={width} height={height} aria-label={label}>
        <source src={`${asset}${file}`} type="video/mp4" />
      </video>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

const chapters = [
  ['ip-character', '01', 'IP 形象设计'],
  ['mascot', '02', '公仔与打样'],
  ['event-visual', '03', '漫展视觉'],
  ['space-material', '04', '空间与物料'],
  ['motion', '05', '动态视觉'],
  ['merch', '06', '周边衍生'],
];

const expressions = [
  ['expr-hello.webp', '打招呼'],
  ['expr-happy.webp', '开心'],
  ['expr-shy.webp', '害羞'],
  ['expr-question.webp', '疑惑'],
  ['expr-cry.webp', '哭'],
  ['expr-tears.webp', '流泪'],
  ['expr-redpacket.webp', '给红包'],
  ['expr-speechless.webp', '无语'],
];

const mascots = [
  ['mascot-leaf.webp', '叶 / 草木系', 1000, 1250],
  ['mascot-moon.webp', '月 / 星月系', 1000, 1250],
  ['mascot-frost.webp', '霜月 / 冰霜系', 1000, 1250],
  ['mascot-electric.webp', '电系', 1000, 1250],
  ['mascot-electric-standing.webp', '雷系站姿', 1000, 1250],
];

export default function MallIpDetail() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = '商场IP与周边设计 | 光盒世界 · 漫展视觉 · 周边衍生 | 郑雅靖';
    window.scrollTo(0, 0);
    return () => { document.title = previousTitle; };
  }, []);

  return (
    <main className="case-study mallip-study">
      <div className="case-shell">
        <header className="case-nav">
          <a className="case-brand" href="./#projects">ZHENGYAJING <span>/ PORTFOLIO</span></a>
          <a className="case-back" href="./#projects"><ArrowLeft size={18} aria-hidden="true" /> 返回精选项目</a>
        </header>

        <section className="case-intro" aria-labelledby="case-title">
          <img className="case-intro-art" src={`${asset}cover.webp`} alt="" width="1920" height="1079" fetchPriority="high" decoding="async" />
          <p className="case-kicker">SELECTED WORK / MALL IP &amp; MERCH</p>
          <h1 id="case-title">商场IP与周边设计<span>光盒世界 / 漫展视觉 / 周边衍生</span></h1>
          <div className="case-intro-bottom">
            <p>围绕光盒世界商场 IP 的完整链路：从光娘形象与表情包、公仔设计打样，到三届漫展主视觉、商场空间物料与周边衍生品。</p>
            <dl className="case-meta">
              <div><dt>品牌</dt><dd>光盒世界 / 魔核漫展</dd></div>
              <div><dt>内容</dt><dd>IP 形象 / 公仔 / 漫展视觉 / 周边</dd></div>
            </dl>
          </div>
        </section>

        <nav className="mallip-chapters" aria-label="项目章节">
          {chapters.map(([id, number, label]) => (
            <a key={id} href={`#${id}`}><span>{number}</span> {label}</a>
          ))}
        </nav>

        <section className="case-section" id="ip-character" aria-labelledby="ip-title">
          <div className="case-section-head">
            <span>01</span>
            <div><p>IP CHARACTER DESIGN</p><h2 id="ip-title">一个形象，撑起四季与场景</h2></div>
            <p>以光盒世界的品牌性格定下光娘主体造型，再按节日与活动延展服装版本，最后落到可直接使用的表情包。</p>
          </div>
          <Figure file="character-guangniang.webp" alt="光盒世界光娘主形象全身立绘" caption="光娘 / 主形象立绘" width="1500" height="1773" className="mallip-portrait-inset" />
          <div className="mallip-grid-4">
            <Figure file="character-christmas.webp" alt="光娘圣诞主题红色礼服版本" caption="圣诞版本" width="1800" height="1494" />
            <Figure file="character-winter.webp" alt="光娘冬日主题蓝白冬装版本" caption="冬日版本" width="1207" height="2200" />
            <Figure file="character-qversion.webp" alt="魔核漫展 Q 版光娘形象设定" caption="魔核 / Q 版形象" width="1500" height="2121" />
            <Figure file="character-face.webp" alt="光娘面部与眼部细节特写" caption="面部细节" width="1200" height="1174" />
          </div>
          <div className="mallip-subhead">
            <span>STICKER SET</span>
            <h3>八连表情包</h3>
          </div>
          <div className="mallip-expr-strip">
            {expressions.map(([file, label]) => (
              <figure key={file}>
                <a href={`${asset}${file}`} target="_blank" rel="noopener noreferrer" aria-label={`查看${label}表情原图`}>
                  <img src={`${asset}${file}`} alt={`光娘${label}表情`} width="420" height="420" loading="lazy" decoding="async" />
                </a>
                <figcaption>{label}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="case-section" id="mascot" aria-labelledby="mascot-title">
          <div className="case-section-head">
            <span>02</span>
            <div><p>MASCOT DESIGN &amp; SAMPLING</p><h2 id="mascot-title">光盒精灵，从设定到打样</h2></div>
            <p>以五行属性为骨架的吉祥物系列：草木、星月、冰霜与雷电。设计稿之后走完打样，实体公仔落地。</p>
          </div>
          <div className="mallip-grid-5">
            {mascots.map(([file, label, w, h]) => (
              <Figure key={file} file={file} alt={`光盒精灵${label}设定`} caption={label} width={w} height={h} />
            ))}
          </div>
          <Figure file="mascot-blueprint.webp" alt="霜月公仔的设计图纸，含三视图与配色规范" caption="霜月 / 设计图纸" width="2000" height="843" className="mallip-spaced" />
          <Figure file="mascot-photo-hand.webp" alt="手持叶系公仔的实物照片" caption="叶 / 实体在手" width="1300" height="867" className="mallip-photo-lead" />
          <div className="mallip-pair mallip-pair-tall">
            <Figure file="mascot-photo-real.webp" alt="公仔实体摆放的成品照片" caption="公仔实体" width="3855" height="5312" />
            <Figure file="mascot-photo-sample.webp" alt="实体公仔打样一版与二版的对照照片" caption="打样 / 一版与二版" width="3727" height="3884" />
          </div>
        </section>

        <section className="case-section" id="event-visual" aria-labelledby="event-title">
          <div className="case-section-head">
            <span>03</span>
            <div><p>EVENT VISUAL</p><h2 id="event-title">三届漫展，一套视觉体系</h2></div>
            <p>每届漫展换主题不换骨架，排版结构与形象语言保持一致，让系列感在一届届更迭里累积。</p>
          </div>
          <Figure file="kv-first.webp" alt="光盒世界魔核漫展第一届主视觉" caption="第一届 / 主视觉" width="1920" height="1080" />
          <div className="mallip-pair mallip-spaced">
            <Figure file="kv-second.webp" alt="光盒世界魔核漫展第二届冬日主题主视觉" caption="第二届 / 冬日主题" width="1920" height="1080" />
            <Figure file="kv-third.webp" alt="光盒世界魔核漫展第三届圣诞主题主视觉" caption="第三届 / 圣诞主题" width="1920" height="1079" />
          </div>
          <Figure file="event-newyear.webp" alt="元旦次元派对活动宣传视觉" caption="元旦次元派对" width="1280" height="791" className="mallip-spaced" />
          <div className="mallip-subhead">
            <span>MOHE 1.0 MATERIALS</span>
            <h3>一届漫展的完整物料</h3>
          </div>
          <Figure file="material-kv.webp" alt="光盒世界魔核 1.0 漫展主视觉" caption="魔核 1.0 / 主视觉" width="961" height="541" />
          <div className="mallip-strip-row mallip-spaced">
            <Figure file="material-strip-1.webp" alt="魔核 1.0 漫展宣传长图，顶部为圣诞主题形象" caption="宣传长图 / 点击看全图" width="700" height="4019" />
            <Figure file="material-strip-2.webp" alt="魔核 1.0 次元体验官申请规则长图" caption="体验官规则 / 点击看全图" width="700" height="3627" />
            <Figure file="material-strip-3.webp" alt="魔核 1.0 漫展戏曲风宣传长图" caption="宣传长图 / 点击看全图" width="602" height="7334" />
          </div>
          <Figure file="event-ticket.webp" alt="活动线上售票页面长图" caption="线上售票页" width="1000" height="2168" className="mallip-portrait-inset mallip-spaced" />
          <Figure file="mall-screen.webp" alt="商场外屏投放画面，含 CN 出席宣传卡、华强北沉浸式IP乐园横幅与角色表情包" caption="商场外屏投放" width="2041" height="898" className="mallip-spaced" />
        </section>

        <section className="case-section" id="space-material" aria-labelledby="space-title">
          <div className="case-section-head">
            <span>04</span>
            <div><p>SPACE &amp; ON-SITE MATERIALS</p><h2 id="space-title">把视觉放进真实商场</h2></div>
            <p>小程序楼层三维建模、现场平面规划，以及真正摆进商场的分类垃圾桶与纸巾机。</p>
          </div>
          <div className="mallip-pair">
            <Figure file="mall-floor-3d.webp" alt="小程序内商场三楼三维建模轴测图" caption="三楼三维建模" width="2200" height="1237" />
            <Figure file="mall-floor-3d-b.webp" alt="三楼三维建模的另一视角与灯光效果" caption="三楼建模 / 另一视角" width="2200" height="1237" />
          </div>
          <div className="mallip-pair mallip-spaced">
            <Figure file="floor-2l.webp" alt="商场二楼现场平面规划图" caption="二楼 / 平面规划" width="1292" height="822" />
            <Figure file="floor-3l.webp" alt="商场三楼现场平面规划图" caption="三楼 / 平面规划" width="1500" height="903" />
          </div>
          <Figure file="mall-entrance.webp" alt="商场入口现场物料与画面落地照片" caption="商场入口落地" width="1200" height="1600" className="mallip-portrait-inset mallip-spaced" />
          <div className="mallip-subhead">
            <span>ON-SITE MATERIALS</span>
            <h3>现场物料设计</h3>
          </div>
          <div className="mallip-grid-5">
            <Figure file="bin-1.webp" alt="净心殿主题绿色分类垃圾桶设计" caption="净心殿" width="1397" height="1178" />
            <Figure file="bin-2.webp" alt="和声海峡主题绿色分类垃圾桶设计" caption="和声海峡" width="1397" height="1185" />
            <Figure file="bin-3.webp" alt="推进之城主题绿色分类垃圾桶设计" caption="推进之城" width="1397" height="1185" />
            <Figure file="bin-4.webp" alt="荧光森林主题绿色分类垃圾桶设计" caption="荧光森林" width="1397" height="1103" />
            <Figure file="bin-5.webp" alt="落日谷主题绿色分类垃圾桶设计" caption="落日谷" width="1397" height="1185" />
          </div>
          <div className="mallip-pair mallip-spaced">
            <Figure file="bin-photo-1.webp" alt="绿色分类垃圾桶在商场现场的实际摆放照片" caption="垃圾桶 / 现场落地" width="1279" height="1706" />
            <Figure file="bin-photo-2.webp" alt="绿色分类垃圾桶现场使用的另一角度照片" caption="垃圾桶 / 现场使用" width="1279" height="1706" />
          </div>
          <div className="mallip-pair mallip-spaced">
            <Figure file="tissue-design.webp" alt="商场纸巾机外观与画面设计图" caption="纸巾机 / 设计图" width="1167" height="1364" />
            <Figure file="tissue-photo.webp" alt="纸巾机在商场现场的实际照片" caption="纸巾机 / 现场" width="960" height="1282" />
          </div>
        </section>

        <section className="case-section" id="motion" aria-labelledby="motion-title">
          <div className="case-section-head">
            <span>05</span>
            <div><p>DYNAMIC &amp; SCREEN</p><h2 id="motion-title">从手机开屏到街头大屏</h2></div>
            <p>为小程序与商场外屏制作的动态视觉：开屏动画把 IP 装进掌心，外屏视频在华强北街头循环播放。</p>
          </div>
          <div className="mallip-motion-row">
            <VideoFigure file="mallip-app-splash.mp4" poster="mallip-app-splash-poster.jpg" label="光盒世界小程序开屏动画" caption="小程序 / 开屏动画" width="478" height="852" />
            <Figure file="mallip-led-photo.webp" alt="商场外屏播放视频时的华强北现场实景照片" caption="外屏 / 华强北现场" width="1080" height="933" />
          </div>
          <VideoFigure file="mallip-led-video.mp4" poster="mallip-led-video-poster.jpg" label="商场外屏活动视频" caption="商场外屏 / 活动视频" width="1920" height="1080" className="mallip-video-lead" />
        </section>

        <section className="case-section" id="merch" aria-labelledby="merch-title">
          <div className="case-section-head">
            <span>06</span>
            <div><p>MERCH DERIVATIVES</p><h2 id="merch-title">让角色走出屏幕</h2></div>
            <p>吧唧徽章与玩家公会档案袋，是玩家真正带得走的 IP；档案袋附展开图与完整设计稿。</p>
          </div>
          <div className="mallip-merch-lead">
            <Figure file="merch-badge.webp" alt="光盒玩家 NO.001 吧唧徽章设计" caption="玩家公会 / 吧唧徽章" width="1594" height="1594" />
            <Figure file="merch-file-pdf.webp" alt="公会档案袋完整设计稿，含正面与背面版式" caption="公会档案袋 / 设计稿" width="2200" height="1473" />
          </div>
          <div className="mallip-grid-3 mallip-spaced">
            <Figure file="merch-file.webp" alt="公会档案袋展开图与版式设计" caption="档案袋 / 展开图" width="1285" height="932" />
            <Figure file="merch-character.webp" alt="档案袋配套角色插画设计" caption="档案角色插画" width="1262" height="1291" />
            <Figure file="merch-qversion.webp" alt="公会玩家 Q 版形象设计" caption="玩家 Q 版形象" width="1262" height="1291" />
          </div>
          <div className="mallip-pair mallip-pair-wide">
            <Figure file="merch-badge-photo.webp" alt="吧唧徽章实物手持照片" caption="吧唧 / 实物" width="364" height="240" />
            <Figure file="merch-event-photo.webp" alt="玩家签约活动现场合影" caption="活动现场 / 玩家签约" width="403" height="355" />
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
