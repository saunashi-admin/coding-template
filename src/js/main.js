// scssコンパイルのために必須の記述
'use strict';
// import "../scss/style.scss";

//js import
import './intersectionObserver.js';
import './smoothScroll.js';
import '@babel/polyfill';

//ポリフィル
import objectFitImages from 'object-fit-images';
objectFitImages();

// import Stickyfill from "stickyfilljs"; //polyfill
// const sticky = document.querySelectorAll(".js-sticky");
// Stickyfill.add(sticky);

// ie識別・対策
const agent = window.navigator.userAgent.toLowerCase();
const isIE11 = agent.indexOf('trident/7') !== -1;

// メディアクエリ
const breakPointSp = 'max-width:959px';
const isSP = () => {
  if (window.matchMedia(`(${breakPointSp})`)) {
    return true;
  } else {
    return false;
  }
};
// window.addEventListener("resize", isSP);
// window.addEventListener("load", isSP);

//横リサイズ・SP確認
const resizeCheckerSP = (callback) => {
  let lastInnerWidth = window.innerWidth;
  window.addEventListener('resize', () => {
    if (lastInnerWidth != window.innerWidth) {
      let flag = isSP();
      if (flag == true) {
        callback();
      }
      lastInnerWidth = window.innerWidth;
    }
  });
};

/*
 *ページトップに戻る
 */
//途中から表示・非表示
// const scrollTopSwitch = () => {
//   const footer = document.getElementById("js-footer"),
//     rect = footer.getBoundingClientRect(),
//     scrollTop = window.pageYOffset || document.documentElement.scrollTop,
//     footerTop = rect.top + scrollTop;
//   window.addEventListener("scroll", (e) => {
//     let scrollTop = window.scrollTop;
//     let windowInnerHeight = window.innerHeight;
//     let scrollPos = scrollTop + windowInnerHeight;
//     if (scrollTop > 100) {
//       pageTop.classList.add("is-show");
//       //フッターの上で固定
//       if (scrollPos > footerTop) {
//         pageTop.classList.add("is-fixed");
//       } else {
//         pageTop.classList.remove("is-fixed");
//       }
//     } else {
//       pageTop.classList.remove("is-show");
//     }
//   });
// };
// scrollTopSwitch();
//クリックでTOPへ

if (document.getElementById('js-totop')) {
  const scrollTopTrigger = () => {
    const trigger = document.getElementById('js-totop');
    trigger.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  };
  scrollTopTrigger();
}

//別ページからのアンカーずれ解消
document.addEventListener('DOMContentLoaded', () => {
  if (location.hash) {
    const headerHeight = document.getElementById('js-header').clientHeight;
    setTimeout(() => {
      window.scrollBy(0, -headerHeight);
    }, 100);
  }
});

/*
 * spグロナビ
 */
const headerFnc = () => {
  // ハンバーガーWAI-ARIA
  const hamburger = document.getElementById('js-hamburger');
  const bodyClassList = document.body.classList;
  const hamburgerIcon = () => {
    const ariaExpanded = hamburger.getAttribute('aria-expanded');
    if (ariaExpanded == 'false') {
      hamburger.setAttribute('aria-expanded', 'true');
    } else {
      hamburger.setAttribute('aria-expanded', 'false');
    }
  };
  //bodyクラスで全体を管理
  const hamburgerBodyClass = () => {
    if (bodyClassList.contains('is-drawerActive')) {
      bodyClassList.remove('is-drawerActive');
    } else {
      bodyClassList.add('is-drawerActive');
    }
  };
  //リサイズ
  resizeCheckerSP(function () {
    hamburger.setAttribute('aria-expanded', 'false');
    bodyClassList.remove('is-drawerActive');
  });
  //clickイベント
  hamburger.addEventListener('click', () => {
    hamburgerIcon();
    hamburgerBodyClass();
    noScroll();
  });
  //spグロナビリンクをクリックで閉じる
  const spHeaderLinks = document.querySelectorAll('.HeaderSP_nav_list--item .item-link');
  spHeaderLinks.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      hamburgerIcon();
      hamburgerBodyClass();
    });
  });

  //裏のスクロール無効→本当に必要か？
  // const scrollOff = () => {
  //   const body = document.body;
  //   const isActive = body.classList.contains("is-drawerActive");
  //   if (isActive) {
  //     window.addEventListener("scroll", (e) => {
  //       e.preventDefault();
  //     })
  //   }
  // }
  // scrollOff();
}; //sp
headerFnc();

/*
 *ロード画面
 */
if (document.getElementById('js-loading')) {
  const loadingFnc = (delay) => {
    const loading = document.getElementById('js-loading');
    window.addEventListener('load', function () {
      loading.classList.add('is-fadeout'); //_js.scss/is-fadeoutのdurationと合わせる
      this.setTimeout(() => {
        loading.style.display = 'none';
      }, delay);
    });
  };
  loadingFnc(1000);
}

/*
 * target="_blank"にrel="noopener"を付与
 * 自分のドメイン、ハッシュは対象外
 */
const externalLink = function () {
  const thisSiteDomain = document.domain;
  const aTags = document.querySelectorAll('a:not([target="_blank"])');
  let array = [];
  if (!aTags.length) return;
  for (let i = 0; i < aTags.length; i++) {
    let aTag = aTags[i];
    let href = aTag.href;
    if (href.indexOf(`${thisSiteDomain}`) !== -1) continue; //自分のドメインは対象外
    aTag.setAttribute('target', '_blank');
    aTag.setAttribute('rel', 'noopener');
    array.push(aTag);
  }
  return array;
};
document.addEventListener('DOMContentLoaded', externalLink, false);

//レイヤー開いてるときはbodyスクロール禁止
const body = document.body;
const bodyClassList = body.classList;
const bodyStyle = body.style;
function noScroll() {
  const body = document.body;
  const bodyClassList = body.classList;
  const bodyStyle = body.style;
  if (bodyClassList.contains('noscroll')) {
    // レイヤーが閉じたら、topをscrollTopに
    let top = bodyStyle.top;
    bodyStyle.position = '';
    bodyStyle.top = '';
    window.scrollTo(0, parseInt(top || '0') * -1);
    bodyClassList.remove('noscroll');
  } else {
    bodyClassList.add('noscroll');
    // レイヤーが開いたら、bodyにfixedを付与
    bodyStyle.top = `-${window.scrollY}px`;
    bodyStyle.position = 'fixed';
  }
}
resizeCheckerSP(() => {
  bodyStyle.position = '';
  bodyStyle.top = '';
  bodyClassList.remove('noscroll');
});
