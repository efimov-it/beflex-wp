<?php
$tmp_dir = get_template_directory_uri();

$id = get_the_ID();

$diff_level = get_field('dif_level', $id);

get_header();

$preview = get_the_post_thumbnail_url($id, 'large');

if (!$preview) $preview = $tmp_dir . "/assets/imgs/no_photo.jpg";

?>

    <main class="bf-main bf-main__class">
        <?=get_lazy_block('simple-title')?>

        <div class="bf-classDif">
            
            <p class="bf-classDif_text">
                уровень сложности
            </p>

            <div class="bf-classDif_level">
            <?php
                for ($i=0; $i < 5; $i++) { 
            ?>
                <svg class="bf-classDifStar<?=$i < $diff_level ? ' bf-classDifStar__active' : '' ?>" width="37" height="35" viewBox="0 0 37 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.7458 1.89522C17.4652 0.365658 19.6676 0.365657 20.387 1.89522L24.2096 10.0224C24.5021 10.6442 25.0993 11.0726 25.7887 11.1551L34.7982 12.2333C36.4938 12.4362 37.1743 14.5043 35.9234 15.6525L29.2763 21.7535C28.7677 22.2203 28.5396 22.9135 28.6732 23.5864L30.4188 32.3798C30.7473 34.0348 28.9656 35.313 27.473 34.493L19.5423 30.1365C18.9355 29.8032 18.1973 29.8032 17.5905 30.1365L9.65981 34.493C8.16723 35.313 6.38551 34.0348 6.71403 32.3798L8.45964 23.5864C8.5932 22.9135 8.36508 22.2203 7.85648 21.7535L1.20946 15.6525C-0.0415366 14.5043 0.639021 12.4362 2.33464 12.2333L11.3442 11.1551C12.0335 11.0726 12.6307 10.6442 12.9232 10.0224L16.7458 1.89522Z" fill="#D9D9D9"/>
                </svg>
            <?php
                }
            ?>
            </div>
        </div>

        <div class="bf-classInfo">
            <img src="<?=esc_url($preview)?>" class="bf-classInfo_img" width="440" height="440" alt="<?=get_the_title()?>">
            
            <div class="bf-classInfo_content">
                <div class="bf-classInfoContent">
                    <div class="bf-classInfoContent_wrapper">
                        <?=get_field('description', $id)?>
                    </div>
                    <?php
                    if (true) {
                    ?>
                    <p class="bf-classInfoContent_showMore" id="">
                        Подробнее
                    </p>
                    <?php
                    }
                    ?>
                </div>

                <div class="bf-classInfoActions">
                    <button class="bf-button bf-classInfoActions_button">
                        <span class="bf-button_text">
                            Записаться
                        </span>
                    </button>
                    <a href="#shedule" class="bf-button bf-button__outline bf-classInfoActions_button">
                        <span class="bf-button_text">
                            Узнать расписание
                        </span>
                    </a>
                </div>
            </div>
        </div>
        
        <?php

            $studios = get_lazy_block('studios');

            $attributes = [
                'title' => 'cтудии',
                'align' => null,
                'link' => null
            ];
            $studiosWrapper = get_lazy_block('section', $attributes, $studios);
            
            echo $studiosWrapper;

            echo get_lazy_block('feedback', [
                'title' => 'НАЧНИ СВОЕ ПРЕОБРАЖЕНИЕ<br>УЖЕ СЕЙЧАС!',
                'button_text' => 'Записаться на тренировку',
                'type' => 'Пробное занятие'
            ], '');
            
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
                    'link' => null
                ];
                $faqWrapper =  get_lazy_block('section', $attributes, $faq);
                
                echo $faqWrapper;
            }
        ?>
    </main>

<?php
get_footer();
?>