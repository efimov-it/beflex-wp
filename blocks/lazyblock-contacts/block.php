<?php
    $tmp_dir = get_template_directory_uri();

    $socials = get_posts([
        'post_type' => 'socials',
        'posts_per_page' => -1,
        'orderby' => 'ID',
        'order' => 'ASC'
    ]);

    $is_studio_page = get_post_type() === 'studios';

    if ($is_studio_page) {
        $studios = [get_post(get_the_ID())];
    }
    else {
        $studios = get_posts([
            'post_type' => 'studios',
            'posts_per_page' => -1,
            'orderby' => 'ID',
            'order' => 'ASC'
        ]);
    }

    $geo = [];

    foreach ($studios as $studio) {
        $geocoder_query = 'https://geocode-maps.yandex.ru/1.x/?apikey=' . YA_MAP_KEY . '&geocode=' . urlencode(get_field('address', $studio -> ID)) . '&format=json&lang=ru_RU';

        $request = curl_init($geocoder_query);

        curl_setopt($request, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($request, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($request, CURLOPT_REFERER, 'http://beflex.local');

        $response = curl_exec($request);

        if ($response) {
            $response = json_decode($response);

            if ($response -> response) {
                $response = $response -> response;
                if ($response -> GeoObjectCollection) {
                    $response = $response -> GeoObjectCollection;
                    if ($response -> featureMember) {
                        foreach ($response -> featureMember as $key => $data) {
                            if ($key === 0) {
                                $location = $data -> GeoObject -> Point -> pos;
                                $location = explode(' ', $location);
                                foreach ($location as $key => $value) {
                                    $location[$key] = floatval($value);
                                }
                                $geo[] = $location;
                            }
                            break;
                        }
                    }
                }
            }
            
        }
    }
    
    $cenetr_point = $geo[0] ? json_encode($geo[0]) : '[37.516413,55.933297]';
?>

<section class="bf-contacts">
    <?php
    if (count($studios) > 1) {
    ?>
    <ul class="bf-tabs bf-contacts_tabs">
        <?php
            foreach ($studios as $i => $studio) {
        ?>
        <li class="bf-tabs_tab <?= $i === 0 ? ' bf-tabs_tab__active' : ''?>"
            data-phone="<?=get_field('phone', $studio -> ID)?>"
            data-address="<?=get_field('address', $studio -> ID)?>"
            data-worktime="<?=get_field('work_time', $studio -> ID)?>"
            data-location='<?=$geo[$i] ? json_encode($geo[$i]) : null ?>'
        >
            <?=$studio -> post_title?>
        </li>
        <?php
            }
        ?>
    </ul>
    <?php
    }
    ?>

    <div class="bf-contacts_content">
        <?php
            $studio = $studios[0];
        ?>
        <div class="bf-contactsMap" data-init="<?=$cenetr_point?>"></div>
        <div class="bf-contactsBlock">
            <a href="tel:<?=get_field('phone', $studio -> ID)?>" class="bf-contactsBlock_text bf-contactsBlock_text__phone">
                <?=phone_format(get_field('phone', $studio -> ID))?>
            </a>

            <p class="bf-contactsBlock_text bf-contactsBlock_text__address">
                <?=get_field('address', $studio -> ID)?>
            </p>

            <p class="bf-contactsBlock_text bf-contactsBlock_text__workTime">
                <?=get_field('work_time', $studio -> ID)?>
            </p>

            <?php
                if (get_theme_mod('app_store_link') || get_theme_mod('google_play_link')) {
            ?>

            <h3 class="bf-contactsBlock_text bf-contactsBlock_text__app">
                Наше приложение
            </h3>

            <div class="bf-contactsBlock_apps">
                <?php
                    if (get_theme_mod('google_play_link')) {
                ?>
                <a href="<?=get_theme_mod('google_play_link')?>" target="_blank" class="bf-contactsAppLink">
                    <img src="<?=$tmp_dir?>/assets/imgs/google_play.svg" class="bf-contactsAppLink_img" width="124" height="36" alt="">
                </a>
                <?php
                    }
                ?>
                
                <?php
                    if (get_theme_mod('app_store_link')) {
                ?>
                <a href="<?=get_theme_mod('app_store_link')?>" target="_blank" class="bf-contactsAppLink">
                    <img src="<?=$tmp_dir?>/assets/imgs/app_store.svg" class="bf-contactsAppLink_img" width="124" height="36" alt="">
                </a>
                <?php
                    }
                ?>
            </div>

            <?php
                }
            ?>

            <ul class="bf-contactsBlock_socials">
                <?php
                foreach ($socials as $social) {
                ?>
                <li class="bf-contactsSocialLink">
                    <?php
                        $img = get_field('img', $social -> ID);

                        if (strpos($img, '.svg')) {
                            $vector = file_get_contents($img);
                            echo $vector;
                        }
                        else {?>
                    <img src="<?=$img?>" class="bf-contactsSocialLink_img" width="40" height="30" alt="<?=$social -> post_title?>">                        
                        <?php
                        }
                    ?>
                    <a href="<?=get_field('link', $social -> ID)?>" class="bf-contactsSocialLink_link" target="_blank" title="Перейти в соц сеть"></a>
                </li>
                <?php
                }
                ?>
            </ul>
        </div>
    </div>
</section>