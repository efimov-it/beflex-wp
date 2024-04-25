<div class="bf-franchizeStepsWrapper">
    <div class="bf-franchizeSteps">
    <?php

    $tmp_dir = get_template_directory_uri();

    foreach ($attributes['steps'] as $i => $step) {
    ?>
        <div class="bf-franchizeSteps_step<?=$i === count($attributes['steps']) - 1 ? ' bf-franchizeSteps_step__last' : ''?>">
            <?php
            if ($i < count($attributes['steps']) - 1) {
            ?>
            <img src="<?=$tmp_dir?>/assets/imgs/step_bg.jpg" class="bf-franchizeStepImage" width="236" height="240" alt="">
            <p class="bf-franchizeStepNumber"><?=$i+1?></p>
            <?php
            }
            ?>

            <p class="bf-franchizeStepText">
                <?=$step['text']?>
            </p>
        </div>
    <?php
    }
    ?>
    </div>

    <button class="bf-button bf-franchizeStepsButton" type="button">
        <span class="bf-button_text">
            стать частью beflex
        </span>
    </button>
</div>