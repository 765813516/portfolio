import React, { StrictMode, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowUpRight,
  BadgeCheck,
  Boxes,
  Brush,
  Clapperboard,
  Cpu,
  Gem,
  Layers3,
  Mail,
  Palette,
  Phone,
  WandSparkles,
} from 'lucide-react';
import StarBorder from './StarBorder';
import Lanyard from './Lanyard/Lanyard';
import ContactBackdrop from './ContactBackdrop';
import ChromaWaves from './ChromaWaves';
import SpotlightCard from './SpotlightCard';
import ProjectsDecor from './ProjectsDecor';
import ProfileWaveBackdrop from './ProfileWaveBackdrop';
import KineticVisions from './KineticVisions';
import PortfolioArchitecture from './PortfolioArchitecture';
import AdvantagesIntro from './AdvantagesIntro';
import LineSidebar from './LineSidebar';
import SplitFlapText from './SplitFlapText/SplitFlapText';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

const PlayWarehouseDetail = React.lazy(() => import('./PlayWarehouseDetail'));
const DuelAcademyDetail = React.lazy(() => import('./DuelAcademyDetail'));
const ClockFutureDetail = React.lazy(() => import('./ClockFutureDetail'));
const WuxiaDetail = React.lazy(() => import('./WuxiaDetail'));
const GameVisualDetail = React.lazy(() => import('./GameVisualDetail'));
const HaidaoEducationDetail = React.lazy(() => import('./HaidaoEducationDetail'));
const AnimationVisualDetail = React.lazy(() => import('./AnimationVisualDetail'));
const MallIpDetail = React.lazy(() => import('./MallIpDetail'));
const Manga3dDetail = React.lazy(() => import('./Manga3dDetail'));

const contact = {
  phone: '13145914234',
  email: '765813516@qq.com',
};

const stats = [
  {
    label: '游戏研发',
    value: [
      [{ text: '4款', metric: true }, { text: '手游  ' }, { text: '3款', metric: true }, { text: '桌游' }],
      [{ text: '微信游戏榜单前' }, { text: '60', metric: true }],
    ],
  },
  {
    label: '潮玩品牌设计  活动营销设计',
    value: [
      [{ text: '100㎡', metric: true }, { text: '潮玩店筹开' }],
      [{ text: '多场活动售票' }, { text: '5w+', metric: true }],
    ],
  },
  {
    label: '原创漫画作品',
    value: [
      [{ text: '1亿+', metric: true }, { text: '点击' }],
      [{ text: '28万+', metric: true }, { text: '收藏' }],
    ],
  },
  {
    label: '视觉平面设计',
    value: [
      [{ text: 'Bilibili / 网易 / 诗悦' }],
      [{ text: '等大厂外包经验' }],
      [{ text: '作品' }, { text: '200万+', metric: true }, { text: '播放' }],
    ],
  },
];

const projects = [
  {
    title: '商场潮玩店品牌与空间视觉',
    type: 'Brand Space / IP Campaign',
    image: `${import.meta.env.BASE_URL}assets/play-warehouse/cover.png`,
    detailHref: '?project=play-warehouse',
    summary:
      '主导一楼“玩仓”潮玩店品牌设计、施工落地把控、商场公共物料与招商规划图，形成统一高辨识度视觉体系。',
    impact: '助力华强北100㎡+潮玩实体店落地，筹开期线下活动售票 5w+元，推动 IP 商业转化。',
    tags: ['潮玩 IP', '品牌空间', '活动传播'],
  },
  {
    title: '决斗学院',
    type: 'Game Concept / PV',
    image: `${import.meta.env.BASE_URL}assets/duel-academy/character-key-art-cover.png`,
    detailHref: '?project=duel-academy',
    summary:
      '参与人物原画、道具原画、美宣、剧情原画与游戏 PV，以角色识别和卡牌叙事强化产品视觉。',
    impact: '项目进入微信游戏榜单前 60。',
    tags: ['角色原画', '道具设定', '美宣'],
  },
  {
    title: '时钟未来',
    type: 'Sci-Fi Visual Development',
    image: `${import.meta.env.BASE_URL}assets/clock-future/cover.png`,
    detailHref: '?project=clock-future',
    summary:
      '围绕未来感题材进行角色与叙事视觉开发，配合剧情原画和宣传内容建立世界观情绪。',
    impact: 'TapTap 上万人预约，一测评分 8.5。',
    tags: ['科幻视觉', '角色设定', '剧情原画'],
  },
  {
    title: '江湖大侠',
    type: 'Wuxia Game Art',
    image: `${import.meta.env.BASE_URL}assets/wuxia/cover-01.jpg`,
    detailHref: '?project=wuxia',
    summary:
      '一念逍遥风放置武侠手游，完成角色、道具与关键视觉输出，兼顾传统审美与游戏商业表现',
    impact: '在各游戏平台获得高流水成绩。',
    tags: ['古风', '武侠', '游戏美术'],
  },
  {
    title: '游戏视觉与品牌设计',
    type: 'Game Visual / Brand Design',
    image: `${import.meta.env.BASE_URL}assets/game-visual/cover.webp`,
    detailHref: '?project=game-visual',
    summary:
      '涵盖望月界面视觉、遗忘之海角色海报、逆水寒联名美宣与光遇字形设计，呈现不同游戏气质下的视觉表达。',
    impact: '覆盖界面、角色海报、宣传视频与品牌标识等交付场景。',
    tags: ['界面视觉', '角色海报', '联名美宣', '品牌设计'],
  },
  {
    title: '动画视觉创作',
    type: 'Storyboard / Animation',
    image: `${import.meta.env.BASE_URL}assets/animation-visual/cover.webp`,
    detailHref: '?project=animation-visual',
    summary:
      '涵盖《飞天》《九州仙魔志》《北斗》条漫及 Ave Mujica 动画 MV，展示从分镜、绘制到动态成片的叙事创作。',
    impact: '《九州仙魔志》获“最具网络人气改编漫画奖”铜奖；Ave Mujica MV 播放量约 160 万次。',
    tags: ['故事分镜', '条漫绘制', '动态漫画'],
  },
  {
    title: '商场IP与周边设计',
    type: 'Mall IP / Merch Design',
    image: `${import.meta.env.BASE_URL}assets/mall-ip/cover.webp`,
    detailHref: '?project=mall-ip',
    summary:
      '围绕光盒世界商场 IP，完成形象设定、三届漫展主视觉、现场物料、小程序三维建模与吧唧档案袋周边设计。',
    impact: '支撑多届漫展与商场活动的视觉落地，让同一形象贯穿活动、空间与商品。',
    tags: ['商场 IP', '漫展 KV', '周边衍生'],
  },
  {
    title: '海道教育 H5 与活动视觉',
    type: 'H5 / Campaign Visual',
    image: `${import.meta.env.BASE_URL}assets/haidao-education/mid-autumn.webp`,
    detailHref: '?project=haidao-education',
    summary:
      '围绕节日活动与留学内容，设计互动 H5、校园红包、课程海报和像素风公众号推文。',
    impact: '让不同传播场景保持鲜明而连贯的品牌识别。',
    tags: ['互动 H5', '活动视觉', '长图推文'],
  },
  {
    title: '漫画连载和三维练习',
    type: 'Manga Serial / 3D Practice',
    image: `${import.meta.env.BASE_URL}assets/manga-3d/cover.webp`,
    detailHref: '?project=manga-3d',
    summary:
      '承担从剧本到完稿全过程的原创漫画连载签约漫画作者，以及一部分 Blender 三维软件自学练习。',
    impact: '网易签约作品点击过亿、收藏 28万+，后续转入哔哩哔哩漫画发布。',
    tags: ['原创漫画', '长篇连载', 'Blender'],
  },
];

const advantages = [
  {
    icon: Palette,
    title: '角色与世界观设定',
    text: '能从叙事、性格、商业定位出发统一角色造型、画风和视觉记忆点。',
  },
  {
    icon: Brush,
    title: '游戏原画与美宣',
    text: '覆盖人物、道具、剧情原画、海报和宣传视觉，适配欧美、日韩、儿插等多种风格。',
  },
  {
    icon: Layers3,
    title: '品牌空间与活动落地',
    text: '能够统筹商场视觉、潮玩店品牌、漫展物料、招商规划和活动传播。',
  },
  {
    icon: Clapperboard,
    title: '动态分镜与视频表达',
    text: '熟悉动态分镜、PV 制作、角色故事动画和短视频传播节奏。',
  },
  {
    icon: Cpu,
    title: 'AI 与 Agent 工作流',
    text: '熟练使用新 AI 工具，为灵感、剧本、分镜和最终视频产出建立高效流程。',
  },
  {
    icon: BadgeCheck,
    title: '团队协作与交付管理',
    text: '具备设计组长和主美经验，能协调设计、开发、市场和工厂打样链路。',
  },
];

const profileFacts = [
  ['姓名', '郑雅靖'],
  ['年龄', '28 岁'],
  ['教育背景', '天津美术学院 本科 / 动画创作与编剧'],
  ['求职方向', 'IP 潮玩 / 游戏角色 / 动画导演 / 品牌视觉'],
];

const skillIcons = [
  { label: 'Ps', name: 'Adobe Photoshop', variant: 'ps' },
  { label: 'Ai', name: 'Adobe Illustrator', variant: 'ai' },
  { label: 'Ae', name: 'Adobe After Effects', variant: 'ae' },
  { image: `${import.meta.env.BASE_URL}assets/icon-csp.png`, name: 'Clip Studio Paint', variant: 'image csp' },
  { image: `${import.meta.env.BASE_URL}assets/icon-roblox-studio.png`, name: 'Roblox Studio', variant: 'image roblox' },
  { image: `${import.meta.env.BASE_URL}assets/icon-blender.png`, name: 'Blender', variant: 'image blender' },
];

const profileHighlights = [
  {
    icon: WandSparkles,
    title: 'AI 融合型创作能力',
    text: '持续学习最新 AI 软件，将其融入原画、分镜、视频与品牌视觉流程，提升方案探索、视觉迭代和交付效率。',
  },
  {
    icon: Boxes,
    title: '线上内容与游戏经验',
    text: '覆盖手游项目、Roblox 独立游戏工作室开发、漫画动画、动漫账号策划运营与执行，理解内容平台和年轻用户的节奏。',
  },
  {
    icon: Layers3,
    title: '线下商业与 IP 落地',
    text: '参与潮玩 IP 开发、潮玩店前期视觉启动、商场活动设计宣传与物料落地，能把概念推进到真实商业场景。',
  },
  {
    icon: BadgeCheck,
    title: '高效执行与市场洞察',
    text: '跨行业经历背后，是稳定的审美判断、快速推进能力和对年轻市场的观察，适合承担复合型视觉操盘职责。',
  },
];

const timeline = [
  ['2025.05 - 至今', '青立屿川设计有限公司', '主理创始人'],
  ['2025.06 - 2026.05', '深圳光盒控股科技有限公司', '设计组长'],
  ['2023.05 - 2025.05', '深圳欣欣互动科技有限公司', '原画'],
  ['2022.03 - 2023.03', '深圳拾光同行文化传播有限公司', '游戏主美术'],
  ['2021.11 - 2022.03', '深圳菲沃数字营销有限公司', '动画总监'],
  ['2021.02 - 2021.10', '深圳海道教育科技有限公司', '插画师'],
  ['2020.05 - 2021.02', '深圳驯鹿科技有限公司', '漫画师'],
  ['2017.04 - 2018.06', '网易（杭州）网络有限公司', '漫画师'],
];

function CartoonGirl() {
  return (
    <svg className="cartoon-girl" viewBox="0 0 520 640" role="img" aria-labelledby="cartoonGirlTitle">
      <title id="cartoonGirlTitle">天蓝色中长发矢量卡通女孩</title>
      <defs>
        <linearGradient id="girlSky" x1="108" x2="420" y1="64" y2="560" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#a8fbff" />
          <stop offset="0.42" stopColor="#38caff" />
          <stop offset="1" stopColor="#0076ff" />
        </linearGradient>
        <filter id="blueGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="7" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="0 0 0 0 0.1 0 0 0 0 0.75 0 0 0 0 1 0 0 0 0.58 0"
          />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        className="orbit-line"
        d="M79 509C64 397 119 238 221 133c103-106 229-93 257-13 27 76-44 200-156 304C210 529 94 622 79 509Z"
      />
      <path className="star star-a" d="M86 50l16 33 35 14-35 14-16 34-16-34-35-14 35-14 16-33Z" />
      <path className="star star-b" d="M445 146l12 25 27 11-27 12-12 26-13-26-27-12 27-11 13-25Z" />
      <path className="star star-c" d="M65 440l13 27 29 12-29 11-13 29-14-29-29-11 29-12 14-27Z" />
      <g filter="url(#blueGlow)">
        <path
          className="sky-fill"
          d="M226 55c-53 8-82 42-87 96-22 10-31 28-23 47 7 17 24 25 43 19 9 21 24 36 46 45l-39 70 197 8-38-76c33-13 55-40 61-76 7-46-11-83-48-108-26-18-64-29-112-25Z"
        />
        <path
          className="sky-fill"
          d="M174 202c-29 54-54 104-88 155-42 65-15 121 61 128 66 7 145-7 214-43 43-23 50-61 16-94-39-39-80-83-99-143l-104-3Z"
        />
        <path className="sky-fill" d="M66 542c39-22 77-27 96-8 12 13 5 32-18 45-31 18-79 27-108 10-18-11-9-29 30-47Z" />
        <path className="sky-fill" d="M407 475c43 2 68 17 69 42 0 24-31 40-70 35-25-4-51-19-54-38-3-22 19-40 55-39Z" />
      </g>
      <path
        className="dark-shape"
        d="M202 122c-20 17-30 43-26 70 7 43 44 69 86 61 41-7 68-42 64-84-2-20-13-40-28-52-24 21-59 28-96 5Z"
      />
      <path className="dark-shape" d="M185 262c34 35 83 37 122 4 35 38 47 96 31 150-45 22-113 33-171 22-18-58-11-121 18-176Z" />
      <path className="sky-stroke" d="M202 286c-9 38 10 66 56 82" />
      <path className="dark-shape" d="M176 289c-48 18-71 46-67 82 2 18 12 30 29 31 19 1 32-12 31-30-1-18 6-32 24-43l-17-40Z" />
      <path className="sky-stroke" d="M132 359c26 8 47 4 62-14" />
      <path className="dark-shape" d="M321 296c39 14 67 43 79 84 6 20-4 37-23 42-19 4-34-7-39-27-6-23-18-39-37-51l20-48Z" />
      <path className="sky-stroke" d="M351 385c24 3 42-4 54-22" />
      <path className="dark-shape" d="M176 431l-48 103 43 13 63-101-58-15Z" />
      <path className="dark-shape" d="M315 421l76 73-34 30-90-72 48-31Z" />
      <path className="sky-stroke" d="M132 513l48 15" />
      <path className="sky-stroke" d="M357 488l35 34" />
      <circle cx="220" cy="177" r="9" fill="#86f5ff" />
      <circle cx="278" cy="177" r="9" fill="#86f5ff" />
      <path className="face-line" d="M221 211c19 14 42 14 62 0" />
      <path className="ground-line" d="M71 604c35 7 76 6 121-2" />
    </svg>
  );
}

let cachedHeroVideoUrl = null;

function HeroVideoBackground() {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return undefined;

    const ctx = canvas.getContext('2d');
    const width = 1280;
    const height = 720;
    canvas.width = width;
    canvas.height = height;

    let frame = 0;
    let raf = 0;
    let recorder;
    let stream;
    let url;
    let stopTimer = 0;
    let cancelled = false;
    const mediaSupported =
      typeof canvas.captureStream === 'function' && typeof window.MediaRecorder === 'function';
    const mime = mediaSupported
      ? ['video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm'].find((type) =>
          window.MediaRecorder.isTypeSupported(type),
        )
      : null;

    const draw = () => {
      frame += 1;
      const t = frame / 60;
      const g = ctx.createLinearGradient(0, 0, width, height);
      g.addColorStop(0, '#17151d');
      g.addColorStop(0.42, '#26242b');
      g.addColorStop(0.72, '#171722');
      g.addColorStop(1, '#080910');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);

      const colorField = ctx.createRadialGradient(170, 66, 30, 270, 210, 460);
      colorField.addColorStop(0, 'rgba(104, 113, 240, 0.96)');
      colorField.addColorStop(0.48, 'rgba(73, 66, 190, 0.62)');
      colorField.addColorStop(1, 'rgba(31, 27, 88, 0)');
      ctx.fillStyle = colorField;
      ctx.fillRect(0, 0, 760, 480);

      ctx.globalAlpha = 0.92;
      ctx.fillStyle = '#4b58d2';
      ctx.beginPath();
      ctx.ellipse(132, -44, 354, 236, 0.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 0.38;
      ctx.fillStyle = '#805bcf';
      ctx.beginPath();
      ctx.ellipse(210, 24, 280, 196, -0.12, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalAlpha = 0.94;
      ctx.fillStyle = '#e89b47';
      ctx.beginPath();
      ctx.moveTo(612, 0);
      ctx.lineTo(705, 0);
      ctx.lineTo(650, 42);
      ctx.closePath();
      ctx.fill();

      ctx.globalAlpha = 0.2;
      ctx.strokeStyle = '#d9ddf0';
      ctx.lineWidth = 1;
      for (let x = -140; x < width + 180; x += 88) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x - 120, height);
        ctx.stroke();
      }
      for (let y = 48; y < height; y += 72) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      ctx.globalAlpha = 0.4;
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#d7d1e4';
      for (let i = 0; i < 56; i += 1) {
        const baseY = 316 + i * 7;
        ctx.beginPath();
        ctx.moveTo(-40, baseY + Math.sin(t * 0.2 + i * 0.2) * 5);
        ctx.bezierCurveTo(
          300,
          baseY - 82 + Math.sin(t * 0.18 + i * 0.12) * 8,
          510,
          baseY + 92 + Math.cos(t * 0.2 + i * 0.15) * 8,
          720,
          baseY - 12,
        );
        ctx.bezierCurveTo(
          980,
          baseY - 66 + Math.sin(t * 0.16 + i * 0.18) * 8,
          1120,
          baseY + 4,
          1280,
          baseY - 32,
        );
        ctx.stroke();
      }

      ctx.globalAlpha = 0.22;
      ctx.strokeStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(0, 360);
      ctx.lineTo(410, 372);
      ctx.lineTo(528, 438);
      ctx.lineTo(650, 438);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(160, 316);
      ctx.lineTo(432, 330);
      ctx.lineTo(510, 394);
      ctx.stroke();

      ctx.globalAlpha = 0.18;
      ctx.lineWidth = 8;
      ctx.strokeStyle = '#6069d8';
      ctx.beginPath();
      ctx.arc(1035, 300, 185, Math.PI * 0.25, Math.PI * 1.55);
      ctx.stroke();
      ctx.strokeStyle = '#d179a9';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(1060, 302, 108, Math.PI * 0.28, Math.PI * 1.66);
      ctx.stroke();

      ctx.globalAlpha = 0.12;
      ctx.fillStyle = '#ffffff';
      const panels = [
        [724, 120, 184, 310, 0.05],
        [854, 228, 274, 260, -0.18],
        [1016, 166, 220, 380, 0.24],
        [520, 384, 256, 154, -0.12],
      ];
      panels.forEach(([x, y, w, h, r], index) => {
        ctx.save();
        ctx.translate(x + w / 2 + Math.sin(t + index) * 18, y + h / 2);
        ctx.rotate(r + Math.sin(t * 0.35 + index) * 0.04);
        ctx.fillRect(-w / 2, -h / 2, w, h);
        ctx.strokeStyle = 'rgba(255,255,255,.28)';
        ctx.strokeRect(-w / 2, -h / 2, w, h);
        ctx.restore();
      });

      ctx.globalAlpha = 0.28;
      for (let i = 0; i < 72; i += 1) {
        const x = (i * 151 + frame * 0.35) % width;
        const y = (i * 83 + Math.sin(t * 0.6 + i) * 20) % height;
        ctx.fillStyle = i % 3 === 0 ? '#94a2ff' : i % 3 === 1 ? '#e9a0c7' : '#f0d09d';
        ctx.fillRect(x, y, 1.4, 1.4);
      }

      ctx.globalAlpha = 1;
      raf = window.requestAnimationFrame(draw);
    };

    draw();

    // Canvas -> MediaRecorder encoding is expensive (~4s), so cache the result
    // module-level and reuse it if the effect re-runs (React StrictMode in dev
    // double-invokes effects, which would otherwise record twice).
    if (cachedHeroVideoUrl) {
      video.src = cachedHeroVideoUrl;
      video.play().catch(() => {});
      setVideoReady(true);
      return undefined;
    }

    if (mime) {
      const chunks = [];
      stream = canvas.captureStream(24);
      recorder = new window.MediaRecorder(stream, {
        mimeType: mime,
        videoBitsPerSecond: 2600000,
      });
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunks.push(event.data);
      };
      recorder.onstop = () => {
        // The effect may have been torn down mid-recording (StrictMode remount);
        // the truncated blob would be invalid, so discard it in that case.
        if (cancelled || !chunks.length) return;
        const blob = new Blob(chunks, { type: mime });
        url = URL.createObjectURL(blob);
        cachedHeroVideoUrl = url;
        video.src = url;
        video.play().catch(() => {});
        setVideoReady(true);
      };
      recorder.start();
      stopTimer = window.setTimeout(() => {
        if (recorder && recorder.state === 'recording') recorder.stop();
      }, 4200);
    }

    return () => {
      cancelled = true;
      window.clearTimeout(stopTimer);
      window.cancelAnimationFrame(raf);
      if (recorder && recorder.state === 'recording') recorder.stop();
      stream?.getTracks().forEach((track) => track.stop());
      // cachedHeroVideoUrl intentionally survives unmounts so the next mount
      // can reuse the encoded clip without re-recording.
    };
  }, []);

  return (
    <div className={`hero-video-shell ${videoReady ? 'is-video-ready' : ''}`} aria-hidden="true">
      <img className="hero-poster" src={`${import.meta.env.BASE_URL}assets/hero-poster.png`} alt="" />
      <video ref={videoRef} className="hero-video" muted loop playsInline poster={`${import.meta.env.BASE_URL}assets/hero-poster.png`} />
      <canvas ref={canvasRef} className="hero-canvas" />
      <div className="hero-noise" />
    </div>
  );
}

function SectionHeading({ eyebrow, title, text }) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}

function ContactSection({ mailTo }) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [modelReady, setModelReady] = useState(false);
  const [imageReady, setImageReady] = useState(false);
  const [started, setStarted] = useState(false);
  const [settled, setSettled] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const handleModelReady = useCallback(() => setModelReady(true), []);
  const handleImageReady = useCallback(() => setImageReady(true), []);
  const handleComplete = useCallback(() => setSettled(true), []);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(preference.matches);
    updatePreference();
    preference.addEventListener('change', updatePreference);
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.18, rootMargin: '-96px 0px -8% 0px' },
    );
    observer.observe(sectionRef.current);
    return () => {
      observer.disconnect();
      preference.removeEventListener('change', updatePreference);
    };
  }, []);

  // Keep the canvas mounted and release physics with the backdrop's first frame.
  useEffect(() => {
    if (isVisible && modelReady && imageReady) setStarted(true);
  }, [isVisible, modelReady, imageReady]);

  useEffect(() => {
    if (started && reducedMotion) setSettled(true);
  }, [started, reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`contact-section${started ? ' is-started' : ''}${settled ? ' is-settled' : ''}`}
      data-scene-phase={settled ? 'settled' : started ? 'playing' : 'waiting'}
    >
      <ContactBackdrop onReady={handleImageReady} onComplete={handleComplete} />
      <div className="section-inner contact-layout">
        <h2 className="contact-title" aria-label="Contact Me">
          {started && (
            <SplitFlapText
              words={reducedMotion ? ['Contact Me'] : ['', 'Contact Me']}
              flipDuration={0.12}
              stagger={0.06}
              cycleDelay={400}
              charset="alphanumeric"
              flipsPerChar={8}
              tileColor="#151516"
              textColor="#dce0df"
              tileRadius={8}
              gap="var(--contact-flap-gap)"
              fontSize="var(--contact-flap-size)"
              loop={false}
              padTo={10}
              aria-hidden="true"
            />
          )}
        </h2>
        <div
          className="contact-lanyard"
          role="img"
          aria-label="可拖拽的个人资料卡，正面为微信二维码，背面为郑雅靖的海边照片"
        >
          <Lanyard
            position={[0, 0, 15]}
            gravity={[0, -40, 0]}
            frontImage={`${import.meta.env.BASE_URL}assets/lanyard-qr.png`}
            backImage={`${import.meta.env.BASE_URL}assets/lanyard-photo.jpg`}
            imageFit="cover"
            frontImageFit="contain"
            backImageFit="cover"
            lanyardWidth={1}
            active={started}
            visible={isVisible}
            reducedMotion={reducedMotion}
            onReady={handleModelReady}
          />
        </div>
        <div className="contact-card">
          <a href={mailTo}>
            <span className="glass-icon" aria-hidden="true"><Mail size={20} /></span>
            <span className="contact-value">{contact.email}</span>
          </a>
          <a href={`tel:${contact.phone}`}>
            <span className="glass-icon" aria-hidden="true"><Phone size={20} /></span>
            <span className="contact-value">{contact.phone}</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function ProfileDecorArt() {
  const artRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = artRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={artRef} className={`profile-decor${isVisible ? ' is-visible' : ''}`} aria-hidden="true">
      <span className="profile-decor-grid" />
      <span className="profile-decor-frame profile-decor-frame-one" />
      <span className="profile-decor-frame profile-decor-frame-two" />
      <span className="profile-decor-orbit" />
      <span className="profile-decor-ring" />
      <span className="profile-decor-line profile-decor-line-one" />
      <span className="profile-decor-line profile-decor-line-two" />
      <span className="profile-decor-line profile-decor-line-three" />
      <span className="profile-decor-node profile-decor-node-one" />
      <span className="profile-decor-node profile-decor-node-two" />
    </div>
  );
}

function App() {
  const profileRef = useRef(null);
  const timelineRef = useRef(null);
  const timelineDragRef = useRef({ active: false, startX: 0, scrollLeft: 0 });
  const mailTo = useMemo(
    () => `mailto:${contact.email}?subject=${encodeURIComponent('作品集合作咨询')}`,
    [],
  );

  const handleShowreelPointerMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = Math.min(Math.max((event.clientX - bounds.left) / bounds.width, 0), 1);
    const y = Math.min(Math.max((event.clientY - bounds.top) / bounds.height, 0), 1);
    event.currentTarget.style.setProperty('--pointer-x', `${(x * 100).toFixed(2)}%`);
    event.currentTarget.style.setProperty('--pointer-y', `${(y * 100).toFixed(2)}%`);
    event.currentTarget.style.setProperty('--scatter-x', `${10 + x * 20}px`);
    event.currentTarget.style.setProperty('--scatter-y', `${-8 - (1 - y) * 18}px`);
  };

  const handleProfilePointerMove = (event) => {
    if (event.pointerType === 'touch') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = Math.min(Math.max((event.clientX - bounds.left) / bounds.width, 0), 1);
    const y = Math.min(Math.max((event.clientY - bounds.top) / bounds.height, 0), 1);
    const topRight = Math.hypot((1 - x) * bounds.width, y * bounds.height);
    const bottomLeft = Math.hypot(x * bounds.width, (1 - y) * bounds.height);
    const radius = Math.min(bounds.width, bounds.height) * 0.8;
    const intensity = Math.max(0, 1 - Math.min(topRight, bottomLeft) / radius);

    event.currentTarget.style.setProperty('--portrait-pointer-x', `${(x * 100).toFixed(2)}%`);
    event.currentTarget.style.setProperty('--portrait-pointer-y', `${(y * 100).toFixed(2)}%`);
    event.currentTarget.style.setProperty('--portrait-effect-opacity', intensity.toFixed(3));
  };

  const handleProfilePointerLeave = (event) => {
    event.currentTarget.style.setProperty('--portrait-effect-opacity', '0');
  };

  const handleTimelinePointerDown = (event) => {
    const timelineElement = timelineRef.current;
    if (!timelineElement) return;
    timelineDragRef.current = {
      active: true,
      startX: event.clientX,
      scrollLeft: timelineElement.scrollLeft,
    };
    timelineElement.classList.add('is-dragging');
    timelineElement.setPointerCapture?.(event.pointerId);
  };

  const handleTimelinePointerMove = (event) => {
    const timelineElement = timelineRef.current;
    const drag = timelineDragRef.current;
    if (!timelineElement || !drag.active) return;
    event.preventDefault();
    timelineElement.scrollLeft = drag.scrollLeft - (event.clientX - drag.startX);
  };

  const stopTimelineDrag = (event) => {
    const timelineElement = timelineRef.current;
    if (!timelineElement) return;
    timelineDragRef.current.active = false;
    timelineElement.classList.remove('is-dragging');
    if (event?.pointerId !== undefined && timelineElement.hasPointerCapture?.(event.pointerId)) {
      timelineElement.releasePointerCapture(event.pointerId);
    }
  };

  useEffect(() => {
    const scrollToHash = () => {
      const id = window.location.hash.slice(1);
      if (!id) return;
      const target = document.getElementById(decodeURIComponent(id));
      if (!target) return;
      window.requestAnimationFrame(() => {
        const top = Math.max(target.offsetTop - 112, 0);
        window.scrollTo({ top, behavior: id === 'projects' ? 'instant' : 'auto' });
      });
    };

    scrollToHash();
    const timer = window.setTimeout(scrollToHash, 300);
    // Media above the projects section can change its position after the first scroll.
    const observer = window.location.hash === '#projects'
      ? new ResizeObserver(scrollToHash)
      : null;
    observer?.observe(document.body);
    const settleTimer = window.setTimeout(() => observer?.disconnect(), 3000);
    window.addEventListener('hashchange', scrollToHash);
    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(settleTimer);
      observer?.disconnect();
      window.removeEventListener('hashchange', scrollToHash);
    };
  }, []);

  useLayoutEffect(() => {
    const profile = profileRef.current;
    if (!profile) return undefined;

    const motion = gsap.matchMedia();
    motion.add({
      animate: '(prefers-reduced-motion: no-preference)',
      mobile: '(max-width: 640px)',
    }, ({ conditions }) => {
      if (!conditions.animate) return;

      ['.stats-grid', '.profile-highlight-grid', '.profile-note-reveal'].forEach((selector) => {
        const group = profile.querySelector(selector);
        if (!group) return;
        const cards = selector === '.profile-note-reveal'
          ? [group]
          : [...group.querySelectorAll(':scope > .profile-card-reveal')];

        gsap.fromTo(cards,
          { autoAlpha: 0, y: conditions.mobile ? 18 : 30, scale: 0.985 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.82,
            ease: 'power3.out',
            stagger: 0.1,
            clearProps: 'all',
            scrollTrigger: { trigger: group, start: 'top 82%', once: true },
          });
      });
    });

    return () => motion.revert();
  }, []);

  return (
    <main>
      <section className="hero" id="top">
        <HeroVideoBackground />
        <div className="hero-reference-arrow" aria-hidden="true" />

        <div className="hero-inner">
          <div className="hero-copy hero-showreel">
            <span className="eyebrow">Visual Designer / Game Concept Artist / Brand Designer</span>
            <div className="showreel-lockup">
              <h1 className="showreel-word" onPointerMove={handleShowreelPointerMove}>
                <img className="showreel-word-image showreel-word-base" src={`${import.meta.env.BASE_URL}assets/showreel-title.png`} alt="SHOWREEL" />
                <img className="showreel-word-image showreel-el-echo showreel-el-echo-one" src={`${import.meta.env.BASE_URL}assets/showreel-title.png`} alt="" aria-hidden="true" />
                <img className="showreel-word-image showreel-el-echo showreel-el-echo-two" src={`${import.meta.env.BASE_URL}assets/showreel-title.png`} alt="" aria-hidden="true" />
                <span className="showreel-pointer-diffusion" aria-hidden="true" />
              </h1>
              <div className="showreel-particles" aria-hidden="true">
                <span className="showreel-particle particle-one" />
                <span className="showreel-particle particle-two" />
                <span className="showreel-particle particle-three" />
                <span className="showreel-particle particle-four" />
                <span className="showreel-particle particle-five" />
                <span className="showreel-particle particle-six" />
                <span className="showreel-particle particle-seven" />
              </div>
              <p>PORTFOLIO</p>
            </div>
            <span className="hero-name">ZHENGYAJING</span>
            <div className="hero-actions">
              <StarBorder
                as="a"
                href="#kinetic-visions"
                className="hero-action-star"
                color="rgba(218, 244, 255, 0.96)"
                speed="4.8s"
                thickness={1}
                backgroundColor="linear-gradient(135deg, rgba(255, 255, 255, 0.14), rgba(112, 151, 221, 0.08) 48%, rgba(6, 12, 28, 0.42)), rgba(8, 14, 29, 0.42)"
                textColor="#f8fbff"
                borderColor="rgba(214, 231, 255, 0.32)"
              >
                <Boxes size={18} />
                <span>查看精选视频</span>
              </StarBorder>
              <a className="icon-button" href={mailTo} aria-label="发送邮件">
                <ArrowUpRight size={20} />
              </a>
            </div>
          </div>

          <div className="hero-display">
            <span className="hero-display-index">01</span>
            <h2>
              个人
              <br />
              <span>作品展示</span>
            </h2>
            <p>ZHENGYAJING ART WORK</p>
            <div className="hero-display-rule" aria-hidden="true" />
            <p className="hero-text">
              6 年视觉设计与内容创作经验，覆盖游戏原画、潮玩 IP、品牌空间、动态分镜、视觉设计与原创漫画连载。
            </p>
          </div>

          <div className="hero-device-zone">
            <LineSidebar
              className="hero-line-sidebar"
              items={['About me', 'Experience', 'Project', 'Advantage', 'Contact Info']}
              accentColor="#1825c9"
              textColor="#ffffff"
              markerColor="rgba(255, 255, 255, 0.3)"
              showIndex
              showMarker
              proximityRadius={135}
              maxShift={24}
              falloff="smooth"
              markerLength={46}
              markerGap={8}
              tickScale={0.44}
              scaleTick
              itemGap={14}
              fontSize={0.78}
              smoothing={80}
              onItemClick={(_, label) => {
                const targets = {
                  'About me': 'profile',
                  Experience: 'experience',
                  Project: 'projects',
                  Advantage: 'advantages',
                  'Contact Info': 'contact',
                };
                const target = document.getElementById(targets[label]);
                if (!target) return;
                const top = target.getBoundingClientRect().top + window.scrollY - 28;
                window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
              }}
            />

            <div className="hero-device-composition">
              <div className="hero-pixel-backdrop" aria-hidden="true">
                <span className="pixel-block pixel-block-one" />
                <span className="pixel-block pixel-block-two" />
                <span className="pixel-block pixel-block-three" />
                <span className="pixel-block pixel-block-four" />
                <span className="pixel-block pixel-block-five" />
              </div>
              <div className="hero-design-frame" aria-hidden="true">
                <span className="design-label design-label-one">DESIGN</span>
                <span className="design-label design-label-two">DESIGN</span>
                <span className="design-label design-label-three">DESIGN</span>
              </div>
              <img
                className="hero-device"
                src={`${import.meta.env.BASE_URL}assets/hero-desktop-tablet-cutout.png`}
                alt="电脑与数位板工作台"
              />
            </div>
          </div>
        </div>
      </section>

      <KineticVisions />

      <section className="section profile-section" id="profile" ref={profileRef}>
        <div className="section-inner profile-layout">
          <ProfileWaveBackdrop />
          <div
            className="profile-illustration"
            onPointerMove={handleProfilePointerMove}
            onPointerLeave={handleProfilePointerLeave}
          >
            <img
              className="profile-portrait"
              src={`${import.meta.env.BASE_URL}assets/profile-athens-photo.png`}
              alt="郑雅靖在户外的个人照片"
            />
            <span className="profile-pointer-diffusion" aria-hidden="true" />
          </div>

          <div className="profile-content">
            <div className="about-header">
              <h2>ABOUT ME</h2>
            </div>

            <div className="profile-facts" aria-label="个人基本信息">
              {profileFacts.map(([label, value]) => (
                <p key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </p>
              ))}
            </div>

            <p className="profile-intro">
              以动画创作与编剧专业为基础，6 年视觉设计与内容创作经验覆盖游戏原画、潮玩 IP、品牌空间、动态分镜、H5 长图与原创漫画连载。擅长把角色设定、风格统一、内容传播和线下物料落地放在同一套商业视觉系统中推进。
            </p>

            <div className="skill-row" aria-label="掌握技能">
              <span>掌握技能</span>
              <div className="software-grid">
                {skillIcons.map((skill) => (
                  <div className={`software-icon ${skill.variant}`} key={skill.name} title={skill.name}>
                    {skill.image ? (
                      <img src={skill.image} alt={skill.name} />
                    ) : (
                      <strong>{skill.label}</strong>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        <div className="section-inner profile-lower">
          <div className="stats-grid">
            {stats.map((item) => (
              <div className="profile-card-reveal" key={item.label}>
                <SpotlightCard className="stat-card" spotlightColor="rgba(77, 127, 255, 0.2)">
                  <span>{item.label}</span>
                  <strong>
                    {item.value.map((line, lineIndex) => (
                      <span className="stat-card__line" key={lineIndex}>
                        {line.map((part, partIndex) => (
                          <span
                            className={part.metric ? 'stat-card__metric' : 'stat-card__copy'}
                            key={`${part.text}-${partIndex}`}
                          >
                            {part.text}
                          </span>
                        ))}
                      </span>
                    ))}
                  </strong>
                </SpotlightCard>
              </div>
            ))}
          </div>

          <div className="profile-highlight-grid">
            {profileHighlights.map(({ icon: Icon, title, text }) => (
              <div className="profile-card-reveal" key={title}>
                <SpotlightCard
                  as="article"
                  className="profile-highlight-card"
                  spotlightColor="rgba(99, 92, 255, 0.22)"
                >
                  <span className="glass-icon">
                    <Icon size={21} strokeWidth={1.7} />
                  </span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </SpotlightCard>
              </div>
            ))}
          </div>

          <div className="profile-card-reveal profile-note-reveal">
            <SpotlightCard as="div" className="studio-note" spotlightColor="rgba(69, 163, 255, 0.18)">
              <span className="glass-icon">
                <Gem size={21} strokeWidth={1.7} />
              </span>
              <p>
                Gap 期创立青立屿川设计有限公司，承接独立设计项目，并系统学习 AI 软件赋能创意提案、视觉迭代与项目交付，形成独立工作室主理人的复合管理视角。
              </p>
            </SpotlightCard>
          </div>
        </div>

        <div className="section-inner timeline-rail" id="experience">
          <div
            className="timeline-block"
            ref={timelineRef}
            onPointerDown={handleTimelinePointerDown}
            onPointerMove={handleTimelinePointerMove}
            onPointerUp={stopTimelineDrag}
            onPointerCancel={stopTimelineDrag}
            onLostPointerCapture={stopTimelineDrag}
          >
            {timeline.map(([date, company, role]) => (
              <SpotlightCard
                as="article"
                className="timeline-item"
                key={`${company}-${date}`}
                spotlightColor="rgba(71, 140, 255, 0.18)"
              >
                <span>{date}</span>
                <strong>{company}</strong>
                <em>{role}</em>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      <PortfolioArchitecture />

      <section className="section projects-section" id="projects">
        <div className="section-inner">
          <div className="projects-intro">
            <ProjectsDecor />
            <SectionHeading
              eyebrow="Selected Projects"
              title="精选项目"
              text="以项目类型、核心职责和结果数据建立入口，突出视觉方向与商业落地能力。"
            />
          </div>

          <div className="project-grid">
            {projects.map((project, index) => (
              <SpotlightCard
                as={project.detailHref ? 'a' : 'article'}
                href={project.detailHref}
                className={`project-card ${index === 0 ? 'is-featured' : index === 1 ? 'is-duel' : index === 2 ? 'is-clock' : index === 3 ? 'is-wuxia' : index === 4 ? 'is-game-visual' : index === 5 ? 'is-animation' : index === 6 ? 'is-mallip' : index === 7 ? 'is-haidao' : index === 8 ? 'is-manga3d' : ''}`}
                key={project.title}
                spotlightColor={index === 2 ? 'rgba(117, 107, 238, 0.22)' : index === 3 ? 'rgba(92, 188, 234, 0.2)' : index === 5 ? 'rgba(223, 171, 195, 0.18)' : index === 7 ? 'rgba(255, 105, 73, 0.2)' : project.detailHref ? 'rgba(255, 72, 46, 0.18)' : 'rgba(83, 79, 255, 0.24)'}
              >
                <div className="project-image">
                  <img src={project.image} alt={`${project.title}项目封面`} loading="lazy" decoding="async" />
                </div>
                <div className="project-body">
                  <span>{project.type}</span>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <strong>{project.impact}</strong>
                  <div className="chip-row">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  {project.detailHref && (
                    <span className="project-detail-link">
                      查看完整案例 <ArrowUpRight size={18} aria-hidden="true" />
                    </span>
                  )}
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      <section className="section advantages-section" id="advantages">
        <ChromaWaves className="advantages-wave-field" speed={0.28} opacity={0.2} />
        <div className="section-inner">
          <AdvantagesIntro />

          <div className="advantage-grid">
            {advantages.map(({ icon: Icon, title, text }) => (
              <SpotlightCard
                as="article"
                className="advantage-card"
                key={title}
                spotlightColor="rgba(83, 79, 255, 0.2)"
              >
                <span className="glass-icon">
                  <Icon size={23} strokeWidth={1.65} />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      <ContactSection mailTo={mailTo} />
    </main>
  );
}

const detailPages = { 'play-warehouse': PlayWarehouseDetail, 'duel-academy': DuelAcademyDetail, 'clock-future': ClockFutureDetail, wuxia: WuxiaDetail, 'game-visual': GameVisualDetail, 'haidao-education': HaidaoEducationDetail, 'animation-visual': AnimationVisualDetail, 'mall-ip': MallIpDetail, 'manga-3d': Manga3dDetail };
const DetailPage = detailPages[new URLSearchParams(window.location.search).get('project')];

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {DetailPage ? (
      <React.Suspense fallback={<main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#090a0b' }}>正在加载项目...</main>}>
        <DetailPage />
      </React.Suspense>
    ) : <App />}
  </StrictMode>,
);
