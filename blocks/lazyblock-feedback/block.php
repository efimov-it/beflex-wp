<?php
$tmp_dir = get_template_directory_uri();
?>

<section class="bf-feedback">
    <?php
        if (isset($attributes['image'])) {
            if (isset($attributes['image']['url'])) {
                $bg = $attributes['image']['url'];
            }
        }
        
        if (!isset($bg)) {
            $bg = $tmp_dir . '/assets/imgs/feedback_bg.jpg';
        }
    ?>
    <img src="<?=$bg?>" class="bf-feedback_bg" width="1312" height="542" alt="">

    <h2 class="bf-feedback_title">
        <?=$attributes['title']?>
    </h2>
    
    <form action="" data-type="<?=$attributes['type']?>" method="post" class="bf-feedback_form">
        <label class="bf-input bf-feedbackFormInput">
            <input class="bf-input_value" type="text" name="name" placeholder=" " required >
            <p class="bf-input_placeholder">Имя*</p>
        </label>
        
        <label class="bf-input bf-feedbackFormInput">
            <input class="bf-input_value" type="tel" name="phone" placeholder=" " required >
            <p class="bf-input_placeholder">Телефон*</p>
        </label>
        
        <label class="bf-checkBox bf-feedbackFormCheckBox">
            <input class="bf-checkBox_value" name="privacy" type="checkbox" required >
            <div class="bf-checkBox_text">
                <p class="bf-checkBoxText">
                    Я согласен(-а) с условиями <a href="<?=esc_url(get_privacy_policy_url())?>" target="_blank">политики конфиденциальности</a>
                </p>
            </div>
        </label>

        <button class="bf-button bf-feedbackButton" type="submit">
            <span class="bf-button_text"><?=$attributes['button_text']?></span>
        </button>
    </form>
</section>