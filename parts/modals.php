<?php
    $tmp_dir = get_template_directory_uri();
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
                Оставьте свой номер телефона, и мы свяжемся с вами
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

    <!-- Записаться на пробное занятие -->
    <div class="bf-modalWrapper">
        <div class="bf-modal bf-modal__test">
            <img src="<?=$tmp_dir?>/assets/imgs/cross_modal.svg" class="bf-modal_close" width="50" height="50" alt="Закрыть" title="Закрыть">

            <h2 class="bf-modal_title">
                записаться на&nbsp;пробное занятие*
            </h2>
            <p class="bf-modal_text">
                *бесплатная тренировка только для новых гостей студии
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