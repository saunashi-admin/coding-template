/*
 * IE11 polyfill
 * Intersection ObserverはIE以外はデフォルトで使える
 */
//polyfill使わないときはコメントアウト
import 'intersection-observer';
IntersectionObserver.prototype.POLL_INTERVAL = 100; // Time in milliseconds.

// function onIntersect(entries, observer) {
//   console.log(entries);
//   //交差検知したもののなかで、isIntersectingがtrueのDOMを色を変える関数に渡す
//   entries.forEach((entry) => {
//     //entry.isIntersectingで発火。オブジェクト確認
//     if (entry.isIntersecting) {
//       activateIndex(entry.target);
//     }
//   });
// }

// function activateIndex(element) {
//   // すでにアクティブになっている目次を選択
//   const currentActiveIndex = document.querySelector(
//     ".Header_nav_list .-active"
//   );
//   // すでにアクティブになっているものが0個（=null）の時以外は、activeクラスを除去
//   // currentActiveIndex !== null でもOK
//   if (currentActiveIndex) {
//     currentActiveIndex.classList.remove("-active");
//   }
//   // 引数で渡されたDOMが飛び先のaタグを選択し、activeクラスを付与
//   const newActiveIndex = document.querySelector(
//     `.Header_nav_list a[href="#${element.id}"]`
//   );
//   if (newActiveIndex) {
//     newActiveIndex.classList.add("-active");
//   }
// }

// const observer = new IntersectionObserver(onIntersect, {
//   root: null, //ビューポート
//   rootMargin: "-50% 0px", //0でもpxつける,-50%で要素の中央で発火
//   threshold: 0,
// });

// //交差を監視する要素
// const targets = document.querySelectorAll(".js-obserbed");
// // それぞれの要素を監視する
// if (targets) {
//   targets.forEach((target) => {
//     observer.observe(target);
//   });
// }

/*
 * lazy load
 */
// const lazyImages = document.querySelectorAll(".lazy-img");
const lazyImages = document.querySelectorAll('[data-lazyloaded]');
const lazyImageObserver = new IntersectionObserver(onIntersect, {
  root: null, //ビューポート
  rootMargin: '200px 0px', //0でもpxつける,-50%で要素の中央で発火
  threshold: 0,
});

function onIntersect(entries, observer) {
  console.log(entries);
  //交差検知したもののなかで、isIntersectingがtrueのDOMを色を変える関数に渡す
  entries.forEach((entry) => {
    //entry.isIntersectingで発火。オブジェクト確認
    if (entry.isIntersecting) {
      const imgElement = entry.target;
      const imgElementTagName = imgElement.tagName;
      if (imgElementTagName == 'IMG') {
        imgElement.src = imgElement.dataset.src;
      } else if (imgElementTagName == 'PICTURE') {
        imgElement.srcset = imgElement.dataset.src;
      }
      imgElement.addEventListener('load', () => {
        imgElement.dataset.lazyloaded = true;
      });
      lazyImageObserver.unobserve(imgElement);
    }
  });
}
if (lazyImages) {
  lazyImages.forEach((lazyImage) => {
    lazyImageObserver.observe(lazyImage);
  });
}

/*
 *  アニメーション
 */
const effectTargets = document.querySelectorAll('.effect-target');
const effectTargetsObserver = new IntersectionObserver(onIntersectEffect, {
  root: null, //ビューポート
  rootMargin: '0px 0px', //0でもpxつける,-50%で要素の中央で発火
  threshold: 0,
});
function onIntersectEffect(entries, observer) {
  console.log(entries);
  //交差検知したもののなかで、isIntersectingがtrueのDOMを色を変える関数に渡す
  entries.forEach((entry) => {
    //entry.isIntersectingで発火。オブジェクト確認
    if (entry.isIntersecting) {
      const target = entry.target;
      target.classList.add('-action');
      effectTargetsObserver.unobserve(target);
    }
  });
}
if (effectTargets) {
  effectTargets.forEach((effectTarget) => {
    effectTargetsObserver.observe(effectTarget);
  });
}
