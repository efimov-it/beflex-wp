<?php

add_filter('manage_abonement_posts_columns', function ($columns) {
    array_splice($columns, 1, 1, 'Абонемент');
    array_splice($columns, 2, 0, 'Стоимость');
    return $columns;
});

add_action('manage_abonement_posts_custom_column', function ($column, $post_id) {
    $post = get_post($post_id);

    $studios = get_posts([
        'post_type'      => 'studios',
        'posts_per_page' => -1,
        'post__in'       => get_field('studios', $post_id)
    ]);

    $type = get_the_terms($post_id, 'abonement-type');

    if ($column == '0') {
    ?>
        <strong>
            <a class="row-title" href="http://beflex.local/wp-admin/post.php?post=<?=$post_id?>&action=edit" aria-label="(Изменить)">
                <?=$type[0] -> name?> |
                <?=$post -> post_title?><br>
                <?php
                    foreach ($studios as $key => $studio) {
                        if ($key === 0) echo '(';
                        echo $studio -> post_title;
                        if ($key === count($studios) - 1) echo ')';
                        else echo ', ';
                    }
                ?>
            </a>
        </strong>
    <?php
    }

    if ($column == '1') {
        echo number_format(get_field('price', $post_id), 2, ',', ' ') . ' ₽';
    }
}, 10, 2);