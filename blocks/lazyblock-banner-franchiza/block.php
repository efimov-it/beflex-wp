<?php
$tmp_dir = get_template_directory_uri();
?>
<section class="bf-studioBanner">
    
    <img src="<?=$attributes['img']['url']?>" class="bf-studioBanner_image" width="1440" height="700" alt="">
    <img src="<?=$tmp_dir?>/assets/imgs/banners_shape.svg" class="bf-studioBanner_shape" width="655" height="260" alt="">
    
    <div class="bf-studioBanner_content bf-franchizeBannerContent">
        <h1 class="bf-studioBanner_title">
            <span class="bf-studioBanner_title__black">
                <?=$attributes['title']?>
            </span>
        </h1>
    </div>

    <div class="bf-franchizeRating">
    <?php
    foreach ($attributes['ratings'] as $i => $rating) {
    ?>
        <div class="bf-franchizeRating_item">
            <img src="<?=$rating['logo']['url']?>" class="bf-franchizeRatingLogo" width="180" height="120" alt="">
            <p class="bf-franchizeRatingText">
                <?=$rating['text']?>
            </p>
        </div>
    <?php
    }
    ?>
    </div>
</section>