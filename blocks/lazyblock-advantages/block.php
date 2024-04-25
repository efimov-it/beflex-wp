<div class="bf-advantages">
    <?php
        if ($attributes['image']) {
    ?>
    <img src="<?=$attributes['image']['url']?>" class="bf-advantages_img" alt="" width="180" height="132">
    <?php
        }
    ?>
    <p class="bf-advantages_text">
        <?=$attributes['text']?>
    </p>
</div>