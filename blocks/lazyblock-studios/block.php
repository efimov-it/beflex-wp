<?php
$id = get_the_ID();
$post_type = get_post_type();

$tmp_dir = get_template_directory_uri();

if ($post_type === 'training_type') {
    $studios = get_posts([
        'numberposts' => -1,
        'orderby' => 'post_title',
        'order' => 'ASC',
        'post_type' => 'studios',
        'post_status' => 'publish',
        'meta_query' => [
            [
                'key' => 'classes',
                'value' => '"' . $id . '"',
                'compare' => 'LIKE',
                'type' => 'CHAR'
            ]
        ]
    ]);
}
else {
    $studios = get_posts([
        'numberposts' => -1,
        'orderby' => 'post_title',
        'order' => 'ASC',
        'post_type' => 'studios',
        'post_status' => 'publish'
    ]);
}

?>

<ul class="bf-studiosList">
    <?php
        foreach ($studios as $key => $studio) {
            $preview = get_the_post_thumbnail_url($studio -> ID, 'large');
            if (!$preview) $preview = $tmp_dir . "/assets/imgs/no_photo.jpg";
    ?>
    <li class="bf-studiosList_item bf-studioCard">
        <img src="<?=esc_url($preview)?>" class="bf-studioCard_preview" width="" height="" alt="">
        <h3 class="bf-studioCard_title"><?=$studio -> post_title?></h3>
        <p class="bf-studioCard_text"><?=get_field('short_address', $studio -> ID)?></p>

        <a href="<?=get_the_permalink($studio -> ID)?>" class="bf-button bf-studioCard_button">
            <span class="bf-button_text">Подробнее</span>
        </a>
    </li>
    <?php
        }
    ?>
</ul>