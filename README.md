# saunashi-temlate

## ディレクトリ構造
### 公開フォルダ これはいじらない！
```
dist/
  assets/
    css/...
    img/...
    js/...
    meta/... ファビコンなど
  page/...
  index.html
wp_theme
  assets/...
  index.php
  ※assetsへのアクセスは関数 img
   homeURLにするなら関数に
```
### 開発フォルダ
```
src/    
  img/...
  scss/...
  js/...
    main.js→エントリーのみ、基本import
    common.js
    ※どこまで分けるかは要検討
  meta//// ファビコンなど→distにコピーする
　(pug/...) pugを使わない場合はフォルダ名をhtml,phpなどにしてdistにコピーする
```
 
## scss
### scssファイル構成
```
scss/...
    style.scss globする
    順番
      _reset
      setting/**
      _mixin
      _base  共通のmixinや固有のもの
      parts/**
      layout/**
      pages/**
    _reset.scss→中身は今度考える
    _mixin
    _base/→bodyやヘルパークラス
    pages/
    layout/ ブロック系
      _header.scss
      _footer.scss
      _breadcumbs.scss
    parts/ エレメント系
      _btn
      _text  見出し
      _animation
```
      
### メディアクエリ
```
  $breakpoints: (
    'xs': 'screen and (max-width: 480px)',
    'sm': 'screen and (max-width: 768px)',
    'md': 'screen and (max-width: 1024px)',
    'lg': 'screen and (min-width: 1025px)',
    'xl': 'screen and (min-width: 1280px)',
    'se': 'screen and (max-width: 320px)',
    "ie":
    "screen and (-ms-high-contrast: active), screen and (-ms-high-contrast: none)",
  ) !default;
  @mixin mq($breakpoint: tab) {
    @media #{map-get($breakpoints, $breakpoint)} {
      @content;
    }
  }
```
  
### ヘルパークラス
全てのメディアクエリに対して作る
`.xs_show`,`.xs_hide`
  
### mixin 
_base.scssに記載する。
命名はアンスコで統一。
extendは極力書かない。
mq
video
line-height
spのみhover
absoluteで中央寄せ
    
### reset
bodyに`line-height`は書かない、_text.scssに書く。
_reset.scssは末広resetを使用する。
    
### 変数
#### color
色は基本全て変数にする。
`color_red_01`
#### font 
`_text.scss` に記載
    
### クラス命名
#### 下層のクラス名
`ページ名_セクション_block--element`
bodyに `Page_ページ名` クラスをつける。wordpressはmainにつける。
#### BEM 
`sm_show` とかもModifier ハイフンつける。
  
## 画像命名ルール
画像の名前 アンスコ統一 1枚しかなくても01つける
spは `_sp`

```
  pagename/
    img_section_01.jpg
    thumb_section_01.jpg 小さめなやつ
    bg_　背景のレイヤー
    obj_ 背景のオブジェクト
    fig_section_01.jpg 図形、グラフ
    kv.jpg
    kv_sp.jpg
    child/... 下層フォルダ
  common/
    logo.svg
    logo_header.svg
    icon_btn_arrow.svg
    icon_arrow.svg
    icon_arrow_blue.svg
    icon_sns_twitter.svg
    icon_sns_facebook.svg
    icon_sns_line.svg
    icon_header.svg
```
    
