<?php
    $tmp_dir = get_template_directory_uri();

get_header();
?>

    <main class="bf-main bf-main__404">
        <img src="<?=$tmp_dir?>/assets/imgs/flower.svg" class="bf-404Flower" width="430" height="430" alt="">
        <img src="<?=$tmp_dir?>/assets/imgs/404_weight.svg" class="bf-404Weight" width="132" height="56" alt="">
        <img src="<?=$tmp_dir?>/assets/imgs/404_sad.svg" class="bf-404Sad" width="125" height="125" alt="">

        <h2 class="bf-404Title">404</h2>
        <p class="bf-404Text">упс, кажется, мы перетрудились</p>
    </main>

<?php
get_footer();

?>