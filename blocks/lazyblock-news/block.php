<?php

$id = get_the_ID();

$post_type = get_post_type($id);

$posts = get_posts(array(
    'numberposts' => 4,
    'orderby' => 'post_date',
    'order' => 'DESC',
    'post_type' => 'post',
    'post_status' => 'publish',
    'post__not_in' => [get_the_ID()]
));
$home_page = home_url();
?>

<div class="bf-news">
    <?php
    if ($posts) {
        foreach ($posts as $post) {
            $preview = get_the_post_thumbnail_url($post -> ID, 'large');
    ?>
    <div class="bf-news_post">
        <img src="<?=esc_url($preview)?>" class="bf-news_preview" width="332" height="332" alt="">
        <h3 class="bf-news_title">
            <?=$post -> post_title?>
        </h3>
        <a href="<?=$home_page . '/' . $post -> post_name?>"<?= $post_type !== 'post' ? ' target="_blank" ' : ''?>class="bf-news_link"></a>
    </div>
    <?php
        }
    }
    ?>
</div>