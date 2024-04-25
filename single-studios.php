<?php
$tmp_dir = get_template_directory_uri();
$home_page = home_url();

$id = get_the_ID();

get_header();

$preview = get_the_post_thumbnail_url($id, 'full');
if (!$preview) $preview = $tmp_dir . "/assets/imgs/no_photo.jpg";

?>

    <main class="bf-main bf-main__studio">
        <section class="bf-studioBanner">
            <?php
            $video = get_field('video', $id);
            if ($video) {
            ?>
            <video class="bf-studioBanner_video" autoplay muted playsinline loop id="video-background" width="1440" height="700">
                <source src="<?=$video?>" type="video/mp4">
            </video>
            <?php
            }
            else {
            ?>
            <img src="<?=$preview?>" class="bf-studioBanner_image" width="1440" height="700" alt="">
            <?php
            }
            ?>
            <img src="<?=$tmp_dir?>/assets/imgs/banners_shape.svg" class="bf-studioBanner_shape" width="655" height="260" alt="">
            
            <div class="bf-studioBanner_content">
                <h1 class="bf-studioBanner_title">
                    <span class="bf-studioBanner_title__black">Студия</span> <?=the_title()?>
                </h1>
                <button class="bf-button bf-studioBanner_button" type="button">
                    <span class="bf-button_text">
                        получить бесплатную<br>
                        тренировку
                    </span>
                </button>
            </div>
        </section>

        <section class="bf-studioNavigation">
            <?php
                $links = [
                    'napravlenija'   => 'Направления',
                    'preimuschestva' => 'Преимущества',
                    'abonementi'     => 'Абонементы',
                    'akcii'          => 'Акции',
                    'nasha-komanda'  => 'Наша команда',
                    'raspisanije'    => 'Расписание'
                ];

                foreach ($links as $link => $text) {
                ?>
                <a href="#<?=$link?>" data-link="#<?=$link?>" class="bf-button bf-button__outline bf-achorLink" type="button">
                    <span class="bf-button_text"><?=$text?></span>
                </a>
                <?php
                }
            ?>
        </section>

        <?php

            $classes = get_lazy_block('classes-slider', [
                'select' => 'studios',
                'count' => -1
            ]);

            $attributes = [
                'title' => 'направления',
                'align' => null,
                'link' => null,
                'id' => 'napravlenija'
            ];
            echo get_lazy_block('section', $attributes, $classes);

            
            // Advantages

            ob_start();

            $advantages = get_field('advantages', $id);

            ?>
                <div class="bf-studioAdvantages">
                    <div class="bf-studioAdvantages_list">
                    <?php
                        foreach ($advantages as $i => $advantage) {
                            $preview = get_the_post_thumbnail_url($advantage -> ID, 'large');
                            if (!$preview) $preview = $tmp_dir . "/assets/imgs/no_photo.jpg";
                        ?>
                        <div
                            class="bf-studioAdvantage<?= $i === 0 ? ' bf-studioAdvantage__active' : ''?>"
                            <?= $i > 0 ? 'style="display: none;"' : ''?>
                        >
                            <img src="<?=$preview?>" class="bf-studioAdvantage_image" width="" height="" alt="">
                            <div class="bf-studioAdvantage_content">
                                <h3 class="bf-studioAdvantageText"><?=$advantage -> post_title?></h3>
                                <img src="<?=$tmp_dir?>/assets/imgs/arrow_slider_2.svg" class="bf-studioAdvantageButton" width="" height="" alt="Далее" title="Далее">
                            </div>
                        </div>
                        <?php
                        }
                    ?>
                    </div>
                    <ul class="bf-classesSlider_dots bf-studioAdvantages_dots">
                        <?php
                        foreach ($advantages as $i => $advantage) {
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
            <?php

            $advantages = ob_get_clean();

            $attributes = [
                'title' => 'преимущества',
                'align' => null,
                'link' => null,
                'id' => 'preimuschestva'
            ];
            echo get_lazy_block('section', $attributes, $advantages);


            // Abonements

            $abonements = get_posts([
                'post_type' => 'abonement',
                'post_status' => 'publish',
                'numberposts' => -1,
                'meta_key'    => 'price',
                'orderby'     => 'meta_value_num',
                'order'       => 'ASC',
                'meta_query'  => [
                    [
                        'key'     => 'studios',
                        'value'   => '"' . $id . '"',
                        'compare' => 'LIKE',
                        'type'    => 'CHAR'
                    ]
                ]
            ]);

            $abonementsTypes = [];

            foreach ($abonements as $key => $abonement) {
                $types = get_the_terms($abonement -> ID, 'abonement-type');

                foreach ($types as $type) {
                    $type_id = $type -> term_id;
                    if (isset($abonementsTypes[$type_id])) {
                        $abonementsTypes[$type_id]['abonements'][] = $abonement;
                    }
                    else {
                        $abonementsTypes[$type_id] = [
                            'name'       => $type -> name,
                            'abonements' => [$abonement]
                        ];
                    }
                }
            }

            $abonementsTypesString = "
                <div class='bf-studioAb'>
                    <div class='bf-studioAb_types'>
            ";
            $abonementsString = "
                <div class='bf-studioAb_items'>
            ";
            
            $i = 0;

            foreach ($abonementsTypes as $type_id => $type) {

                $abonementsTypesString .= "
                    <button class='bf-button" . ($i > 0 ? ' bf-button__outline' : '') . " bf-studioAbType' type='button' data-type='$type_id'>
                        <span class='bf-button_text'>" . $type['name'] . "</span>
                    </button>
                ";

                $abonementsString .= "
                    <div class='bf-studioAbPage" . ($i === 0 ? ' bf-studioAbPage__shown' : '') . "' style='" . ($i > 0 ? 'display: none;' : '') . "' id='abonementPage_$type_id'>
                ";

                foreach ($type['abonements'] as $abonement) {
                    $title = $abonement -> post_title;
                    $price = number_format(get_field('price', $abonement -> ID), 0, ',', ' ');
                    $abonementsString .= "
                        <div class='bf-studioAbItem'>
                            <h3 class='bf-studioAbItem_title'>$title</h3>
                            <p class='bf-studioAbItem_price'>
                                <span class='bf-studioAbItemPrice'>
                                    $price ₽
                                </span>
                            </p>
                        </div>
                    ";
                }

                $abonementsString .= "
                    </div>
                ";
            
                $i++;
            }

            $abonementsString .= "
                </div>
            ";

            $abonementsTypesString .= "
                    </div>
                    $abonementsString
                </div>
            ";

            $attributes = [
                'title' => 'абонементы',
                'align' => null,
                'link' => null,
                'id' => 'abonementi'
            ];
            echo get_lazy_block('section', $attributes, $abonementsTypesString);

            
            // Actions

            // $attributes = [
            //     'title' => 'акции',
            //     'align' => null,
            //     'link' => null,
            //     'id' => 'akcii'
            // ];
            // echo get_lazy_block('section', $attributes, '');

            
            // Team

            $couchs = get_field('couchs', $id);

            ob_start();

            ?>
            <div class="bf-studioCouchs">
                <p class="bf-studioCouchs_text">
                    <?=get_field('couchs_text', $id)?>
                </p>
                <div class="bf-studioCouchs_list">
            <?php
            foreach ($couchs as $i => $couch) {
                $preview = get_the_post_thumbnail_url($couch -> ID, 'large');
                if (!$preview) $preview = $tmp_dir . "/assets/imgs/no_photo.jpg";
                ?>
                    <div class="bf-studioCouch" data-couch_id="<?=$couch -> ID?>">
                        <img src="<?=$preview?>" class="bf-studioCouch_image" width="322" height="348" alt="Фото тренера: <?=$couch -> post_title?>">
                        <h3 class="bf-studioCouch_name"><?=$couch -> post_title?></h2>
                        <p class="bf-studioCouch_classes">
                            <?=get_field('classes', $couch -> ID)?>
                        </p>
                    </div>
                <?php
            }

            ?>
                </div>

                <div class="bf-studioCouchs_buttonWrapper">
                    <img src="<?=$tmp_dir?>/assets/imgs/arrow_slider_2.svg" class="bf-studioCouchsButton bf-studioCouchsButton__right" width="104" height="28" alt="Далее" title="Далее">
                    <img src="<?=$tmp_dir?>/assets/imgs/arrow_slider_2.svg" class="bf-studioCouchsButton" width="104" height="28" alt="Далее" title="Далее">
                </div>
                
                <ul class="bf-classesSlider_dots bf-studioCouchs_dots">
                    <?php
                        foreach ($couchs as $i => $couch) {
                            if ($i < count($couchs) - 2) {
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
            <?php

            $couchs_string = ob_get_clean();

            $attributes = [
                'title' => 'наша команда',
                'align' => null,
                'link' => null,
                'id' => 'nasha-komanda'
            ];
            echo get_lazy_block('section', $attributes, $couchs_string);

            
            // Shedule

            $sheduleString = "
            <script src='https://intgrf52c510dbbdb13bce79c409facc4491e.listokcrm.ru/wapi/script?onlyOffice=1&officeId=" . get_field('listok_id', $id) . "'></script>
            <div class='bf-studioShedule' id='listokWidgetContainer'></div>    
            ";

            $attributes = [
                'title' => 'расписание',
                'align' => null,
                'link' => null,
                'id' => 'raspisanije'
            ];
            echo get_lazy_block('section', $attributes, $sheduleString);

            
            // FAQs

            $questions = get_field('questions', $id);

            if ($questions) {

                $attributes = [
                    'questions' => []
                ];

                foreach ($questions as $question) {
                    $attributes['questions'][] = [
                        'text' => $question -> post_title,
                        'answer' => get_field('answer', $question -> ID)
                    ];
                }
                $faq =  get_lazy_block('faq', $attributes);

                $attributes = [
                    'title' => 'вопрос ответ',
                    'align' => null,
                    'link' => null,
                    'id' => 'vopros-otvet'
                ];
                echo get_lazy_block('section', $attributes, $faq);
            }

            echo get_lazy_block('feedback', [
                'title' => 'НАЧНИ СВОЕ ПРЕОБРАЖЕНИЕ<br>УЖЕ СЕЙЧАС!',
                'button_text' => 'Записаться на тренировку',
                'type' => 'Пробное занятие'
            ], '');

            echo get_lazy_block('contacts', [], '');
        ?>
    </main>

    

    <div class="bf-studioCouchs_modals" style="display: none;">
        <div class="bf-studioCouchsModalBG"></div>
    <?php
        foreach ($couchs as $i => $couch) {
            $preview = get_the_post_thumbnail_url($couch -> ID, 'large');
            if (!$preview) $preview = $tmp_dir . "/assets/imgs/no_photo.jpg";
    ?>
        <div class="bf-studioCouchsModal" id="couchModal<?=$couch -> ID?>">
            <div class="bf-studioCouchsModal_firstBlock">
                <img src="<?=$preview?>" class="bf-studioCouchsModal_image" width="322" height="433" alt="">
                <div class="bf-studioCouchsModal_content bf-studioCouchsModalContent">
                    <h3 class="bf-studioCouchsModalContent_name"><?=$couch -> post_title?></h3>
                    <p class="bf-studioCouchsModalContent_classes">
                        <?=get_field('classes', $couch -> ID)?>
                    </p>

                    <h4 class="bf-studioCouchsModalContent_header">О тренере:</h4>
                    <div class="bf-studioCouchsModalContent_text">
                        <?=get_field('education', $couch -> ID)?>
                    </div>
                </div>
            </div>
            <?php
                $couch_edu = get_field('sertificats', $couch -> ID);
                if ($couch_edu) {
            ?>
            <h4 class="bf-studioCouchsModalContent_header">Образование и сертификаты:</h4>
            <div class="bf-studioCouchsModalContent_text"><?=$couch_edu?></div>
            <?php
                }
            ?>

            <img src="<?=$tmp_dir?>/assets/imgs/cross_modal.svg" class="bf-studioCouchsModal_close" width="50" height="50" alt="Закрыть" title="Закрыть">
        </div>
    <?php
        }
    ?>
    </div>
<?php
get_footer();
?>