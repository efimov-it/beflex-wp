<?php
    $tmp_dir = get_template_directory_uri();
?>
<section class="bf-simpleBanner">
    <img src="<?=$tmp_dir?>/assets/imgs/about_banner.svg" class="bf-simpleBanner_background" width="1313" height="418" alt="">

    <h2 class="bf-simpleBanner_title">
        <?=$attributes['title']?>
    </h2>
    <p class="bf-simpleBanner_text">
        <?=$attributes['text']?>
    </p>

    <img src="<?=$tmp_dir?>/assets/imgs/about_banner_bg_shape.svg" class="bf-simpleBanner_shape" width="566" height="558" alt="">
    <?php
        if ($attributes['image']) {
        ?>
            <img src="<?=$attributes['img']['img']?>" class="bf-simpleBanner_image" width="530" height="421" alt="">
        <?php
        }
        else {
        ?>
            <img src="<?=$tmp_dir?>/assets/imgs/about_banner_default.jpg" class="bf-simpleBanner_image" width="530" height="421" alt="">
        <?php
        }
    ?>
</section>