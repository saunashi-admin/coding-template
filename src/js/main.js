"use strict";

import "./intersectionObserver";
import "./smoothScroll";
// import noScrollToggle from "./noScrollToggle";
import "@babel/polyfill";

//ポリフィル
import objectFitImages from "object-fit-images";
objectFitImages();

// メディアクエリ
const mediaQueryList = window.matchMedia("(max-width:959px)");
const listener = (e) => {
	resetHeader(e);
};
mediaQueryList.addListener(listener); // リスナー登録
listener(mediaQueryList); // 初期ロード時
