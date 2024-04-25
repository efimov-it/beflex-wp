<div class="bf-franchizeInfoCards">
    <div class="bf-franchizeInfoCards_list">
    <?php
    foreach ($attributes['cards'] as $i => $card) {
    ?>
        <div class="bf-franchizeInfoCard">
            <h3 class="bf-franchizeInfoCard_title">
                <?=$card['title']?>
            </h3>

            <p class="bf-franchizeInfoCard_text">
                <?=$card['text']?>
            </p>
        </div>
    <?php
    }
    ?>
    </div>
                
    <ul class="bf-classesSlider_dots bf-franchizeInfoCards_dots">
        <?php
            foreach ($attributes['cards'] as $i => $cards) {
                if ($i < count($attributes['cards']) - 2) {
        ?>
        <li
            class="bf-classesSliderDot<?= $i === 0 ? ' bf-classesSliderDot__active' : ''?>"
            data-index="<?=$i?>"
        ></li>
        <?php
                }
            }
        ?>
    </ul>
</div>