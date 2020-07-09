'use strict';
jQuery(function() {
    ///////////////////////////////
    /////////変数の定義//////////////
    var $win = $(window);
    var $html = $('html');
    var $body = $('body');
    var $main = $('#js-main');

    // ヘッダー
    var $header = $('#js-header');
    var headerHeight = $header.outerHeight();
    var $gNav = $('#js-navGlobal');
    var $gNav_list = $('#js-navGlobal-list');
    var $hamburger = $('#js-hamburger');

    //アニメーション
    var scrollSpeed = 400;
    ////////////////////////////////
    ////////////////////////////////

    // ページトップ
    var $toTop = $('#js-toTop');
    $win.on('scroll', function() {
        var scrollTop = $(this).scrollTop();
        var scrollPosition = scrollTop + $(this).height();
        if ($(this).scrollTop() > 100) {
            $toTop.fadeIn();
            // if (scrollPosition > $('.footer').offset().top) {
            //   $toTop.addClass('footer-fixed');
            // } else {
            //   $toTop.removeClass('footer-fixed');
            // } //フッターの上で固定
        } else {
            $toTop.fadeOut();
        }
    }); //途中から表示・非表示
    $toTop.click(function() {
        $html.animate({ scrollTop: 0 }, scrollSpeed);
    });

    //グロナビのスクロール（固定ヘッダー対応）
    $('a[href^="#"]').click(function() {
        var href = $(this).attr('href');
        var target = $(href == '#' || href == '' ? 'html' : href);
        var position = target.offset().top; // 非固定はこれ
        if ($header.hasClass('-fixed')) {
            position -= headerHeight; //固定ヘッダー用 ヘッダの高さ分位置をずらす
        }
        $html.animate({ scrollTop: position }, scrollSpeed, 'swing');
        return false;
    });
    //別ベージからの固定ヘッダーアンカーリンクずれ
    //load時にURLにハッシュがあれば、header分調整
    var urlHash = location.hash; //URLハッシュを取得
    if (urlHash) {
        var target = $(urlHash);
        var gap_px = $('#download').css('padding-top');
        var gap = parseInt(gap_px);
        console.log(gap);

        var position = target.offset().top;
        $html.animate({ scrollTop: position }, 100);
    }

    // //上スクロールで「トップへ戻るボタン」表示
    // var start_pos = 0;
    // $toTop.removeClass('-show');
    // $(window).scroll(function(e) {
    //     var current_pos = $(this).scrollTop();
    //     var scroll_direction = current_pos > start_pos ? 'down' : 'up';
    //     if (scroll_direction === 'up' && current_pos != 0) {
    //         $toTop.addClass('-show');
    //     } else {
    //         $toTop.removeClass('-show');
    //     }
    //     start_pos = current_pos;
    // });

    //途中から固定ヘッダー
    var winScrollTop = $win.scrollTop(); //スクロールするたびに取得する必要＝イベント内
    var headerOffsetTop = $header.offset().top;
    $win.on('scroll', function() {
        if ($win.scrollTop() > headerOffsetTop) {
            $header.addClass('-fixed');
        } else {
            $header.removeClass('-fixed');
        }
    });
    $win.trigger('scroll'); //ページ途中でリロードしてもヘッダー固定

    //mv超えたらヘッダー変更
    $win.on('scroll', function() {
        var length;
        if ($('#js-mv').length) {
            length = $('#js-mv').innerHeight();
        }
        if (length < $(this).scrollTop()) {
            $body.attr('data-scroll', 'true');
        } else {
            $body.attr('data-scroll', 'false');
        }
    });
    $win.trigger('scroll'); //ページ途中でリロードしてもヘッダー固定

    //グロナビ
    function hamburgerIcon() {
        if ($hamburger.attr('aria-expanded') === 'false') {
            $hamburger.attr('aria-expanded', true);
        } else {
            $hamburger.attr('aria-expanded', false);
        }
    }

    $hamburger.click(function() {
        $body.toggleClass('is-drawerActive');
        $gNav.fadeIn();
        hamburgerIcon();
    });

    //spグロナビリンクをクリックしたら閉じる
    var $gNavLink = $('.navGlobal__list--item .item-link');
    $gNavLink.on('click', function() {
        if ($body.hasClass('is-drawerActive')) {
            $body.removeClass('is-drawerActive');
            $gNav.show();
        }
        hamburgerIcon();
    });
    //グロナビend

    //アコーディオン
    // $(".faq_question_content").hide();
    //nextもしくはprev
    $('.accordion-btn').click(function() {
        $(this)
            .siblings('.accordion-content')
            .slideToggle();
        $(this)
            .parent('.accordion-item')
            .toggleClass('open');
    });

    // 遅れてふわっと
    $win.on('scroll', function() {
        $("[class*='effect']").each(function() {
            var position = $(this).offset().top;
            var scrollTop = $win.scrollTop();
            var winHeight = $win.height();
            var scrollGap = 100; //発火を遅らせる
            if (scrollTop > position - winHeight + scrollGap) {
                $(this).addClass('-action');
            }
            // else {
            //   $(this).removeClass("js-scrollIn");
            // } //上に戻ると再びアニメーション
        });
    });
    $win.trigger('scroll');

    //ロード画面
    var $loading = $('#js-loading');
    $win.on('load', function() {
        setTimeout(function() {
            $loading.fadeOut(1000);
            $body.attr('data-loading', true);
        }, 1000);
    });

    //基本は外部リンク
    $('a[href^="http"]').attr('target', '_blank');
    $('a[href^="//"]').attr('target', '_blank');
}); //jQuery
