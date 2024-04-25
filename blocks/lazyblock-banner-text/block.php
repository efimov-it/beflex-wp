<?php
$tmp_dir = get_template_directory_uri();
?>

<section class="bf-bannerText<?=$attributes['style'] !== 'pink' ? ' bf-bannerText__blue' : '' ?>">
    <img src="<?=$tmp_dir?>/assets/imgs/banner_text_photo.svg" class="bf-bannerText_bg" width="" height="" alt="">
    <img src="<?=$tmp_dir?>/assets/imgs/banner_text_photo_mob.svg" class="bf-bannerText_bg bf-bannerText_bg__mob" width="" height="" alt="">

    <h2 class="bf-bannerText_title">
        <?=$attributes['title']?>
    </h2>

    <p class="bf-bannerText_text">
        <?=$attributes['text']?>
    </p>

    <a href="<?=$attributes['link']?>" class="bf-bannerText_button">
        <?=$attributes['button_text']?>
    </a>

    <?php
    if ($attributes['style'] === 'pink') {
        ?>
        <img src="<?=$tmp_dir?>/assets/imgs/banner_text_photo_shape_3.svg" class="bf-bannerText_shape" width="" height="" alt="">
        <?php
        if ($attributes['img2']) {
        ?>
            <img src="<?=$attributes['img2']['url']?>" class="bf-bannerText_shape2" width="" height="" alt="">
        <?php
            } else {
        ?>
            <img src="<?=$tmp_dir?>/assets/imgs/banner_text_photo_default_2.jpg" class="bf-bannerText_shape2" width="" height="" alt="">
        <?php
            }
        if ($attributes['img1']) {
        ?>
            <img src="<?=$attributes['img1']['url']?>" class="bf-bannerText_shape1" width="" height="" alt="">
        <?php
            } else {
        ?>
            <img src="<?=$tmp_dir?>/assets/imgs/banner_text_photo_default_1.jpg" class="bf-bannerText_shape1" width="" height="" alt="">
        <?php
            }
    } else {
        if ($attributes['img2']) {
        ?>
            <img src="<?=$attributes['img2']['url']?>" class="bf-bannerText_shape4" width="" height="" alt="">
        <?php
            } else {
        ?>
            <img src="<?=$tmp_dir?>/assets/imgs/banner_text_photo_default_4.jpg" class="bf-bannerText_shape4" width="" height="" alt="">
        <?php
        }

        if ($attributes['img1']) {
        ?>
            <img src="<?=$attributes['img1']['url']?>" class="bf-bannerText_shape3" width="" height="" alt="">
        <?php
            } else {
        ?>
            <img src="<?=$tmp_dir?>/assets/imgs/banner_text_photo_default_3.jpg" class="bf-bannerText_shape3" width="" height="" alt="">
        <?php
        }
    }
    ?>
</section>