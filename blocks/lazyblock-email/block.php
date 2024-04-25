<?php
    $tmp_dir = get_template_directory_uri();
?>

<section class="bf-emailBlock">
    <p class="bf-emailBlock_text">
        <?=$attributes['text'] ? $attributes['text'] :
            'по вопросам сотрудничества пишите:'
        ?>
    </p>

    <?php
        $email = get_theme_mod('email');

        if ($attributes['email']) $email = $attributes['email'];
    ?>

    <a href="mailto:<?=$email?>" class="bf-emailBlock_link"><?=$email?></a>

    <img src="<?=$tmp_dir?>/assets/imgs/email_img.jpg" class="bf-emailBlock_img" width="" height="" alt="">
</section>