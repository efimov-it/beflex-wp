<section class="bf-section" <?=isset($attributes['id'])? 'id="' . $attributes['id'] . '"' : ''?>>
    <h2 class="bf-section_title<?=$attributes['align'] === 'right' ? ' bf-section_title__right' : ''?>">
        <?=$attributes['title']?>
    </h2>

    <?php
    if ($attributes['link']) {
    ?>
    <a href="<?=$attributes['link']?>" class="bf-section_link">
        <?=$attributes['link-text'] ? $attributes['link-text'] : 'Подробнее'?>
    </a>
    <?php
    }
    ?>

    <div class="bf-section_content">
        <InnerBlocks />
    </div>
</section>