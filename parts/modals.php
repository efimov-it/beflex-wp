<?php
    $tmp_dir = get_template_directory_uri();

    $studiosSelectList = get_posts([
        'numberposts' => -1,
        'orderby' => 'post_title',
        'order' => 'ASC',
        'post_type' => 'studios',
        'post_status' => 'publish'
    ]);

    $current_id = get_the_ID();
?>

<div class="bf-modals" style="display: none;">
    
    <div class="bf-modals_bg"></div>

    <!-- Обратный звонок -->
    <div class="bf-modalWrapper">
        <div class="bf-modal bf-modal__callback">
            <img src="<?=$tmp_dir?>/assets/imgs/cross_modal.svg" class="bf-modal_close" width="50" height="50" alt="Закрыть" title="Закрыть">

            <h2 class="bf-modal_title">
                ЗАКАЗАТЬ ЗВОНОК
            </h2>
            <p class="bf-modal_text">
                оставьте свой номер телефона, и мы свяжемся с вами
                в&nbsp;ближайшее время
            </p>

            <form action="" id="modal-callback" method="post" class="bf-modal_form">
                <label class="bf-input bf-modalFormInput">
                    <input class="bf-input_value" type="text" name="name" placeholder=" " required >
                    <p class="bf-input_placeholder">Имя*</p>
                </label>
                
                <label class="bf-input bf-modalFormInput">
                    <input class="bf-input_value" type="text" name="surname" placeholder=" " >
                    <p class="bf-input_placeholder">Фамилия</p>
                </label>
                
                <label class="bf-input bf-modalFormInput">
                    <input class="bf-input_value" type="tel" name="phone" placeholder=" " required >
                    <p class="bf-input_placeholder">Телефон*</p>
                </label>

                <label class="bf-input bf-input__select bf-modalFormInput">
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

                <label class="bf-checkBox bf-modalFormCheckBox">
                    <input class="bf-checkBox_value" name="privacy" type="checkbox" required >
                    <div class="bf-checkBox_text">
                        <p class="bf-checkBoxText">
                            Я согласен(-а) с условиями <a href="<?=esc_url(get_privacy_policy_url())?>" target="_blank">политики конфиденциальности</a>
                        </p>
                    </div>
                </label>

                <button class="bf-button bf-modalButton" type="submit">
                    <span class="bf-button_text">Жду звонка</span>
                </button>
            </form>
        </div>
    </div>

    <!-- Записаться на пробное занятие -->
    <div class="bf-modalWrapper">
        <div class="bf-modal bf-modal__test">
            <img src="<?=$tmp_dir?>/assets/imgs/cross_modal.svg" class="bf-modal_close" width="50" height="50" alt="Закрыть" title="Закрыть">

            
            <?

            $notes = [];

            if($id = get_the_ID()) {
                if (get_post_type( $id ) === 'studios') {
                    if (get_field('has_free_trial', $id) === 'true') {
                        $notes[] = 'бесплатная тренировка только для новых гостей студии';
                    }
                }
                else {
                    $notes[] = 'бесплатная тренировка только для новых гостей студии';
                    
                    $query = new WP_Query([
                        'post_type'      => 'studios',
                        'posts_per_page' => -1,
                        'post_status'    => 'publish',
                        'meta_query'     => [
                            [
                                'key'   => 'has_free_trial',
                                'value' => 'false',
                                'compare' => '='
                            ]
                        ]
                    ]);

                    $posts = $query -> posts;

                    if (count($posts) > 0) {
                        $studios_list = [];
                        foreach ($posts as $post) {
                            $studios_list[] = $post -> post_title . ' (' . get_field('short_address', $post -> ID) . ')';
                        }

                        $studios_list = implode(', ', $studios_list);

                        $notes[] = 'акция не распространяется на студи' . (count($posts) > 1 ? 'и: ' : 'ю ') . $studios_list;
                    }
                }
            }
            ?>

            <h2 class="bf-modal_title">
                записаться на&nbsp;пробное занятие<?=count($notes) > 0 ? '*' : ''?>
            </h2>
            <p class="bf-modal_text">
            <? foreach ($notes as $i => $note) { ?>
                <?=str_repeat('*', $i + 1) . $note . '<br>'?>
            <? } ?>
            </p>

            <form action="" id="modal-test" method="post" class="bf-modal_form">
                <label class="bf-input bf-modalFormInput">
                    <input class="bf-input_value" type="text" name="name" placeholder=" " required >
                    <p class="bf-input_placeholder">Имя*</p>
                </label>
                
                <label class="bf-input bf-modalFormInput">
                    <input class="bf-input_value" type="text" name="surname" placeholder=" " >
                    <p class="bf-input_placeholder">Фамилия</p>
                </label>
                
                <label class="bf-input bf-modalFormInput">
                    <input class="bf-input_value" type="tel" name="phone" placeholder=" " required >
                    <p class="bf-input_placeholder">Телефон*</p>
                </label>
                
                <label class="bf-input bf-input__select bf-modalFormInput">
                    <select class="bf-inputSelect" name="studio" placeholder=" " >
                        <?php
                        foreach ($studiosSelectList as $i => $studio) { ?>
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

                <label class="bf-checkBox bf-modalFormCheckBox">
                    <input class="bf-checkBox_value" name="privacy" type="checkbox" required >
                    <div class="bf-checkBox_text">
                        <p class="bf-checkBoxText">
                            Я согласен(-а) с условиями <a href="<?=esc_url(get_privacy_policy_url())?>" target="_blank">политики конфиденциальности</a>
                        </p>
                    </div>
                </label>

                <button class="bf-button bf-modalButton" type="submit">
                    <span class="bf-button_text">Жду звонка</span>
                </button>
            </form>
        </div>
    </div>

    <!-- Записаться на занятие -->
    <div class="bf-modalWrapper">
        <div class="bf-modal bf-modal__book">
            <img src="<?=$tmp_dir?>/assets/imgs/cross_modal.svg" class="bf-modal_close" width="50" height="50" alt="Закрыть" title="Закрыть">

            <h2 class="bf-modal_title">
                записаться на занятие
            </h2>

            <form action="" id="modal-book" method="post" class="bf-modal_form">
                <label class="bf-input bf-modalFormInput">
                    <input class="bf-input_value" type="text" name="name" placeholder=" " required >
                    <p class="bf-input_placeholder">Имя*</p>
                </label>
                
                <label class="bf-input bf-modalFormInput">
                    <input class="bf-input_value" type="text" name="surname" placeholder=" " >
                    <p class="bf-input_placeholder">Фамилия</p>
                </label>
                
                <label class="bf-input bf-modalFormInput">
                    <input class="bf-input_value" type="tel" name="phone" placeholder=" " required >
                    <p class="bf-input_placeholder">Телефон*</p>
                </label>

                <label class="bf-input bf-input__select bf-modalFormInput">
                    <select class="bf-inputSelect" name="studio" placeholder=" " >
                        <?php
                        foreach ($studiosSelectList as $i => $studio) { ?>
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

                <label class="bf-checkBox bf-modalFormCheckBox">
                    <input class="bf-checkBox_value" name="privacy" type="checkbox" required >
                    <div class="bf-checkBox_text">
                        <p class="bf-checkBoxText">
                            Я согласен(-а) с условиями <a href="<?=esc_url(get_privacy_policy_url())?>" target="_blank">политики конфиденциальности</a>
                        </p>
                    </div>
                </label>

                <button class="bf-button bf-modalButton" type="submit">
                    <span class="bf-button_text">Жду звонка</span>
                </button>
            </form>
        </div>
    </div>

    
<?php
    $post_type = get_post_type();
    
    if ($post_type === 'training_type') {
        $studios = get_posts([
            'numberposts' => -1,
            'orderby' => 'post_title',
            'order' => 'ASC',
            'post_type' => 'studios',
            'post_status' => 'publish',
            'meta_query' => [
                [
                    'key' => 'classes',
                    'value' => '"' . $id . '"',
                    'compare' => 'LIKE',
                    'type' => 'CHAR'
                ]
            ]
        ]);
    }
    else {
        $studios = get_posts([
            'numberposts' => -1,
            'orderby' => 'post_title',
            'order' => 'ASC',
            'post_type' => 'studios',
            'post_status' => 'publish'
        ]);
    }
?>
<!-- Выбрать студию -->
<div class="bf-modalWrapper">
    <div class="bf-modal bf-modal__studios"<?=count($studios) === 1 ? ' data-redirect="' . get_the_permalink($studios[0] -> ID) . '#raspisanije"' : ''?>>
        <img src="<?=$tmp_dir?>/assets/imgs/cross_modal.svg" class="bf-modal_close" width="50" height="50" alt="Закрыть" title="Закрыть">
        
        <h2 class="bf-modal_title">
            Выберите свою студию
        </h2>

        <div class="bf-modalList">
        <?php
        foreach ($studios as $i => $studio) {
        ?>
            <div class="bf-modalList_item">
                <h3 class="bf-modalListItemTitle"><?=$studio -> post_title?></h3>
                <p class="bf-modalListItemText"><?=get_field('short_address', $studio -> ID)?></p>
                <a class="bf-modalListItemLink" href="<?=get_the_permalink($studio -> ID)?>#raspisanije"></a>
            </div>
        <?php
        }
        ?>
        </div>
    </div>
</div>

    
<?php
    $whatsapp = get_theme_mod('wa_number');
    $telegram = get_theme_mod('tg_link');

    $unic_tg = [];
    $unic_wa = [];

    if (strpos($_SERVER['REQUEST_URI'], '/studiya/') === 0) {
        $whatsapp_tmp = get_field('whatsapp', get_the_ID());
        $telegram_tmp = get_field('telegram', get_the_ID());

        if ($whatsapp_tmp) $whatsapp = $whatsapp_tmp;
        if ($telegram_tmp) $telegram = $telegram_tmp;

        $studios = [1];
    }
    else {
        $studios_tmp = get_posts([
            'numberposts' => -1,
            'orderby' => 'post_title',
            'order' => 'ASC',
            'post_type' => 'studios',
            'post_status' => 'publish'
        ]);

        $studios = [];

        foreach ($studios_tmp as $i => $studio) {
            $id_tmp = $studio -> ID;

            $tmp_wa = get_field('whatsapp', $id_tmp);
            $tmp_tg = get_field('telegram', $id_tmp);

            if ($tmp_wa)
                if (!in_array($tmp_wa, $unic_wa)) $unic_wa[] = $tmp_wa;

            if ($tmp_tg)
                if (!in_array($tmp_tg, $unic_tg)) $unic_tg[] = $tmp_tg;

            $studios[] = [
                'title'   => $studio -> post_title,
                'address' => get_field('short_address', $id_tmp),
                'wa'      => $tmp_wa ? $tmp_wa : $whatsapp,
                'tg'      => $tmp_tg ? $tmp_tg : $telegram
            ];
        }
    }
?>
<!-- Выбрать студию для связи в WhatsApp -->
<div class="bf-modalWrapper">
    <div class="bf-modal bf-modal__whatsapp"<?=count($unic_wa) === 0 ? ' data-redirect="https://wa.me/' . $whatsapp . '"' : ''?>>
    <?php
    if (count($studios) > 1 && count($unic_wa) > 0) {
    ?>
        <img src="<?=$tmp_dir?>/assets/imgs/cross_modal.svg" class="bf-modal_close" width="50" height="50" alt="Закрыть" title="Закрыть">
        
        <h2 class="bf-modal_title">
            Выберите студию для связи в WhatsApp
        </h2>

        <div class="bf-modalList">
        <?php
        foreach ($studios as $i => $studio) {
        ?>
            <div class="bf-modalList_item">
                <h3 class="bf-modalListItemTitle"><?=$studio['title']?></h3>
                <p class="bf-modalListItemText"><?=$studio['address']?></p>
                <a class="bf-modalListItemLink" href="https://wa.me/<?=$studio['wa']?>" target="_blank" rel="noopener noreferrer"></a>
            </div>
        <?php
        }
        ?>
        </div>
    <?
    }
    ?>
    </div>
</div>
<!-- Выбрать студию для связи в Telegram -->
<div class="bf-modalWrapper">
    <div class="bf-modal bf-modal__telegram"<?=count($unic_tg) === 0 ? ' data-redirect="https://t.me/' . $telegram . '"' : ''?>>
    <?php
    if (count($studios) > 1 && count($unic_tg) > 0) {
    ?>
        <img src="<?=$tmp_dir?>/assets/imgs/cross_modal.svg" class="bf-modal_close" width="50" height="50" alt="Закрыть" title="Закрыть">
        
        <h2 class="bf-modal_title">
            Выберите студию для связи в Telegram
        </h2>

        <div class="bf-modalList">
        <?php
        foreach ($studios as $i => $studio) {
        ?>
            <div class="bf-modalList_item">
                <h3 class="bf-modalListItemTitle"><?=$studio['title']?></h3>
                <p class="bf-modalListItemText"><?=$studio['address']?></p>
                <a class="bf-modalListItemLink" href="https://t.me/<?=$studio['tg']?>" target="_blank" rel="noopener noreferrer"></a>
            </div>
        <?php
        }
        ?>
        </div>
    <?
    }
    ?>
    </div>
</div>

    <!-- Юридическая информация -->
    <div class="bf-modalWrapper">
        <div class="bf-modal bf-modal__legal">
            <img src="<?=$tmp_dir?>/assets/imgs/cross_modal.svg" class="bf-modal_close" width="50" height="50" alt="Закрыть" title="Закрыть">
            
            <p class="bf-modalLegal_text">
                © Все права защищены, 2021&nbsp;‑&nbsp;<?=date('Y', time())?>
            </p>
            
            <p class="bf-modalLegal_text">
                Официальный сайт <?=get_theme_mod('legal_name')?>
            </p>
            
            <p class="bf-modalLegal_text">
                <strong>ИНН:</strong> <?=get_theme_mod('inn')?>
            </p>
            
            <p class="bf-modalLegal_text">
                <strong>ОГРНИП:</strong> <?=get_theme_mod('ogrnip')?>
            </p>
        </div>
    </div>

    <!-- Франшиза -->
    <div class="bf-modalWrapper">
        <div class="bf-modal bf-modal__franchize">
            <img src="<?=$tmp_dir?>/assets/imgs/cross_modal.svg" class="bf-modal_close" width="50" height="50" alt="Закрыть" title="Закрыть">

            <h2 class="bf-modal_title">
                консультация по открытию франшизы
            </h2>

            <p class="bf-modal_text">
                заполните форму и наш администратор свяжется с вами
            </p>

            <form action="" id="modal-franchize" method="post" class="bf-modal_form">
                <label class="bf-input bf-modalFormInput">
                    <input class="bf-input_value" type="text" name="name" placeholder=" " required >
                    <p class="bf-input_placeholder">Имя*</p>
                </label>
                
                <label class="bf-input bf-modalFormInput">
                    <input class="bf-input_value" type="tel" name="phone" placeholder=" " required >
                    <p class="bf-input_placeholder">Телефон*</p>
                </label>
                
                <label class="bf-input bf-modalFormInput">
                    <input class="bf-input_value" type="email" name="email" placeholder=" " >
                    <p class="bf-input_placeholder">Эл. почта</p>
                </label>

                <label class="bf-checkBox bf-modalFormCheckBox">
                    <input class="bf-checkBox_value" name="privacy" type="checkbox" required >
                    <div class="bf-checkBox_text">
                        <p class="bf-checkBoxText">
                            Я согласен(-а) с условиями <a href="<?=esc_url(get_privacy_policy_url())?>" target="_blank">политики конфиденциальности</a>
                        </p>
                    </div>
                </label>

                <button class="bf-button bf-modalButton" type="submit">
                    <span class="bf-button_text">Жду звонка</span>
                </button>
            </form>
        </div>
    </div>

    <!-- Курс -->
    <div class="bf-modalWrapper">
        <div class="bf-modal bf-modal__cource">
            <img src="<?=$tmp_dir?>/assets/imgs/cross_modal.svg" class="bf-modal_close" width="50" height="50" alt="Закрыть" title="Закрыть">

            <h2 class="bf-modal_title">
                Получите доступ к&nbsp;онлайн&#8209;курсу
            </h2>

            <p class="bf-modal_text">
                заполните форму и наш администратор свяжется с вами
            </p>

            <form action="" id="modal-cource" method="post" class="bf-modal_form">
                <label class="bf-input bf-modalFormInput">
                    <input class="bf-input_value" type="text" name="name" placeholder=" " required >
                    <p class="bf-input_placeholder">Имя*</p>
                </label>
                
                <label class="bf-input bf-modalFormInput">
                    <input class="bf-input_value" type="text" name="surname" placeholder=" " >
                    <p class="bf-input_placeholder">Фамилия</p>
                </label>
                
                <label class="bf-input bf-modalFormInput">
                    <input class="bf-input_value" type="tel" name="phone" placeholder=" " required >
                    <p class="bf-input_placeholder">Телефон*</p>
                </label>
                
                <label class="bf-input bf-modalFormInput">
                    <input class="bf-input_value" type="email" name="email" placeholder=" " >
                    <p class="bf-input_placeholder">Эл. почта</p>
                </label>

                <label class="bf-checkBox bf-modalFormCheckBox">
                    <input class="bf-checkBox_value" name="privacy" type="checkbox" required >
                    <div class="bf-checkBox_text">
                        <p class="bf-checkBoxText">
                            Я согласен(-а) с условиями <a href="<?=esc_url(get_privacy_policy_url())?>" target="_blank">политики конфиденциальности</a>
                        </p>
                    </div>
                </label>

                <button class="bf-button bf-modalButton" type="submit">
                    <span class="bf-button_text">Жду звонка</span>
                </button>
            </form>
        </div>
    </div>

    <!-- Ответ по форме -->
    <div class="bf-modalWrapper">
        <div class="bf-modal bf-modal__feedback">
            <img src="<?=$tmp_dir?>/assets/imgs/cross_modal.svg" class="bf-modal_close" width="50" height="50" alt="Закрыть" title="Закрыть">

            <img class="bf-modalDoneImg" src="<?=$tmp_dir?>/assets/imgs/modal_done_img.svg" width="553" height="580" alt="">
            <h2 class="bf-modalDoneText" class="">Спасибо!</h2>
        </div>
    </div>

    <!-- Ответ по форме - ошибка -->
    <div class="bf-modalWrapper">
        <div class="bf-modal bf-modal__error">
            <img src="<?=$tmp_dir?>/assets/imgs/cross_modal.svg" class="bf-modal_close" width="50" height="50" alt="Закрыть" title="Закрыть">

            <img class="bf-modalDoneImg" src="<?=$tmp_dir?>/assets/imgs/modal_done_img.svg" width="553" height="580" alt="">
            <h2 class="bf-modalDoneText" class="">Упс.. попробуйте ещё&nbsp;раз :(</h2>
        </div>
    </div>
</div>