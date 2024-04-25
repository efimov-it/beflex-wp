<?php
/*
 * Template Name: Шаблон для страницы о нас
 * Template Post Type: page
 */

$tmp_dir = get_template_directory_uri();
get_header();
?>

    <main class="bf-main">
        <img src="<?=$tmp_dir?>/assets/imgs/about_bg.svg" class="bf-main_bg bf-main_bg__about" width="1986" height="4563" alt="">
        <img src="<?=$tmp_dir?>/assets/imgs/about_bg_mob.svg" class="bf-main_bg bf-main_bg__aboutMobile" width="453" height="285" alt="">
        <?=the_content()?>
    </main>

<?php
get_footer();

?>