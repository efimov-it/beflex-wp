<?php
/*
 * Template Name: Шаблон для страницы курса
 * Template Post Type: page
 */

$tmp_dir = get_template_directory_uri();
get_header();
?>

    <main class="bf-main">
        <img src="<?=$tmp_dir?>/assets/imgs/kurs.svg" class="bf-main_bg bf-main_bg__kurs" width="2126" height="2515" alt="">
        <?=the_content()?>
    </main>

<?php
get_footer();

?>