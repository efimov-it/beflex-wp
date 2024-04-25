<?php
    $tmp_dir = get_template_directory_uri();
?>

<div class="bf-aboutSlider">
    <div class="bf-aboutSlider_list">
        <?php
        foreach ($attributes['slides'] as $i => $slide) {
        ?>
        <div
            class="bf-aboutSlide<?=$i === 0 ? ' bf-aboutSlide__active' : ''?>"
            <?=$i > 0 ? 'style="display: none;"' : ''?>
        >
            <img src="<?=$slide['img']['url']?>" class="bf-aboutSlide_img" width="651" height="456" alt="">

            <div class="bf-aboutSlide_content">
                <?php
                if (trim($slide['title'])) {
                ?>
                <h3 class="bf-aboutSlideTitle<?=$slide['title-style'] === 'pink' ? ' bf-aboutSlideTitle__pink' : ''?>">
                    <?=$slide['title']?>
                </h3>
                <?php
                }
                ?>
                <p class="bf-aboutSlideText">
                    <?=$slide['text']?>
                </p>
                <img src="<?=$tmp_dir?>/assets/imgs/arrow_slider_2.svg" class="bf-aboutSlideArrow" data-i="<?=$i?>" width="104" height="28" alt="Далее" title="Далее">
            </div>
        </div>
        <?php
        }
        ?>
    </div>

    <div class="bf-aboutSlider_nav">
        <img src="<?=$tmp_dir?>/assets/imgs/arrow_slider_2.svg" class="bf-aboutSlideArrow bf-aboutSlideArrow__mob" width="104" height="28" alt="Далее" title="Далее">
        <ul class="bf-classesSlider_dots bf-aboutSliderDots">
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

</div>