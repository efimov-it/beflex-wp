<?php
/*
 * Template Name: Шаблон для страницы франшизы
 * Template Post Type: page
 */

$tmp_dir = get_template_directory_uri();
get_header();
?>

    <main class="bf-main">
        <img src="<?=$tmp_dir?>/assets/imgs/franchize_bg.svg" class="bf-main_bg bf-main_bg__franchize" width="2530" height="7994" alt="">
        <img src="<?=$tmp_dir?>/assets/imgs/franchize_bg_mob.svg" class="bf-main_bg bf-main_bg__franchizeMobile" width="1232" height="10197" alt="">
        <?=the_content()?>
    </main>

<?php
get_footer();

?>