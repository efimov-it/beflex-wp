<?php
$tmp_dir = get_template_directory_uri();
?>

<div class="bf-uniqSlider">
    <div class="bf-uniqSlider_list">
    <?php
    $tmp_dir = get_template_directory_uri();
    foreach ($attributes['slides'] as $i => $slide) {
    ?>
        <?php
        if ($i%2 === 0) {
        ?>
            <div
                class="bf-uniqSliderGroup<?=$i === 0 ? ' bf-uniqSliderGroup__active' : ''?>"
                <?=$i > 0 ? 'style="display:none;"' : ''?>
            >
        <?php
        }
        ?>
        <div class="bf-uniqSliderGroup_slide">
            <img src="<?=$slide['img']['url']?>" class="bf-uniqSliderImage" width="" height="" alt="">
            <p class="bf-uniqSliderText"><?=$slide['text']?></p>
        </div>
        
        <?php
        if ($i%2 !== 0 || $i === count($attributes['slides']) - 1) {
        ?>
            </div>
        
        <?php
        }
        ?>
    <?php
    }
    ?>
    </div>

    <div class="bf-uniqSlider_control">
        <ul class="bf-classesSlider_dots bf-uniqSliderDots">
            <?php
            foreach ($attributes['slides'] as $i => $slide) {
            ?>
            <li
                class="bf-classesSliderDot<?= $i === 0 ? ' bf-classesSliderDot__active' : ''?><?=$i%2 !== 0 ? ' bf-uniqSliderDots__showMob' : ''?>"
                data-index="<?=$i?>"
            ></li>
            <?php
            }
            ?>
        </ul>
        <div class="bf-uniqSliderControls">
            <img src="<?=$tmp_dir?>/assets/imgs/arrow_slider_2.svg" class="bf-uniqSliderControls_button bf-uniqSliderControls_button__left" data-i="-1" width="104" height="28" alt="Назад" title="Назад">
            <img src="<?=$tmp_dir?>/assets/imgs/arrow_slider_2.svg" class="bf-uniqSliderControls_button" data-i="1" width="104" height="28" alt="Далее" title="Далее">
        </div>
    </div>
</div>