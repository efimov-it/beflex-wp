<?php
$tmp_dir = get_template_directory_uri();
?>

<div class="bf-franchizePlans">
    <div class="bf-franchizePlans_list">
    <?php
    foreach ($attributes['plans'] as $i => $plan) {
    ?>
        <div class="bf-franchizePlan">
            <div class="bf-franchizePlan_num">
                <img src="<?=$tmp_dir?>/assets/imgs/plans_number.svg" class="bf-franchizePlanNumBG" width="95" height="88" alt="">
                <?=$i+1?>
            </div>

            <h3 class="bf-franchizePlan_name">
                <?=$plan['name']?>
            </h3>

            <div class="bf-franchizePlan_description">
                <?=$plan['description']?>
            </div>

            <h3 class="bf-franchizePlan_servicesTitle">
                Услуги
            </h3>

            <div class="bf-franchizePlan_services">
                <?=$plan['services']?>
            </div>

            <button class="bf-button bf-franchizePlan_button" type="button">
                <span class="bf-button_text">
                    Открыть франшизу
                </span>
            </button>
        </div>
    <?php
    }
    ?>
    </div>
                
    <ul class="bf-classesSlider_dots bf-franchizePlans_dots">
        <?php
            foreach ($attributes['plans'] as $i => $couch) {
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