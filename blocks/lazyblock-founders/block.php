<div class="bf-founders">
    <div class="bf-founders_list">
    <?php
    foreach ($attributes['founders'] as $i => $founder) {
    ?>
        <div class="bf-founder<?= $i%2 !== 0 ? ' bf-founder__rev' : ''?>">
            <img src="<?=$founder['img']['url']?>" class="bf-founder_image" width="" height="" alt="">
            <div class="bf-founder_content">
                <h3 class="bf-founderName">
                    <?=$founder['name']?>
                </h3>
                <p class="bf-founderText">
                    <?=$founder['text']?>
                </p>
            </div>
        </div>
    <?php
    }
    ?>
    </div>

    <ul class="bf-classesSlider_dots bf-founders_dots">
        <?php
            foreach ($attributes['founders'] as $i => $founder) {
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