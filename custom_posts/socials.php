<?php

add_filter('manage_socials_posts_columns', function ($columns) {
    // var_dump($columns);
    $tmp = [];
    $tmp['cb'] = $columns[0];
    $tmp['image'] = 'Иконка';
    $tmp['title'] = 'Соц. сеть';
    $tmp['link']   = 'Ссылка';
    return $tmp;
});

add_action('manage_socials_posts_custom_column', function ($column, $post_id) {

    echo "
        <style>
            .column-image {
                width: 100px;
            }
            .column-title {
                width: 180px;
            }
        </style>
    ";

    if ($column === 'image') {
        echo "
            <div style=\"
                background: #FCFF79;
                border-radius: 12px;
                object-fit: contain;
                width: 64px;
                height: 64px;
                display: flex;
                align-items: center;
                justify-content: center;
            \">
                <img src=\"" . get_field('img', $post_id) . "\" width=\"48\" height=\"48\" style=\"
                    object-fit: contain;
                    vertical-align: bottom;
                \" alt=\"\">
            </div>
        ";
    }

    if ($column === 'link') {
        echo "
            <a href=\"" . get_field('link', $post_id) . "\" target=\"_blank\" style=\"
                color: #777777;
            \">
                " . get_field('link', $post_id) . "
            </a>
        ";
    }
}, 10, 2);
