import React, { useState, useMemo, useEffect, useRef, useContext, createContext } from 'react';

// === i18n =============================================================
// UI シェル + Lesson 00 まで翻訳済み。
// 残レッスンの Story / SectionTitle / Card 内プロースは順次 t() 化していく。
// 拡張時は I18N に同じ key の翻訳を追加するだけ。
const I18N = {
  ja: {
    'app.skip':           '本文へスキップ',
    'app.footer':         'OPTIMIZATION LAB — 触って学ぶ数理最適化 / built with React',
    'lang.switch':        'EN',
    'nav.home':           'はじめに',
    'nav.intro':          '入門',
    'nav.lp':             'LP',
    'nav.explosion':      '爆発',
    'nav.knapsack':       'ナップサック',
    'nav.transport':      '輸送',
    'nav.landscape':      '山と谷',
    'nav.shift':          'シフト',
    'nav.setcover':       '集合被覆',
    'nav.facility':       '施設配置',
    'nav.portfolio':      'ポートフォリオ',
    'nav.modeling':       'モデリング',
    'nav.toolchain':      '道具',
    'nav.setup':          'セットアップ',
    'home.kicker':        'OPTIMIZATION LAB · 2026',
    'home.title.line1':   '数理最適化',
    'home.title.line2':   'スターター',
    'home.lead':          '制約のもとで目的を最大化（最小化）する考え方を、身近な題材で体験する教材です。スライダーやボタンで実際に動かしながら学びます。',
    'home.cta':           '初めての人はここから → Lesson 00',
    'home.essence.label': 'ESSENCE / 数理最適化を構成する3つの要素',
    'home.step1.label':   '言葉に慣れる',
    'home.step1.tag':     '— 数式の前に、3要素を体に入れる',
    'home.step2.label':   '解いてみる',
    'home.step2.tag':     '— 古典問題で式と最適解を行き来する',
    'home.step3.label':   '直感をつかむ',
    'home.step3.tag':     '— 貪欲のクセと凸性を見る',
    'home.step4.label':   '実務に繋ぐ',
    'home.step4.tag':     '— 翻訳と道具の橋渡し',
    'lessonNav.prev':     '← PREV',
    'lessonNav.next':     'NEXT →',
    // === Lesson 00 (Intro) =====
    'intro.title':         '最適化って何？',
    'intro.story.line1':   '朝の20分で、お弁当を作る。',
    'intro.story.line2':   'おかずは4種類。それぞれ作るのにかかる時間と、おいしさ（満足度）が違う。',
    'intro.story.line3':   '時間内におさめながら、満足度がいちばん高くなる組み合わせを探そう。',
    'intro.blackboard':    'LUNCH BOX / お弁当箱',
    'intro.svg.label':     'お弁当箱：4つの仕切りに各おかずを個数分タイルで並べた図',
    'intro.dish.0':        '卵焼き',
    'intro.dish.1':        'からあげ',
    'intro.dish.2':        'ブロッコリー',
    'intro.dish.3':        'ごはん詰め',
    'intro.unit.min':      '分',
    'intro.unit.point':    '点',
    'intro.unit.piece':    ' 個',
    'intro.label.qty':     '各おかずの個数を決める',
    'intro.btn.reset':     'リセット',
    'intro.btn.revert':    '元に戻す',
    'intro.btn.showOpt':   '最適解を見る',
    'intro.label.optJoy':  'OPTIMAL JOY',
    'intro.label.yourJoy': 'YOUR JOY',
    'intro.label.usedTime':'使った時間',
    'intro.status.over':   '✗ オーバー',
    'intro.status.exact':  '✓ ぴったり',
    'intro.label.optimal': '最適',
    'intro.note.tieBreak.pre':  '※ 同じ ',
    'intro.note.tieBreak.post': ' 点を出す組み合わせは他にもある',
    'intro.section1.title':'いま、何をやった？',
    'intro.note.lead':     'スライダーを動かすだけで、3つのことをやっていた。',
    'intro.q1.tag':        '1. 何を決めた？',
    'intro.q1.body':       '4種類のおかずを「いくつ作るか」。',
    'intro.q1.thisIs':     'これが ',
    'intro.q1.term':       '決定変数',
    'intro.q2.tag':        '2. 何を最大にした？',
    'intro.q2.body':       '満足度の合計。',
    'intro.q2.thisIs':     'これが ',
    'intro.q2.term':       '目的関数',
    'intro.q3.tag':        '3. 何を守った？',
    'intro.q3.body':       '「20分以内」と「各おかずの上限個数」。',
    'intro.q3.thisIs':     'これが ',
    'intro.q3.term':       '制約条件',
    'intro.punct.period':  '。',
    'intro.section2.title':'最適化の仕事は、この3つを式にすること',
    'intro.s2.lead':       '世の中の「うまく決めたい」という仕事は、たいていこの3点セットで書ける。',
    'intro.s2.bold.flow':  '変数 → 目的 → 制約',
    'intro.s2.write':      ' の順に書き出して、コンピュータに渡す。次のレッスンからは、この3つを実際に ',
    'intro.s2.bold.form':  '数式',
    'intro.s2.tail':       ' に翻訳していく。',
    // === Setup (Appendix) =====
    'setup.kicker':           '付録',
    'setup.title':            '手元で動かす',
    'setup.subtitle':         'PYTHON + COLAB SETUP',
    'setup.story.line1':      'ここまで全部、ブラウザの中だけで触ってきた。',
    'setup.story.line2':      '次は、自分の Python で同じ問題を解いてみよう。',
    'setup.story.line3':      '一番ラクなのは Google Colab。何もインストールせずに、ブラウザだけで始められる。',
    'setup.s1.title':         'まずは Colab で動かす',
    'setup.s1.body':          'Colab は、ブラウザの中で Python が動く Google のサービス。インストール作業はゼロ。Gmail のアカウントさえあれば、もう準備は終わっている。',
    'setup.s1.steps.title':   '手順',
    'setup.s1.step1':         'colab.research.google.com を開いて、Google でログインする',
    'setup.s1.step2':         '「ファイル」→「ノートブックを新規作成」を選ぶ',
    'setup.s1.step3':         '下のコードをまるごとセルに貼って、Shift + Enter',
    'setup.s1.step4':         'セルの下に xA, xB, profit が出てきたら成功',
    'setup.s1.note':          'お題は Lesson 01（工場の社長）とそっくり同じ LP。最適解は xA=10, xB=20, profit=3200 になるはず。スライダーで遊んでいた結果が、Python でも同じ数字で出てくる。',
    'setup.s2.title':         '次は手元の PC にも入れておく',
    'setup.s2.body':          'Colab に慣れてきたら、手元のマシンにも Python を入れておくと自由度が一気に上がる。公式インストーラと pip があれば、もう動く。エディタは VS Code を選んでおけばだいたい外さない。',
    'setup.s3.title':         'つまずいたら',
    'setup.s3.tip1.label':    'pip が見つからない',
    'setup.s3.tip1.body':     'たいてい、インストールのときに「Add Python to PATH」を入れ忘れている。入れ直すか、面倒なら `python -m pip` で代用できる。',
    'setup.s3.tip2.label':    'pulp が import できない',
    'setup.s3.tip2.body':     'pip と python が別物を指している、よくあるやつ。`python -m pip install pulp` で、いま動いている python と同じ場所に入れ直すと直る。',
    'setup.s3.tip3.label':    'solver not found',
    'setup.s3.tip3.body':     'PuLP には CBC ソルバーが付いてくるので、普通は出ないエラー。Colab ならランタイム再起動、ローカルなら pulp をいったん消して入れ直すと、大体すぐ動く。',
    'setup.s4.title':         'ここから先',
    'setup.s4.body':          'PuLP の書き方が体に入ってきたら、Lesson 11 で並んでいた JuMP（Julia）や AMPL、商用ソルバー（Gurobi / CPLEX）もそのまま射程に入る。表面の文法は違うけど、「変数・目的・制約」の3点セットはどこに行っても変わらない。',
    'setup.s4.backLink':      '→ Lesson 11 に戻る（道具を見比べる）',
    'setup.tab.colab':        'Colab セル',
    'setup.tab.local':        'ローカル端末',
    'setup.copy':             'コピー',
    'setup.copied':           '✓ コピー済',
    'setup.copy.aria':        'コードをコピー',
  },
  en: {
    'app.skip':           'Skip to main content',
    'app.footer':         'OPTIMIZATION LAB — playful tour of mathematical optimization / built with React',
    'lang.switch':        '日本語',
    'nav.home':           'Home',
    'nav.intro':          'Intro',
    'nav.lp':             'LP',
    'nav.explosion':      'Explosion',
    'nav.knapsack':       'Knapsack',
    'nav.transport':      'Transport',
    'nav.landscape':      'Landscape',
    'nav.shift':          'Shift',
    'nav.setcover':       'Set Cover',
    'nav.facility':       'Facility',
    'nav.portfolio':      'Portfolio',
    'nav.modeling':       'Modeling',
    'nav.toolchain':      'Toolchain',
    'nav.setup':          'Setup',
    'home.kicker':        'OPTIMIZATION LAB · 2026',
    'home.title.line1':   'Mathematical',
    'home.title.line2':   'Optimization Starter',
    'home.lead':          'A hands-on tour of how to maximize (or minimize) an objective under constraints. Drag sliders, flip toggles, learn by doing.',
    'home.cta':           'Start here → Lesson 00',
    'home.essence.label': 'ESSENCE / The three building blocks',
    'home.step1.label':   'Get the vocabulary',
    'home.step1.tag':     '— absorb the 3 pieces before any math',
    'home.step2.label':   'Solve concrete problems',
    'home.step2.tag':     '— move between formulas and optima',
    'home.step3.label':   'Build intuition',
    'home.step3.tag':     '— see greedy traps and convexity',
    'home.step4.label':   'Bridge to practice',
    'home.step4.tag':     '— translation skills and real tools',
    'lessonNav.prev':     '← PREV',
    'lessonNav.next':     'NEXT →',
    // === Lesson 00 (Intro) =====
    'intro.title':         'What is optimization?',
    'intro.story.line1':   "You've got 20 minutes to pack a bento before heading out.",
    'intro.story.line2':   'There are 4 dishes — each takes a different time to make and gives different satisfaction.',
    'intro.story.line3':   'Stay within the time budget and find the combination with the highest satisfaction.',
    'intro.blackboard':    'LUNCH BOX',
    'intro.svg.label':     'Lunch box: tiles in 4 compartments showing the count of each dish.',
    'intro.dish.0':        'Tamago',
    'intro.dish.1':        'Karaage',
    'intro.dish.2':        'Broccoli',
    'intro.dish.3':        'Rice ball',
    'intro.unit.min':      'min',
    'intro.unit.point':    'pt',
    'intro.unit.piece':    '',
    'intro.label.qty':     'Set the count for each dish',
    'intro.btn.reset':     'Reset',
    'intro.btn.revert':    'Revert',
    'intro.btn.showOpt':   'Show optimal',
    'intro.label.optJoy':  'OPTIMAL JOY',
    'intro.label.yourJoy': 'YOUR JOY',
    'intro.label.usedTime':'Time used',
    'intro.status.over':   '✗ over',
    'intro.status.exact':  '✓ exact fit',
    'intro.label.optimal': 'Optimal',
    'intro.note.tieBreak.pre':  '※ Other combinations also reach ',
    'intro.note.tieBreak.post': ' pts',
    'intro.section1.title':'What did you just do?',
    'intro.note.lead':     'Just by moving sliders, you did three things.',
    'intro.q1.tag':        '1. What did you decide?',
    'intro.q1.body':       'How many of each of the 4 dishes to make.',
    'intro.q1.thisIs':     'This is the ',
    'intro.q1.term':       'decision variables',
    'intro.q2.tag':        '2. What did you maximize?',
    'intro.q2.body':       'The total satisfaction.',
    'intro.q2.thisIs':     'This is the ',
    'intro.q2.term':       'objective function',
    'intro.q3.tag':        '3. What did you respect?',
    'intro.q3.body':       'The 20-minute budget and the per-dish max count.',
    'intro.q3.thisIs':     'These are the ',
    'intro.q3.term':       'constraints',
    'intro.punct.period':  '.',
    'intro.section2.title':"Optimization's job: turn these three into formulas",
    'intro.s2.lead':       'In real life, "I want to choose well" usually fits these 3 building blocks.',
    'intro.s2.bold.flow':  'variables → objective → constraints',
    'intro.s2.write':      ' — write them in this order and hand them to the computer. From the next lesson on, we translate the three into actual ',
    'intro.s2.bold.form':  'formulas',
    'intro.s2.tail':       '.',
    // === Setup (Appendix) =====
    'setup.kicker':           'APPENDIX',
    'setup.title':            'Run It On Your Machine',
    'setup.subtitle':         'PYTHON + COLAB SETUP',
    'setup.story.line1':      "So far everything has lived inside this browser.",
    'setup.story.line2':      "Time to solve the same problem with your own Python.",
    'setup.story.line3':      "The shortest path is Google Colab. Nothing to install, just open a tab.",
    'setup.s1.title':         "Start with Colab",
    'setup.s1.body':          "Colab is Google's in-browser Python. No install, no setup. If you have a Gmail account, you're already done with the prep.",
    'setup.s1.steps.title':   'Steps',
    'setup.s1.step1':         "Open colab.research.google.com and sign in with Google",
    'setup.s1.step2':         "File → New notebook",
    'setup.s1.step3':         "Paste the code below into a cell, hit Shift + Enter",
    'setup.s1.step4':         "If xA, xB, and profit show up under the cell, you're in.",
    'setup.s1.note':          "Same LP as Lesson 01 (the factory). The answer should land on xA=10, xB=20, profit=3200, the same numbers you saw moving the sliders.",
    'setup.s2.title':         "Then put it on your own machine",
    'setup.s2.body':          "Once Colab feels familiar, getting Python onto your own laptop unlocks a lot more. The official installer plus pip will take you the whole way. VS Code is a safe pick for an editor.",
    'setup.s3.title':         'If You Get Stuck',
    'setup.s3.tip1.label':    'pip not found',
    'setup.s3.tip1.body':     "Almost always 'Add Python to PATH' was unchecked during install. Reinstall with that on, or just use `python -m pip` instead.",
    'setup.s3.tip2.label':    "Can't import pulp",
    'setup.s3.tip2.body':     "Classic case of pip and python pointing at different installs. `python -m pip install pulp` drops it where the python you're running will actually find it.",
    'setup.s3.tip3.label':    'Solver not found',
    'setup.s3.tip3.body':     "PuLP ships with the CBC solver, so this one shouldn't really happen. In Colab a runtime restart fixes it; locally, uninstalling and reinstalling pulp usually does the trick.",
    'setup.s4.title':         "From here",
    'setup.s4.body':          "Once PuLP starts feeling natural, the JuMP (Julia), AMPL, and commercial solvers (Gurobi / CPLEX) lined up in Lesson 11 are all in reach. The surface syntax shifts around, but the variable / objective / constraint trio stays the same wherever you go.",
    'setup.s4.backLink':      '→ Back to Lesson 11 (compare the tools)',
    'setup.tab.colab':        'Colab cell',
    'setup.tab.local':        'Local terminal',
    'setup.copy':             'Copy',
    'setup.copied':           '✓ Copied',
    'setup.copy.aria':        'Copy code',
  },
};

const LangContext = createContext({ lang: 'ja', t: (k) => k, setLang: () => {} });

function useT() {
  const ctx = useContext(LangContext);
  return ctx.t;
}

/* ============================================================
 *  数理最適化を、遊ぶ — 初心者向けインタラクティブ学習アプリ
 *  4 modules: LP / Knapsack / Transportation / Shift Scheduling
 * ============================================================ */

// === Theme ============================================================
const C = {
  // 地 / page
  page: '#ffffff',
  pageEdge: '#e8e6e0',

  // 紙 / paper notes
  paper: '#fbf6e8',
  paperLight: '#fdfaef',
  paperDark: '#ece2c0',
  paperEdge: '#d6c899',
  ink: '#1a1812',
  inkSoft: '#3d352a',
  inkLight: '#5d5446',     // 旧 #7a7062 — 小サイズテキストでコントラスト不足だったため濃く
  inkLighter: '#9a9080',   // 旧 #bdb39e — 同上、控えめだが読める色域に
  rule: '#dccfa0',
  margin: '#b94c4a',          // ノート赤マージン
  rule2: '#7a9bb5',           // ノート横罫
  grid: '#e6dcbd',
  gridDark: '#cdbf95',

  // インク色 / 5色構成 (red, blue, green, orange + ink)
  red: '#a93128',
  redLight: '#f1d6d3',
  redDeep: '#691918',
  blue: '#1d4664',
  blueLight: '#d4dee8',
  blueDeep: '#0c2436',
  yellow: '#cb6a14',          // 橙系に変更
  yellowLight: '#fae5c5',
  yellowDeep: '#6b3a08',
  green: '#345a3b',
  greenLight: '#d4e4cf',
  greenDeep: '#1b3020',

  // ホワイトボード / whiteboard
  board: '#fafafa',           // 盤面
  boardLight: '#ffffff',
  boardDeep: '#e6e8ec',
  frame: '#aab0b8',           // アルミ枠
  frameDark: '#6c7178',
  frameLight: '#c9cdd2',
  chalk: '#1a1812',           // 黒マーカー（本文）
  chalkSoft: '#555b62',       // グレー（補足）
  chalkFaint: '#989ea4',      // 淡グレー（最も控えめ）
  chalkYellow: '#d97a14',     // 橙マーカー（最適ハイライト・等高線）
  chalkPink: '#d2342a',       // 赤マーカー
  chalkBlue: '#1f5fb5',       // 青マーカー
  chalkGreen: '#2a8543',      // 緑マーカー
};

const F_DISP = '"Klee One", "Hiragino Mincho ProN", "Yu Mincho", serif';
const F_BODY = '"Zen Kaku Gothic New", "Hiragino Sans", "Yu Gothic", sans-serif';
const F_MONO = '"JetBrains Mono", "SF Mono", ui-monospace, monospace';

// === Tiny UI primitives ==============================================

function Tag({ children, color = C.ink, bg = C.paperDark }) {
  return (
    <span
      className="inline-block px-2 py-0.5 text-xs tracking-wider uppercase"
      style={{ fontFamily: F_MONO, color, background: bg, borderRadius: 2 }}
    >
      {children}
    </span>
  );
}

function Card({ children, style, className = '', accent }) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        background: C.paperLight,
        border: `1px solid ${C.rule}`,
        boxShadow: `4px 4px 0 ${C.paperDark}`,
        padding: '1.25rem',
        ...style,
      }}
    >
      {accent && (
        <div
          style={{
            position: 'absolute', top: 0, left: 0, height: 4, width: 56,
            background: accent,
          }}
        />
      )}
      {children}
    </div>
  );
}

function Btn({ children, onClick, variant = 'primary', size = 'md' }) {
  const variants = {
    primary: { bg: C.ink, fg: C.paper, border: C.ink },
    ghost:   { bg: 'transparent', fg: C.ink, border: C.ink },
    danger:  { bg: C.red, fg: C.paper, border: C.red },
    soft:    { bg: C.paperDark, fg: C.ink, border: C.gridDark },
  };
  const v = variants[variant];
  const padY = size === 'sm' ? '0.35rem' : '0.6rem';
  const padX = size === 'sm' ? '0.7rem' : '1.1rem';
  return (
    <button
      onClick={onClick}
      style={{
        background: v.bg, color: v.fg, border: `1.5px solid ${v.border}`,
        padding: `${padY} ${padX}`,
        fontFamily: F_MONO,
        fontSize: size === 'sm' ? 12 : 13,
        letterSpacing: '0.05em',
        cursor: 'pointer',
        transition: 'transform 0.08s ease',
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = 'translate(2px,2px)')}
      onMouseUp={(e) => (e.currentTarget.style.transform = 'translate(0,0)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'translate(0,0)')}
    >
      {children}
    </button>
  );
}

function Slider({ label, value, onChange, min, max, step = 1, suffix = '', color = C.blue }) {
  return (
    <label className="block">
      <div className="flex justify-between items-baseline mb-1">
        <span style={{ fontFamily: F_BODY, fontSize: 13, color: C.inkSoft }}>{label}</span>
        <span style={{ fontFamily: F_MONO, fontSize: 14, color: C.ink, fontWeight: 500 }}>
          {value}{suffix}
        </span>
      </div>
      <input
        type="range"
        min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(+e.target.value)}
        style={{ width: '100%', accentColor: color }}
      />
    </label>
  );
}

function Equation({ children, label = 'WHITEBOARD' }) {
  return (
    <div
      style={{
        background: C.frame,
        backgroundImage: `linear-gradient(180deg, ${C.frameLight} 0%, ${C.frame} 35%, ${C.frame} 65%, ${C.frameDark} 100%)`,
        padding: '6px',
        borderRadius: 4,
        position: 'relative',
        boxShadow: `2px 3px 0 ${C.pageEdge}, inset 0 0 0 1px ${C.frameDark}`,
      }}
    >
      <div
        style={{
          background: C.board,
          color: C.chalk,
          fontFamily: F_MONO, fontSize: 14,
          padding: '1.1rem 1.3rem 1.2rem',
          letterSpacing: '0.02em',
          position: 'relative',
          boxShadow: `inset 0 1px 0 ${C.boardDeep}80`,
        }}
      >
        {label && (
          <div
            style={{
              position: 'absolute', top: 8, right: 12,
              fontFamily: F_MONO, fontSize: 9,
              color: C.chalkFaint, letterSpacing: '0.2em',
            }}
          >
            {label}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

function Blackboard({ children, label, style }) {
  return (
    <div
      style={{
        background: C.frame,
        backgroundImage: `linear-gradient(180deg, ${C.frameLight} 0%, ${C.frame} 35%, ${C.frame} 65%, ${C.frameDark} 100%)`,
        padding: '6px',
        borderRadius: 4,
        boxShadow: `3px 4px 0 ${C.pageEdge}, inset 0 0 0 1px ${C.frameDark}`,
        position: 'relative',
        ...style,
      }}
    >
      <div
        style={{
          background: C.board,
          padding: '1rem',
          color: C.chalk,
          position: 'relative',
          boxShadow: `inset 0 1px 0 ${C.boardDeep}80`,
        }}
      >
        {label && (
          <div
            style={{
              position: 'absolute', top: 8, right: 14,
              fontFamily: F_MONO, fontSize: 9,
              color: C.chalkFaint, letterSpacing: '0.2em', zIndex: 2,
            }}
          >
            {label}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

// ノート用紙（横罫線+赤マージン）
function NotePaper({ children, style }) {
  return (
    <div
      style={{
        background: C.paperLight,
        backgroundImage: `
          linear-gradient(${C.paperLight} 0px, ${C.paperLight} 31px, ${C.rule2}55 31px, ${C.rule2}55 32px, ${C.paperLight} 32px),
          linear-gradient(90deg, transparent 56px, ${C.margin}80 56px, ${C.margin}80 57px, transparent 57px)
        `,
        backgroundSize: '100% 32px, 100% 100%',
        border: `1px solid ${C.rule}`,
        boxShadow: `4px 4px 0 ${C.paperDark}`,
        padding: '1.4rem 1.4rem 1.4rem 4.5rem',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// Section wrappers ---------------------------------------------------

function ModuleHeader({ kicker, title, subtitle, accent }) {
  return (
    <div className="mb-6">
      <Tag bg={accent} color={C.paperLight}>{kicker}</Tag>
      <h2
        className="mt-3"
        style={{
          fontFamily: F_DISP, fontWeight: 600, fontSize: '2.6rem',
          lineHeight: 1.15, color: C.ink, letterSpacing: '0.01em',
        }}
      >
        {title}
      </h2>
      <p style={{ fontFamily: F_MONO, fontSize: 12, color: C.inkLight, marginTop: 4, letterSpacing: '0.08em' }}>
        — {subtitle} —
      </p>
    </div>
  );
}

function Story({ children }) {
  return (
    <div
      className="mb-6"
      style={{
        fontFamily: F_DISP, fontSize: '1.05rem', lineHeight: 1.95,
        color: C.inkSoft,
        background: C.paperLight,
        backgroundImage: `
          linear-gradient(transparent 0px, transparent 30px, ${C.rule2}30 30px, ${C.rule2}30 31px, transparent 31px)
        `,
        backgroundSize: '100% 32px',
        borderLeft: `2px solid ${C.margin}`,
        padding: '0.9rem 1.2rem 0.9rem 1.6rem',
        boxShadow: `2px 2px 0 ${C.paperDark}`,
        position: 'relative',
      }}
    >
      <span
        style={{
          position: 'absolute', left: '0.5rem', top: '0.5rem',
          fontFamily: F_MONO, fontSize: 9, color: C.margin,
          letterSpacing: '0.15em',
        }}
      >
        ✎
      </span>
      {children}
    </div>
  );
}

function SectionTitle({ children, num }) {
  return (
    <div className="flex items-baseline gap-3 mb-3 mt-8">
      {num && (
        <span style={{ fontFamily: F_MONO, fontSize: 12, color: C.inkLight }}>
          §{num}
        </span>
      )}
      <h3 style={{ fontFamily: F_DISP, fontWeight: 600, fontSize: '1.4rem', color: C.ink }}>
        {children}
      </h3>
    </div>
  );
}

// === HOME =============================================================

const MODULES = [
  {
    id: 'intro',
    no: '00',
    title: 'お弁当を作る',
    sub: '最適化って何？ — 言葉の導入',
    blurb: '20分でお弁当を作る。4種類のおかずから「いくつ作るか」を決めて、満足度を最大化する。数式の前に、決定変数・目的関数・制約条件を体感する。',
    accent: C.green,
  },
  {
    id: 'lp',
    no: '01',
    title: '工場の社長になる',
    sub: '2D線形計画 — 実行可能領域を見る',
    blurb: '2種類のレモネードを作る。砂糖とレモンの量に上限があるなかで、利益が最大になる組み合わせを求める。',
    accent: C.red,
  },
  {
    id: 'explosion',
    no: '02',
    title: '組合せ爆発を体感する',
    sub: '計算量の地図 — なぜ全探索ではダメか',
    blurb: '「全部試せばいいじゃん」が通用しないことを、桁感で見る。スライダーで n を動かすと、2^n のパターン数と所要時間がリアルタイムに伸びる。',
    accent: C.red,
  },
  {
    id: 'knapsack',
    no: '03',
    title: '旅の荷物を詰める',
    sub: 'ナップサック問題 — 離散最適化の入門',
    blurb: '容量10kgのバックパックに荷物を詰める。重さの上限を守りつつ、満足度の合計が最大になる組み合わせを選ぶ。',
    accent: C.blue,
  },
  {
    id: 'transport',
    no: '04',
    title: 'お菓子を配送する',
    sub: '輸送問題 — 割当の直感',
    blurb: '2工場から3店舗へお菓子を運ぶ。経路ごとにコストが異なるなか、合計コストを最小にする配送計画を作る。',
    accent: C.yellow,
  },
  {
    id: 'landscape',
    no: '05',
    title: '山と谷',
    sub: '局所最適 vs 大域最適 — 貪欲の罠',
    blurb: '凸凹のある関数の上をボールが転がる。今いる場所の傾きしか見ないと、すぐそばの谷で止まり、もっと深い谷に気づけない。多点スタートで脱出する。',
    accent: C.blue,
  },
  {
    id: 'shift',
    no: '06',
    title: 'シフトを組む',
    sub: 'スケジューリング — 制約のパズル',
    blurb: '4人のスタッフで5日間のシフトを組む。各日の必要人数、勤務日数の上限、希望休をすべて満たすシフトを作る。',
    accent: C.green,
  },
  {
    id: 'setcover',
    no: '07',
    title: '消防署を配置する',
    sub: '集合被覆問題 — 最少リソースで全カバー',
    blurb: '町の全エリアを1つの消防署で守るには候補のうち何箇所を開設すればよいか。最少の数で全エリアをカバーする組み合わせを選ぶ。',
    accent: C.red,
  },
  {
    id: 'facility',
    no: '08',
    title: '倉庫を建てる',
    sub: '施設配置問題 — 固定費 vs 輸送費',
    blurb: '4つの倉庫候補から建設地を選び、5つの需要点へ配送する。建設費（固定費）と輸送費の合計を最小にする組み合わせを求める。',
    accent: C.yellow,
  },
  {
    id: 'portfolio',
    no: '09',
    title: '資産を運用する',
    sub: 'ポートフォリオ最適化 — リスクとリターン',
    blurb: '4種類の資産にどう配分するか。リスク許容度に応じて、効率的フロンティア上の最適な配分を求める。',
    accent: C.blue,
  },
  {
    id: 'modeling',
    no: '10',
    title: '文章を式にする',
    sub: 'モデリング演習 — 翻訳の練習',
    blurb: 'ケーキ屋・配車・旅行プランの3問。文章中の語句を「変数 / 目的 / 制約」に分類して、最適化問題への翻訳スキルを身につける。',
    accent: C.yellow,
  },
  {
    id: 'toolchain',
    no: '11',
    title: 'ソルバーとモデリング言語',
    sub: '実務への接続 — 道具の使い分け',
    blurb: '同じ問題を PuLP / JuMP / 生のLP標準形 で書き比べる。モデリング言語とソルバーの役割の違い、最初に選ぶべき組み合わせまで。',
    accent: C.green,
  },
];

function HomeView({ go }) {
  const t = useT();
  return (
    <div>
      {/* Hero */}
      <div className="mb-12">
        <Tag bg={C.ink} color={C.paper}>{t('home.kicker')}</Tag>
        <h1
          className="mt-4"
          style={{
            fontFamily: F_DISP, fontWeight: 600,
            fontSize: 'clamp(2.5rem, 6vw, 4.4rem)',
            lineHeight: 1.05, color: C.ink, letterSpacing: '-0.01em',
          }}
        >
          {t('home.title.line1')}<br />
          <span style={{ color: C.red }}>{t('home.title.line2')}</span>
        </h1>
        <p
          className="mt-5 max-w-xl"
          style={{
            fontFamily: F_DISP, fontSize: '1.1rem', lineHeight: 1.85, color: C.inkSoft,
          }}
        >
          {t('home.lead')}
        </p>
        <div className="mt-6">
          <button
            onClick={() => go('intro')}
            style={{
              background: C.ink, color: C.paper, border: `1.5px solid ${C.ink}`,
              padding: '0.7rem 1.4rem',
              fontFamily: F_MONO, fontSize: 13, letterSpacing: '0.05em',
              cursor: 'pointer', boxShadow: `3px 3px 0 ${C.paperDark}`,
            }}
          >
            {t('home.cta')}
          </button>
        </div>
      </div>

      {/* 3要素 - 黒板で定義 */}
      <div style={{ marginBottom: '3rem' }}>
        <Blackboard label={t('home.essence.label')}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { k: '決定変数', v: 'あなたが決められること', ex: 'どれを、いくつ、いつ', color: C.chalkPink },
              { k: '目的関数', v: '最大化（最小化）したい量', ex: '利益・距離・時間', color: C.chalkBlue },
              { k: '制約条件', v: '守らなければならないこと', ex: '予算・容量・需要', color: C.chalkYellow },
            ].map((it, i) => (
              <div key={i} style={{ borderTop: `2px solid ${it.color}`, paddingTop: '0.6rem' }}>
                <div style={{ fontFamily: F_DISP, fontSize: '1.3rem', fontWeight: 600, color: it.color }}>
                  {it.k}
                </div>
                <div style={{ fontFamily: F_BODY, fontSize: 14, color: C.chalk, marginTop: 4 }}>
                  {it.v}
                </div>
                <div style={{ fontFamily: F_MONO, fontSize: 12, color: C.chalkSoft, marginTop: 6 }}>
                  e.g. {it.ex}
                </div>
              </div>
            ))}
          </div>
          <div
            className="mt-5 pt-4"
            style={{
              borderTop: `1px dashed ${C.chalkFaint}`,
              fontFamily: F_BODY, fontSize: 14, color: C.chalk, lineHeight: 1.85,
            }}
          >
            <b style={{ color: C.chalkYellow }}>制約条件</b>を満たしながら、
            <b style={{ color: C.chalkBlue }}>目的関数</b>を最大化（最小化）する
            <b style={{ color: C.chalkPink }}>決定変数</b>の値を求める——これが数理最適化。
          </div>
        </Blackboard>
      </div>

      {/* Module cards (grouped by learning step) */}
      {HOME_GROUPS.map((g, gi) => (
        <div key={gi} style={{ marginBottom: '2.5rem' }}>
          <div className="mb-3 flex items-baseline gap-3">
            <span style={{
              fontFamily: F_MONO, fontSize: 11, color: g.color,
              letterSpacing: '0.18em', fontWeight: 600,
            }}>
              {g.kicker}
            </span>
            <span style={{ fontFamily: F_DISP, fontSize: '1.05rem', color: C.ink, fontWeight: 600 }}>
              {t(g.labelKey)}
            </span>
            <span style={{ fontFamily: F_MONO, fontSize: 11, color: C.inkLight }}>
              {t(g.tagKey)}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {g.ids.map((id) => {
              const m = MODULES.find((x) => x.id === id);
              if (!m) return null;
              return (
                <button
                  key={m.id}
                  onClick={() => go(m.id)}
                  className="text-left group"
                  style={{
                    background: C.page,
                    border: `1px solid ${C.pageEdge}`,
                    borderLeft: `3px solid ${m.accent}`,
                    padding: '1.5rem',
                    cursor: 'pointer',
                    boxShadow: `3px 3px 0 ${C.pageEdge}`,
                    transition: 'transform 0.12s ease, box-shadow 0.12s ease, border-color 0.12s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translate(-2px,-2px)';
                    e.currentTarget.style.boxShadow = `5px 5px 0 ${C.pageEdge}`;
                    e.currentTarget.style.borderTopColor = C.frame;
                    e.currentTarget.style.borderRightColor = C.frame;
                    e.currentTarget.style.borderBottomColor = C.frame;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translate(0,0)';
                    e.currentTarget.style.boxShadow = `3px 3px 0 ${C.pageEdge}`;
                    e.currentTarget.style.borderTopColor = C.pageEdge;
                    e.currentTarget.style.borderRightColor = C.pageEdge;
                    e.currentTarget.style.borderBottomColor = C.pageEdge;
                  }}
                >
                  <div className="flex items-baseline justify-between mb-3">
                    <span style={{
                      fontFamily: F_MONO, fontSize: 11, color: m.accent,
                      letterSpacing: '0.2em', fontWeight: 500,
                    }}>
                      {m.no}
                    </span>
                    <span style={{ fontFamily: F_MONO, fontSize: 11, color: C.inkLight }}>→</span>
                  </div>
                  <h3 style={{ fontFamily: F_DISP, fontSize: '1.5rem', fontWeight: 600, color: C.ink, lineHeight: 1.25 }}>
                    {m.title}
                  </h3>
                  <div style={{ fontFamily: F_MONO, fontSize: 11.5, color: C.inkSoft, marginTop: 6, letterSpacing: '0.04em' }}>
                    {m.sub}
                  </div>
                  <p
                    className="mt-3"
                    style={{ fontFamily: F_BODY, fontSize: 13.5, color: C.inkSoft, lineHeight: 1.7 }}
                  >
                    {m.blurb}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// Step grouping for the home view (learning ladder).
// label/tagline は i18n key を保持し、レンダリング時に t() で解決する。
const HOME_GROUPS = [
  { kicker: 'STEP 1', labelKey: 'home.step1.label', tagKey: 'home.step1.tag', color: C.green,  ids: ['intro', 'explosion'] },
  { kicker: 'STEP 2', labelKey: 'home.step2.label', tagKey: 'home.step2.tag', color: C.red,    ids: ['lp', 'knapsack', 'transport', 'shift', 'setcover', 'facility', 'portfolio'] },
  { kicker: 'STEP 3', labelKey: 'home.step3.label', tagKey: 'home.step3.tag', color: C.blue,   ids: ['landscape'] },
  { kicker: 'STEP 4', labelKey: 'home.step4.label', tagKey: 'home.step4.tag', color: C.yellow, ids: ['modeling', 'toolchain'] },
];

// === INTRO MODULE =====================================================

const DISHES = [
  { id: 0, name: '卵焼き',       time: 5, joy: 8,  max: 3, color: C.chalkYellow, slider: C.yellow },
  { id: 1, name: 'からあげ',     time: 6, joy: 12, max: 3, color: C.chalkPink,   slider: C.red },
  { id: 2, name: 'ブロッコリー', time: 2, joy: 4,  max: 4, color: C.chalkGreen,  slider: C.green },
  { id: 3, name: 'ごはん詰め',   time: 3, joy: 6,  max: 2, color: C.chalkBlue,   slider: C.blue },
];
const TIME_BUDGET = 20;

function bruteForceLunch() {
  let best = { qty: [0, 0, 0, 0], joy: 0, time: 0 };
  for (let a = 0; a <= DISHES[0].max; a++)
    for (let b = 0; b <= DISHES[1].max; b++)
      for (let c = 0; c <= DISHES[2].max; c++)
        for (let d = 0; d <= DISHES[3].max; d++) {
          const t = a * DISHES[0].time + b * DISHES[1].time + c * DISHES[2].time + d * DISHES[3].time;
          if (t > TIME_BUDGET) continue;
          const j = a * DISHES[0].joy + b * DISHES[1].joy + c * DISHES[2].joy + d * DISHES[3].joy;
          if (j > best.joy) best = { qty: [a, b, c, d], joy: j, time: t };
        }
  return best;
}

function IntroView() {
  const { lang, t } = useContext(LangContext);
  const [qty, setQty] = useState([0, 0, 0, 0]);
  const [revealOpt, setRevealOpt] = useState(false);

  const opt = useMemo(() => bruteForceLunch(), []);
  const display = revealOpt ? opt.qty : qty;
  const totalTime = display.reduce((s, q, i) => s + q * DISHES[i].time, 0);
  const totalJoy = display.reduce((s, q, i) => s + q * DISHES[i].joy, 0);
  const over = totalTime > TIME_BUDGET;

  const setOne = (i, v) => {
    const next = [...qty];
    next[i] = v;
    setQty(next);
    setRevealOpt(false);
  };

  // 言語別フォーマッタ：日本語は全角括弧 + 数値直付け、英語は半角括弧 + スペース
  const fmtSliderLabel = (i, d) => {
    const name = t(`intro.dish.${i}`);
    const min = t('intro.unit.min');
    const pt = t('intro.unit.point');
    return lang === 'ja'
      ? `${name}（${d.time}${min} / +${d.joy}${pt}）`
      : `${name} (${d.time} ${min} / +${d.joy} ${pt})`;
  };
  const fmtMin = (n) => (lang === 'ja' ? `${n}${t('intro.unit.min')}` : `${n} ${t('intro.unit.min')}`);
  const fmtPt = (n) => (lang === 'ja' ? `${n}${t('intro.unit.point')}` : `${n} ${t('intro.unit.point')}`);

  // Lunch box SVG (2x2 compartments)
  const SW = 480, SH = 280, M = 20;
  const compW = (SW - 2 * M) / 2;
  const compH = (SH - 2 * M) / 2;
  const cellPos = [{ r: 0, c: 0 }, { r: 0, c: 1 }, { r: 1, c: 0 }, { r: 1, c: 1 }];

  return (
    <div>
      <ModuleHeader kicker="LESSON 00" title={t('intro.title')} subtitle="WHAT IS OPTIMIZATION?" accent={C.green} />

      <Story>
        {t('intro.story.line1')}<br />
        {t('intro.story.line2')}<br />
        {t('intro.story.line3')}
      </Story>

      <Card accent={C.green}>
        <Blackboard label={t('intro.blackboard')} style={{ marginBottom: '1rem' }}>
          <svg viewBox={`0 0 ${SW} ${SH}`} role="img" aria-label={t('intro.svg.label')}
            style={{ width: '100%', height: 'auto', display: 'block' }}>
            {/* Outer box */}
            <rect x={M} y={M} width={SW - 2 * M} height={SH - 2 * M}
              fill="none" stroke={C.chalk} strokeWidth={2.5} />
            {/* Dividers */}
            <line x1={M + compW} y1={M} x2={M + compW} y2={SH - M}
              stroke={C.chalk} strokeWidth={1.5} />
            <line x1={M} y1={M + compH} x2={SW - M} y2={M + compH}
              stroke={C.chalk} strokeWidth={1.5} />

            {DISHES.map((dish, di) => {
              const cell = cellPos[di];
              const cx = M + cell.c * compW;
              const cy = M + cell.r * compH;
              const q = display[di];
              const cols = Math.min(dish.max, 4);
              const rows = Math.ceil(dish.max / cols);
              const ts = Math.min((compW - 32) / cols - 4, (compH - 56) / rows - 4, 30);
              const totalW = cols * ts + (cols - 1) * 4;
              const startX = cx + (compW - totalW) / 2;
              const startY = cy + 32;
              const tiles = [];
              for (let i = 0; i < dish.max; i++) {
                const r = Math.floor(i / cols), col = i % cols;
                const filled = i < q;
                tiles.push(
                  <rect key={i}
                    x={startX + col * (ts + 4)}
                    y={startY + r * (ts + 4)}
                    width={ts} height={ts}
                    fill={filled ? dish.color : 'none'}
                    stroke={dish.color}
                    strokeWidth={1.5}
                    opacity={filled ? 0.85 : 0.25}
                    rx={3}
                  />
                );
              }
              return (
                <g key={di}>
                  <text x={cx + 12} y={cy + 18}
                    style={{ fontFamily: F_DISP, fontSize: 13, fontWeight: 600, fill: dish.color }}>
                    {t(`intro.dish.${di}`)}
                  </text>
                  <text x={cx + compW - 12} y={cy + 18} textAnchor="end"
                    style={{ fontFamily: F_MONO, fontSize: 10, fill: C.chalkSoft }}>
                    {fmtMin(dish.time)} / +{dish.joy}
                  </text>
                  {tiles}
                </g>
              );
            })}
          </svg>
        </Blackboard>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="md:col-span-2 space-y-3">
            <div style={{ fontFamily: F_MONO, fontSize: 11, color: C.inkLight, letterSpacing: '0.1em' }}>
              {t('intro.label.qty')}
            </div>
            {DISHES.map((d, i) => (
              <Slider
                key={d.id}
                label={fmtSliderLabel(i, d)}
                value={display[i]}
                onChange={(v) => setOne(i, v)}
                min={0} max={d.max}
                suffix={t('intro.unit.piece')}
                color={d.slider}
              />
            ))}
            <div className="flex gap-2 mt-3">
              <Btn variant="ghost" size="sm" onClick={() => { setQty([0, 0, 0, 0]); setRevealOpt(false); }}>{t('intro.btn.reset')}</Btn>
              <Btn variant="primary" size="sm" onClick={() => setRevealOpt(!revealOpt)}>
                {revealOpt ? t('intro.btn.revert') : t('intro.btn.showOpt')}
              </Btn>
            </div>
          </div>

          <div style={{
            background: C.board, color: C.chalk, padding: '1rem',
            border: `4px solid ${C.frame}`, borderRadius: 3,
            boxShadow: `inset 0 0 0 1px ${C.frameDark}`,
          }}>
            <div style={{ fontFamily: F_MONO, fontSize: 11, color: C.chalkSoft, letterSpacing: '0.15em' }}>
              {revealOpt ? t('intro.label.optJoy') : t('intro.label.yourJoy')}
            </div>
            <div className="mt-1">
              <span style={{
                fontFamily: F_DISP, fontSize: '2.2rem', fontWeight: 600,
                color: over ? C.chalkPink : (revealOpt ? C.chalkYellow : C.chalk),
              }}>
                {over ? '—' : totalJoy}
              </span>
              <span style={{ fontFamily: F_MONO, fontSize: 12, color: C.chalkSoft, marginLeft: 6 }}>{t('intro.unit.point')}</span>
            </div>
            <div style={{
              fontFamily: F_MONO, fontSize: 11,
              color: over ? C.chalkPink : C.chalkSoft, marginTop: 6,
            }}>
              {t('intro.label.usedTime')}: {totalTime} / {fmtMin(TIME_BUDGET)}{' '}
              {over ? t('intro.status.over') : (totalTime === TIME_BUDGET ? t('intro.status.exact') : '')}
            </div>
            <div style={{
              fontFamily: F_MONO, fontSize: 10, color: C.chalkSoft,
              marginTop: 12, paddingTop: 8, borderTop: `1px dashed ${C.chalkFaint}`, lineHeight: 1.6,
            }}>
              {t('intro.label.optimal')}: <b style={{ color: C.chalkYellow }}>{fmtPt(opt.joy)}</b>
              <br />
              {opt.qty.map((q, i) => q > 0 ? `${t(`intro.dish.${i}`)}×${q}` : null).filter(Boolean).join(' / ')}
              <div style={{ marginTop: 6, fontSize: 9, color: C.chalkSoft, fontStyle: 'italic' }}>
                {t('intro.note.tieBreak.pre')}{opt.joy}{t('intro.note.tieBreak.post')}
              </div>
            </div>
          </div>
        </div>
      </Card>

      <SectionTitle num="0.1">{t('intro.section1.title')}</SectionTitle>
      <NotePaper>
        <p style={{ fontFamily: F_DISP, fontSize: '1rem', lineHeight: 1.95, color: C.inkSoft }}>
          {t('intro.note.lead')}
        </p>
        <ul style={{ marginTop: 14, listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: 16 }}>
            <Tag bg={C.red} color={C.paperLight}>{t('intro.q1.tag')}</Tag>
            <div style={{ fontFamily: F_DISP, fontSize: 14, marginTop: 6, color: C.inkSoft, lineHeight: 1.8 }}>
              {t('intro.q1.body')}<br />
              {t('intro.q1.thisIs')}<b style={{ color: C.red }}>{t('intro.q1.term')}</b>{t('intro.punct.period')}
            </div>
          </li>
          <li style={{ marginBottom: 16 }}>
            <Tag bg={C.blue} color={C.paperLight}>{t('intro.q2.tag')}</Tag>
            <div style={{ fontFamily: F_DISP, fontSize: 14, marginTop: 6, color: C.inkSoft, lineHeight: 1.8 }}>
              {t('intro.q2.body')}<br />
              {t('intro.q2.thisIs')}<b style={{ color: C.blue }}>{t('intro.q2.term')}</b>{t('intro.punct.period')}
            </div>
          </li>
          <li>
            <Tag bg={C.yellow} color={C.paperLight}>{t('intro.q3.tag')}</Tag>
            <div style={{ fontFamily: F_DISP, fontSize: 14, marginTop: 6, color: C.inkSoft, lineHeight: 1.8 }}>
              {t('intro.q3.body')}<br />
              {t('intro.q3.thisIs')}<b style={{ color: C.yellow }}>{t('intro.q3.term')}</b>{t('intro.punct.period')}
            </div>
          </li>
        </ul>
      </NotePaper>

      <SectionTitle num="0.2">{t('intro.section2.title')}</SectionTitle>
      <Card>
        <p style={{ fontFamily: F_BODY, fontSize: 14, color: C.inkSoft, lineHeight: 1.85 }}>
          {t('intro.s2.lead')}
          <b>{t('intro.s2.bold.flow')}</b>
          {t('intro.s2.write')}
          <b>{t('intro.s2.bold.form')}</b>
          {t('intro.s2.tail')}
        </p>
      </Card>
    </div>
  );
}

// === LP MODULE ========================================================

function LPView() {
  // 制約は固定: 2x + y <= 40 (砂糖), x + 2y <= 50 (レモン), x,y >= 0
  // 利益 cA*x + cB*y を最大化
  const [cA, setCA] = useState(120);
  const [cB, setCB] = useState(100);
  const [showLevel, setShowLevel] = useState(true);
  const [showVertices, setShowVertices] = useState(true);

  // 頂点（手計算で4つ）
  const vertices = useMemo(
    () => [
      { x: 0, y: 0, name: 'O' },
      { x: 20, y: 0, name: 'A' },
      { x: 10, y: 20, name: 'B' },
      { x: 0, y: 25, name: 'C' },
    ],
    []
  );

  const evald = vertices.map((v) => ({ ...v, val: cA * v.x + cB * v.y }));
  const optIdx = evald.reduce((bi, v, i, a) => (v.val > a[bi].val ? i : bi), 0);
  const opt = evald[optIdx];

  // SVG座標変換
  const W = 560, H = 460, P = 46;
  const xMax = 30, yMax = 30;
  const sx = (x) => P + (x / xMax) * (W - 2 * P);
  const sy = (y) => H - P - (y / yMax) * (H - 2 * P);

  const polyPoints = vertices.map((v) => `${sx(v.x)},${sy(v.y)}`).join(' ');

  // 目的関数の等高線（最適値を通る線）cA*x + cB*y = opt.val
  // ボックス [0,xMax] × [0,yMax] と交わる2点を求める
  const levelLine = useMemo(() => {
    const v = opt.val;
    if (v === 0) return null;
    const pts = [];
    if (cB !== 0) {
      const y1 = v / cB;
      if (y1 >= -0.001 && y1 <= yMax + 0.001) pts.push({ x: 0, y: Math.max(0, Math.min(yMax, y1)) });
      const y2 = (v - cA * xMax) / cB;
      if (y2 >= -0.001 && y2 <= yMax + 0.001) pts.push({ x: xMax, y: Math.max(0, Math.min(yMax, y2)) });
    }
    if (cA !== 0) {
      const x1 = v / cA;
      if (x1 >= -0.001 && x1 <= xMax + 0.001) pts.push({ x: Math.max(0, Math.min(xMax, x1)), y: 0 });
      const x2 = (v - cB * yMax) / cA;
      if (x2 >= -0.001 && x2 <= xMax + 0.001) pts.push({ x: Math.max(0, Math.min(xMax, x2)), y: yMax });
    }
    // 重複排除
    const uniq = [];
    for (const p of pts) {
      if (!uniq.some((u) => Math.abs(u.x - p.x) < 0.05 && Math.abs(u.y - p.y) < 0.05)) {
        uniq.push(p);
      }
    }
    if (uniq.length < 2) return null;
    return { x1: uniq[0].x, y1: uniq[0].y, x2: uniq[1].x, y2: uniq[1].y };
  }, [cA, cB, opt.val]);

  return (
    <div>
      <ModuleHeader kicker="LESSON 01" title="工場の社長になる" subtitle="2D LINEAR PROGRAMMING" accent={C.red} />

      <div style={{
        fontFamily: F_MONO, fontSize: 11, color: C.inkLight,
        letterSpacing: '0.05em', marginBottom: 10, marginLeft: 2,
      }}>
        ← <b style={{ color: C.inkSoft }}>Lesson 00</b> で言葉だけだった「変数・目的・制約」が、ここで初めて <b style={{ color: C.inkSoft }}>式</b> になる。
      </div>

      <Story>
        レモネードAとB、2種類を売って利益を最大化したい。<br />
        手元の砂糖は40、レモンは50しかない。<br />
        AとBを何杯ずつ作ればよいか？
      </Story>

      {/* 設定パネル */}
      <Card accent={C.red}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <div style={{ background: C.paper, padding: '0.8rem', border: `1px solid ${C.rule}` }}>
            <div style={{ fontFamily: F_MONO, fontSize: 11, color: C.inkLight, letterSpacing: '0.1em' }}>制約 / 砂糖</div>
            <div style={{ fontFamily: F_MONO, fontSize: 14, color: C.red, marginTop: 4 }}>
              2 A + 1 B ≤ 40
            </div>
            <div style={{ fontFamily: F_BODY, fontSize: 12, color: C.inkSoft, marginTop: 4 }}>
              1杯あたり A:2、B:1。在庫 40。
            </div>
          </div>
          <div style={{ background: C.paper, padding: '0.8rem', border: `1px solid ${C.rule}` }}>
            <div style={{ fontFamily: F_MONO, fontSize: 11, color: C.inkLight, letterSpacing: '0.1em' }}>制約 / レモン</div>
            <div style={{ fontFamily: F_MONO, fontSize: 14, color: C.blue, marginTop: 4 }}>
              1 A + 2 B ≤ 50
            </div>
            <div style={{ fontFamily: F_BODY, fontSize: 12, color: C.inkSoft, marginTop: 4 }}>
              1杯あたり A:1、B:2。在庫 50。
            </div>
          </div>
          <div style={{ background: C.paper, padding: '0.8rem', border: `1px solid ${C.rule}` }}>
            <div style={{ fontFamily: F_MONO, fontSize: 11, color: C.inkLight, letterSpacing: '0.1em' }}>目的関数 / 利益</div>
            <div style={{ fontFamily: F_MONO, fontSize: 14, color: C.green, marginTop: 4 }}>
              max  {cA} A + {cB} B
            </div>
            <div style={{ fontFamily: F_BODY, fontSize: 12, color: C.inkSoft, marginTop: 4 }}>
              スライダーで利益単価を変更できる。
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
          {/* SVG - 黒板 */}
          <Blackboard label="LP / 図解">
            <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="2変数LPの実行可能領域。頂点と目的関数の等高線、最適頂点を強調"
              style={{ width: '100%', height: 'auto', display: 'block' }}>
              {/* グリッド（チョーク薄影） */}
              {[...Array(7)].map((_, i) => {
                const t = i * 5;
                return (
                  <g key={`g${i}`} stroke="rgba(0,0,0,0.06)" strokeWidth={0.5}>
                    <line x1={sx(t)} y1={sy(0)} x2={sx(t)} y2={sy(yMax)} />
                    <line x1={sx(0)} y1={sy(t)} x2={sx(xMax)} y2={sy(t)} />
                  </g>
                );
              })}
              {/* 軸 */}
              <line x1={sx(0)} y1={sy(0)} x2={sx(xMax)} y2={sy(0)} stroke={C.chalk} strokeWidth={1.5} />
              <line x1={sx(0)} y1={sy(0)} x2={sx(0)} y2={sy(yMax)} stroke={C.chalk} strokeWidth={1.5} />
              {/* 軸ラベル */}
              {[0, 5, 10, 15, 20, 25, 30].map((t) => (
                <g key={`tx${t}`} style={{ fontFamily: F_MONO, fontSize: 10, fill: C.chalkSoft }}>
                  <text x={sx(t)} y={sy(0) + 14} textAnchor="middle">{t}</text>
                  <text x={sx(0) - 6} y={sy(t) + 3} textAnchor="end">{t}</text>
                </g>
              ))}
              <text x={sx(xMax) + 4} y={sy(0) + 4} style={{ fontFamily: F_DISP, fontSize: 14, fill: C.chalk, fontStyle: 'italic' }}>A</text>
              <text x={sx(0) - 4} y={sy(yMax) - 6} style={{ fontFamily: F_DISP, fontSize: 14, fill: C.chalk, fontStyle: 'italic' }} textAnchor="end">B</text>

              {/* 砂糖制約 */}
              <line
                x1={sx(5)} y1={sy(30)} x2={sx(20)} y2={sy(0)}
                stroke={C.chalkPink} strokeWidth={1.8} strokeDasharray="6 3"
              />
              <text
                x={sx(7)} y={sy(26) + 3}
                style={{ fontFamily: F_MONO, fontSize: 11, fill: C.chalkPink }}
              >
                砂糖
              </text>

              {/* レモン制約 */}
              <line
                x1={sx(0)} y1={sy(25)} x2={sx(30)} y2={sy(10)}
                stroke={C.chalkBlue} strokeWidth={1.8} strokeDasharray="6 3"
              />
              <text
                x={sx(22)} y={sy(15) + 3}
                style={{ fontFamily: F_MONO, fontSize: 11, fill: C.chalkBlue }}
              >
                レモン
              </text>

              {/* 実行可能領域 */}
              <polygon
                points={polyPoints}
                fill={C.chalkGreen} fillOpacity={0.18}
                stroke={C.chalkGreen} strokeWidth={2}
              />
              <text
                x={sx(7.5)} y={sy(8)}
                style={{ fontFamily: F_DISP, fontSize: 13, fill: C.chalkGreen, fontStyle: 'italic' }}
                textAnchor="middle"
              >
                実行可能領域
              </text>

              {/* 等高線 */}
              {showLevel && levelLine && (
                <line
                  x1={sx(levelLine.x1)} y1={sy(levelLine.y1)}
                  x2={sx(levelLine.x2)} y2={sy(levelLine.y2)}
                  stroke={C.chalkYellow} strokeWidth={2}
                  strokeDasharray="2 4"
                />
              )}

              {/* 頂点 */}
              {showVertices && evald.map((v, i) => (
                <g key={i}>
                  <circle
                    cx={sx(v.x)} cy={sy(v.y)} r={i === optIdx ? 7 : 4.5}
                    fill={i === optIdx ? C.chalkYellow : C.board}
                    stroke={i === optIdx ? C.chalkYellow : C.chalk}
                    strokeWidth={1.6}
                  />
                  {i === optIdx && (
                    <circle
                      cx={sx(v.x)} cy={sy(v.y)} r={14}
                      fill="none" stroke={C.chalkYellow} strokeWidth={1.5} opacity={0.4}
                    >
                      <animate attributeName="r" values="7;18" dur="1.6s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.5;0" dur="1.6s" repeatCount="indefinite" />
                    </circle>
                  )}
                  <text
                    x={sx(v.x) + 10} y={sy(v.y) - 8}
                    style={{
                      fontFamily: F_MONO,
                      fontSize: i === optIdx ? 12 : 11,
                      fill: i === optIdx ? C.chalkYellow : C.chalkSoft,
                      fontWeight: i === optIdx ? 600 : 400,
                    }}
                  >
                    {v.name}({v.x},{v.y})
                  </text>
                </g>
              ))}
            </svg>

            <div className="mt-3 flex gap-4 flex-wrap">
              <label style={{ fontFamily: F_MONO, fontSize: 11, color: C.chalkSoft }}>
                <input type="checkbox" checked={showLevel} onChange={(e) => setShowLevel(e.target.checked)} className="mr-1" style={{ accentColor: C.chalkYellow }} />
                等高線を見る
              </label>
              <label style={{ fontFamily: F_MONO, fontSize: 11, color: C.chalkSoft }}>
                <input type="checkbox" checked={showVertices} onChange={(e) => setShowVertices(e.target.checked)} className="mr-1" style={{ accentColor: C.chalkYellow }} />
                頂点を見る
              </label>
            </div>
          </Blackboard>

          {/* コントロール */}
          <div className="space-y-5">
            <div>
              <div style={{ fontFamily: F_MONO, fontSize: 11, color: C.inkLight, letterSpacing: '0.1em', marginBottom: 8 }}>
                利益を変えてみる
              </div>
              <div className="space-y-3">
                <Slider label="レモネードA 1杯の利益" value={cA} onChange={setCA} min={20} max={300} step={10} suffix=" 円" color={C.red} />
                <Slider label="レモネードB 1杯の利益" value={cB} onChange={setCB} min={20} max={300} step={10} suffix=" 円" color={C.blue} />
              </div>
            </div>

            <div style={{
              background: C.board,
              color: C.chalk,
              padding: '1rem',
              border: `4px solid ${C.frame}`,
              borderRadius: 3,
              boxShadow: `inset 0 0 0 1px ${C.frameDark}`,
            }}>
              <div style={{ fontFamily: F_MONO, fontSize: 11, color: C.chalkSoft, letterSpacing: '0.15em' }}>
                OPTIMAL SOLUTION
              </div>
              <div className="mt-2 flex items-baseline gap-3">
                <span style={{ fontFamily: F_DISP, fontSize: '2rem', fontWeight: 600, color: C.chalkYellow }}>
                  ¥{opt.val.toLocaleString()}
                </span>
                <span style={{ fontFamily: F_MONO, fontSize: 11, color: C.chalkSoft }}>
                  最大利益
                </span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2" style={{ fontFamily: F_MONO, fontSize: 13 }}>
                <div>
                  <div style={{ color: C.chalkSoft, fontSize: 11 }}>レモネードA</div>
                  <div style={{ color: C.chalk, fontSize: 18, fontWeight: 500 }}>{opt.x} 杯</div>
                </div>
                <div>
                  <div style={{ color: C.chalkSoft, fontSize: 11 }}>レモネードB</div>
                  <div style={{ color: C.chalk, fontSize: 18, fontWeight: 500 }}>{opt.y} 杯</div>
                </div>
              </div>
            </div>

            <div>
              <div style={{ fontFamily: F_MONO, fontSize: 11, color: C.inkLight, letterSpacing: '0.1em', marginBottom: 6 }}>
                各頂点での利益
              </div>
              <table style={{ fontFamily: F_MONO, fontSize: 12, width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ color: C.inkLight }}>
                    <th style={{ textAlign: 'left', padding: '4px 6px', borderBottom: `1px solid ${C.rule}` }}>頂点</th>
                    <th style={{ textAlign: 'right', padding: '4px 6px', borderBottom: `1px solid ${C.rule}` }}>(A, B)</th>
                    <th style={{ textAlign: 'right', padding: '4px 6px', borderBottom: `1px solid ${C.rule}` }}>利益</th>
                  </tr>
                </thead>
                <tbody>
                  {evald.map((v, i) => (
                    <tr key={i} style={{
                      background: i === optIdx ? C.redLight : 'transparent',
                      color: i === optIdx ? C.redDeep : C.ink,
                      fontWeight: i === optIdx ? 600 : 400,
                    }}>
                      <td style={{ padding: '4px 6px' }}>{v.name}</td>
                      <td style={{ textAlign: 'right', padding: '4px 6px' }}>({v.x}, {v.y})</td>
                      <td style={{ textAlign: 'right', padding: '4px 6px' }}>¥{v.val.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>

      {/* Math view */}
      <SectionTitle num="1.1">これを「数理最適化の言葉」で書くと</SectionTitle>
      <Card>
        <Equation label="LP / 線形計画">
          <div style={{ color: C.chalkGreen, fontWeight: 500 }}>maximize</div>
          <div style={{ paddingLeft: '1.5em' }}>{cA} · A + {cB} · B</div>
          <div style={{ marginTop: 8, color: C.chalkPink, fontWeight: 500 }}>subject to</div>
          <div style={{ paddingLeft: '1.5em' }}>2 · A + 1 · B ≤ 40<span style={{ color: C.chalkSoft }}>  （砂糖）</span></div>
          <div style={{ paddingLeft: '1.5em' }}>1 · A + 2 · B ≤ 50<span style={{ color: C.chalkSoft }}>  （レモン）</span></div>
          <div style={{ paddingLeft: '1.5em' }}>A, B ≥ 0</div>
        </Equation>
        <p style={{ fontFamily: F_BODY, fontSize: 14, color: C.inkSoft, marginTop: 12, lineHeight: 1.8 }}>
          目的関数も制約もすべて変数の1次式で書ける問題が <b>線形計画問題（LP）</b>。
          実行可能領域は凸多角形になり、最適解は必ずいずれかの頂点に存在する。
          そのため、頂点の数だけ目的関数を評価すれば最適解が求まる。
        </p>
      </Card>

      <SectionTitle num="1.2">ポイント</SectionTitle>
      <Card style={{ background: C.yellowLight, borderColor: C.yellow }}>
        <p style={{ fontFamily: F_BODY, fontSize: 14.5, color: C.ink, lineHeight: 1.85 }}>
          利益のスライダーを動かすと、最適点が頂点から別の頂点に移る。
          連続的に動くのではなく、目的関数の傾きがある角度を超えると別の頂点が最適になる。
          実務では、頂点を効率的に探索する <b>シンプレックス法</b> や <b>内点法</b> が使われる。
        </p>
      </Card>
    </div>
  );
}

// === COMBINATORIAL EXPLOSION MODULE ===================================

const OPS_PER_SEC = 1e9; // 1秒10億回（最近のPCで詰めた場合の上限想定）

function formatPatterns(n) {
  if (!isFinite(n)) return '∞';
  if (n < 1e4) return Math.round(n).toLocaleString('ja-JP');
  if (n < 1e8) return `${(n / 1e4).toFixed(1)} 万`;
  if (n < 1e12) return `${(n / 1e8).toFixed(2)} 億`;
  if (n < 1e16) return `${(n / 1e12).toFixed(2)} 兆`;
  if (n < 1e20) return `${(n / 1e16).toFixed(2)} 京`;
  const exp = Math.floor(Math.log10(n));
  const m = n / Math.pow(10, exp);
  return `${m.toFixed(2)} × 10^${exp}`;
}

function formatTime(seconds) {
  if (!isFinite(seconds)) return '∞';
  if (seconds < 1e-6) return `${(seconds * 1e9).toFixed(0)} ナノ秒`;
  if (seconds < 1e-3) return `${(seconds * 1e6).toFixed(1)} マイクロ秒`;
  if (seconds < 1) return `${(seconds * 1e3).toFixed(1)} ミリ秒`;
  if (seconds < 60) return `${seconds.toFixed(2)} 秒`;
  if (seconds < 3600) return `${(seconds / 60).toFixed(1)} 分`;
  if (seconds < 86400) return `${(seconds / 3600).toFixed(1)} 時間`;
  if (seconds < 86400 * 365) return `${(seconds / 86400).toFixed(0)} 日`;
  const years = seconds / (86400 * 365);
  if (years < 1e4) return `約 ${years.toFixed(0)} 年`;
  if (years < 1e8) return `約 ${(years / 1e4).toFixed(1)} 万年`;
  if (years < 1e12) return `約 ${(years / 1e8).toFixed(2)} 億年`;
  return `約 ${(years / 1e8).toExponential(1)} 億年`;
}

function ExplosionView() {
  const [n, setN] = useState(30);

  const patterns = Math.pow(2, n);
  const W = 100;
  const timeBrute = patterns / OPS_PER_SEC;
  const timeDP = (n * W) / OPS_PER_SEC;

  const NMAX = 60;
  const SW = 600, SH = 320, M = 50;
  const xMin = 1, xMax = NMAX;
  const yMax = NMAX * Math.log10(2); // ~18
  const yMin = 0;
  const sx = (x) => M + ((x - xMin) / (xMax - xMin)) * (SW - 2 * M);
  const sy = (y) => SH - M - ((y - yMin) / (yMax - yMin)) * (SH - 2 * M);
  const f_exp = (x) => x * Math.log10(2);
  const f_dp = (x) => Math.log10(Math.max(1, x * W));
  const f_lin = (x) => Math.log10(Math.max(1, x));

  const buildPath = (f) => {
    const pts = [];
    for (let x = xMin; x <= xMax; x += 0.5) {
      pts.push(`${sx(x).toFixed(1)},${sy(f(x)).toFixed(1)}`);
    }
    return pts.join(' ');
  };

  const tone = timeBrute > 60 ? { bg: C.redLight, border: C.red, fg: C.red, sub: C.redDeep } :
               timeBrute > 1  ? { bg: C.yellowLight, border: C.yellow, fg: C.yellowDeep, sub: C.yellowDeep } :
                                { bg: C.greenLight, border: C.green, fg: C.green, sub: C.greenDeep };

  return (
    <div>
      <ModuleHeader kicker="LESSON 02" title="組合せ爆発を体感する" subtitle="COMBINATORIAL EXPLOSION" accent={C.red} />

      <Story>
        最適化の問題は「全パターンを試して一番いいのを選ぶ」では解けないことが多い。<br />
        試すべきパターンが <b>爆発的に増える</b> から。<br />
        どのくらい増えるか、自分の手で確かめよう。
      </Story>

      <Card accent={C.red}>
        <Slider
          label="品物の数 n（YES/NO で選ぶ問題）"
          value={n}
          onChange={setN}
          min={5} max={NMAX} suffix=" 個"
          color={C.red}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5">
          <div style={{ background: C.paperLight, border: `1px solid ${C.rule}`, padding: '0.7rem 0.9rem' }}>
            <div style={{ fontFamily: F_MONO, fontSize: 10, color: C.inkLight, letterSpacing: '0.1em' }}>
              パターン数 2^{n}
            </div>
            <div style={{ fontFamily: F_DISP, fontSize: '1.5rem', fontWeight: 600, color: C.ink, marginTop: 2 }}>
              {formatPatterns(patterns)}
              <span style={{ fontSize: '0.75rem', color: C.inkSoft, marginLeft: 4 }}>通り</span>
            </div>
          </div>
          <div style={{ background: tone.bg, border: `1px solid ${tone.border}`, padding: '0.7rem 0.9rem' }}>
            <div style={{ fontFamily: F_MONO, fontSize: 10, color: tone.sub, letterSpacing: '0.1em' }}>
              全探索の所要時間
            </div>
            <div style={{ fontFamily: F_DISP, fontSize: '1.5rem', fontWeight: 600, color: tone.fg, marginTop: 2 }}>
              {formatTime(timeBrute)}
            </div>
            <div style={{ fontFamily: F_MONO, fontSize: 10, color: C.inkLight, marginTop: 2 }}>
              1秒10億回想定
            </div>
          </div>
          <div style={{ background: C.greenLight, border: `1px solid ${C.green}`, padding: '0.7rem 0.9rem' }}>
            <div style={{ fontFamily: F_MONO, fontSize: 10, color: C.greenDeep, letterSpacing: '0.1em' }}>
              動的計画法なら n × W
            </div>
            <div style={{ fontFamily: F_DISP, fontSize: '1.5rem', fontWeight: 600, color: C.green, marginTop: 2 }}>
              {formatTime(timeDP)}
            </div>
            <div style={{ fontFamily: F_MONO, fontSize: 10, color: C.inkLight, marginTop: 2 }}>
              W=100 想定
            </div>
          </div>
        </div>

        <Blackboard label="GROWTH / 計算量の伸び（縦軸 log）" style={{ marginTop: '1.2rem' }}>
          <svg viewBox={`0 0 ${SW} ${SH}`} role="img" aria-label="ログ目盛で 2^n / n×W / n の計算量曲線を比較。指数だけ右上に直線的に伸びる"
            style={{ width: '100%', height: 'auto', display: 'block' }}>
            <line x1={M} y1={SH - M} x2={SW - M} y2={SH - M} stroke={C.chalk} strokeWidth={1.5} />
            <line x1={M} y1={M} x2={M} y2={SH - M} stroke={C.chalk} strokeWidth={1.5} />

            {[5, 10, 20, 30, 40, 50, 60].map((x) => (
              <g key={`x${x}`}>
                <line x1={sx(x)} y1={SH - M} x2={sx(x)} y2={SH - M + 5} stroke={C.chalkSoft} />
                <text x={sx(x)} y={SH - M + 18} textAnchor="middle"
                  style={{ fontFamily: F_MONO, fontSize: 10, fill: C.chalkSoft }}>
                  {x}
                </text>
              </g>
            ))}
            <text x={SW / 2} y={SH - 10} textAnchor="middle"
              style={{ fontFamily: F_MONO, fontSize: 11, fill: C.chalkSoft }}>n（問題サイズ）</text>

            {[0, 3, 6, 9, 12, 15, 18].map((y) => (
              <g key={`y${y}`}>
                <line x1={M - 5} y1={sy(y)} x2={M} y2={sy(y)} stroke={C.chalkSoft} />
                <text x={M - 8} y={sy(y) + 3} textAnchor="end"
                  style={{ fontFamily: F_MONO, fontSize: 10, fill: C.chalkSoft }}>
                  10^{y}
                </text>
              </g>
            ))}

            <polyline points={buildPath(f_exp)} fill="none" stroke={C.chalkPink} strokeWidth={2.4} />
            <polyline points={buildPath(f_dp)}  fill="none" stroke={C.chalkBlue} strokeWidth={2.4} />
            <polyline points={buildPath(f_lin)} fill="none" stroke={C.chalkGreen} strokeWidth={2.4} />

            <line x1={sx(n)} y1={M} x2={sx(n)} y2={SH - M}
              stroke={C.chalkYellow} strokeWidth={1.5} strokeDasharray="4 3" />
            <circle cx={sx(n)} cy={sy(f_exp(n))} r={4} fill={C.chalkPink} />
            <circle cx={sx(n)} cy={sy(f_dp(n))} r={4} fill={C.chalkBlue} />
            <circle cx={sx(n)} cy={sy(f_lin(n))} r={4} fill={C.chalkGreen} />
            <text x={sx(n)} y={M - 6} textAnchor="middle"
              style={{ fontFamily: F_MONO, fontSize: 11, fill: C.chalkYellow }}>
              n={n}
            </text>

            <g transform={`translate(${SW - 210}, ${M + 6})`}>
              <rect x={0} y={0} width={200} height={66} fill={C.boardLight} stroke={C.chalkFaint} opacity={0.92} />
              <line x1={10} y1={16} x2={30} y2={16} stroke={C.chalkPink} strokeWidth={2.4} />
              <text x={36} y={19} style={{ fontFamily: F_MONO, fontSize: 10, fill: C.chalk }}>全探索 2^n（指数）</text>
              <line x1={10} y1={34} x2={30} y2={34} stroke={C.chalkBlue} strokeWidth={2.4} />
              <text x={36} y={37} style={{ fontFamily: F_MONO, fontSize: 10, fill: C.chalk }}>動的計画 n × W</text>
              <line x1={10} y1={52} x2={30} y2={52} stroke={C.chalkGreen} strokeWidth={2.4} />
              <text x={36} y={55} style={{ fontFamily: F_MONO, fontSize: 10, fill: C.chalk }}>線形 n</text>
            </g>
          </svg>
        </Blackboard>
      </Card>

      <SectionTitle num="2.1">なぜ「賢い解き方」が要るのか</SectionTitle>
      <Card>
        <p style={{ fontFamily: F_BODY, fontSize: 14, color: C.inkSoft, lineHeight: 1.85 }}>
          n=20 までは <b>ミリ秒</b> で済むが、n=30 を越えると <b>数秒〜分</b>、
          n=50 では <b>1台のPCが何日も</b> 動き続けることになる。n=60 で <b>数十年</b>。
          だから最適化アルゴリズムは「賢く枝刈りする」「構造を使う」「近似で妥協する」のいずれかを取る。
          次のレッスン以降に出てくる <b>動的計画法・LP緩和・貪欲法</b> は、すべてこの問題への回答。
        </p>
      </Card>
    </div>
  );
}

// === KNAPSACK MODULE ==================================================

const KNAP_ITEMS = [
  { id: 'fire',  name: '焚き火セット', w: 6, v: 11, emoji: '🔥' },
  { id: 'sleep', name: '寝袋',         w: 5, v: 10, emoji: '🛏️' },
  { id: 'cam',   name: '一眼カメラ',   w: 5, v: 10, emoji: '📷' },
  { id: 'aid',   name: '救急セット',   w: 1, v: 3,  emoji: '🩹' },
  { id: 'snack', name: 'お菓子',       w: 1, v: 2,  emoji: '🍫' },
  { id: 'water', name: '水筒',         w: 1, v: 2,  emoji: '💧' },
  { id: 'book',  name: '文庫本',       w: 2, v: 1,  emoji: '📖' },
  { id: 'chair', name: '折りたたみ椅子', w: 3, v: 4, emoji: '🪑' },
];
const KNAP_CAP = 10;

function bruteForceKnapsack(items, cap) {
  const n = items.length;
  let bestVal = -1, bestMask = 0;
  for (let m = 0; m < 1 << n; m++) {
    let w = 0, v = 0;
    for (let i = 0; i < n; i++) if (m & (1 << i)) { w += items[i].w; v += items[i].v; }
    if (w <= cap && v > bestVal) { bestVal = v; bestMask = m; }
  }
  const sel = new Set();
  for (let i = 0; i < n; i++) if (bestMask & (1 << i)) sel.add(items[i].id);
  return { selected: sel, value: bestVal };
}
function greedyKnapsack(items, cap) {
  const sorted = [...items].sort((a, b) => b.v / b.w - a.v / a.w);
  const sel = new Set();
  let w = 0, v = 0;
  for (const it of sorted) {
    if (w + it.w <= cap) { sel.add(it.id); w += it.w; v += it.v; }
  }
  return { selected: sel, value: v, weight: w };
}

function KnapsackView() {
  const [picked, setPicked] = useState(new Set());
  const [reveal, setReveal] = useState(null); // 'opt' | 'greedy' | null

  const totalW = useMemo(() => KNAP_ITEMS.filter(i => picked.has(i.id)).reduce((s, i) => s + i.w, 0), [picked]);
  const totalV = useMemo(() => KNAP_ITEMS.filter(i => picked.has(i.id)).reduce((s, i) => s + i.v, 0), [picked]);
  const over = totalW > KNAP_CAP;

  const optResult = useMemo(() => bruteForceKnapsack(KNAP_ITEMS, KNAP_CAP), []);
  const greedyResult = useMemo(() => greedyKnapsack(KNAP_ITEMS, KNAP_CAP), []);

  const toggle = (id) => {
    const next = new Set(picked);
    if (next.has(id)) next.delete(id); else next.add(id);
    setPicked(next);
    setReveal(null);
  };

  const showSet = reveal === 'opt' ? optResult.selected : reveal === 'greedy' ? greedyResult.selected : picked;
  const showW = [...showSet].reduce((s, id) => s + KNAP_ITEMS.find(i => i.id === id).w, 0);
  const showV = [...showSet].reduce((s, id) => s + KNAP_ITEMS.find(i => i.id === id).v, 0);

  return (
    <div>
      <ModuleHeader kicker="LESSON 03" title="旅の荷物を詰める" subtitle="0/1 KNAPSACK PROBLEM" accent={C.blue} />

      <div style={{
        fontFamily: F_MONO, fontSize: 11, color: C.inkLight,
        letterSpacing: '0.05em', marginBottom: 10, marginLeft: 2,
      }}>
        ← <b style={{ color: C.inkSoft }}>Lesson 02</b> で見たとおり全列挙は <b style={{ color: C.inkSoft }}>n=20 あたりが限界</b>。ここでは小さい n で最適と貪欲を比べる。
      </div>

      <Story>
        キャンプに持っていく荷物を選ぶ。<br />
        バックパックの容量は <b>10 kg</b> まで。<br />
        満足度（★）の合計が最大になる組み合わせを選ぶ。
      </Story>

      <Card accent={C.blue}>
        {/* Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          <div>
            <div style={{ fontFamily: F_MONO, fontSize: 11, color: C.inkLight, letterSpacing: '0.1em' }}>容量</div>
            <div style={{ fontFamily: F_DISP, fontSize: '1.8rem', fontWeight: 600, color: over ? C.red : C.ink }}>
              {showW.toFixed(0)} <span style={{ color: C.inkLight, fontSize: '1rem' }}>/ {KNAP_CAP} kg</span>
            </div>
            <div style={{
              height: 10, background: C.paperDark, marginTop: 6, position: 'relative', overflow: 'hidden',
              border: `1px solid ${C.rule}`,
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, bottom: 0,
                width: `${Math.min(100, (showW / KNAP_CAP) * 100)}%`,
                background: over ? C.red : C.blue, transition: 'width 0.25s ease',
              }} />
              {over && (
                <div style={{
                  position: 'absolute', top: 0, right: 0, bottom: 0,
                  width: `${Math.min(100, ((showW - KNAP_CAP) / KNAP_CAP) * 100)}%`,
                  background: C.redDeep,
                }} />
              )}
            </div>
            {over && (
              <div style={{ fontFamily: F_MONO, fontSize: 11, color: C.red, marginTop: 4 }}>
                オーバー：{(showW - KNAP_CAP).toFixed(0)} kg 超過
              </div>
            )}
          </div>

          <div>
            <div style={{ fontFamily: F_MONO, fontSize: 11, color: C.inkLight, letterSpacing: '0.1em' }}>満足度（★）</div>
            <div style={{ fontFamily: F_DISP, fontSize: '1.8rem', fontWeight: 600, color: C.green }}>
              {showV} <span style={{ color: C.inkLight, fontSize: '1rem' }}>/ 43</span>
            </div>
            <div style={{ fontFamily: F_BODY, fontSize: 12, color: C.inkLight, marginTop: 4 }}>
              全アイテムの合計（重量 24 kg）
            </div>
          </div>

          <div>
            <div style={{ fontFamily: F_MONO, fontSize: 11, color: C.inkLight, letterSpacing: '0.1em' }}>状態</div>
            <div style={{ fontFamily: F_DISP, fontSize: '1.3rem', fontWeight: 600, color: C.ink, marginTop: 6 }}>
              {reveal === 'opt' ? '最適解を表示中' :
               reveal === 'greedy' ? '貪欲解を表示中' :
               over ? '容量オーバー' : 'あなたの選択'}
            </div>
          </div>
        </div>

        {/* Items grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-5">
          {KNAP_ITEMS.map((it) => {
            const isPicked = showSet.has(it.id);
            const couldOver = !isPicked && totalW + it.w > KNAP_CAP && !reveal;
            return (
              <button
                key={it.id}
                onClick={() => toggle(it.id)}
                disabled={!!reveal}
                style={{
                  background: isPicked ? C.blue : C.paper,
                  color: isPicked ? C.paperLight : C.ink,
                  border: `1.5px solid ${isPicked ? C.blueDeep : couldOver ? C.red : C.rule}`,
                  padding: '0.8rem 0.6rem',
                  cursor: reveal ? 'not-allowed' : 'pointer',
                  textAlign: 'left',
                  opacity: reveal ? (isPicked ? 1 : 0.4) : 1,
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ fontSize: 26, marginBottom: 2 }}>{it.emoji}</div>
                <div style={{ fontFamily: F_DISP, fontSize: 14, fontWeight: 600 }}>{it.name}</div>
                <div style={{ fontFamily: F_MONO, fontSize: 11, marginTop: 4, color: isPicked ? C.paperDark : C.inkLight }}>
                  {it.w} kg · {it.v}★
                </div>
                <div style={{ fontFamily: F_MONO, fontSize: 10, marginTop: 2, color: isPicked ? C.paperDark : C.inkLighter }}>
                  ★/kg = {(it.v / it.w).toFixed(2)}
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-2">
          <Btn variant="ghost" size="sm" onClick={() => { setPicked(new Set()); setReveal(null); }}>
            リセット
          </Btn>
          <Btn variant="soft" size="sm" onClick={() => setReveal(reveal === 'greedy' ? null : 'greedy')}>
            {reveal === 'greedy' ? '元に戻す' : '貪欲解を見る（★/kg順）'}
          </Btn>
          <Btn variant="primary" size="sm" onClick={() => setReveal(reveal === 'opt' ? null : 'opt')}>
            {reveal === 'opt' ? '元に戻す' : '最適解を見る'}
          </Btn>
        </div>
      </Card>

      <SectionTitle num="3.1">貪欲法と最適解の比較</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card style={{ background: C.yellowLight, borderColor: C.yellow }}>
          <Tag bg={C.yellow} color={C.paperLight}>GREEDY / 貪欲法</Tag>
          <div style={{ fontFamily: F_DISP, fontSize: '2rem', fontWeight: 600, color: C.ink, marginTop: 8 }}>
            {greedyResult.value} <span style={{ fontSize: '1rem', color: C.inkLight }}>★</span>
          </div>
          <p style={{ fontFamily: F_BODY, fontSize: 13, color: C.inkSoft, marginTop: 8, lineHeight: 1.7 }}>
            ★/kg が大きい順に詰める素朴な戦略。高速だが、必ずしも最適解には到達しない。
          </p>
        </Card>
        <Card style={{ background: C.greenLight, borderColor: C.green }}>
          <Tag bg={C.green} color={C.paperLight}>OPTIMAL / 最適解</Tag>
          <div style={{ fontFamily: F_DISP, fontSize: '2rem', fontWeight: 600, color: C.ink, marginTop: 8 }}>
            {optResult.value} <span style={{ fontSize: '1rem', color: C.inkLight }}>★</span>
          </div>
          <p style={{ fontFamily: F_BODY, fontSize: 13, color: C.inkSoft, marginTop: 8, lineHeight: 1.7 }}>
            全 256 通り（=2<sup>8</sup>）を試して得た最大値。アイテム数が増えると組み合わせは爆発する（20個で約100万、30個で約10億）。
          </p>
        </Card>
      </div>

      <SectionTitle num="3.2">これを「数理最適化の言葉」で書くと</SectionTitle>
      <Card>
        <Equation label="0/1 INTEGER PROGRAMMING">
          <div style={{ color: C.chalkGreen, fontWeight: 500 }}>maximize</div>
          <div style={{ paddingLeft: '1.5em' }}>Σ v<sub>i</sub> · x<sub>i</sub></div>
          <div style={{ marginTop: 8, color: C.chalkPink, fontWeight: 500 }}>subject to</div>
          <div style={{ paddingLeft: '1.5em' }}>Σ w<sub>i</sub> · x<sub>i</sub> ≤ 10</div>
          <div style={{ paddingLeft: '1.5em' }}>x<sub>i</sub> ∈ {'{ 0, 1 }'}<span style={{ color: C.chalkSoft }}>  （入れる / 入れない）</span></div>
        </Equation>
        <p style={{ fontFamily: F_BODY, fontSize: 14, color: C.inkSoft, marginTop: 12, lineHeight: 1.8 }}>
          変数が0か1のみを取る問題は <b>0/1整数計画</b> と呼ばれる。LPと違って頂点だけを調べれば済むわけではなく、原理的には組み合わせ爆発する。
          実用には <b>動的計画法</b>、<b>分枝限定法</b>、<b>MIPソルバー（Gurobi等）</b> が用いられる。
        </p>
      </Card>
    </div>
  );
}

// === TRANSPORTATION MODULE ============================================

function TransportView() {
  // 工場 W1, W2、店舗 S1, S2, S3
  // 容量: W1=20, W2=25 / 需要: S1=15, S2=10, S3=20
  // コスト行列:
  //   W1: 3, 5, 7
  //   W2: 6, 4, 2
  // 自由変数: x11, x12 (残りは決まる)
  const [x11, setX11] = useState(0);
  const [x12, setX12] = useState(0);
  const [revealOpt, setRevealOpt] = useState(false);

  const cap = { W1: 20, W2: 25 };
  const dem = { S1: 15, S2: 10, S3: 20 };
  const cost = [[3, 5, 7], [6, 4, 2]];

  // 制約から残りを計算
  const x13 = 20 - x11 - x12;
  const x21 = 15 - x11;
  const x22 = 10 - x12;
  const x23 = x11 + x12;

  const allFlows = [x11, x12, x13, x21, x22, x23];
  const valid = allFlows.every((v) => v >= 0 && v <= 25);

  const totalCost = useMemo(() => {
    return cost[0][0] * x11 + cost[0][1] * x12 + cost[0][2] * x13
         + cost[1][0] * x21 + cost[1][1] * x22 + cost[1][2] * x23;
  }, [x11, x12, x13, x21, x22, x23]);

  // 最適解：(x11, x12) を全格子点で総当たりし、最小コストを探す。
  // 整数 RHS の輸送LP は完全単模行列性により整数最適解を持つので、整数探索で十分。
  const opt = useMemo(() => {
    let best = { x11: 0, x12: 0, x13: 0, x21: 0, x22: 0, x23: 0, cost: Infinity };
    for (let a = 0; a <= 15; a++) {
      for (let b = 0; b <= 10; b++) {
        const x13_ = 20 - a - b;
        const x21_ = 15 - a;
        const x22_ = 10 - b;
        const x23_ = a + b;
        if (x13_ < 0 || x21_ < 0 || x22_ < 0 || x23_ < 0) continue;
        if (x23_ > 25) continue; // W2 容量
        const c = cost[0][0] * a + cost[0][1] * b + cost[0][2] * x13_
                + cost[1][0] * x21_ + cost[1][1] * x22_ + cost[1][2] * x23_;
        if (c < best.cost) best = { x11: a, x12: b, x13: x13_, x21: x21_, x22: x22_, x23: x23_, cost: c };
      }
    }
    return best;
  }, []);

  const display = revealOpt
    ? opt
    : { x11, x12, x13, x21, x22, x23, cost: totalCost };

  // SVG dims
  const SW = 560, SH = 360;
  const wPos = [{ x: 80, y: 110 }, { x: 80, y: 250 }];
  const sPos = [{ x: 470, y: 70 }, { x: 470, y: 180 }, { x: 470, y: 290 }];

  const flows = [
    { from: 0, to: 0, val: display.x11, c: 3 },
    { from: 0, to: 1, val: display.x12, c: 5 },
    { from: 0, to: 2, val: display.x13, c: 7 },
    { from: 1, to: 0, val: display.x21, c: 6 },
    { from: 1, to: 1, val: display.x22, c: 4 },
    { from: 1, to: 2, val: display.x23, c: 2 },
  ];
  const maxV = Math.max(1, ...flows.map(f => f.val));

  return (
    <div>
      <ModuleHeader kicker="LESSON 04" title="お菓子を配送する" subtitle="TRANSPORTATION PROBLEM" accent={C.yellow} />

      <Story>
        2つの工場（W1, W2）から3つの店舗（S1, S2, S3）へお菓子を運ぶ。<br />
        工場の出荷量と店舗の需要は決まっている。<br />
        経路ごとのコストが異なるなか、合計コストを最小にする配送計画を作る。
      </Story>

      <Card accent={C.yellow}>
        {/* Diagram - 黒板 */}
        <Blackboard label="NETWORK / 配送図" style={{ marginBottom: '1rem' }}>
          <svg viewBox={`0 0 ${SW} ${SH}`} role="img" aria-label="2工場と3店舗の配送ネットワーク。各経路に流量がエッジ太さで表示"
            style={{ width: '100%', height: 'auto', display: 'block' }}>
            {/* Flows */}
            {flows.map((f, i) => {
              const a = wPos[f.from], b = sPos[f.to];
              const sw = f.val === 0 ? 1 : 1.5 + (f.val / maxV) * 14;
              const opacity = f.val === 0 ? 0.18 : 0.85;
              const color = f.val === 0 ? C.chalkFaint : (revealOpt ? C.chalkYellow : C.chalkBlue);
              return (
                <g key={i}>
                  <line
                    x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                    stroke={color} strokeWidth={sw} opacity={opacity} strokeLinecap="round"
                  />
                  {f.val > 0 && (
                    <g>
                      <rect
                        x={(a.x + b.x) / 2 - 22} y={(a.y + b.y) / 2 - 11}
                        width={44} height={22} fill={C.board} stroke={C.chalk} strokeWidth={1}
                      />
                      <text
                        x={(a.x + b.x) / 2} y={(a.y + b.y) / 2 + 1}
                        textAnchor="middle" dominantBaseline="middle"
                        style={{ fontFamily: F_MONO, fontSize: 11, fill: C.chalk, fontWeight: 500 }}
                      >
                        {f.val}個
                      </text>
                      <text
                        x={(a.x + b.x) / 2} y={(a.y + b.y) / 2 + 13}
                        textAnchor="middle"
                        style={{ fontFamily: F_MONO, fontSize: 9, fill: C.chalkSoft }}
                      >
                        @¥{f.c}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* Warehouses */}
            {wPos.map((p, i) => {
              const used = i === 0 ? display.x11 + display.x12 + display.x13 : display.x21 + display.x22 + display.x23;
              const total = i === 0 ? cap.W1 : cap.W2;
              return (
                <g key={`w${i}`}>
                  <rect
                    x={p.x - 50} y={p.y - 35} width={100} height={70}
                    fill="none" stroke={C.chalkBlue} strokeWidth={2}
                  />
                  <text x={p.x} y={p.y - 12} textAnchor="middle"
                    style={{ fontFamily: F_DISP, fontSize: 18, fontWeight: 600, fill: C.chalkBlue }}>
                    W{i + 1}
                  </text>
                  <text x={p.x} y={p.y + 8} textAnchor="middle"
                    style={{ fontFamily: F_MONO, fontSize: 11, fill: C.chalk }}>
                    出荷 {used}/{total}
                  </text>
                  <text x={p.x} y={p.y + 24} textAnchor="middle"
                    style={{ fontFamily: F_MONO, fontSize: 10, fill: used === total ? C.chalkGreen : C.chalkPink }}>
                    {used === total ? '✓ 完売' : `余り ${total - used}`}
                  </text>
                </g>
              );
            })}

            {/* Stores */}
            {sPos.map((p, i) => {
              const got = i === 0 ? display.x11 + display.x21 : i === 1 ? display.x12 + display.x22 : display.x13 + display.x23;
              const need = [dem.S1, dem.S2, dem.S3][i];
              return (
                <g key={`s${i}`}>
                  <rect
                    x={p.x - 50} y={p.y - 30} width={100} height={60}
                    fill="none" stroke={C.chalkYellow} strokeWidth={2}
                  />
                  <text x={p.x} y={p.y - 8} textAnchor="middle"
                    style={{ fontFamily: F_DISP, fontSize: 16, fontWeight: 600, fill: C.chalkYellow }}>
                    S{i + 1}
                  </text>
                  <text x={p.x} y={p.y + 12} textAnchor="middle"
                    style={{ fontFamily: F_MONO, fontSize: 11, fill: C.chalk }}>
                    入荷 {got}/{need}
                  </text>
                </g>
              );
            })}
          </svg>
        </Blackboard>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="md:col-span-2 space-y-3">
            <div style={{ fontFamily: F_MONO, fontSize: 11, color: C.inkLight, letterSpacing: '0.1em' }}>
              W1 から S1, S2 への出荷量を決める（W1→S3 と W2 の各経路は自動で決まる）
            </div>
            <Slider
              label="W1 → S1"
              value={display.x11}
              onChange={(v) => {
                const nv = Math.min(15, Math.max(0, v));
                setX11(nv);
                if (nv + x12 > 20) setX12(20 - nv);
                setRevealOpt(false);
              }}
              min={0} max={15} suffix=" 個" color={C.blue}
            />
            <Slider
              label="W1 → S2"
              value={display.x12}
              onChange={(v) => {
                const maxV = Math.min(10, 20 - x11);
                const nv = Math.min(maxV, Math.max(0, v));
                setX12(nv);
                setRevealOpt(false);
              }}
              min={0} max={Math.min(10, 20 - x11)} suffix=" 個" color={C.blue}
            />
            <div className="flex gap-2 mt-3">
              <Btn variant="ghost" size="sm" onClick={() => { setX11(0); setX12(0); setRevealOpt(false); }}>リセット</Btn>
              <Btn variant="primary" size="sm" onClick={() => setRevealOpt(!revealOpt)}>
                {revealOpt ? '元に戻す' : '最適解を見る'}
              </Btn>
            </div>
          </div>

          <div style={{
            background: C.board,
            color: C.chalk,
            padding: '1rem',
            border: `4px solid ${C.frame}`,
            borderRadius: 3,
            boxShadow: `inset 0 0 0 1px ${C.frameDark}`,
          }}>
            <div style={{ fontFamily: F_MONO, fontSize: 11, color: C.chalkSoft, letterSpacing: '0.15em' }}>
              {revealOpt ? 'OPTIMAL COST' : 'YOUR COST'}
            </div>
            <div className="mt-2">
              <span style={{ fontFamily: F_DISP, fontSize: '2.4rem', fontWeight: 600, color: revealOpt ? C.chalkYellow : C.chalk }}>
                ¥{display.cost}
              </span>
            </div>
            <div style={{ fontFamily: F_MONO, fontSize: 11, color: C.chalkSoft, marginTop: 8 }}>
              最適は ¥{opt.cost}（あと <b style={{ color: revealOpt ? C.chalkGreen : C.chalkYellow }}>¥{Math.max(0, totalCost - opt.cost)}</b> 削れる）
            </div>
          </div>
        </div>
      </Card>

      <SectionTitle num="4.1">最適解の構造</SectionTitle>
      <Card>
        <p style={{ fontFamily: F_BODY, fontSize: 14, color: C.inkSoft, lineHeight: 1.85 }}>
          コスト行列を見ると、最安は W2→S3（¥2）、次に W1→S1（¥3）。一方で W1→S3（¥7）と W2→S1（¥6）は割高。
          安い経路を優先しつつ容量と需要の制約を満たすと、最適配分は <b>W1→S1=15</b>, <b>W1→S2=5</b>, <b>W2→S2=5</b>, <b>W2→S3=20</b> になる。
        </p>
        <div className="mt-4">
          <Equation label="TRANSPORTATION LP">
            <div style={{ color: C.chalkGreen, fontWeight: 500 }}>minimize</div>
            <div style={{ paddingLeft: '1.5em' }}>Σ<sub>i,j</sub> c<sub>ij</sub> · x<sub>ij</sub></div>
            <div style={{ marginTop: 8, color: C.chalkPink, fontWeight: 500 }}>subject to</div>
            <div style={{ paddingLeft: '1.5em' }}>Σ<sub>j</sub> x<sub>ij</sub> = 容量<sub>i</sub><span style={{ color: C.chalkSoft }}>  （工場 i は全部出荷）</span></div>
            <div style={{ paddingLeft: '1.5em' }}>Σ<sub>i</sub> x<sub>ij</sub> = 需要<sub>j</sub><span style={{ color: C.chalkSoft }}>  （店舗 j は全部入荷）</span></div>
            <div style={{ paddingLeft: '1.5em' }}>x<sub>ij</sub> ≥ 0</div>
          </Equation>
        </div>
        <p style={{ fontFamily: F_BODY, fontSize: 14, color: C.inkSoft, lineHeight: 1.85, marginTop: 12 }}>
          これも線形計画（LP）の一種で <b>輸送問題</b> と呼ばれる。物流・配車・割当・電力配分など、構造を変えながら多くの場面に現れる。
        </p>
      </Card>
    </div>
  );
}

// === LANDSCAPE MODULE =================================================

function landscape(x) {
  return Math.sin(x) + 0.6 * Math.sin(2.3 * x) + 0.04 * (x - 5) ** 2;
}

function landscapeGrad(x) {
  const h = 1e-3;
  return (landscape(x + h) - landscape(x - h)) / (2 * h);
}

function runGreedyDescent(x0, xMin, xMax) {
  const path = [x0];
  let x = x0;
  const eta = 0.06;
  for (let i = 0; i < 200; i++) {
    const g = landscapeGrad(x);
    if (Math.abs(g) < 1e-3) break;
    let next = x - eta * g;
    if (next < xMin) next = xMin;
    if (next > xMax) next = xMax;
    if (Math.abs(next - x) < 1e-5) break;
    path.push(next);
    x = next;
  }
  return path;
}

function LandscapeView() {
  const xMin = 0, xMax = 10;
  const [startX, setStartX] = useState(2.0);
  const [showJump, setShowJump] = useState(false);
  const [jumpCount, setJumpCount] = useState(0);

  const greedyPath = useMemo(() => runGreedyDescent(startX, xMin, xMax), [startX]);

  useEffect(() => {
    if (!showJump) { setJumpCount(0); return; }
    setJumpCount(0);
    const id = setInterval(() => {
      setJumpCount((c) => {
        if (c >= 8) { clearInterval(id); return 8; }
        return c + 1;
      });
    }, 220);
    return () => clearInterval(id);
  }, [showJump]);

  const jumpData = useMemo(() => {
    const N = 8;
    const paths = [];
    for (let i = 0; i < N; i++) {
      const x0 = xMin + ((xMax - xMin) * (i + 0.5)) / N;
      paths.push(runGreedyDescent(x0, xMin, xMax));
    }
    let best = { x: 0, y: Infinity };
    for (const p of paths) {
      const x = p[p.length - 1];
      const y = landscape(x);
      if (y < best.y) best = { x, y };
    }
    return { paths, best };
  }, []);

  const globalMin = useMemo(() => {
    let best = { x: 0, y: Infinity };
    for (let x = xMin; x <= xMax; x += 0.005) {
      const y = landscape(x);
      if (y < best.y) best = { x, y };
    }
    return best;
  }, []);

  const greedyEnd = greedyPath[greedyPath.length - 1];
  const greedyVal = landscape(greedyEnd);
  const isStuck = Math.abs(greedyEnd - globalMin.x) > 0.4;

  const SW = 600, SH = 320, M = 50;
  const yMin = -2.4, yMax = 3.0;
  const sx = (x) => M + ((x - xMin) / (xMax - xMin)) * (SW - 2 * M);
  const sy = (y) => M + ((yMax - y) / (yMax - yMin)) * (SH - 2 * M);

  const landscapePath = useMemo(() => {
    const pts = [];
    for (let x = xMin; x <= xMax; x += 0.04) {
      pts.push(`${sx(x).toFixed(1)},${sy(landscape(x)).toFixed(1)}`);
    }
    return pts.join(' ');
  }, []);

  return (
    <div>
      <ModuleHeader kicker="LESSON 05" title="山と谷" subtitle="LOCAL VS GLOBAL OPTIMUM" accent={C.blue} />

      <Story>
        最適化アルゴリズムの多くは「今いる場所から、よい方向に少しだけ動く」を繰り返す。<br />
        でもそれだけだと、<b>すぐそばの谷</b> でボールが止まり、もっと深い谷に気づかないことがある。<br />
        この罠を <b>局所最適</b> と呼ぶ。
      </Story>

      <Card accent={C.blue}>
        <Blackboard label="LANDSCAPE / 1次元の凸凹関数" style={{ marginBottom: '1rem' }}>
          <svg viewBox={`0 0 ${SW} ${SH}`} role="img" aria-label="複数の谷を持つ1変数関数。貪欲法の軌跡（黒）、ジャンプ探索（青）、真の最小（黄）"
            style={{ width: '100%', height: 'auto', display: 'block' }}>
            <line x1={M} y1={sy(0)} x2={SW - M} y2={sy(0)}
              stroke={C.chalkSoft} strokeWidth={1} strokeDasharray="2 3" opacity={0.5} />
            {[0, 2, 4, 6, 8, 10].map((x) => (
              <g key={`x${x}`}>
                <line x1={sx(x)} y1={SH - M} x2={sx(x)} y2={SH - M + 5} stroke={C.chalkSoft} />
                <text x={sx(x)} y={SH - M + 18} textAnchor="middle"
                  style={{ fontFamily: F_MONO, fontSize: 10, fill: C.chalkSoft }}>{x}</text>
              </g>
            ))}
            <line x1={M} y1={M} x2={M} y2={SH - M} stroke={C.chalk} strokeWidth={1.5} />
            <line x1={M} y1={SH - M} x2={SW - M} y2={SH - M} stroke={C.chalk} strokeWidth={1.5} />

            <polyline points={landscapePath} fill="none" stroke={C.chalk} strokeWidth={2} />

            {showJump && jumpData.paths.slice(0, jumpCount).map((p, i) => (
              <g key={`jp${i}`} opacity={0.6}>
                {p.map((x, j) => (
                  <circle key={j} cx={sx(x)} cy={sy(landscape(x))} r={1.6}
                    fill={C.chalkBlue} opacity={0.45} />
                ))}
                <circle cx={sx(p[p.length - 1])} cy={sy(landscape(p[p.length - 1]))}
                  r={4} fill={C.chalkBlue} stroke={C.board} strokeWidth={1} />
              </g>
            ))}

            {greedyPath.map((x, i) => {
              const isStart = i === 0;
              const isEnd = i === greedyPath.length - 1;
              const r = isStart ? 5 : isEnd ? 7 : 2;
              const fill = isEnd ? (isStuck ? C.chalkPink : C.chalkGreen) : C.chalk;
              const op = isStart || isEnd ? 1 : 0.4 + 0.5 * (i / greedyPath.length);
              return (
                <circle key={`gp${i}`} cx={sx(x)} cy={sy(landscape(x))} r={r}
                  fill={fill} opacity={op} stroke={isEnd ? C.board : 'none'} strokeWidth={1.5} />
              );
            })}

            <g>
              <line x1={sx(globalMin.x) - 8} y1={sy(globalMin.y) - 8}
                x2={sx(globalMin.x) + 8} y2={sy(globalMin.y) + 8}
                stroke={C.chalkYellow} strokeWidth={2.5} />
              <line x1={sx(globalMin.x) - 8} y1={sy(globalMin.y) + 8}
                x2={sx(globalMin.x) + 8} y2={sy(globalMin.y) - 8}
                stroke={C.chalkYellow} strokeWidth={2.5} />
              <text x={sx(globalMin.x)} y={sy(globalMin.y) - 14} textAnchor="middle"
                style={{ fontFamily: F_MONO, fontSize: 10, fill: C.chalkYellow }}>真の最小</text>
            </g>
          </svg>
        </Blackboard>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="md:col-span-2 space-y-3">
            <Slider
              label="ボールの初期位置 x"
              value={startX}
              onChange={(v) => setStartX(v)}
              min={xMin} max={xMax} step={0.1}
              color={C.red}
            />
            <div className="flex gap-2 flex-wrap mt-3">
              <Btn variant="ghost" size="sm" onClick={() => setStartX(2.0)}>リセット</Btn>
              <Btn variant="primary" size="sm" onClick={() => setShowJump(!showJump)}>
                {showJump ? 'ジャンプ探索を隠す' : 'ジャンプ探索を試す'}
              </Btn>
              {showJump && (
                <span style={{ fontFamily: F_MONO, fontSize: 11, color: C.inkSoft, alignSelf: 'center' }}>
                  {jumpCount} / 8 投下中…
                </span>
              )}
            </div>
            <div style={{ fontFamily: F_MONO, fontSize: 11, color: C.inkSoft, marginTop: 8, lineHeight: 1.7 }}>
              ● 黒丸 = 貪欲法の軌跡（終点は到達点で <span style={{ color: C.green }}>緑＝成功</span> / <span style={{ color: C.red }}>赤＝局所に固着</span>）<br />
              ● 青丸 = ジャンプ探索（8地点から並列）／ ✕ = 真の最小（黄）
            </div>
          </div>

          <div style={{
            background: C.board, color: C.chalk, padding: '1rem',
            border: `4px solid ${C.frame}`, borderRadius: 3,
            boxShadow: `inset 0 0 0 1px ${C.frameDark}`,
          }}>
            <div style={{ fontFamily: F_MONO, fontSize: 11, color: C.chalkSoft, letterSpacing: '0.15em' }}>
              GREEDY RESULT
            </div>
            <div className="mt-1">
              <span style={{
                fontFamily: F_DISP, fontSize: '1.5rem', fontWeight: 600,
                color: isStuck ? C.chalkPink : C.chalkGreen,
              }}>
                f = {greedyVal.toFixed(3)}
              </span>
            </div>
            <div style={{ fontFamily: F_MONO, fontSize: 11, color: C.chalkSoft, marginTop: 4 }}>
              x = {greedyEnd.toFixed(2)}（{greedyPath.length} ステップ）
            </div>
            <div style={{
              fontFamily: F_MONO, fontSize: 10, color: C.chalkSoft, marginTop: 12,
              paddingTop: 8, borderTop: `1px dashed ${C.chalkFaint}`, lineHeight: 1.7,
            }}>
              真の最小: <b style={{ color: C.chalkYellow }}>f = {globalMin.y.toFixed(3)}</b><br />
              x = {globalMin.x.toFixed(2)}
              <div style={{ color: isStuck ? C.chalkPink : C.chalkGreen, marginTop: 6 }}>
                {isStuck ? '✗ 局所最適にハマっている' : '✓ 大域最小に到達'}
              </div>
            </div>
          </div>
        </div>
      </Card>

      <SectionTitle num="5.1">なぜハマるのか</SectionTitle>
      <Card>
        <p style={{ fontFamily: F_BODY, fontSize: 14, color: C.inkSoft, lineHeight: 1.85 }}>
          ボールは「足元の傾き」しか見ない。だから周囲の地形（もっと深い谷）に気づけない。
          これは <b>勾配降下法</b> や <b>貪欲法</b> の根本的な限界。
        </p>
        <p style={{ fontFamily: F_BODY, fontSize: 14, color: C.inkSoft, lineHeight: 1.85, marginTop: 8 }}>
          回避策はおおむね3つ：
        </p>
        <ul style={{ fontFamily: F_BODY, fontSize: 14, color: C.inkSoft, marginLeft: '1.4rem', lineHeight: 1.95 }}>
          <li><b>多点スタート</b>：複数の初期位置から出発し、最良を採用（上の「ジャンプ探索」）</li>
          <li><b>ランダム性</b>：たまにわざと悪い方向にも動く（焼きなまし法・遺伝的アルゴリズム）</li>
          <li><b>構造を使う</b>：問題が凸（=谷が1つ）なら局所＝大域。LP は実は凸なので貪欲でも安心</li>
        </ul>
      </Card>

      <SectionTitle num="5.2">「凸」だと何が嬉しいか</SectionTitle>
      <Card>
        <p style={{ fontFamily: F_BODY, fontSize: 14, color: C.inkSoft, lineHeight: 1.85 }}>
          <b>凸関数</b> は山が1つしかない地形のこと。
          凸最適化では <b>局所最適 = 大域最適</b> が保証されるので、勾配を下るだけで真の最適に届く。
          LP・QP（Lesson 01・09）は凸。
          一方、シフトや施設配置（Lesson 06・08）は整数変数を含むため非凸で、
          LP緩和や枝限定法など <b>別の道具</b> が要る。次レッスン以降にハマるのも、その難しさの現れ。
        </p>
      </Card>
    </div>
  );
}

// === SHIFT SCHEDULING MODULE ==========================================

const STAFF = [
  { id: 0, name: '田中', off: [1] },     // 火休み（病院）
  { id: 1, name: '佐藤', off: [3] },     // 木休み（講義）
  { id: 2, name: '鈴木', off: [4] },     // 金休み（家族）
  { id: 3, name: '山田', off: [0] },     // 月休み（バイト）
];
const DAYS = ['月', '火', '水', '木', '金'];
const REQ = 2;       // 各日2人必要
const MAX_DAYS = 3;  // 1人最大3日

// ある時点の評価
function evalShift(grid) {
  const violations = { underStaffed: 0, overStaffed: 0, overWorked: 0, ngAssign: 0 };
  // 各日の人数
  const perDay = DAYS.map((_, d) => grid.reduce((s, row) => s + (row[d] ? 1 : 0), 0));
  perDay.forEach((n) => {
    if (n < REQ) violations.underStaffed += REQ - n;
    if (n > REQ) violations.overStaffed += n - REQ;
  });
  // 各人の労働日
  STAFF.forEach((s, i) => {
    const total = grid[i].filter(Boolean).length;
    if (total > MAX_DAYS) violations.overWorked += total - MAX_DAYS;
    grid[i].forEach((on, d) => {
      if (on && s.off.includes(d)) violations.ngAssign += 1;
    });
  });
  return { perDay, violations };
}

// 自動で組む（簡易ヒューリスティック: NG避け、各人の余裕を見ながら埋める）
function autoSolve() {
  const g = STAFF.map(() => DAYS.map(() => false));
  const counts = STAFF.map(() => 0);
  for (let d = 0; d < DAYS.length; d++) {
    // 候補: その日 OK & まだ MAX_DAYS 未満
    const cand = STAFF
      .filter((s) => !s.off.includes(d) && counts[s.id] < MAX_DAYS)
      .sort((a, b) => counts[a.id] - counts[b.id]); // 少ない人から
    for (let k = 0; k < REQ && k < cand.length; k++) {
      g[cand[k].id][d] = true;
      counts[cand[k].id] += 1;
    }
  }
  return g;
}

function ShiftView() {
  const [grid, setGrid] = useState(() => STAFF.map(() => DAYS.map(() => false)));
  const { perDay, violations } = evalShift(grid);
  const totalViolations = violations.underStaffed + violations.overStaffed + violations.overWorked + violations.ngAssign;
  const staffTotals = grid.map((row) => row.filter(Boolean).length);

  const toggle = (s, d) => {
    const next = grid.map((row) => [...row]);
    next[s][d] = !next[s][d];
    setGrid(next);
  };

  return (
    <div>
      <ModuleHeader kicker="LESSON 06" title="シフトを組む" subtitle="STAFF SCHEDULING" accent={C.green} />

      <div style={{
        fontFamily: F_MONO, fontSize: 11, color: C.inkLight,
        letterSpacing: '0.05em', marginBottom: 10, marginLeft: 2,
      }}>
        ← この章の「自動配置」は <b style={{ color: C.inkSoft }}>貪欲法</b> なので、必ずしも最適解にならない（<b style={{ color: C.inkSoft }}>Lesson 05</b>「山と谷」を思い出して）。
      </div>

      <Story>
        スタッフ <b>4 人</b>で月〜金のシフトを組む。<br />
        各日 <b>2 人</b> 必要、1人あたり最大 <b>3 日</b> まで。<br />
        スタッフごとに希望休がある。すべての制約を満たすシフトを作る。
      </Story>

      <Card accent={C.green}>
        {/* Grid */}
        <div className="overflow-x-auto">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: F_BODY }}>
            <thead>
              <tr>
                <th style={{ padding: '0.5rem', textAlign: 'left', fontFamily: F_MONO, fontSize: 11, color: C.inkLight }}></th>
                {DAYS.map((d) => (
                  <th key={d} style={{ padding: '0.5rem', textAlign: 'center', fontFamily: F_DISP, fontSize: 16, color: C.ink }}>{d}</th>
                ))}
                <th style={{ padding: '0.5rem', textAlign: 'center', fontFamily: F_MONO, fontSize: 10, color: C.inkLight }}>計</th>
              </tr>
            </thead>
            <tbody>
              {STAFF.map((s) => (
                <tr key={s.id} style={{ borderTop: `1px solid ${C.rule}` }}>
                  <td style={{ padding: '0.5rem', fontFamily: F_DISP, fontSize: 15, color: C.ink, fontWeight: 500 }}>
                    {s.name}
                    <div style={{ fontFamily: F_MONO, fontSize: 10, color: C.inkLight }}>
                      NG: {s.off.map((d) => DAYS[d]).join(', ')}
                    </div>
                  </td>
                  {DAYS.map((_, d) => {
                    const on = grid[s.id][d];
                    const isNG = s.off.includes(d);
                    return (
                      <td key={d} style={{ padding: '0.25rem', textAlign: 'center' }}>
                        <button
                          onClick={() => toggle(s.id, d)}
                          style={{
                            width: 56, height: 56,
                            background: on
                              ? (isNG ? C.red : C.green)
                              : (isNG ? C.redLight : C.paper),
                            color: on ? C.paperLight : (isNG ? C.red : C.inkLight),
                            border: `1.5px solid ${on ? (isNG ? C.redDeep : C.greenDeep) : (isNG ? C.red : C.rule)}`,
                            fontFamily: F_DISP, fontSize: 22, fontWeight: 600,
                            cursor: 'pointer',
                            position: 'relative',
                            backgroundImage: isNG && !on
                              ? `repeating-linear-gradient(45deg, transparent, transparent 4px, ${C.red}33 4px, ${C.red}33 5px)`
                              : 'none',
                          }}
                          title={isNG ? `${s.name}は${DAYS[d]}NG` : ''}
                        >
                          {on ? '○' : ''}
                        </button>
                      </td>
                    );
                  })}
                  <td style={{ textAlign: 'center', fontFamily: F_MONO, fontSize: 14,
                    color: staffTotals[s.id] > MAX_DAYS ? C.red : C.ink, fontWeight: 500 }}>
                    {staffTotals[s.id]}/{MAX_DAYS}
                  </td>
                </tr>
              ))}
              <tr style={{ borderTop: `2px solid ${C.ink}` }}>
                <td style={{ padding: '0.4rem', fontFamily: F_MONO, fontSize: 11, color: C.inkLight }}>必要 ≥ {REQ}</td>
                {perDay.map((n, d) => (
                  <td key={d} style={{
                    textAlign: 'center', padding: '0.4rem',
                    fontFamily: F_MONO, fontSize: 14, fontWeight: 500,
                    color: n < REQ ? C.red : n > REQ ? C.yellowDeep : C.green,
                  }}>
                    {n}/{REQ}
                  </td>
                ))}
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Status */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
          <StatusBox label="人数不足" value={violations.underStaffed} unit="人日" bad={violations.underStaffed > 0} />
          <StatusBox label="人数超過" value={violations.overStaffed} unit="人日" bad={violations.overStaffed > 0} warn />
          <StatusBox label="勤務日超過" value={violations.overWorked} unit="日" bad={violations.overWorked > 0} />
          <StatusBox label="NG日に割当" value={violations.ngAssign} unit="件" bad={violations.ngAssign > 0} />
        </div>

        <div className="flex flex-wrap gap-2 mt-5">
          <Btn variant="ghost" size="sm" onClick={() => setGrid(STAFF.map(() => DAYS.map(() => false)))}>
            リセット
          </Btn>
          <Btn variant="soft" size="sm" onClick={() => setGrid(autoSolve())}>
            自動で組む
          </Btn>
          {totalViolations === 0 && grid.flat().some(Boolean) && (
            <span style={{
              fontFamily: F_MONO, fontSize: 12, color: C.green,
              padding: '0.4rem 0.8rem', background: C.greenLight, border: `1px solid ${C.green}`,
            }}>
              ✓ 全制約クリア
            </span>
          )}
        </div>
      </Card>

      <SectionTitle num="6.1">これを「数理最適化の言葉」で書くと</SectionTitle>
      <Card>
        <Equation label="SCHEDULING / 整数計画">
          <div>
            <span style={{ color: C.chalkSoft }}>変数：</span>
            x<sub>i,d</sub> ∈ {'{0, 1}'}　
            <span style={{ color: C.chalkSoft }}>（スタッフ i が 日 d に出勤するか）</span>
          </div>
          <div style={{ marginTop: 8, color: C.chalkPink, fontWeight: 500 }}>subject to</div>
          <div style={{ paddingLeft: '1.5em' }}>Σ<sub>i</sub> x<sub>i,d</sub> ≥ 2　 ∀d<span style={{ color: C.chalkSoft }}>  （各日2人以上）</span></div>
          <div style={{ paddingLeft: '1.5em' }}>Σ<sub>d</sub> x<sub>i,d</sub> ≤ 3　 ∀i<span style={{ color: C.chalkSoft }}>  （各人3日まで）</span></div>
          <div style={{ paddingLeft: '1.5em' }}>x<sub>i,d</sub> = 0　 (i,d が NG)<span style={{ color: C.chalkSoft }}>  （希望休）</span></div>
        </Equation>
        <p style={{ fontFamily: F_BODY, fontSize: 14, color: C.inkSoft, marginTop: 12, lineHeight: 1.85 }}>
          目的関数を「制約を全部満たす」だけにすれば <b>充足問題</b>。
          実務ではここに「公平性（出勤日数のばらつき最小化）」「希望シフトの達成度」「人件費最小化」などが目的関数として加わる。
          複数の目的が競合するため、トレードオフを数式で扱うことになる。
        </p>
      </Card>

      <SectionTitle num="6.2">ポイント</SectionTitle>
      <Card style={{ background: C.greenLight, borderColor: C.green }}>
        <p style={{ fontFamily: F_BODY, fontSize: 14.5, color: C.ink, lineHeight: 1.85 }}>
          4人 × 5日 でも組み合わせは 2<sup>20</sup> ≈ 100万通り。
          手で全探索するのは現実的でないが、制約を適切に書けばソルバーは数秒で解ける。
          これが実務で数理最適化が使われる理由。
        </p>
      </Card>
    </div>
  );
}

// === SET COVER MODULE =================================================

function SetCoverView() {
  const GW = 4, GH = 3;
  const cells = useMemo(() => {
    const cs = [];
    for (let y = 0; y < GH; y++) for (let x = 0; x < GW; x++) cs.push({ x, y, id: y * GW + x });
    return cs;
  }, []);
  const cands = useMemo(() => [
    { id: 0, x: 0,   y: 0, name: 'A' },
    { id: 1, x: 3,   y: 0, name: 'B' },
    { id: 2, x: 1.5, y: 1, name: 'C' },
    { id: 3, x: 0,   y: 2, name: 'D' },
    { id: 4, x: 3,   y: 2, name: 'E' },
    { id: 5, x: 1,   y: 0, name: 'F' },
  ], []);
  const RADIUS = 2;

  const coverSets = useMemo(() => cands.map((c) =>
    cells.filter((cell) => Math.abs(cell.x - c.x) + Math.abs(cell.y - c.y) <= RADIUS).map((cell) => cell.id)
  ), [cands, cells]);

  const [open, setOpen] = useState(new Set());
  const [reveal, setReveal] = useState(null);

  const optResult = useMemo(() => {
    let bestSize = 99, bestMask = -1;
    for (let m = 1; m < (1 << cands.length); m++) {
      const covered = new Set(); let count = 0;
      for (let i = 0; i < cands.length; i++) if (m & (1 << i)) { count++; coverSets[i].forEach((c) => covered.add(c)); }
      if (covered.size === cells.length && count < bestSize) { bestSize = count; bestMask = m; }
    }
    const sel = new Set();
    for (let i = 0; i < cands.length; i++) if (bestMask & (1 << i)) sel.add(i);
    return { selected: sel, count: bestSize };
  }, [cands, cells, coverSets]);

  const greedyResult = useMemo(() => {
    const remaining = new Set(cells.map((c) => c.id));
    const sel = new Set();
    while (remaining.size > 0) {
      let best = -1, bestCnt = 0;
      for (let i = 0; i < cands.length; i++) {
        if (sel.has(i)) continue;
        const cnt = coverSets[i].filter((c) => remaining.has(c)).length;
        if (cnt > bestCnt) { bestCnt = cnt; best = i; }
      }
      if (best < 0) break;
      sel.add(best);
      coverSets[best].forEach((c) => remaining.delete(c));
    }
    return { selected: sel, count: sel.size };
  }, [cands, cells, coverSets]);

  const showSet = reveal === 'opt' ? optResult.selected
                 : reveal === 'greedy' ? greedyResult.selected
                 : open;

  const coveredCells = useMemo(() => {
    const c = new Set();
    showSet.forEach((i) => coverSets[i].forEach((id) => c.add(id)));
    return c;
  }, [showSet, coverSets]);

  const allCovered = coveredCells.size === cells.length;
  const cellCoverCount = (cellId) => {
    let n = 0;
    showSet.forEach((i) => { if (coverSets[i].includes(cellId)) n++; });
    return n;
  };

  const toggle = (id) => {
    const next = new Set(open);
    if (next.has(id)) next.delete(id); else next.add(id);
    setOpen(next);
    setReveal(null);
  };

  const SW = 560, SH = 420, M = 40;
  const cw = (SW - 2 * M) / GW;
  const ch = (SH - 2 * M) / GH;

  return (
    <div>
      <ModuleHeader kicker="LESSON 07" title="消防署を配置する" subtitle="SET COVER PROBLEM" accent={C.red} />

      <Story>
        町の全エリア（4×3 = 12 区画）を消防署でカバーする。<br />
        消防署候補は <b>6箇所</b>、各候補は半径2（マンハッタン距離）の範囲をカバーする。<br />
        全エリアをカバーする <b>最少の消防署数</b>を求める。
      </Story>

      <Card accent={C.red}>
        <div style={{ background: C.boardLight, border: `1px solid ${C.pageEdge}`, padding: '0.6rem' }}>
          <svg viewBox={`0 0 ${SW} ${SH}`} role="img" aria-label="町の4×3グリッドと、選択された消防署候補がカバーする範囲"
            style={{ width: '100%', height: 'auto', display: 'block' }}>
            {cells.map((cell) => {
              const cx = M + (cell.x + 0.5) * cw, cy = M + (cell.y + 0.5) * ch;
              const cnt = cellCoverCount(cell.id);
              const fill = cnt === 0 ? C.boardLight : cnt === 1 ? C.redLight : '#f3b9b3';
              const stroke = cnt === 0 ? '#cccccc' : C.red;
              return (
                <g key={cell.id}>
                  <rect
                    x={cx - cw / 2 + 2} y={cy - ch / 2 + 2}
                    width={cw - 4} height={ch - 4}
                    fill={fill} stroke={stroke} strokeWidth={cnt === 0 ? 1 : 1.5}
                    strokeDasharray={cnt === 0 ? '3 3' : '0'}
                  />
                  <text x={cx} y={cy + 4} textAnchor="middle"
                    style={{ fontFamily: F_MONO, fontSize: 10, fill: cnt === 0 ? C.inkLight : C.redDeep }}>
                    {cell.x},{cell.y}
                  </text>
                </g>
              );
            })}

            {cands.map((c) => {
              const isOpen = showSet.has(c.id);
              const cx = M + (c.x + 0.5) * cw, cy = M + (c.y + 0.5) * ch;
              return (
                <g key={c.id}>
                  {isOpen && (
                    <polygon
                      points={(() => {
                        const r = RADIUS * cw;
                        const rh = RADIUS * ch;
                        return `${cx},${cy - rh} ${cx + r},${cy} ${cx},${cy + rh} ${cx - r},${cy}`;
                      })()}
                      fill={C.red} fillOpacity={0.06}
                      stroke={C.red} strokeWidth={1.2} opacity={0.5}
                      strokeDasharray="4 3"
                    />
                  )}
                  <circle cx={cx} cy={cy} r={16}
                    fill={isOpen ? C.red : C.page}
                    stroke={isOpen ? C.redDeep : C.frame} strokeWidth={2} />
                  <text x={cx} y={cy + 5} textAnchor="middle"
                    style={{ fontFamily: F_DISP, fontSize: 16, fontWeight: 600, fill: isOpen ? C.page : C.ink }}>
                    {c.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="md:col-span-2">
            <div style={{ fontFamily: F_MONO, fontSize: 11, color: C.inkLight, letterSpacing: '0.1em', marginBottom: 8 }}>
              候補をクリックで開設/閉鎖
            </div>
            <div className="flex flex-wrap gap-2">
              {cands.map((c) => {
                const isOpen = showSet.has(c.id);
                return (
                  <button
                    key={c.id}
                    onClick={() => toggle(c.id)}
                    disabled={!!reveal}
                    style={{
                      width: 56, height: 56,
                      background: isOpen ? C.red : C.page,
                      color: isOpen ? C.page : C.ink,
                      border: `1.5px solid ${isOpen ? C.redDeep : C.frame}`,
                      fontFamily: F_DISP, fontSize: 20, fontWeight: 600,
                      cursor: reveal ? 'not-allowed' : 'pointer',
                      opacity: reveal ? (isOpen ? 1 : 0.4) : 1,
                    }}
                  >{c.name}</button>
                );
              })}
            </div>
            <div className="flex gap-2 mt-4 flex-wrap">
              <Btn variant="ghost" size="sm" onClick={() => { setOpen(new Set()); setReveal(null); }}>リセット</Btn>
              <Btn variant="soft" size="sm" onClick={() => setReveal(reveal === 'greedy' ? null : 'greedy')}>
                {reveal === 'greedy' ? '元に戻す' : '貪欲解を見る'}
              </Btn>
              <Btn variant="primary" size="sm" onClick={() => setReveal(reveal === 'opt' ? null : 'opt')}>
                {reveal === 'opt' ? '元に戻す' : '最適解を見る'}
              </Btn>
            </div>
          </div>

          <div style={{
            background: C.board, color: C.chalk, padding: '1rem',
            border: `4px solid ${C.frame}`, borderRadius: 3,
            boxShadow: `inset 0 0 0 1px ${C.frameDark}`,
          }}>
            <div style={{ fontFamily: F_MONO, fontSize: 11, color: C.chalkSoft, letterSpacing: '0.15em' }}>
              {reveal === 'opt' ? 'OPTIMAL' : reveal === 'greedy' ? 'GREEDY' : 'STATUS'}
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span style={{ fontFamily: F_DISP, fontSize: '2.4rem', fontWeight: 600, color: allCovered ? C.chalkGreen : C.chalkPink }}>
                {showSet.size}
              </span>
              <span style={{ fontFamily: F_MONO, fontSize: 11, color: C.chalkSoft }}>消防署</span>
            </div>
            <div style={{ fontFamily: F_MONO, fontSize: 11, color: C.chalkSoft, marginTop: 4 }}>
              カバー: {coveredCells.size}/{cells.length}
              {allCovered && <span style={{ color: C.chalkGreen }}> ✓ 全カバー</span>}
            </div>
            <div style={{ fontFamily: F_MONO, fontSize: 10, color: C.chalkSoft, marginTop: 12, paddingTop: 8, borderTop: `1px dashed ${C.chalkFaint}` }}>
              最適: {optResult.count} / 貪欲: {greedyResult.count}
            </div>
          </div>
        </div>
      </Card>

      <SectionTitle num="7.1">貪欲法と最適解の比較</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card style={{ background: C.yellowLight, borderColor: C.yellow }}>
          <Tag bg={C.yellow} color={C.paperLight}>GREEDY / 貪欲法</Tag>
          <div style={{ fontFamily: F_DISP, fontSize: '2rem', fontWeight: 600, color: C.ink, marginTop: 8 }}>
            {greedyResult.count} <span style={{ fontSize: '1rem', color: C.inkLight }}>箇所</span>
          </div>
          <p style={{ fontFamily: F_BODY, fontSize: 13, color: C.inkSoft, marginTop: 8, lineHeight: 1.7 }}>
            未カバーのエリアを最も多くカバーできる候補を順に選ぶ戦略。最初に最も広い候補を選ぶが、結果的に追加で2つ必要になる。
          </p>
        </Card>
        <Card style={{ background: C.greenLight, borderColor: C.green }}>
          <Tag bg={C.green} color={C.paperLight}>OPTIMAL / 最適解</Tag>
          <div style={{ fontFamily: F_DISP, fontSize: '2rem', fontWeight: 600, color: C.ink, marginTop: 8 }}>
            {optResult.count} <span style={{ fontSize: '1rem', color: C.inkLight }}>箇所</span>
          </div>
          <p style={{ fontFamily: F_BODY, fontSize: 13, color: C.inkSoft, marginTop: 8, lineHeight: 1.7 }}>
            全 64 通り（=2<sup>6</sup>）を試して得た最少数。広い候補に頼らず、相補的にカバー領域が重ならない2つを選ぶことで全エリアをカバー。
          </p>
        </Card>
      </div>

      <SectionTitle num="7.2">これを「数理最適化の言葉」で書くと</SectionTitle>
      <Card>
        <Equation label="SET COVER / 整数計画">
          <div>
            <span style={{ color: C.chalkSoft }}>変数：</span>
            x<sub>i</sub> ∈ {'{0, 1}'}<span style={{ color: C.chalkSoft }}>　（候補 i を開設するか）</span>
          </div>
          <div style={{ marginTop: 8, color: C.chalkGreen, fontWeight: 500 }}>minimize</div>
          <div style={{ paddingLeft: '1.5em' }}>Σ<sub>i</sub> x<sub>i</sub><span style={{ color: C.chalkSoft }}>　（開設数を最小化）</span></div>
          <div style={{ marginTop: 8, color: C.chalkPink, fontWeight: 500 }}>subject to</div>
          <div style={{ paddingLeft: '1.5em' }}>Σ<sub>i ∈ S<sub>j</sub></sub> x<sub>i</sub> ≥ 1　∀j<span style={{ color: C.chalkSoft }}>　（各エリア j は1箇所以上にカバーされる）</span></div>
        </Equation>
        <p style={{ fontFamily: F_BODY, fontSize: 14, color: C.inkSoft, marginTop: 12, lineHeight: 1.85 }}>
          消防署・救急車・基地局・センサー配置など、<b>「最少のリソースで全範囲をカバーする」</b> 課題に共通する構造。
          NP困難な問題だが、貪欲法は <b>近似比 ln(n)</b> を持つことが知られている（n=エリア数）。
          実用には <b>分枝限定法</b> や <b>MIPソルバー</b> が用いられる。
        </p>
      </Card>
    </div>
  );
}

// === FACILITY LOCATION MODULE =========================================

function FacilityView() {
  const warehouses = useMemo(() => [
    { id: 0, name: 'W1', x: 1, y: 1, fixed: 60 },
    { id: 1, name: 'W2', x: 5, y: 1, fixed: 70 },
    { id: 2, name: 'W3', x: 3, y: 3, fixed: 90 },
    { id: 3, name: 'W4', x: 5, y: 4, fixed: 65 },
  ], []);
  const demands = useMemo(() => [
    { id: 0, name: 'D1', x: 0, y: 0, demand: 12 },
    { id: 1, name: 'D2', x: 5, y: 0, demand: 18 },
    { id: 2, name: 'D3', x: 1, y: 4, demand: 10 },
    { id: 3, name: 'D4', x: 5, y: 4, demand: 15 },
    { id: 4, name: 'D5', x: 6, y: 2, demand: 8 },
  ], []);

  const dist = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

  const [open, setOpen] = useState(new Set([0]));
  const [reveal, setReveal] = useState(false);

  const compute = (selected) => {
    if (selected.size === 0) return { fixed: 0, trans: 0, total: 0, assign: [], feasible: false };
    let fixed = 0;
    selected.forEach((i) => fixed += warehouses[i].fixed);
    let trans = 0;
    const assign = [];
    for (const d of demands) {
      let bestW = -1, bestC = Infinity;
      selected.forEach((i) => {
        const c = dist(warehouses[i], d) * d.demand;
        if (c < bestC) { bestC = c; bestW = i; }
      });
      trans += bestC;
      assign.push(bestW);
    }
    return { fixed, trans, total: fixed + trans, assign, feasible: true };
  };

  const optResult = useMemo(() => {
    let best = { total: Infinity, mask: -1 };
    for (let m = 1; m < (1 << warehouses.length); m++) {
      const sel = new Set();
      for (let i = 0; i < warehouses.length; i++) if (m & (1 << i)) sel.add(i);
      const r = compute(sel);
      if (r.total < best.total) best = { total: r.total, mask: m, ...r };
    }
    const optSet = new Set();
    for (let i = 0; i < warehouses.length; i++) if (best.mask & (1 << i)) optSet.add(i);
    return { selected: optSet, ...best };
  }, [warehouses, demands]);

  const showSet = reveal ? optResult.selected : open;
  const result = compute(showSet);

  const toggle = (id) => {
    const next = new Set(open);
    if (next.has(id)) next.delete(id); else next.add(id);
    setOpen(next);
    setReveal(false);
  };

  const SW = 560, SH = 420, M = 40;
  const sx = (x) => M + (x / 6) * (SW - 2 * M);
  const sy = (y) => SH - M - (y / 4) * (SH - 2 * M);

  return (
    <div>
      <ModuleHeader kicker="LESSON 08" title="倉庫を建てる" subtitle="FACILITY LOCATION" accent={C.yellow} />

      <Story>
        4つの倉庫候補から建設地を選び、5つの需要点へ配送する。<br />
        各候補には<b>固定費</b>（建設・運用コスト）が、配送には<b>輸送費</b>（距離 × 需要量）がかかる。<br />
        固定費と輸送費の合計を最小にする組み合わせを求める。
      </Story>

      <Card accent={C.yellow}>
        <div style={{ background: C.boardLight, border: `1px solid ${C.pageEdge}`, padding: '0.6rem', marginBottom: '1rem' }}>
          <svg viewBox={`0 0 ${SW} ${SH}`} role="img" aria-label="倉庫候補4箇所と需要点5箇所の地図。開設中の倉庫から需要点への割当が点線で表示"
            style={{ width: '100%', height: 'auto', display: 'block' }}>
            {[0, 1, 2, 3, 4, 5, 6].map((x) => (
              <line key={`gx${x}`} x1={sx(x)} y1={sy(0)} x2={sx(x)} y2={sy(4)} stroke="#eee" strokeWidth={0.5} />
            ))}
            {[0, 1, 2, 3, 4].map((y) => (
              <line key={`gy${y}`} x1={sx(0)} y1={sy(y)} x2={sx(6)} y2={sy(y)} stroke="#eee" strokeWidth={0.5} />
            ))}

            {result.feasible && demands.map((d, di) => {
              const wi = result.assign[di];
              if (wi === undefined || wi < 0) return null;
              const w = warehouses[wi];
              return (
                <line key={`l${di}`}
                  x1={sx(w.x)} y1={sy(w.y)} x2={sx(d.x)} y2={sy(d.y)}
                  stroke={C.yellow} strokeWidth={1.5} opacity={0.5} strokeDasharray="4 2" />
              );
            })}

            {warehouses.map((w) => {
              const isOpen = showSet.has(w.id);
              return (
                <g key={w.id}>
                  <rect
                    x={sx(w.x) - 22} y={sy(w.y) - 18}
                    width={44} height={36}
                    fill={isOpen ? C.yellow : C.page}
                    stroke={isOpen ? C.yellowDeep : C.frame}
                    strokeWidth={2}
                    strokeDasharray={isOpen ? '0' : '4 3'}
                  />
                  <text x={sx(w.x)} y={sy(w.y) - 3} textAnchor="middle"
                    style={{ fontFamily: F_DISP, fontSize: 14, fontWeight: 600, fill: isOpen ? C.page : C.ink }}>
                    {w.name}
                  </text>
                  <text x={sx(w.x)} y={sy(w.y) + 11} textAnchor="middle"
                    style={{ fontFamily: F_MONO, fontSize: 9, fill: isOpen ? C.page : C.inkLight }}>
                    ¥{w.fixed}
                  </text>
                </g>
              );
            })}

            {demands.map((d) => (
              <g key={d.id}>
                <circle cx={sx(d.x)} cy={sy(d.y)} r={14} fill={C.page} stroke={C.ink} strokeWidth={1.5} />
                <text x={sx(d.x)} y={sy(d.y) + 4} textAnchor="middle"
                  style={{ fontFamily: F_DISP, fontSize: 11, fontWeight: 600, fill: C.ink }}>
                  {d.name}
                </text>
                <text x={sx(d.x)} y={sy(d.y) + 26} textAnchor="middle"
                  style={{ fontFamily: F_MONO, fontSize: 9, fill: C.inkLight }}>
                  {d.demand}個
                </text>
              </g>
            ))}
          </svg>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div style={{ fontFamily: F_MONO, fontSize: 11, color: C.inkLight, letterSpacing: '0.1em', marginBottom: 8 }}>
              倉庫を開設/閉鎖
            </div>
            <div className="flex flex-wrap gap-2">
              {warehouses.map((w) => {
                const isOpen = showSet.has(w.id);
                return (
                  <button
                    key={w.id}
                    onClick={() => toggle(w.id)}
                    disabled={reveal}
                    style={{
                      padding: '0.7rem 0.9rem',
                      minHeight: 44,
                      background: isOpen ? C.yellow : C.page,
                      color: isOpen ? C.page : C.ink,
                      border: `1.5px solid ${isOpen ? C.yellowDeep : C.frame}`,
                      fontFamily: F_MONO, fontSize: 12,
                      cursor: reveal ? 'not-allowed' : 'pointer',
                      opacity: reveal ? (isOpen ? 1 : 0.4) : 1,
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontFamily: F_DISP, fontSize: 14, fontWeight: 600 }}>{w.name}</div>
                    <div style={{ fontSize: 10, marginTop: 2 }}>¥{w.fixed}</div>
                  </button>
                );
              })}
            </div>
            <div className="flex gap-2 mt-4 flex-wrap">
              <Btn variant="ghost" size="sm" onClick={() => { setOpen(new Set()); setReveal(false); }}>リセット</Btn>
              <Btn variant="soft" size="sm" onClick={() => { setOpen(new Set([0, 1, 2, 3])); setReveal(false); }}>すべて開設</Btn>
              <Btn variant="primary" size="sm" onClick={() => setReveal(!reveal)}>
                {reveal ? '元に戻す' : '最適解を見る'}
              </Btn>
            </div>
          </div>

          <div style={{
            background: C.board, color: C.chalk, padding: '1rem',
            border: `4px solid ${C.frame}`, borderRadius: 3,
            boxShadow: `inset 0 0 0 1px ${C.frameDark}`,
          }}>
            <div style={{ fontFamily: F_MONO, fontSize: 11, color: C.chalkSoft, letterSpacing: '0.15em' }}>
              {reveal ? 'OPTIMAL COST' : 'YOUR COST'}
            </div>
            <div className="mt-1">
              <span style={{ fontFamily: F_DISP, fontSize: '2.2rem', fontWeight: 600, color: reveal ? C.chalkYellow : C.chalk }}>
                ¥{result.feasible ? result.total : '—'}
              </span>
            </div>
            <div style={{ fontFamily: F_MONO, fontSize: 11, color: C.chalkSoft, marginTop: 6, lineHeight: 1.7 }}>
              固定費: ¥{result.fixed}<br />
              輸送費: ¥{result.trans}
            </div>
            <div style={{ fontFamily: F_MONO, fontSize: 10, color: C.chalkSoft, marginTop: 12, paddingTop: 8, borderTop: `1px dashed ${C.chalkFaint}` }}>
              最適: ¥{optResult.total}（あと <b style={{ color: result.feasible && result.total > optResult.total ? C.chalkYellow : C.chalkGreen }}>¥{result.feasible ? Math.max(0, result.total - optResult.total) : '—'}</b> 削減可）
            </div>
          </div>
        </div>
      </Card>

      <SectionTitle num="8.1">トレードオフの構造</SectionTitle>
      <Card>
        <p style={{ fontFamily: F_BODY, fontSize: 14, color: C.inkSoft, lineHeight: 1.85 }}>
          倉庫を多く建てれば<b>輸送費</b>は下がるが<b>固定費</b>が増える。少なく建てれば固定費は減るが輸送費が増える。
          このトレードオフを定量的に解くのが施設配置問題。
          このケースでは <b>W1 と W2 の2箇所</b> 開設が最適（合計 ¥{optResult.total}）で、すべて開設（¥373）や単独開設（最良でも ¥291）より安い。
        </p>
      </Card>

      <SectionTitle num="8.2">これを「数理最適化の言葉」で書くと</SectionTitle>
      <Card>
        <Equation label="FACILITY LOCATION / MIP">
          <div>
            <span style={{ color: C.chalkSoft }}>変数：</span>
            y<sub>i</sub> ∈ {'{0, 1}'}<span style={{ color: C.chalkSoft }}>　（倉庫 i を開設するか）</span>
          </div>
          <div style={{ paddingLeft: '3.5em' }}>x<sub>ij</sub> ≥ 0<span style={{ color: C.chalkSoft }}>　（倉庫 i から需要点 j への輸送量）</span></div>
          <div style={{ marginTop: 8, color: C.chalkGreen, fontWeight: 500 }}>minimize</div>
          <div style={{ paddingLeft: '1.5em' }}>Σ<sub>i</sub> f<sub>i</sub> · y<sub>i</sub><span style={{ color: C.chalkSoft }}> + </span>Σ<sub>i,j</sub> c<sub>ij</sub> · x<sub>ij</sub></div>
          <div style={{ marginTop: 8, color: C.chalkPink, fontWeight: 500 }}>subject to</div>
          <div style={{ paddingLeft: '1.5em' }}>Σ<sub>i</sub> x<sub>ij</sub> = d<sub>j</sub>　∀j<span style={{ color: C.chalkSoft }}>　（需要を満たす）</span></div>
          <div style={{ paddingLeft: '1.5em' }}>x<sub>ij</sub> ≤ M · y<sub>i</sub>　∀i,j<span style={{ color: C.chalkSoft }}>　（閉鎖中は使えない）</span></div>
        </Equation>
        <p style={{ fontFamily: F_BODY, fontSize: 14, color: C.inkSoft, marginTop: 12, lineHeight: 1.85 }}>
          整数変数（開設するかしないか）と連続変数（輸送量）が混在する <b>混合整数計画（MIP）</b> の典型例。
          物流センター・データセンター・店舗・基地局・サービス拠点の配置に幅広く応用される。
        </p>
      </Card>
    </div>
  );
}

// === PORTFOLIO MODULE =================================================

const ASSETS = [
  { name: '株A',  ret: 0.12, sigma: 0.25, label: 'グロース株', color: '#a93128' },
  { name: '株B',  ret: 0.08, sigma: 0.18, label: 'バリュー株', color: '#cb6a14' },
  { name: '債券', ret: 0.04, sigma: 0.05, label: '国債',       color: '#1d4664' },
  { name: '金',   ret: 0.06, sigma: 0.20, label: 'ゴールド',   color: '#345a3b' },
];
const CORR = [
  [1.00,  0.70, -0.10,  0.10],
  [0.70,  1.00, -0.05,  0.15],
  [-0.10, -0.05, 1.00, -0.20],
  [0.10,  0.15, -0.20,  1.00],
];

function PortfolioView() {
  const cov = useMemo(() => CORR.map((row, i) => row.map((c, j) => c * ASSETS[i].sigma * ASSETS[j].sigma)), []);

  const portRet = (w) => w.reduce((s, wi, i) => s + wi * ASSETS[i].ret, 0);
  const portVar = (w) => {
    let v = 0;
    for (let i = 0; i < w.length; i++) for (let j = 0; j < w.length; j++) v += w[i] * w[j] * cov[i][j];
    return v;
  };
  const portStd = (w) => Math.sqrt(portVar(w));

  const cloudPoints = useMemo(() => {
    const pts = [];
    for (let k = 0; k < 1500; k++) {
      let w = ASSETS.map(() => Math.random());
      const s = w.reduce((a, b) => a + b, 0);
      w = w.map((x) => x / s);
      pts.push({ w, ret: portRet(w), std: portStd(w) });
    }
    return pts;
  }, []);

  const frontier = useMemo(() => {
    const pts = [];
    for (let k = 0; k < 30000; k++) {
      let w = ASSETS.map(() => Math.random());
      const s = w.reduce((a, b) => a + b, 0);
      w = w.map((x) => x / s);
      pts.push({ w, ret: portRet(w), std: portStd(w) });
    }
    const bins = {};
    for (const p of pts) {
      const b = Math.round(p.ret * 200) / 200;
      if (!bins[b] || bins[b].std > p.std) bins[b] = p;
    }
    const fr = Object.keys(bins).map((k) => bins[k]).sort((a, b) => a.std - b.std);
    const minVar = fr.reduce((a, b) => (a.std < b.std ? a : b));
    return fr.filter((p) => p.ret >= minVar.ret);
  }, []);

  const [risk, setRisk] = useState(50);
  const minStd = Math.min(...frontier.map((p) => p.std));
  const maxStd = Math.max(...frontier.map((p) => p.std));
  const targetStd = minStd + (risk / 100) * (maxStd - minStd);
  const selected = frontier.reduce((a, b) =>
    Math.abs(a.std - targetStd) < Math.abs(b.std - targetStd) ? a : b
  );

  const SW = 580, SH = 380, M = 50;
  const stdMax = 0.30, retMax = 0.13;
  const sx = (x) => M + (x / stdMax) * (SW - 2 * M);
  const sy = (y) => SH - M - (y / retMax) * (SH - 2 * M);

  return (
    <div>
      <ModuleHeader kicker="LESSON 09" title="資産を運用する" subtitle="PORTFOLIO OPTIMIZATION" accent={C.blue} />

      <Story>
        4種類の資産にどう資金を配分するか。<br />
        期待リターンが高い資産はリスク（標準偏差）も大きい。<br />
        リスクとリターンのバランスを取る最適な配分を求める。
      </Story>

      <Card accent={C.blue}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {ASSETS.map((a, i) => (
            <div key={i} style={{
              background: C.boardLight, border: `1px solid ${C.pageEdge}`,
              borderTop: `3px solid ${a.color}`, padding: '0.7rem 0.8rem',
            }}>
              <div style={{ fontFamily: F_DISP, fontSize: 16, fontWeight: 600, color: C.ink }}>
                {a.name} <span style={{ fontFamily: F_MONO, fontSize: 11, color: C.inkLight, fontWeight: 400 }}>· {a.label}</span>
              </div>
              <div style={{ fontFamily: F_MONO, fontSize: 11, color: C.inkSoft, marginTop: 4, lineHeight: 1.5 }}>
                期待リターン: <b>{(a.ret * 100).toFixed(1)}%</b><br />
                リスク (σ): <b>{(a.sigma * 100).toFixed(1)}%</b>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: C.boardLight, border: `1px solid ${C.pageEdge}`, padding: '0.6rem' }}>
          <svg viewBox={`0 0 ${SW} ${SH}`} role="img" aria-label="リスク（横）×期待リターン（縦）平面上の各資産と現在のポートフォリオ位置、効率的フロンティア"
            style={{ width: '100%', height: 'auto', display: 'block' }}>
            {[0, 0.05, 0.10, 0.15, 0.20, 0.25, 0.30].map((x) => (
              <g key={`gx${x}`}>
                <line x1={sx(x)} y1={sy(0)} x2={sx(x)} y2={sy(retMax)} stroke="#eee" strokeWidth={0.5} />
                <text x={sx(x)} y={sy(0) + 14} textAnchor="middle"
                  style={{ fontFamily: F_MONO, fontSize: 10, fill: C.inkLight }}>
                  {(x * 100).toFixed(0)}%
                </text>
              </g>
            ))}
            {[0, 0.04, 0.08, 0.12].map((y) => (
              <g key={`gy${y}`}>
                <line x1={sx(0)} y1={sy(y)} x2={sx(stdMax)} y2={sy(y)} stroke="#eee" strokeWidth={0.5} />
                <text x={sx(0) - 6} y={sy(y) + 3} textAnchor="end"
                  style={{ fontFamily: F_MONO, fontSize: 10, fill: C.inkLight }}>
                  {(y * 100).toFixed(0)}%
                </text>
              </g>
            ))}
            <line x1={sx(0)} y1={sy(0)} x2={sx(stdMax)} y2={sy(0)} stroke={C.ink} strokeWidth={1.2} />
            <line x1={sx(0)} y1={sy(0)} x2={sx(0)} y2={sy(retMax)} stroke={C.ink} strokeWidth={1.2} />
            <text x={sx(stdMax) - 4} y={sy(0) + 28} textAnchor="end"
              style={{ fontFamily: F_DISP, fontSize: 12, fill: C.ink, fontStyle: 'italic' }}>
              リスク (σ)
            </text>
            <text x={sx(0) + 8} y={sy(retMax) + 4}
              style={{ fontFamily: F_DISP, fontSize: 12, fill: C.ink, fontStyle: 'italic' }}>
              期待リターン
            </text>

            {cloudPoints.map((p, i) => (
              <circle key={i} cx={sx(p.std)} cy={sy(p.ret)} r={1.2} fill={C.inkLighter} opacity={0.5} />
            ))}

            <polyline
              points={frontier.map((p) => `${sx(p.std)},${sy(p.ret)}`).join(' ')}
              fill="none" stroke={C.blue} strokeWidth={2.5}
            />
            {frontier.length > 0 && (
              <text
                x={sx(frontier[Math.floor(frontier.length * 0.7)].std) + 8}
                y={sy(frontier[Math.floor(frontier.length * 0.7)].ret) - 8}
                style={{ fontFamily: F_DISP, fontSize: 12, fill: C.blue, fontStyle: 'italic' }}
              >
                効率的フロンティア
              </text>
            )}

            {ASSETS.map((a, i) => (
              <g key={i}>
                <circle cx={sx(a.sigma)} cy={sy(a.ret)} r={5} fill={a.color} stroke={C.page} strokeWidth={1.5} />
                <text x={sx(a.sigma) + 8} y={sy(a.ret) + 4}
                  style={{ fontFamily: F_MONO, fontSize: 10, fill: a.color, fontWeight: 500 }}>
                  {a.name}
                </text>
              </g>
            ))}

            <circle cx={sx(selected.std)} cy={sy(selected.ret)} r={9} fill={C.yellow} stroke={C.yellowDeep} strokeWidth={2} />
            <circle cx={sx(selected.std)} cy={sy(selected.ret)} r={16} fill="none" stroke={C.yellow} strokeWidth={1.5} opacity={0.4}>
              <animate attributeName="r" values="9;20" dur="1.6s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0" dur="1.6s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="md:col-span-2 space-y-3">
            <Slider
              label="リスク許容度（左：保守的 → 右：積極的）"
              value={risk} onChange={setRisk}
              min={0} max={100} suffix="" color={C.blue}
            />
            <div style={{ fontFamily: F_BODY, fontSize: 13, color: C.inkSoft, lineHeight: 1.6 }}>
              スライダーを動かすと効率的フロンティア上の点を移動する。各位置で対応する資産配分が右に表示される。
            </div>
            <div className="mt-3">
              <div style={{ display: 'flex', height: 28, border: `1px solid ${C.pageEdge}` }}>
                {selected.w.map((wi, i) => (
                  <div key={i} style={{
                    width: `${wi * 100}%`,
                    background: ASSETS[i].color,
                    color: C.page,
                    fontFamily: F_MONO, fontSize: 10, textAlign: 'center', lineHeight: '28px',
                    overflow: 'hidden',
                  }}>
                    {wi > 0.06 ? `${(wi * 100).toFixed(0)}%` : ''}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-1 flex-wrap gap-x-3" style={{ fontFamily: F_MONO, fontSize: 10 }}>
                {ASSETS.map((a, i) => (
                  <span key={i} style={{ color: a.color }}>● {a.name} {(selected.w[i] * 100).toFixed(0)}%</span>
                ))}
              </div>
            </div>
          </div>

          <div style={{
            background: C.board, color: C.chalk, padding: '1rem',
            border: `4px solid ${C.frame}`, borderRadius: 3,
            boxShadow: `inset 0 0 0 1px ${C.frameDark}`,
          }}>
            <div style={{ fontFamily: F_MONO, fontSize: 11, color: C.chalkSoft, letterSpacing: '0.15em' }}>
              CURRENT POINT
            </div>
            <div className="mt-2" style={{ fontFamily: F_MONO, fontSize: 13 }}>
              <div style={{ color: C.chalkSoft, fontSize: 11 }}>期待リターン</div>
              <div style={{ color: C.chalkGreen, fontSize: 22, fontWeight: 600 }}>
                {(selected.ret * 100).toFixed(2)}%
              </div>
            </div>
            <div className="mt-2" style={{ fontFamily: F_MONO, fontSize: 13 }}>
              <div style={{ color: C.chalkSoft, fontSize: 11 }}>リスク (σ)</div>
              <div style={{ color: C.chalkPink, fontSize: 22, fontWeight: 600 }}>
                {(selected.std * 100).toFixed(2)}%
              </div>
            </div>
            <div style={{ fontFamily: F_MONO, fontSize: 10, color: C.chalkSoft, marginTop: 12, paddingTop: 8, borderTop: `1px dashed ${C.chalkFaint}`, lineHeight: 1.6 }}>
              シャープ比 (rf=0): <b>{(selected.ret / selected.std).toFixed(2)}</b>
            </div>
          </div>
        </div>
      </Card>

      <SectionTitle num="9.1">分散効果と効率的フロンティア</SectionTitle>
      <Card>
        <p style={{ fontFamily: F_BODY, fontSize: 14, color: C.inkSoft, lineHeight: 1.85 }}>
          単一資産だけ持つと（図中の色付き点）リスクは資産ごとの σ になるが、
          複数資産を組み合わせると<b>分散効果</b>により同じリターンでもより低リスクが達成できる。
          <b>効率的フロンティア</b>は「あるリターン水準で最小リスクの配分」をつないだ曲線で、その上の点が合理的な選択肢になる。
        </p>
      </Card>

      <SectionTitle num="9.2">これを「数理最適化の言葉」で書くと</SectionTitle>
      <Card>
        <Equation label="MEAN-VARIANCE / 二次計画 (QP)">
          <div>
            <span style={{ color: C.chalkSoft }}>変数：</span>
            w<sub>i</sub> ≥ 0<span style={{ color: C.chalkSoft }}>　（資産 i への配分比率）</span>
          </div>
          <div style={{ marginTop: 8, color: C.chalkGreen, fontWeight: 500 }}>minimize</div>
          <div style={{ paddingLeft: '1.5em' }}>w<sup>T</sup> Σ w<span style={{ color: C.chalkSoft }}>　（ポートフォリオ分散）</span></div>
          <div style={{ marginTop: 8, color: C.chalkPink, fontWeight: 500 }}>subject to</div>
          <div style={{ paddingLeft: '1.5em' }}>μ<sup>T</sup> w ≥ R<sub>target</sub><span style={{ color: C.chalkSoft }}>　（目標リターン以上）</span></div>
          <div style={{ paddingLeft: '1.5em' }}>Σ<sub>i</sub> w<sub>i</sub> = 1<span style={{ color: C.chalkSoft }}>　（合計100%）</span></div>
        </Equation>
        <p style={{ fontFamily: F_BODY, fontSize: 14, color: C.inkSoft, marginTop: 12, lineHeight: 1.85 }}>
          目的関数が変数の<b>2次式</b>（共分散行列を含む）になる問題は <b>二次計画 (QP)</b>。LP の自然な拡張で、解析解または専用ソルバー（CVXOPT, OSQP, Gurobi 等）で解ける。
          1952年の Markowitz による定式化が現代ポートフォリオ理論の出発点。
        </p>
      </Card>
    </div>
  );
}


// === MODELING EXERCISE MODULE =========================================

const CAT_LABEL = { var: '変数', obj: '目的', cons: '制約' };

const MODELING_PROBLEMS = [
  {
    id: 'cake',
    title: 'ケーキ屋さん',
    color: C.red,
    body:
      'ショートケーキは1個 300 円の利益、作るのに 15 分。\n' +
      'モンブランは1個 500 円の利益、作るのに 25 分。\n' +
      '営業時間は1日 8 時間まで（= 480 分）。\n' +
      '利益を最大化したい。',
    chips: [
      { id: 'c1', text: 'ショートケーキを何個作るか',                        ans: 'var' },
      { id: 'c2', text: 'モンブランを何個作るか',                            ans: 'var' },
      { id: 'c3', text: '300×（ショート個数）＋ 500×（モンブラン個数）',     ans: 'obj' },
      { id: 'c4', text: '15×（ショート）＋ 25×（モンブラン）≤ 480',          ans: 'cons' },
      { id: 'c5', text: '個数 ≥ 0',                                          ans: 'cons' },
    ],
    answer: {
      var:  ['x_s = ショートケーキ個数', 'x_m = モンブラン個数'],
      obj:  ['maximize  300·x_s + 500·x_m'],
      cons: ['15·x_s + 25·x_m ≤ 480', 'x_s, x_m ≥ 0'],
    },
    explain:
      '典型的な LP（線形計画）。「いくつ作るか」が変数、「合計利益」が目的、「時間と非負」が制約。' +
      '個数を整数に縛ると IP（整数計画）。Lesson 01・03 と同じ骨格。',
  },
  {
    id: 'taxi',
    title: '配車の割当',
    color: C.blue,
    body:
      '3台のタクシーと、3人の乗客がいる。\n' +
      '各「タクシー × 乗客」の組み合わせで運賃が違う（迎車距離など）。\n' +
      '1台のタクシーは1人しか乗せない。1人の乗客は1台にしか乗らない。\n' +
      '総運賃が最大になる組み合わせを決めたい。',
    chips: [
      { id: 't1', text: 'タクシー i が乗客 j を乗せるか（0 / 1）', ans: 'var' },
      { id: 't2', text: '総運賃の合計',                            ans: 'obj' },
      { id: 't3', text: '各タクシーが乗せる乗客は 1 人まで',        ans: 'cons' },
      { id: 't4', text: '各乗客は 1 台にだけ乗る',                  ans: 'cons' },
      { id: 't5', text: '0 か 1 のどちらかしかとらない',            ans: 'cons' },
    ],
    answer: {
      var:  ['x_{ij} ∈ {0, 1}　（タクシー i が乗客 j を乗せるなら 1）'],
      obj:  ['maximize  Σ_{i,j} c_{ij} · x_{ij}'],
      cons: ['Σ_j x_{ij} ≤ 1　∀i  （タクシー i は最大 1 人）',
             'Σ_i x_{ij} ≤ 1　∀j  （乗客 j は最大 1 台）',
             'x_{ij} ∈ {0, 1}'],
    },
    explain:
      '0/1 整数変数を使う「割当問題」。Lesson 04（輸送）の特殊形（容量・需要が 1）であり、' +
      'MIP（混合整数計画）の典型例。シフト・マッチングなど応用は広い。',
  },
  {
    id: 'travel',
    title: '旅行プラン',
    color: C.green,
    body:
      '京都旅行で観光スポット 6 箇所が候補。\n' +
      '各スポットには「満足度」と「所要時間」がある。\n' +
      '1日で動ける時間は 12 時間まで。\n' +
      '合計満足度を最大化したい。',
    chips: [
      { id: 'r1', text: 'スポット i を訪れるか（0 / 1）', ans: 'var' },
      { id: 'r2', text: '満足度の合計',                    ans: 'obj' },
      { id: 'r3', text: '所要時間の合計が 12 時間以内',    ans: 'cons' },
      { id: 'r4', text: '0 か 1 のどちらかしかとらない',   ans: 'cons' },
    ],
    answer: {
      var:  ['x_i ∈ {0, 1}　（スポット i を訪れるなら 1）'],
      obj:  ['maximize  Σ_i u_i · x_i　（u_i = 満足度）'],
      cons: ['Σ_i t_i · x_i ≤ 12　（t_i = 所要時間 / h）', 'x_i ∈ {0, 1}'],
    },
    explain:
      '0/1 ナップサック（Lesson 03 そのもの）。旅行・予算配分・特集記事の選定など、' +
      '「枠の中で何を選ぶか」という形は驚くほど多くの場面に現れる。',
  },
];

function ModelingView() {
  const [pi, setPi] = useState(0);
  const [placement, setPlacement] = useState({});
  const [graded, setGraded] = useState(false);
  const problem = MODELING_PROBLEMS[pi];

  const switchProblem = (i) => {
    setPi(i);
    setPlacement({});
    setGraded(false);
  };

  const setCat = (chipId, cat) => {
    setPlacement((p) => ({ ...p, [chipId]: cat }));
    setGraded(false);
  };

  const allAssigned = problem.chips.every((c) => placement[c.id]);
  const correctCount = problem.chips.filter((c) => placement[c.id] === c.ans).length;
  const allCorrect = graded && correctCount === problem.chips.length;

  return (
    <div>
      <ModuleHeader kicker="LESSON 10" title="文章を式にする" subtitle="MODELING EXERCISE" accent={C.yellow} />

      <Story>
        最適化の本当のスキルは「<b>文章で書かれた問題を、3点セットに翻訳する</b>」こと。<br />
        ソルバーは式さえ受け取れば解いてくれる。<br />
        3つのケースで、どこが <b>変数・目的・制約</b> なのかを仕分けしてみよう。
      </Story>

      <Card accent={C.yellow}>
        <div className="flex gap-1 mb-4 flex-wrap">
          {MODELING_PROBLEMS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => switchProblem(i)}
              style={{
                background: pi === i ? p.color : 'transparent',
                color: pi === i ? C.paper : C.ink,
                border: `1.5px solid ${p.color}`,
                padding: '0.4rem 0.9rem',
                fontFamily: F_MONO, fontSize: 12, letterSpacing: '0.05em',
                cursor: 'pointer',
              }}
            >
              Q{i + 1}　{p.title}
            </button>
          ))}
        </div>

        <NotePaper style={{ marginBottom: '1.2rem' }}>
          <div style={{ fontFamily: F_DISP, fontSize: 14.5, color: C.inkSoft, lineHeight: 2.1, whiteSpace: 'pre-line' }}>
            {problem.body}
          </div>
        </NotePaper>

        <div style={{ fontFamily: F_MONO, fontSize: 11, color: C.inkLight, letterSpacing: '0.1em', marginBottom: 8 }}>
          ↓ 各語句を 変数 / 目的 / 制約 のどれかに分類する
        </div>

        <div className="space-y-2">
          {problem.chips.map((chip) => {
            const sel = placement[chip.id];
            const isCorrect = graded && sel === chip.ans;
            const isWrong = graded && sel !== chip.ans;
            return (
              <div key={chip.id} style={{
                display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap',
                background: isCorrect ? C.greenLight : isWrong ? C.redLight : C.paperLight,
                border: `1.5px solid ${isCorrect ? C.green : isWrong ? C.red : C.rule}`,
                padding: '0.6rem 0.85rem',
              }}>
                <span style={{ fontFamily: F_DISP, fontSize: 14, color: C.inkSoft, flex: '1 1 55%' }}>
                  {chip.text}
                  {isWrong && (
                    <span style={{ fontFamily: F_MONO, fontSize: 11, color: C.red, marginLeft: 8 }}>
                      → 正解: {CAT_LABEL[chip.ans]}
                    </span>
                  )}
                </span>
                <div className="flex gap-1">
                  {[
                    { id: 'var',  label: '変数', color: C.red },
                    { id: 'obj',  label: '目的', color: C.blue },
                    { id: 'cons', label: '制約', color: C.yellow },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setCat(chip.id, cat.id)}
                      disabled={graded}
                      style={{
                        background: sel === cat.id ? cat.color : 'transparent',
                        color: sel === cat.id ? C.paper : cat.color,
                        border: `1.5px solid ${cat.color}`,
                        padding: '0.3rem 0.65rem',
                        fontFamily: F_MONO, fontSize: 11, letterSpacing: '0.05em',
                        cursor: graded ? 'not-allowed' : 'pointer',
                        opacity: graded ? 0.7 : 1,
                      }}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-2 mt-4 flex-wrap items-center">
          <Btn variant="ghost" size="sm" onClick={() => { setPlacement({}); setGraded(false); }}>
            リセット
          </Btn>
          <Btn variant="primary" size="sm" onClick={() => allAssigned && setGraded(!graded)}>
            {graded ? '編集に戻る' : '採点する'}
          </Btn>
          {graded && (
            <span style={{ fontFamily: F_MONO, fontSize: 12, color: allCorrect ? C.green : C.inkSoft, fontWeight: 600 }}>
              {correctCount} / {problem.chips.length} 正解
            </span>
          )}
          {!allAssigned && !graded && (
            <span style={{ fontFamily: F_MONO, fontSize: 11, color: C.inkSoft }}>
              全ての語句を分類すると採点できる
            </span>
          )}
          {allCorrect && (
            <span style={{ fontFamily: F_MONO, fontSize: 11, color: C.green, fontWeight: 600 }}>
              ✓ 全問正解！
            </span>
          )}
        </div>

        {graded && (
          <div style={{
            background: C.paperDark, border: `1px dashed ${C.gridDark}`,
            padding: '1rem 1.1rem', marginTop: '1rem',
          }}>
            <div style={{ fontFamily: F_MONO, fontSize: 10, color: C.inkSoft, letterSpacing: '0.15em', marginBottom: 10 }}>
              FORMAL ANSWER / 数式に翻訳すると
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3" style={{ marginBottom: 14 }}>
              {[
                { key: 'var',  label: '決定変数', color: C.red },
                { key: 'obj',  label: '目的関数', color: C.blue },
                { key: 'cons', label: '制約条件', color: C.yellow },
              ].map((s) => (
                <div key={s.key} style={{
                  background: C.paperLight, borderTop: `2px solid ${s.color}`,
                  padding: '0.55rem 0.7rem',
                }}>
                  <div style={{ fontFamily: F_MONO, fontSize: 10, color: s.color, letterSpacing: '0.1em', fontWeight: 600 }}>
                    {s.label}
                  </div>
                  <ul style={{ margin: '4px 0 0', padding: 0, listStyle: 'none', fontFamily: F_MONO, fontSize: 12, color: C.ink, lineHeight: 1.7 }}>
                    {problem.answer[s.key].map((line, li) => (
                      <li key={li} style={{ paddingLeft: 4 }}>{line}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div style={{ fontFamily: F_MONO, fontSize: 10, color: C.inkSoft, letterSpacing: '0.15em', marginBottom: 6 }}>
              EXPLANATION
            </div>
            <div style={{ fontFamily: F_BODY, fontSize: 13, color: C.inkSoft, lineHeight: 1.9 }}>
              {problem.explain}
            </div>
          </div>
        )}
      </Card>

      <SectionTitle num="10.1">これができれば、あとはソルバーが解く</SectionTitle>
      <Card>
        <p style={{ fontFamily: F_BODY, fontSize: 14, color: C.inkSoft, lineHeight: 1.85 }}>
          ここまでできれば、次の <b>Lesson 11</b> で紹介する道具（PuLP / JuMP / AMPL ＋ ソルバー）に渡すだけで解ける。
          実務における最適化の仕事の <b>大半はこの翻訳パート</b>。
          ソルバーを書くのではなく、問題を式に翻訳する人こそが価値を出す。
        </p>
      </Card>
    </div>
  );
}

// === TOOLCHAIN MODULE =================================================

const TOOLCHAIN_CODE = {
  pulp: {
    name: 'Python + PuLP',
    file: 'sweets.py',
    code: `from pulp import LpProblem, LpVariable, LpMaximize, value

m  = LpProblem("sweets", LpMaximize)
xa = LpVariable("xa", lowBound=0)
xb = LpVariable("xb", lowBound=0)

m += 120*xa + 100*xb              # 目的関数
m += 2*xa +   xb <= 12             # 砂糖
m +=   xa + 2*xb <= 10             # レモン

m.solve()                          # ← デフォルトは CBC ソルバー
print(value(xa), value(xb), value(m.objective))`,
  },
  jump: {
    name: 'Julia + JuMP',
    file: 'sweets.jl',
    code: `using JuMP, HiGHS

m = Model(HiGHS.Optimizer)
@variable(m, xa >= 0)
@variable(m, xb >= 0)

@objective(m, Max, 120xa + 100xb)
@constraint(m, 2xa +  xb <= 12)    # 砂糖
@constraint(m,  xa + 2xb <= 10)    # レモン

optimize!(m)
println(value(xa), " ", value(xb), " ", objective_value(m))`,
  },
  lp: {
    name: '生のLP標準形',
    file: 'sweets.lp',
    code: `\\ 目的関数
Maximize
 obj: 120 xa + 100 xb

\\ 制約
Subject To
 c1: 2 xa +   xb <= 12
 c2:   xa + 2 xb <= 10

\\ 変数の下限（>=0）
Bounds
 xa >= 0
 xb >= 0
End`,
  },
};

function ToolchainView() {
  const [tab, setTab] = useState('pulp');
  const [copied, setCopied] = useState(false);
  const code = TOOLCHAIN_CODE[tab];

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <div>
      <ModuleHeader kicker="LESSON 11" title="ソルバーとモデリング言語" subtitle="SOLVER & MODELING LANGUAGE" accent={C.green} />

      <Story>
        ここまで全部、ブラウザ内の手作りロジック（全列挙・貪欲）で解いてきた。<br />
        実務ではもっと汎用な道具を使う。それが <b>モデリング言語</b> と <b>ソルバー</b>。<br />
        役割の違う2つを組み合わせて、問題を解く。
      </Story>

      <Card accent={C.green}>
        <div style={{ background: C.paperDark, border: `2px dashed ${C.gridDark}`, padding: '1rem', marginBottom: '1.2rem' }}>
          <div style={{ fontFamily: F_DISP, fontSize: '1.05rem', color: C.ink, lineHeight: 1.9 }}>
            <b style={{ color: C.red }}>モデリング言語</b> は「レシピを書く言葉」、
            <b style={{ color: C.blue }}>ソルバー</b> は「実際に料理する人」。
            役割が違うので両方が要る。レシピさえ書けば、コックは入れ替えられる。
          </div>
        </div>

        <div style={{ overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: F_BODY, fontSize: 13 }}>
            <thead>
              <tr style={{ background: C.paperDark }}>
                <th style={{ padding: '0.5rem 0.7rem', textAlign: 'left', borderBottom: `1px solid ${C.gridDark}`, fontFamily: F_MONO, fontSize: 10, color: C.inkLight, letterSpacing: '0.1em' }}></th>
                <th style={{ padding: '0.5rem 0.7rem', textAlign: 'left', borderBottom: `1px solid ${C.gridDark}`, color: C.red, fontFamily: F_DISP, fontSize: 14 }}>モデリング言語</th>
                <th style={{ padding: '0.5rem 0.7rem', textAlign: 'left', borderBottom: `1px solid ${C.gridDark}`, color: C.blue, fontFamily: F_DISP, fontSize: 14 }}>ソルバー</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['役割',     '問題を数式に近い形で書く',  '数式を実際に解く'],
                ['例（無料）', 'PuLP, Pyomo, JuMP, CVXPY', 'HiGHS, CBC, GLPK, SCIP, Ipopt'],
                ['例（商用）', 'AMPL, GAMS',                'Gurobi, CPLEX, Mosek, Xpress'],
                ['入力',      'あなたが書く',              'モデリング言語が生成する標準形 (.lp / .mps)'],
                ['出力',      '（受け流す）',              '最適解・最適値・双対'],
                ['入れ替え',  '同じ言語で別ソルバーへ切替可','同じソルバーで別言語からも呼べる'],
              ].map(([k, ml, sv], i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${C.pageEdge}` }}>
                  <td style={{ padding: '0.55rem 0.7rem', fontFamily: F_MONO, fontSize: 11, color: C.inkLight, verticalAlign: 'top', whiteSpace: 'nowrap' }}>{k}</td>
                  <td style={{ padding: '0.55rem 0.7rem', color: C.inkSoft, verticalAlign: 'top' }}>{ml}</td>
                  <td style={{ padding: '0.55rem 0.7rem', color: C.inkSoft, verticalAlign: 'top' }}>{sv}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <SectionTitle num="11.1">同じ問題を、3つの書き方で</SectionTitle>
      <Card>
        <p style={{ fontFamily: F_BODY, fontSize: 13.5, color: C.inkSoft, lineHeight: 1.85, marginBottom: 12 }}>
          題材は <b>Lesson 01 のお菓子LP</b>（砂糖・レモンの上限のもと利益最大化）。
          書き方は違っても、<b>変数 → 目的 → 制約</b>の3点セットが必ず出てくる。
        </p>

        <div className="flex gap-1 mb-3 flex-wrap">
          {Object.entries(TOOLCHAIN_CODE).map(([id, c]) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              style={{
                background: tab === id ? C.ink : 'transparent',
                color: tab === id ? C.paper : C.ink,
                border: `1.5px solid ${C.ink}`,
                padding: '0.4rem 0.9rem',
                fontFamily: F_MONO, fontSize: 12, letterSpacing: '0.05em',
                cursor: 'pointer',
              }}
            >
              {c.name}
            </button>
          ))}
        </div>

        <div style={{
          position: 'relative',
          background: '#1f1f1f', color: '#e6e6e6',
          padding: '0.9rem 1.1rem 1rem',
          fontFamily: F_MONO, fontSize: 12.5, lineHeight: 1.65,
          overflow: 'auto', borderRadius: 2,
          boxShadow: `2px 3px 0 ${C.pageEdge}`,
        }}>
          <div className="flex justify-between items-center" style={{ marginBottom: 8 }}>
            <div style={{ color: '#9aa0a6', fontSize: 10, letterSpacing: '0.1em', fontFamily: F_MONO }}>
              $ {code.file}
            </div>
            <button
              onClick={copyCode}
              aria-label="コードをコピー"
              style={{
                background: copied ? '#2a8543' : 'transparent',
                color: copied ? '#ffffff' : '#9aa0a6',
                border: `1px solid ${copied ? '#2a8543' : '#4a4a4a'}`,
                padding: '0.2rem 0.6rem',
                fontFamily: F_MONO, fontSize: 10, letterSpacing: '0.05em',
                cursor: 'pointer',
                borderRadius: 2,
              }}
            >
              {copied ? '✓ コピー済' : 'コピー'}
            </button>
          </div>
          <pre style={{ margin: 0, whiteSpace: 'pre' }}>{code.code}</pre>
        </div>

        <p style={{ fontFamily: F_BODY, fontSize: 13, color: C.inkSoft, lineHeight: 1.85, marginTop: 14 }}>
          PuLP の <code style={{ fontFamily: F_MONO, background: C.paperDark, padding: '1px 6px', fontSize: 12 }}>m.solve()</code>
          は内部で標準形（.lp ファイル）を作り、ソルバー（CBC）に渡している。
          標準形は人間も読める。<b>道具同士の共通フォーマット</b> としてここで一度顔を出す。
        </p>
      </Card>

      <SectionTitle num="11.2">解くまでの流れ</SectionTitle>
      <Card>
        <Blackboard label="PIPELINE / SOLVE FLOW">
          <svg viewBox="0 0 720 200" role="img" aria-label="解くまでの流れ：あなたの問題 → モデリング言語 → 標準形 → ソルバー"
            style={{ width: '100%', height: 'auto', display: 'block' }}>
            <defs>
              <marker id="arrToolchain" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M0,0 L10,5 L0,10 Z" fill={C.chalk} />
              </marker>
            </defs>
            {[
              { x: 10,  label: 'あなたの問題',     sub: '日本語で書いた要件',    color: C.chalkPink },
              { x: 190, label: 'モデリング言語',   sub: 'PuLP / JuMP / AMPL',   color: C.chalkYellow },
              { x: 370, label: '標準形 .lp/.mps',  sub: '機械が読める数式',       color: C.chalkBlue },
              { x: 550, label: 'ソルバー',         sub: 'CBC / HiGHS / Gurobi', color: C.chalkGreen },
            ].map((b, i) => (
              <g key={i}>
                <rect x={b.x} y={50} width={160} height={70} fill="none" stroke={b.color} strokeWidth={2} />
                <text x={b.x + 80} y={80} textAnchor="middle"
                  style={{ fontFamily: F_DISP, fontSize: 14, fontWeight: 600, fill: b.color }}>{b.label}</text>
                <text x={b.x + 80} y={102} textAnchor="middle"
                  style={{ fontFamily: F_MONO, fontSize: 10, fill: C.chalkSoft }}>{b.sub}</text>
                {i < 3 && (
                  <line x1={b.x + 160} y1={85} x2={b.x + 188} y2={85}
                    stroke={C.chalk} strokeWidth={1.5} markerEnd="url(#arrToolchain)" />
                )}
              </g>
            ))}
            <line x1={50} y1={150} x2={350} y2={150} stroke={C.chalkYellow} strokeWidth={1} strokeDasharray="3 3" />
            <text x={200} y={166} textAnchor="middle"
              style={{ fontFamily: F_MONO, fontSize: 11, fill: C.chalkYellow }}>
              ↑ ここまで人間が書く
            </text>
            <line x1={400} y1={150} x2={700} y2={150} stroke={C.chalkGreen} strokeWidth={1} strokeDasharray="3 3" />
            <text x={550} y={166} textAnchor="middle"
              style={{ fontFamily: F_MONO, fontSize: 11, fill: C.chalkGreen }}>
              ↑ ここから先は道具が解く
            </text>
            <text x={360} y={188} textAnchor="middle"
              style={{ fontFamily: F_MONO, fontSize: 10.5, fill: C.chalkSoft }}>
              出力 → 最適解・最適値・双対
            </text>
          </svg>
        </Blackboard>
      </Card>

      <SectionTitle num="11.3">最初に何を選ぶ？</SectionTitle>
      <Card>
        <NotePaper>
          <div style={{ fontFamily: F_DISP, fontSize: '1rem', color: C.inkSoft, lineHeight: 2 }}>
            <b style={{ color: C.red }}>● まず動かす</b><br />
            ・Python が書ける　<span style={{ color: C.inkLight }}>→</span>　<b>PuLP + CBC</b>（無料・PuLP に同梱）<br />
            ・Julia 派　　　　<span style={{ color: C.inkLight }}>→</span>　<b>JuMP + HiGHS</b><br />
            ・数式そのまま　　<span style={{ color: C.inkLight }}>→</span>　<b>AMPL</b>（学生・趣味は無料版）<br />
            <br />
            <b style={{ color: C.blue }}>● 本番で速さが要る</b><br />
            ・MIP（整数）が遅い　　<span style={{ color: C.inkLight }}>→</span>　<b>Gurobi / CPLEX</b><br />
            ・凸 QP / SOCP　　　　<span style={{ color: C.inkLight }}>→</span>　<b>Mosek</b><br />
            ・大規模 LP　　　　　　<span style={{ color: C.inkLight }}>→</span>　<b>HiGHS</b>（無料でも十分速い）
          </div>
        </NotePaper>

        <p style={{ fontFamily: F_BODY, fontSize: 13.5, color: C.inkSoft, lineHeight: 1.85, marginTop: 16 }}>
          このサイトの全レッスンは「教育のための手作りロジック（全列挙・貪欲）」で解いている。
          実務では、上の表のような<b>道具を呼び出すだけ</b>で済む。本体のスキルは
          「変数・目的・制約に翻訳する」ことであって、ソルバー自体を書く必要はない。
        </p>
      </Card>
    </div>
  );
}

// === SETUP MODULE (appendix) =========================================

const SETUP_CODE = {
  colab: {
    file: 'colab_cell.ipynb',
    code: `# 1) PuLP をインストール（Colab セル）
!pip install pulp

# 2) Lesson 01 と同じ LP（レモネード工場）を解く
from pulp import LpProblem, LpMaximize, LpVariable, value

m  = LpProblem("lemonade", LpMaximize)
xA = LpVariable("xA", lowBound=0)   # レモネード A の杯数
xB = LpVariable("xB", lowBound=0)   # レモネード B の杯数

m += 120 * xA + 100 * xB              # 目的：利益最大化
m += 2 * xA + 1 * xB <= 40            # 砂糖の上限
m += 1 * xA + 2 * xB <= 50            # レモンの上限

m.solve()
print(f"xA = {value(xA)},  xB = {value(xB)},  profit = {value(m.objective)}")
# => xA = 10.0, xB = 20.0, profit = 3200.0`,
  },
  local: {
    file: 'terminal',
    code: `# 1) Python を入れる（公式: https://www.python.org/downloads/）
python --version            # 3.10 以上が望ましい

# 2) プロジェクト用フォルダを作る
mkdir my-opt
cd my-opt

# 3) PuLP を入れる
pip install pulp

# 4) 上の Colab セルのコードを solve.py として保存して実行
python solve.py`,
  },
};

function SetupView({ setView }) {
  const { t } = useContext(LangContext);
  const [tab, setTab] = useState('colab');
  const [copied, setCopied] = useState(false);
  const code = SETUP_CODE[tab];

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <div>
      <ModuleHeader kicker={t('setup.kicker')} title={t('setup.title')} subtitle={t('setup.subtitle')} accent={C.blue} />

      <Story>
        {t('setup.story.line1')}<br />
        {t('setup.story.line2')}<br />
        {t('setup.story.line3')}
      </Story>

      <SectionTitle num="1">{t('setup.s1.title')}</SectionTitle>
      <Card accent={C.blue}>
        <p style={{ fontFamily: F_BODY, fontSize: 13.5, color: C.inkSoft, lineHeight: 1.85, marginBottom: 14 }}>
          {t('setup.s1.body')}
        </p>

        <div style={{ background: C.paperDark, border: `2px dashed ${C.gridDark}`, padding: '0.9rem 1.1rem', marginBottom: 16 }}>
          <div style={{ fontFamily: F_MONO, fontSize: 10, color: C.inkLight, letterSpacing: '0.1em', marginBottom: 6 }}>
            {t('setup.s1.steps.title')}
          </div>
          <ol style={{ fontFamily: F_DISP, fontSize: '0.98rem', color: C.ink, lineHeight: 1.9, paddingLeft: '1.4em', margin: 0 }}>
            <li>{t('setup.s1.step1')}</li>
            <li>{t('setup.s1.step2')}</li>
            <li>{t('setup.s1.step3')}</li>
            <li>{t('setup.s1.step4')}</li>
          </ol>
        </div>

        <div className="flex gap-1 mb-3 flex-wrap">
          {Object.entries(SETUP_CODE).map(([id]) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              style={{
                background: tab === id ? C.ink : 'transparent',
                color: tab === id ? C.paper : C.ink,
                border: `1.5px solid ${C.ink}`,
                padding: '0.4rem 0.9rem',
                fontFamily: F_MONO, fontSize: 12, letterSpacing: '0.05em',
                cursor: 'pointer',
              }}
            >
              {t(`setup.tab.${id}`)}
            </button>
          ))}
        </div>

        <div style={{
          position: 'relative',
          background: '#1f1f1f', color: '#e6e6e6',
          padding: '0.9rem 1.1rem 1rem',
          fontFamily: F_MONO, fontSize: 12.5, lineHeight: 1.65,
          overflow: 'auto', borderRadius: 2,
          boxShadow: `2px 3px 0 ${C.pageEdge}`,
        }}>
          <div className="flex justify-between items-center" style={{ marginBottom: 8 }}>
            <div style={{ color: '#9aa0a6', fontSize: 10, letterSpacing: '0.1em', fontFamily: F_MONO }}>
              $ {code.file}
            </div>
            <button
              onClick={copyCode}
              aria-label={t('setup.copy.aria')}
              style={{
                background: copied ? '#2a8543' : 'transparent',
                color: copied ? '#ffffff' : '#9aa0a6',
                border: `1px solid ${copied ? '#2a8543' : '#4a4a4a'}`,
                padding: '0.2rem 0.6rem',
                fontFamily: F_MONO, fontSize: 10, letterSpacing: '0.05em',
                cursor: 'pointer',
                borderRadius: 2,
              }}
            >
              {copied ? t('setup.copied') : t('setup.copy')}
            </button>
          </div>
          <pre style={{ margin: 0, whiteSpace: 'pre' }}>{code.code}</pre>
        </div>

        <p style={{ fontFamily: F_BODY, fontSize: 12.5, color: C.inkLight, lineHeight: 1.8, marginTop: 14 }}>
          {t('setup.s1.note')}
        </p>
      </Card>

      <SectionTitle num="2">{t('setup.s2.title')}</SectionTitle>
      <Card>
        <p style={{ fontFamily: F_BODY, fontSize: 13.5, color: C.inkSoft, lineHeight: 1.85 }}>
          {t('setup.s2.body')}
        </p>
      </Card>

      <SectionTitle num="3">{t('setup.s3.title')}</SectionTitle>
      <Card>
        <NotePaper>
          <div style={{ fontFamily: F_DISP, fontSize: '1rem', color: C.inkSoft, lineHeight: 2 }}>
            <b style={{ color: C.red }}>● {t('setup.s3.tip1.label')}</b><br />
            <span style={{ paddingLeft: '1.2em', display: 'inline-block' }}>{t('setup.s3.tip1.body')}</span><br />
            <br />
            <b style={{ color: C.red }}>● {t('setup.s3.tip2.label')}</b><br />
            <span style={{ paddingLeft: '1.2em', display: 'inline-block' }}>{t('setup.s3.tip2.body')}</span><br />
            <br />
            <b style={{ color: C.red }}>● {t('setup.s3.tip3.label')}</b><br />
            <span style={{ paddingLeft: '1.2em', display: 'inline-block' }}>{t('setup.s3.tip3.body')}</span>
          </div>
        </NotePaper>
      </Card>

      <SectionTitle num="4">{t('setup.s4.title')}</SectionTitle>
      <Card>
        <p style={{ fontFamily: F_BODY, fontSize: 13.5, color: C.inkSoft, lineHeight: 1.85, marginBottom: 14 }}>
          {t('setup.s4.body')}
        </p>
        <button
          onClick={() => setView && setView('toolchain')}
          style={{
            background: 'transparent',
            border: `1.5px solid ${C.blue}`,
            color: C.blue,
            padding: '0.55rem 1rem',
            fontFamily: F_MONO, fontSize: 12, letterSpacing: '0.05em',
            cursor: 'pointer',
          }}
        >
          {t('setup.s4.backLink')}
        </button>
      </Card>
    </div>
  );
}

// === STATUS BOX (shared) ==============================================

function StatusBox({ label, value, unit, bad, warn }) {
  const color = bad ? (warn ? C.yellowDeep : C.red) : C.green;
  const bg = bad ? (warn ? C.yellowLight : C.redLight) : C.greenLight;
  return (
    <div style={{ background: bg, border: `1px solid ${color}`, padding: '0.6rem 0.8rem' }}>
      <div style={{ fontFamily: F_MONO, fontSize: 10, color: C.inkLight, letterSpacing: '0.1em' }}>{label}</div>
      <div style={{ fontFamily: F_DISP, fontSize: '1.5rem', fontWeight: 600, color, marginTop: 2 }}>
        {value} <span style={{ fontSize: '0.75rem', color: C.inkSoft }}>{unit}</span>
      </div>
    </div>
  );
}

// === HEADER + APP =====================================================

function Header({ view, setView }) {
  const { lang, setLang, t } = useContext(LangContext);
  const tabs = [
    { id: 'home',      no: '',   key: 'nav.home' },
    { id: 'intro',     no: '00', key: 'nav.intro' },
    { id: 'lp',        no: '01', key: 'nav.lp' },
    { id: 'explosion', no: '02', key: 'nav.explosion' },
    { id: 'knapsack',  no: '03', key: 'nav.knapsack' },
    { id: 'transport', no: '04', key: 'nav.transport' },
    { id: 'landscape', no: '05', key: 'nav.landscape' },
    { id: 'shift',     no: '06', key: 'nav.shift' },
    { id: 'setcover',  no: '07', key: 'nav.setcover' },
    { id: 'facility',  no: '08', key: 'nav.facility' },
    { id: 'portfolio', no: '09', key: 'nav.portfolio' },
    { id: 'modeling',  no: '10', key: 'nav.modeling' },
    { id: 'toolchain', no: '11', key: 'nav.toolchain' },
    { id: 'setup',     no: '',   key: 'nav.setup' },
  ];
  return (
    <header
      style={{
        background: `${C.page}f0`,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderBottom: `1px solid ${C.pageEdge}`,
        position: 'sticky', top: 0, zIndex: 10,
      }}
    >
      <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between flex-wrap gap-3">
        <button
          onClick={() => setView('home')}
          style={{
            background: 'transparent', border: 'none', cursor: 'pointer', padding: 0,
            fontFamily: F_DISP, fontSize: 16, fontWeight: 600, color: C.ink,
            letterSpacing: '0.02em',
          }}
        >
          OPTIMIZATION LAB <span style={{ color: C.red }}>·</span>
        </button>
        <nav className="flex gap-1 flex-wrap">
          {tabs.map((tab) => {
            const active = view === tab.id;
            const name = t(tab.key);
            return (
              <button
                key={tab.id}
                onClick={() => setView(tab.id)}
                aria-label={tab.no ? `Lesson ${tab.no} ${name}` : name}
                aria-current={active ? 'page' : undefined}
                style={{
                  background: active ? C.ink : 'transparent',
                  color: active ? C.paper : C.inkSoft,
                  border: 'none',
                  padding: '0.4rem 0.7rem',
                  fontFamily: F_MONO, fontSize: 12, letterSpacing: '0.04em',
                  cursor: 'pointer',
                  minWidth: tab.no ? 32 : undefined,
                  textAlign: 'center',
                }}
              >
                {tab.no ? <span>{tab.no}</span> : null}
                <span className={tab.no ? 'hidden md:inline' : ''} style={{ marginLeft: tab.no ? 4 : 0 }}>
                  {name}
                </span>
              </button>
            );
          })}
          <button
            onClick={() => setLang(lang === 'ja' ? 'en' : 'ja')}
            aria-label="Switch language"
            style={{
              background: 'transparent',
              color: C.inkSoft,
              border: `1px solid ${C.pageEdge}`,
              padding: '0.3rem 0.6rem', marginLeft: 6,
              fontFamily: F_MONO, fontSize: 11,
              cursor: 'pointer',
            }}
          >
            {t('lang.switch')}
          </button>
        </nav>
      </div>
    </header>
  );
}

function LessonNav({ view, setView }) {
  const t = useT();
  const idx = MODULES.findIndex((m) => m.id === view);
  if (idx < 0) return null;
  const prev = idx > 0 ? MODULES[idx - 1] : null;
  const next = idx < MODULES.length - 1 ? MODULES[idx + 1] : null;

  const arrowBtn = (m, dir) => (
    <button
      onClick={() => setView(m.id)}
      style={{
        background: C.page,
        border: `1px solid ${C.pageEdge}`,
        borderLeft: dir === 'next' ? `1px solid ${C.pageEdge}` : `3px solid ${m.accent}`,
        borderRight: dir === 'next' ? `3px solid ${m.accent}` : `1px solid ${C.pageEdge}`,
        padding: '0.7rem 1rem',
        fontFamily: F_MONO, fontSize: 12, color: C.inkSoft,
        textAlign: dir === 'next' ? 'right' : 'left',
        cursor: 'pointer',
        boxShadow: `2px 2px 0 ${C.pageEdge}`,
        flex: '1 1 0',
        minWidth: 0,
      }}
    >
      <div style={{ fontSize: 10, color: C.inkLight, letterSpacing: '0.1em' }}>
        {dir === 'next' ? t('lessonNav.next') : t('lessonNav.prev')}
      </div>
      <div style={{ fontFamily: F_DISP, fontSize: 14, color: C.ink, fontWeight: 600, marginTop: 2,
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {m.no} {m.title}
      </div>
    </button>
  );

  return (
    <nav className="flex gap-3 mt-12 pt-6"
      style={{ borderTop: `1px solid ${C.pageEdge}` }}>
      {prev ? arrowBtn(prev, 'prev') : <div style={{ flex: '1 1 0' }} />}
      {next ? arrowBtn(next, 'next') : <div style={{ flex: '1 1 0' }} />}
    </nav>
  );
}

export default function App() {
  const [view, setView] = useState('home');
  const [lang, setLang] = useState(() =>
    typeof navigator !== 'undefined' && navigator.language?.startsWith('en') ? 'en' : 'ja'
  );
  const mainRef = useRef(null);

  // ビュー変更時に main にフォーカス + ページトップへ。スクリーンリーダーが新規コンテンツを読み上げる。
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    if (mainRef.current) mainRef.current.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  useEffect(() => {
    if (typeof document !== 'undefined') document.documentElement.lang = lang;
  }, [lang]);

  const t = useMemo(() => (k) => I18N[lang]?.[k] ?? I18N.ja[k] ?? k, [lang]);
  const langValue = useMemo(() => ({ lang, setLang, t }), [lang, t]);

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Klee+One:wght@400;600&family=Zen+Kaku+Gothic+New:wght@400;500;700;900&family=JetBrains+Mono:wght@400;500&display=swap');
    body, html { background: ${C.page}; }
    input[type="range"] { accent-color: ${C.ink}; }

    /* キーボードフォーカスを明示（マウス使用時は非表示） */
    *:focus-visible {
      outline: 2px solid ${C.blue};
      outline-offset: 2px;
    }
    *:focus:not(:focus-visible) { outline: none; }

    /* スキップリンク：Tab 一発で本文へ */
    .skip-link {
      position: absolute;
      left: -9999px; top: -9999px;
      background: ${C.ink}; color: ${C.paper};
      padding: 0.6rem 1rem;
      font-family: ${F_MONO};
      font-size: 13px;
      z-index: 100;
    }
    .skip-link:focus {
      left: 1rem; top: 1rem;
    }
    main:focus { outline: none; }
  `;
  return (
    <LangContext.Provider value={langValue}>
      <div
        style={{
          background: C.page, color: C.ink, fontFamily: F_BODY,
          minHeight: '100vh',
          position: 'relative',
        }}
      >
        <style>{styles}</style>
        <a href="#main" className="skip-link"
          onClick={(e) => {
            e.preventDefault();
            mainRef.current?.focus();
            window.scrollTo({ top: 0 });
          }}>
          {t('app.skip')}
        </a>
        <Header view={view} setView={setView} />
        <main id="main" ref={mainRef} tabIndex={-1}
          className="max-w-5xl mx-auto px-6 py-10"
          aria-live="polite">
          {view === 'home' && <HomeView go={setView} />}
          {view === 'intro' && <IntroView />}
          {view === 'lp' && <LPView />}
          {view === 'explosion' && <ExplosionView />}
          {view === 'knapsack' && <KnapsackView />}
          {view === 'transport' && <TransportView />}
          {view === 'landscape' && <LandscapeView />}
          {view === 'shift' && <ShiftView />}
          {view === 'setcover' && <SetCoverView />}
          {view === 'facility' && <FacilityView />}
          {view === 'portfolio' && <PortfolioView />}
          {view === 'modeling' && <ModelingView />}
          {view === 'toolchain' && <ToolchainView />}
          {view === 'setup' && <SetupView setView={setView} />}
          {view !== 'home' && <LessonNav view={view} setView={setView} />}
        </main>
        <footer
          className="max-w-5xl mx-auto px-6 py-8"
          style={{
            borderTop: `1px solid ${C.pageEdge}`, marginTop: '3rem',
            fontFamily: F_MONO, fontSize: 11, color: C.inkLight, letterSpacing: '0.08em',
          }}
        >
          {t('app.footer')}
        </footer>
      </div>
    </LangContext.Provider>
  );
}
