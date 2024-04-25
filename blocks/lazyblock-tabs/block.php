<?php

global $wp;

if (count($attributes['tabs']) > 1) {
    $current_url = home_url($wp->request);
?>
<section class="bf-tabsWrapper">
    <ul class="bf-tabs bf-contacts_tabs">
        <?php
            foreach ($attributes['tabs'] as $i => $tab) {
                $compare_url = home_url(trim($tab['link'], '/'));
        ?>
        <li class="bf-tabs_tab <?= $current_url == $compare_url ? ' bf-tabs_tab__active' : ''?>">
            <a href="<?=$tab['link']?>" class="bf-tabLink">
                <?=$tab['text']?>
            </a>
        </li>
        <?php
            }
        ?>
    </ul>
</section>
<?php
}
?>