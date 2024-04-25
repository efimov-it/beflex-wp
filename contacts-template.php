<?php
/*
 * Template Name: Шаблон для страницы контакты
 * Template Post Type: page
 */

$tmp_dir = get_template_directory_uri();
get_header();
?>

    <main class="bf-main bf-main__contacts">
        <img src="<?=$tmp_dir?>/assets/imgs/contacts_bg.svg" class="bf-main_bg bf-main_bg__contacts" width="1561" height="1226" alt="">
        <?=the_content()?>
    </main>

<?php
get_footer();

?>