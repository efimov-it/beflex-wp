<div class="bf-franchizeAdvantages">
    <?php
    if ($attributes['text']) {
    ?>
    <p class="bf-franchizeAdvantages_text">
        <?=$attributes['text']?>
    </p>
    <?php
    }
    ?>

    <div class="bf-franchizeAdvantages_list">
    <?php
    foreach ($attributes['advantages'] as $i => $advantage) {
    ?>
        <div class="bf-franchizeAdvantage">
            <img src="<?=$advantage['img']['url']?>" class="bf-franchizeAdvantage_img" width="180" height="132" alt="">
            <h3 class="bf-franchizeAdvantage_title"><?=$advantage['title']?></h3>
            <p class="bf-franchizeAdvantage_text"><?=$advantage['text']?></p>
        </div>
    <?php
    }
    ?>
    </div>
</div>