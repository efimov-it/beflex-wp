<?php
/*
 * Template Name: Шаблон для страницы магазина
 * Template Post Type: page
 */

$tmp_dir = get_template_directory_uri();
get_header();
?>

    <main class="bf-main">
        <img src="<?=$tmp_dir?>/assets/imgs/page_bg_shop1.svg" class="bf-main_bg bf-main_bg__shop" width="1865" height="2760" alt="">
        <?=the_content()?>
    </main>

<?php
get_footer();

?>