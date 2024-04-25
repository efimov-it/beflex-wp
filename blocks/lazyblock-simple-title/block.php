<?php
$tmp_dir = get_template_directory_uri();

$id = get_the_ID();

$post_type = get_post_type($id);

if ($post_type === 'post') {
    $parent_page_link = home_url() . '/novosti/';
}
elseif ($post_type !== 'page') {
    $post_type = get_post_type_object($post_type);
    $parent_page_link = home_url() . '/' . $post_type -> rewrite['slug'] . '/';
}
else {
    $parent_page_id = wp_get_post_parent_id($id);
    
    if ($parent_page_id) {
        $parent_page_link = get_permalink($parent_page_id);
    }
    else {
        $parent_page_link = home_url();
    }
}

?>

<div class="bf-simpleTitle">
    <a href="<?=$parent_page_link?>" title="Вернуться назад" class="bf-simpleTitle_link">
        
        <span class="bf-simpleTitle_backText">Назад</span>

        <img src="<?=$tmp_dir?>/assets/imgs/arrow_back.svg" class="bf-simpleTitle_backIcon" width="40" height="40" alt="">
    </a>

    <h1 class="bf-simpleTitle_text">
        <?=get_the_title()?>
    </h1>
</div>