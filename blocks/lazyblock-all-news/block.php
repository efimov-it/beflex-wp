<?php

$news = get_posts([
    'post_type'      => 'post',
    'numberposts' => -1,
    'orderby'        => 'date',
    'order'          => 'DESC',
]);

$home_page = home_url();
$tmp_dir = get_template_directory_uri();

?>

<section class="bf-allNews">
    <?php
    foreach ($news as $i => $post) {
        $preview = get_the_post_thumbnail_url($post -> ID, 'large');
        if (!$preview) $preview = $tmp_dir . "/assets/imgs/no_photo.jpg";
    ?>
    <article class="bf-news_post">
        <img src="<?=esc_url($preview)?>" class="bf-news_preview" width="" height="" alt="">
        <h3 class="bf-news_title"><?=$post -> post_title?></h3>
        <a href="<?=$home_page . '/' . $post -> post_name?>" class="bf-news_link"></a>
    </article>
    <?php
    }
    ?>
</section>