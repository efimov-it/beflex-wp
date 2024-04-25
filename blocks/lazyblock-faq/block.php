<div class="bf-faq">
    <?php
    $tmp_dir = get_template_directory_uri();
    
    foreach ($attributes['questions'] as $key => $question) {
    ?>
    <div class="bf-faq_question bf-faqQuestion">
        <div class="bf-faqQuestion_header<?=$key === 0 ? ' bf-faqQuestion_header__open' : ''?>">
            <h3 class="bf-faqQuestionText"><?=$question['text']?></h3>
            <img src="<?=$tmp_dir?>/assets/imgs/cross.svg" class="bf-faqQuestionIcon" width="20" height="20" alt="">
        </div>
        <div class="bf-faqQuestion_answer">
            <?=$question['answer']?>
        </div>
    </div>
    <?php
    }
    
    ?>
</div>