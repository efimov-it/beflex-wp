<?php

$tmp_dir = get_template_directory_uri();

$classes = get_posts([
    'post_type'      => 'training_type',
    'posts_per_page' => -1,
    'orderby'        => 'title',
    'order'          => 'ASC'
]);

$home_page = home_url();
?>

<ul class="bf-classes">
    <?php
    foreach ($classes as $class) {
        $preview = get_the_post_thumbnail_url($class -> ID, 'large');
        if (!$preview) $preview = $tmp_dir . "/assets/imgs/no_photo.jpg";
    ?>
    <li class="bf-classCard">
        <a href="<?=$home_page . '/napravlenija/' . $class -> post_name?>" class="bf-classCard_link"></a>
        <img src="<?=esc_url($preview)?>" class="bf-classCard_image" width="280" height="280" alt="">
        <h3 class="bf-classCard_title"><?=$class -> post_title?></h3>
    </li>
    <?php
    }
    ?>
</ul>