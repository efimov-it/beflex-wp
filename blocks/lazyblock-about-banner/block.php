<?php
$tmp_dir = get_template_directory_uri();
?>

<section class="bf-aboutBanner">
    <img src="<?=$attributes['img-big'] ? $attributes['img-big']['url'] : ''?>" class="bf-aboutBanner_image" width="1440" height="711" alt="">
    <img src="<?=$attributes['img-small'] ? $attributes['img-small']['url'] : ''?>" class="bf-aboutBanner_image bf-aboutBanner_image__mobile" width="430" height="651" alt="">
    <img src="<?=$tmp_dir?>/assets/imgs/about_page_banner_shape.svg" class="bf-aboutBanner_shape" width="568" height="340" alt="">

    <h2 class="bf-aboutBanner_text">
        <?=$attributes['text']?>
    </h2>
</section>