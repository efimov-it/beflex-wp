<?php
/*
 * Template Name: Шаблон для страницы направлений
 * Template Post Type: page
 */

$tmp_dir = get_template_directory_uri();
get_header();
?>

    <main class="bf-main">
        <img src="<?=$tmp_dir?>/assets/imgs/all_classes_bg.svg" class="bf-main_bg bf-main_bg__allClasses" width="1811" height="2482" alt="">
        <?=the_content()?>
    </main>

<?php
get_footer();

?>