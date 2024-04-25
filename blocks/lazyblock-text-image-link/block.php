<section class="bf-til<?=$attributes['align'] === 'right' ? ' bf-til__right' : ''?><?=$attributes['margin-bottom'] ? ' bf-til__marginBottom' : ''?>">
    <div class="bf-til_content<?=$attributes['align'] === 'right' ? ' bf-til_content__right' : ''?>">
        <div class="bf-tilContent">    
            <p class="bf-tilText">
                <?=$attributes['text']?>
            </p>
            <?php
                if ($attributes['link']) {
            ?>
            <a
                href="<?=$attributes['link']?>"
                class="bf-button<?=$attributes['link-style'] === 'white' ? ' bf-button__white' : ''?> bf-tilLink"
                <?=$attributes['target'] ? 'target="_blank" rel="noopener noreferrer"' : ''?>
            >
                <span class="bf-button_text">
                    <?=$attributes['link-text'] ? $attributes['link-text'] : 'Подробнее'?>
                </span>
            </a>
            <?php
                }
            ?>
        </div>
    </div>
    <div class="bf-til_img">
        <img src="<?=$attributes['img']['url']?>" class="bf-tilImg" width="584" height="851" alt="">
    </div>
</section>