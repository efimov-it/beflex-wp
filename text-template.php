<?php
/*
 * Template Name: Шаблон для текстовых страниц
 * Template Post Type: page
 */

$tmp_dir = get_template_directory_uri();
get_header();
?>

    <main class="bf-main bf-main__textTemplate">
        <?php
            include_once('blocks/lazyblock-simple-title/block.php');
        ?>
        <img src="<?=$tmp_dir?>/assets/imgs/flower.svg" class="bf-textTemplateFlower" width="430" height="430" alt="">
        
        <section class="bf-main_textContent">
            <?=the_content()?>
        </section>
    </main>

<?php
get_footer();

?>