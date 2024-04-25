<?php
$tmp_dir = get_template_directory_uri();
?>

<section class="bf-appBanner">
    <img src="<?=$tmp_dir?>/assets/imgs/mobile_app_bg.svg" class="bf-appBanner_bg" width="1316" height="200" alt="">
    <img src="<?=$tmp_dir?>/assets/imgs/mobile_app_bg_mob.svg" class="bf-appBanner_bg bf-appBanner_bg__mob" width="388" height="540" alt="">

    <h2 class="bf-appBanner_text">
        <?=$attributes['text']?>
    </h2>

    <div class="bf-appBanner_links">
        <?php
            if (get_theme_mod('google_play_link')) {
                ?>
        <a href="<?=get_theme_mod('google_play_link')?>" class="bf-appBannerLink" title="Скачать для Android">
            <img src="<?=$tmp_dir?>/assets/imgs/google_play.svg" class="bf-appBannerLink_img" width="124" height="36" alt="Доступно в Google Play">
        </a>
                <?php
            }
        ?>
        <?php
            if (get_theme_mod('app_store_link')) {
                ?>
        <a href="<?=get_theme_mod('app_store_link')?>" class="bf-appBannerLink" title="Скачать для IOS">
            <img src="<?=$tmp_dir?>/assets/imgs/app_store.svg" class="bf-appBannerLink_img" width="124" height="36" alt="Загрузите в AppStore">
        </a>
                <?php
            }
        ?>
    </div>
</section>