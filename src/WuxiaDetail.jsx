import { useEffect } from 'react';
import { ArrowLeft, ArrowUpRight, Maximize2 } from 'lucide-react';
import './PlayWarehouseDetail.css';
import './WuxiaDetail.css';

const asset = `${import.meta.env.BASE_URL}assets/wuxia/`;
const chapters = [
  ['wuxia-art', '美宣页面展示'],
  ['wuxia-world', '侠侣 / 仙宠 / 怪物'],
  ['wuxia-system', '系统界面'],
  ['wuxia-gifts', '礼包界面'],
  ['wuxia-icons', '道具 Icon'],
];
const partners = [
  ['chibi-01.jpg', '黄衫女', 'chibi-motion-01.gif'],
  ['chibi-02.jpg', '木婉清', 'chibi-motion-02.gif', true],
  ['chibi-03.jpg', '沐剑屏', 'chibi-motion-03.gif', true],
  ['chibi-04.jpg', '任盈盈', 'chibi-motion-04.gif'],
];
const pets = [
  ['pet-01.jpg', '柴犬'],
  ['pet-02.jpg', '九尾狐'],
  ['pet-03.jpg', '青年熊猫'],
  ['pet-04.jpg', '仙剑白猿', 'wuxia-pet-cropped'],
  ['pet-05.png', '熊猫族长'],
  ['pet-06.jpg', '羊驼'],
];
const petMotions = [
  ['pet-motion-01.mp4', '柴犬'],
  ['pet-motion-02.mp4', '仙剑白猿'],
  ['pet-motion-03.mp4', '熊猫族长'],
];
const monsters = [
  ['monster-01.jpg', '水匪小怪与精英怪设定'],
  ['monster-02-revised.jpg', '十二生肖精英设定'],
  ['monster-03.jpg', '十二生肖喽啰组设定'],
  ['monster-04.jpg', '队长与护法设定'],
];
const gifts = [
  ['gift-01.jpg', '直购礼包 / 柴犬主题'],
  ['gift-02.jpg', '直购礼包 / 熊猫主题'],
  ['gift-extra-01.jpg', '累充奖励界面'],
  ['gift-extra-05.jpg', '登录初送 / 奖励弹窗'],
];
const icons = [
  '碧波流水琴', '赤焰焚天珠', '春晖拂面带', '悠游清韵壶',
  '兰香清心符', '兰香幽梦铃', '蓝海音律琴', '梦影轻舞扇',
  '清韵静心符', '水镜心瞻', '万宝金瓮', '星河盘',
  '星辉聚宝盘', '星罗天机盘', '玄霜冰心珠', '玄铁雷电戟',
  '璇云缭绕链', '枸杞虾饺',
];

function WorkFigure({ file, label, alt = label, className = '' }) {
  const src = `${asset}${file}`;
  return (
    <figure className={`case-figure wuxia-figure ${className}`}>
      <a className="wuxia-stage" href={src} target="_blank" rel="noopener noreferrer" aria-label={`查看${label}大图`} title="查看大图">
        <img src={src} alt={alt} loading="lazy" decoding="async" />
        <Maximize2 className="wuxia-zoom-icon" size={18} aria-hidden="true" />
      </a>
      <figcaption>{label}</figcaption>
    </figure>
  );
}

export default function WuxiaDetail() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = '江湖大侠 | 游戏美术设计 | 郑雅靖';
    window.scrollTo(0, 0);
    return () => { document.title = previousTitle; };
  }, []);

  return (
    <main className="case-study wuxia-detail">
      <div className="case-shell">
        <header className="case-nav">
          <a className="case-brand" href="./#projects">ZHENGYAJING <span>/ PORTFOLIO</span></a>
          <a className="case-back" href="./#projects"><ArrowLeft size={18} aria-hidden="true" /> 返回精选项目</a>
        </header>

        <section className="case-intro wuxia-intro" aria-labelledby="case-title">
          <img className="case-intro-art" src={`${asset}cover-01.jpg`} alt="" width="1156" height="977" fetchPriority="high" decoding="async" />
          <p className="case-kicker">SELECTED WORK / WUXIA GAME ART</p>
          <h1 id="case-title">江湖大侠<span>游戏美术设计</span></h1>
          <div className="case-intro-bottom">
            <p>从角色原画、侠侣与仙宠，到系统界面和道具图标，构建鲜明而统一的古风武侠视觉。</p>
            <dl className="case-meta">
              <div><dt>项目内容</dt><dd>角色 / 怪物 / 游戏 UI</dd></div>
              <div><dt>视觉方向</dt><dd>古风 · 武侠</dd></div>
            </dl>
          </div>
        </section>

        <nav className="wuxia-chapters" aria-label="作品章节">
          {chapters.map(([id, title], index) => (
            <a href={`#${id}`} key={id}><span>{String(index + 1).padStart(2, '0')}</span>{title}</a>
          ))}
        </nav>

        <section className="case-section" id="wuxia-art" aria-labelledby="wuxia-art-title">
          <div className="case-section-head">
            <span>01</span>
            <div><p>KEY ART / CHARACTER</p><h2 id="wuxia-art-title">美宣页面展示</h2></div>
            <p>一念逍遥风格，类寻道大千玩法的放置武侠手游，半年内开服达百服。</p>
          </div>
          <div className="wuxia-grid wuxia-campaign-layout">
            <WorkFigure file="art-campaign-01.jpg" label="华山之巅 / 游戏宣传视觉" alt="江湖大侠华山之巅游戏宣传画面" className="wuxia-art-campaign" />
            <div className="wuxia-campaign-side">
              <WorkFigure file="art-campaign-02.jpg" label="江湖大侠 / 长幅海报" alt="江湖大侠竖版游戏宣传海报" />
              <WorkFigure file="game-icon.png" label="江湖大侠 / 游戏图标" alt="江湖大侠游戏图标" className="wuxia-game-icon" />
            </div>
          </div>
          <div className="wuxia-subhead wuxia-art-subhead"><span>CHARACTER SKINS</span><h3>角色皮肤</h3></div>
          <div className="wuxia-grid wuxia-skin-grid">
            <div className="wuxia-skin">
              <WorkFigure file="art-skin-01.png" label="东方不败 / 角色皮肤" alt="东方不败红衣飞针角色皮肤设计" />
              <WorkFigure file="art-skin-01-in-game.jpg" label="东方不败 / 游戏内呈现" alt="东方不败角色皮肤在游戏内的展示" className="wuxia-skin-in-game" />
            </div>
            <div className="wuxia-skin">
              <WorkFigure file="art-skin-02.png" label="江左梅郎 / 角色皮肤" alt="江左梅郎蓝衣灵鸟角色皮肤设计" />
              <WorkFigure file="art-skin-02-in-game.jpg" label="江左梅郎 / 游戏内呈现" alt="江左梅郎角色皮肤在游戏内的展示" className="wuxia-skin-in-game" />
            </div>
          </div>
          <div className="wuxia-subhead wuxia-art-subhead"><span>CHARACTER ART / IN GAME</span><h3>角色原画与实机效果</h3></div>
          <div className="wuxia-grid wuxia-character-grid">
            <div className="wuxia-character">
              <WorkFigure file="art-03.jpg" label="黄衫女 / 角色原画" alt="黄衫女角色原画" />
              <WorkFigure file="gift-extra-02.jpg" label="黄衫女 / 累充界面" alt="黄衫女角色应用于累计充值游戏界面" className="wuxia-art-in-game" />
            </div>
            <div className="wuxia-character">
              <WorkFigure file="art-01.jpg" label="小龙女 / 角色原画" alt="小龙女持剑动态角色原画" />
              <WorkFigure file="gift-extra-03.jpg" label="小龙女 / 充值界面" alt="小龙女角色应用于充值游戏界面" className="wuxia-art-in-game wuxia-art-in-game-xiaolongnv" />
            </div>
            <div className="wuxia-character">
              <WorkFigure file="art-02.jpg" label="赵敏 / 角色原画" alt="赵敏红衣角色原画" />
              <WorkFigure file="gift-extra-04.jpg" label="赵敏 / 每日特惠界面" alt="赵敏角色应用于每日特惠游戏界面" className="wuxia-art-in-game wuxia-art-in-game-zhaomin" />
            </div>
          </div>
        </section>

        <section className="case-section" id="wuxia-world" aria-labelledby="wuxia-world-title">
          <div className="case-section-head">
            <span>02</span>
            <div><p>COMPANIONS / CREATURES</p><h2 id="wuxia-world-title">江湖中的伙伴与对手</h2></div>
            <p>Q 版侠侣、仙宠与怪物共同扩展角色体系，让造型语言在不同体型间保持一致。</p>
          </div>
          <div className="wuxia-subsection">
            <div className="wuxia-subhead"><span>COMPANIONS</span><h3>侠侣</h3></div>
            <div className="wuxia-grid wuxia-chibi-grid">
              {partners.map(([file, name, motion, mirrored]) => (
                <div className="wuxia-companion" key={file}>
                  <WorkFigure file={file} label={name} alt={`${name} Q版侠侣角色设计`} />
                  {motion && <WorkFigure file={motion} label={`${name} / 游戏内动态`} alt={`${name}游戏内动态预览`} className={`wuxia-motion${mirrored ? ' wuxia-motion-mirrored' : ''}`} />}
                </div>
              ))}
            </div>
            <div className="wuxia-grid wuxia-guoxiang-grid">
              <WorkFigure file="chibi-motion-05.gif" label="郭襄 / 游戏内动态" alt="郭襄游戏内动态预览" className="wuxia-guoxiang-motion" />
              <WorkFigure file="chibi-action.jpg" label="郭襄 / 攻击动作设计" alt="郭襄攻击动作与剑气特效设计稿" className="wuxia-guoxiang-action" />
            </div>
            <div className="wuxia-subhead wuxia-companion-promo-head"><span>CAMPAIGN VISUALS</span><h3>侠侣宣传图</h3></div>
            <div className="wuxia-grid wuxia-companion-promo-grid">
              <WorkFigure file="companion-promo-01.jpg" label="郭襄 / 兽友同行宣传图" alt="郭襄与九尾狐兽友同行游戏宣传画面" />
              <WorkFigure file="companion-promo-02.jpg" label="任盈盈 / 心魔试炼宣传图" alt="任盈盈心魔试炼游戏宣传画面" />
            </div>
          </div>
          <div className="wuxia-subsection">
            <div className="wuxia-subhead"><span>SPIRIT COMPANIONS</span><h3>仙宠</h3></div>
            <div className="wuxia-grid wuxia-pet-grid">
              {pets.map(([file, name, className]) => <WorkFigure key={file} file={file} label={name} alt={`${name}仙宠设计`} className={className} />)}
            </div>
            <div className="wuxia-subhead wuxia-gallery-subhead"><span>SPIRIT MOTION</span><h3>仙宠动态效果</h3></div>
            <div className="wuxia-grid wuxia-pet-motion-grid">
              {petMotions.map(([file, name]) => (
                <figure className="case-figure wuxia-figure" key={file}>
                  <video controls playsInline loop preload="metadata" aria-label={`${name}仙宠动态效果预览`}>
                    <source src={`${asset}${file}`} type="video/mp4" />
                  </video>
                  <figcaption>{name} / 动态效果</figcaption>
                </figure>
              ))}
            </div>
          </div>
          <div className="wuxia-subsection">
            <div className="wuxia-subhead"><span>ENEMY DESIGN</span><h3>怪物设计</h3></div>
            <div className="wuxia-sheet-list">
              {monsters.map(([file, name]) => <WorkFigure key={file} file={file} label={name} alt={name} className="wuxia-sheet" />)}
              <WorkFigure file="monster-skill-01.jpg" label="六指琴魔 / 技能设计" alt="六指琴魔两种技能效果设计展示" className="wuxia-sheet" />
            </div>
            <div className="wuxia-grid wuxia-monster-game-grid">
              <WorkFigure file="monster-extra-01.jpg" label="青霜铁傀 / 游戏内呈现" alt="青霜铁傀怪物在游戏关卡中的展示" className="wuxia-monster-game" />
              <WorkFigure file="monster-extra-02.jpg" label="六指琴魔 / 游戏内呈现" alt="六指琴魔在魔教来袭玩法中的游戏截图" className="wuxia-monster-game" />
            </div>
          </div>
        </section>

        <section className="case-section" id="wuxia-system" aria-labelledby="wuxia-system-title">
          <div className="case-section-head">
            <span>03</span>
            <div><p>GAME INTERFACE</p><h2 id="wuxia-system-title">系统界面</h2></div>
            <p>在移动端屏幕里组织道具、功能与玩法信息，同时保留古风材质与装饰细节。</p>
          </div>
          <div className="wuxia-grid wuxia-screen-grid">
            <WorkFigure file="system-01.jpg" label="藏宝阁 / 系统界面" alt="藏宝阁宝箱陈列系统界面" />
            <WorkFigure file="system-extra-01.jpg" label="法宝 / 详情界面" alt="赤焰焚天珠法宝详情界面" />
          </div>
        </section>

        <section className="case-section" id="wuxia-gifts" aria-labelledby="wuxia-gifts-title">
          <div className="case-section-head">
            <span>04</span>
            <div><p>OFFER SCREENS</p><h2 id="wuxia-gifts-title">礼包界面</h2></div>
            <p>直购弹窗、累充奖励与登录奖励页面，以角色和奖励内容建立清晰的视觉层级。</p>
          </div>
          <div className="wuxia-grid wuxia-gift-grid">
            {gifts.map(([file, name]) => <WorkFigure key={file} file={file} label={name} alt={name} />)}
          </div>
        </section>

        <section className="case-section" id="wuxia-icons" aria-labelledby="wuxia-icons-title">
          <div className="case-section-head">
            <span>05</span>
            <div><p>ITEM ICONS</p><h2 id="wuxia-icons-title">道具 Icon 设计</h2></div>
            <p>用轮廓、材质与光影区分法宝、饰品和消耗道具，让小尺寸图标依然易于辨认。</p>
          </div>
          <div className="wuxia-grid wuxia-icon-grid">
            {icons.map((name, index) => <WorkFigure key={name} file={`icon-${String(index + 1).padStart(2, '0')}.jpg`} label={name} alt={`${name}道具图标`} />)}
            <WorkFigure file="icon-19.png" label="幽谷兰香瓶" alt="幽谷兰香瓶道具图标" />
            <WorkFigure file="icon-20.png" label="紫藤花语灯" alt="紫藤花语灯道具图标" />
          </div>
          <div className="wuxia-subhead wuxia-gallery-subhead"><span>GOLDEN FINGER ITEMS</span><h3>金手指系统道具设计</h3></div>
          <div className="wuxia-grid wuxia-golden-grid">
            <WorkFigure file="golden-01.jpg" label="九阳神功 / 金手指系统道具" alt="九阳神功金手指系统道具设计" />
            <WorkFigure file="golden-02.jpg" label="倚天剑 / 金手指系统道具" alt="倚天剑金手指系统道具设计" />
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
