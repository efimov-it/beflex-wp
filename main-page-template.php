<?php
/*
 * Template Name: Шаблон для главной страницы
 * Template Post Type: page
 */

$tmp_dir = get_template_directory_uri();
get_header();
?>

    <main class="bf-main">
        <img src="<?=$tmp_dir?>/assets/imgs/main_page_bg.svg" class="bf-main_bg bf-main_bg__main" width="2082" height="5460" alt="">
        <img src="<?=$tmp_dir?>/assets/imgs/main_page_bg_mob.svg" class="bf-main_bg bf-main_bg__mainMob" width="1307" height="5966" alt="">
        <?=the_content()?>
    </main>

<?php
get_footer();

?>