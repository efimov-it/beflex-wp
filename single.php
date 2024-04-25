<?php

get_header();
?>

    <main class="bf-main bf-main__post">
        <?php
            echo get_lazy_block('simple-title');
        ?>
        <div class="bf-post">
            <?=the_content()?>
        </div>
        <?php

            $related_posts = get_lazy_block('news');

            echo get_lazy_block('section', [
                'title' => 'читайте также',
                'align' => 'left',
                'link' => null
            ], $related_posts);
            echo get_lazy_block('beflex-app', [
                'text' => 'скачивайте наше приложение'
            ]);
        ?>
    </main>

<?php
get_footer();

?>