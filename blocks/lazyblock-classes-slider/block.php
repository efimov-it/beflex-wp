<?php

$tmp_dir = get_template_directory_uri();
$home_page = home_url();

$id = get_the_ID();
$post_type = get_post_type($id);

$select = $attributes['select'];
$count  = $attributes['count'];

if ($post_type === 'studios') {
    $classes = get_field('classes', $id);
}
else {
    $query = [
        'post_type'      => 'training_type',
        'posts_per_page' => $count,
        'orderby'        => $select === 'random' ? 'rand' : 'title',
        'order'          => 'ASC'
    ];

    $classes = get_posts($query);
}

?>

<div class="bf-classesSlider">

    <div class="bf-classesSlider_track">
<?php
foreach ($classes as $i => $class) {
    $preview = get_the_post_thumbnail_url($class -> ID, 'large');
    if (!$preview) $preview = $tmp_dir . "/assets/imgs/no_photo.jpg";

    if ($i%6 === 0) {
?>
        <div
            class="bf-classesSlide<?=intval($i / 6) === 0 ? ' bf-classesSlide__active' : ''?>"
            style="<?=ceil($i / 6) > 0 ? 'display: none' : ''?>"
        >
            <div class="bf-classesSlide_half">
<?php
    }
    if ($i%6 === 3) {
?>
            </div>
            <div class="bf-classesSlide_half">
<?php
    }
?>
                <div class="bf-classesSliderCard">
                    <a href="<?=$home_page . '/napravlenija/' . $class -> post_name?>" class="bf-classesSliderCard_link"></a>
                    <img src="<?=esc_url($preview)?>" class="bf-classesSliderCard_image" width="320" height="320" alt="">
                    <h3 class="bf-classesSliderCard_title"><?=$class -> post_title?></h3>
                </div>
<?php

    if ($i%6 === 5 || $i === count($classes) - 1) {
?>
            </div>
        </div>
<?php
    }
}
?>
    </div>

    <button class="bf-classesSlider_button bf-classesSlider_button__back" type="button" data-event="prev" title="Назад">
        <img src="<?=$tmp_dir?>/assets/imgs/arrow_slider.svg" class="bf-classesSlider_buttonImg" width="104" height="30" alt="Назад">
    </button>

    <button class="bf-classesSlider_button" type="button" data-event="next" title="Вперёд">
        <img src="<?=$tmp_dir?>/assets/imgs/arrow_slider.svg" class="bf-classesSlider_buttonImg" width="104" height="30" alt="Вперёд">
    </button>

    <div class="bf-classesSlider_dots">
        <?php
        foreach ($classes as $i => $class) {
            if (count($classes) - 2 > $i || $i%6 === 0) {
        ?>
        <button
            class="bf-classesSliderDot<?=$i === 0 ? ' bf-classesSliderDot__active' : ''?><?=$i%6 !== 0 ? ' bf-classesSliderDot__hideOnDesk' : '' ?>"
            type="button"></button>
        <?php
            }
        }
        ?>
    </div>
</div>