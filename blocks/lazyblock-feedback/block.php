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

        <?php
        if ($attributes['studio']) {
            $studiosSelectList = get_posts([
                'numberposts' => -1,
                'orderby' => 'post_title',
                'order' => 'ASC',
                'post_type' => 'studios',
                'post_status' => 'publish'
            ]);

            $current_id = get_the_ID();
        ?>
        <label class="bf-input bf-feedbackFormInput bf-input__select bf-modalFormInput">
            <select class="bf-inputSelect" name="studio" placeholder=" " >
                <?php
                foreach ($studiosSelectList as $i => $studio) {
                    $selectedText = $studio -> ID === $current_id ? $studio -> post_title . ' / ' . get_field('short_address', $studio -> ID) : $selectedText;    
                ?>
                <option value="<?=$studio -> ID?>"<?=$studio -> ID === $current_id ? " selected" : ""?>>
                    <?=$studio -> post_title . ' / ' . get_field('short_address', $studio -> ID)?>
                </option>
                <?php
                }
                ?>
            </select>
            <button type="button" class="bf-input_value">
                <span>
                    <?=$selectedText ? $selectedText : $studiosSelectList[0] -> post_title . ' / ' . get_field('short_address', $studiosSelectList[0] -> ID)?>
                </span>

                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="11" fill="none" viewBox="0 0 13 11">
                    <path stroke="#000" stroke-width="2" d="m11.5 1.25-5 7.5-5-7.5"/>
                </svg>
            </button>
            <div class="bf-inputSelectList">
                <?php
                foreach ($studiosSelectList as $i => $studio) { ?>
                <button type="button" class="bf-inputSelectItem" data-id="<?=$studio -> ID?>">
                    <?=$studio -> post_title . ' / ' . get_field('short_address', $studio -> ID)?>
                </button>
                <?php
                }
                ?>
            </div>
        </label>
        <?php
        }
        ?>
        
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