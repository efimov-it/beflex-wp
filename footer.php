<?php
    $tmp_dir = get_template_directory_uri();
    $home_page = home_url();

    include_once "parts/modals.php";
?>

<div class="bf-actionButton">
    <div class="bf-actionButton_point">
        <button id="actionButtonOpen" class="bf-actionButton_button" type="button" title="Заказать обратный звонок">
            <img class="bf-actionButtonIcon" src="<?=$tmp_dir?>/assets/imgs/action_callback.svg" width="38" height="38" alt="Закрыть">
        </button>
    </div>

    <?php
    if (get_theme_mod('tg_link')) {
    ?>
    <div class="bf-actionButton_point">
        <a href="https://t.me/<?=get_theme_mod('tg_link')?>" target="_blank"  rel="nonoopener noreferrer" title="Написать в Telegram" class="bf-actionButton_button" type="button">
            <img class="bf-actionButtonIcon" src="<?=$tmp_dir?>/assets/imgs/action_tg.svg" width="38" height="38" alt="Закрыть">
        </a>
    </div>
    <?php
    }
    ?>

    <?php
    if (get_theme_mod('wa_number')) {
    ?>
    <div class="bf-actionButton_point">
        <a href="https://wa.me/<?=get_theme_mod('wa_number')?>" target="_blank"  rel="nonoopener noreferrer" title="Написать в WhatsApp" class="bf-actionButton_button" type="button">
            <img class="bf-actionButtonIcon" src="<?=$tmp_dir?>/assets/imgs/action_wa.svg" width="38" height="38" alt="Закрыть">
        </a>
    </div>
    <?php
    }
    ?>

    <div class="bf-actionButton_point">
        <button id="actionButtonClose" class="bf-actionButton_button bf-actionButton_button__small" title="Закрыть" type="button">
            <img class="bf-actionButtonIcon bf-actionButtonIcon__small" src="<?=$tmp_dir?>/assets/imgs/action_button_close.svg" width="28" height="28" alt="Закрыть">
        </button>
    </div>
</div>

<footer class="bf-footer">
    <?php
        $logo_id = get_theme_mod( 'custom_logo' );
        if ( $logo_id ) {
            $logo = wp_get_attachment_image_src( $logo_id, 'full' );
            ?>
            <a href="<?=$home_page?>" class="bf-footerLogo">
                <img src="<?=$logo[0]?>" width="304" height="76" alt="Логотип" class="bf-footerLogo_img">
            </a>
            <?php
        }
        else {?>
            <a href="<?=$home_page?>" class="bf-footerLogo">
                <img src="<?=$tmp_dir?>/assets/imgs/logo.svg" width="304" height="76" alt="Логотип" class="bf-footerLogo_img">
            </a>
        <?
        }
    ?>

    <div class="bf-footerSocials">
        <p class="bf-footerSocials_header">
            Мы в соцсетях
        </p>

        <div class="bf-footerSocials_list">
            <?php
                $socials = get_posts([
                    'post_type' => 'socials',
                    'posts_per_page' => -1,
                    'orderby' => 'ID',
                    'order' => 'ASC'
                ]);

                foreach ($socials as $social) {
            ?>
            <a href="<?=get_field('link', $social -> ID)?>" target="_blank" rel="nonoopener noreferrer" class="bf-footerSocialsLink" title="Перейти в соц сеть">
                <img src="<?=get_field('img', $social -> ID)?>" class="bf-footerSocialsLink_img" width="40" height="30" alt="<?=$social -> post_title?>">
            </a>
            <?php
                }
            ?>
        </div>
    </div>
    
    <div class="bf-footerLinks">
        <nav class="bf-footerLinks_menu">
                <ul class="bf-footerMenu">
                <?php
                    if (has_nav_menu('primary')) {
                        $locations = get_nav_menu_locations();

                        if ($locations || $locations['primary']) {
                            $menu_items = wp_get_nav_menu_items($locations['primary']);

                            if ($menu_items) {

                                $tmp_menu = [];

                                foreach ($menu_items as $menu_item) {
                                    if (intval($menu_item -> menu_item_parent) === 0) {
                                        $tmp_menu[] = $menu_item;
                                    }
                                    else {
                                        $tmp = [];

                                        foreach ($tmp_menu as $tmp_menu_item) {

                                            if (intval($menu_item -> menu_item_parent) !== intval($tmp_menu_item -> ID)) {
                                                $tmp[] = $tmp_menu_item;
                                            }
                                        }

                                        $tmp_menu = $tmp;
                                    }
                                }

                                $menu_items = $tmp_menu;

                                foreach ($menu_items as $menu_item) {?>
                                <li class="bf-footerMenu_item">
                                    <a href="<?=$menu_item->url?>" class="bf-footerLink"><?=$menu_item->title?></a>
                                </li>
                                <?php
                                }
                            }
                        }
                    }
                ?>
                </ul>
        </nav>

        <div class="bf-footerLinks_block">
            <nav class="bf-footerPages">
                <ul class="bf-footerPages_list">
                <?php
                    if ($locations || $locations['footer']) {
                        $menu_items = wp_get_nav_menu_items($locations['footer']);

                        foreach ($menu_items as $menu_item) {
                ?>
                    <li class="bf-footerPage">
                        <a href="<?=$menu_item->url?>" class="bf-footerPage_link"><?=$menu_item->title?></a>
                    </li>
                <?php
                        }
                    }
                ?>
                </ul>
            </nav>

            <div class="bf-footerContacts">
                <div class="bf-footerContacts_apps">
                    <?php
                        if (get_theme_mod('google_play_link')) {
                            ?>
                    <a href="<?=get_theme_mod('google_play_link')?>" target="_blank" class="bf-footerAppLink" title="Скачать для Android">
                        <img src="<?=$tmp_dir?>/assets/imgs/google_play.svg" class="bf-footerAppLink_img" width="124" height="36" alt="Доступно в Google Play">
                    </a>
                            <?php
                        }
                    ?>
                    <?php
                        if (get_theme_mod('app_store_link')) {
                            ?>
                    <a href="<?=get_theme_mod('app_store_link')?>" target="_blank" class="bf-footerAppLink" title="Скачать для IOS">
                        <img src="<?=$tmp_dir?>/assets/imgs/app_store.svg" class="bf-footerAppLink_img" width="124" height="36" alt="Загрузите в AppStore">
                    </a>
                            <?php
                        }
                    ?>
                </div>

                <div class="bf-footerContacts_block">
                    <?php
                        if (get_theme_mod('email')) {
                            ?>
                    <a href="mailto:<?=get_theme_mod('email')?>" class="bf-footerContact"><?=get_theme_mod('email')?></a>
                            <?php
                        }
                    ?>
                    <?php
                        if (get_theme_mod('phone')) {
                            ?>
                    <a href="tel:<?=get_theme_mod('phone')?>" class="bf-footerContact"><?=phone_format(get_theme_mod('phone'))?></a>
                            <?php
                        }
                    ?>
                </div>
            </div>
        </div>
    </div>
</footer>

<?php
    wp_footer();
?>

</body>
</html>