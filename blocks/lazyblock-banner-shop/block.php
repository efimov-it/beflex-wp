<?php
$tmp_dir = get_template_directory_uri();
?>

<section class="bf-shopBanner">
    <img src="<?=$tmp_dir?>/assets/imgs/shop_banner.svg" class="bf-shopBanner_bgImage" width="1440" height="711" alt="">
    <img src="<?=$tmp_dir?>/assets/imgs/shop_banner_mobile.svg" class="bf-shopBanner_bgImage bf-shopBanner_bgImage__mobile" width="430" height="651" alt="">

    <?php
        if ($attributes['img-big']) {?>
    <img src="<?=$attributes['img-big']['url']?>" class="bf-shopBanner_image" width="664" height="701" alt="">
    
    <?php
        }
    ?>
    
    <?php
        if ($attributes['img-small']) {?>
    <img src="<?=$attributes['img-small']['url']?>" class="bf-shopBanner_image bf-shopBanner_image__mobile" width="326" height="429" alt="">
    
    <?php
        }
    ?>
    
    <img src="<?=$tmp_dir?>/assets/imgs/banners_shape.svg" class="bf-shopBanner_shape1" width="568" height="340" alt="">
    <img src="<?=$tmp_dir?>/assets/imgs/shop_page_banner_shape.svg" class="bf-shopBanner_shape2" width="996" height="616" alt="">

    <h2 class="bf-shopBanner_text">
        <?=$attributes['title'] ? $attributes['title'] : 'Магазин'?>
    </h2>
</section>