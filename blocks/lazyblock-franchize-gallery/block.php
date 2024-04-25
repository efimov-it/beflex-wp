<?php
$tmp_dir = get_template_directory_uri();
?>
<div class="bf-studioAdvantages">
    <div class="bf-studioAdvantages_list">
    <?php
        foreach ($attributes['slides'] as $i => $slide) {
        ?>
        <div
            class="bf-studioAdvantage<?= $i === 0 ? ' bf-studioAdvantage__active' : ''?>"
            <?= $i > 0 ? 'style="display: none;"' : ''?>
        >
            <img src="<?=$slide['img']['url']?>" class="bf-studioAdvantage_image" width="" height="" alt="">
            <div class="bf-studioAdvantage_content">
                <h3 class="bf-studioAdvantageText"><?=$slide['text']?></h3>
                <img src="<?=$tmp_dir?>/assets/imgs/arrow_slider_2.svg" class="bf-studioAdvantageButton" width="" height="" alt="Далее" title="Далее">
            </div>
        </div>
        <?php
        }
    ?>
    </div>
    <ul class="bf-classesSlider_dots bf-studioAdvantages_dots">
        <?php
        foreach ($attributes['slides'] as $i => $slide) {
        ?>
        <li
            class="bf-classesSliderDot<?= $i === 0 ? ' bf-classesSliderDot__active' : ''?>"
            data-index="<?=$i?>"
        ></li>
        <?php
        }
        ?>
    </ul>
</div>