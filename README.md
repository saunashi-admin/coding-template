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

### css設計
2020年はBEM的なので統一していたが、拡張性に難があったため2021年1月現在が再検討中  
末廣はflocss推し
    
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
#### 注意点
- 命名はキャメルケース
- extendは極力書かない

#### みんなで使うmixin
- mq
- video
- lineHeight
- spのみhover
- absoluteで中央寄せ
    
### reset
- bodyに`line-height`は書かない、_text.scssに書く。
- _reset.scssは末廣resetを使用する。
    
### 変数
#### color
- 色は基本全て変数にする。
`color_red_01`
#### font 
- `_font.scss` に設定、
	font-familyを変数に。$ff-フォント名
  
## 画像命名ルール
- 画像の名前 アンスコ統一 1枚しかなくても01つける
- spは `_sp`

```
  pagename/
    img_section_01.jpg
    thumb_section_01.jpg 小さめなやつ
    bg_　背景のレイヤー
    obj_ 背景のオブジェクト
    fig_section_01.jpg 図形、グラフ
		illust_ 
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
    
