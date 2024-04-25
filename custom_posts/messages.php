<?php

add_filter('manage_messages_posts_columns', function ($columns) {
    $tmp = [];
    $tmp['cb'] = $columns['cb'];
    $tmp['message'] = '';
    $tmp['contacts'] = '';
    $tmp['date'] = '';
    
    return $tmp;
});

add_action('manage_messages_posts_custom_column', function ($column, $post_id) {
    
    $name = get_field('name', $post_id);
    $surname = get_field('surname', $post_id);
    $page = get_field('page', $post_id);
    $type = get_field('type', $post_id);
    $phone = get_field('phone', $post_id);
    $email = get_field('email', $post_id);

    if ($column == 'message') {
    ?>

    <style>
        
        .bfadm-message {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 16px;
        }
        
        .bfadm-message_avatar {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 52px;
            height: 52px;
            border-radius: 26px;
            background: #E056BA;
            color: #ffffff;
            font-size: 28px;
            font-weight: 900;
            text-transform: uppercase;
        }
        
        .bfadm-message_info {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }
        
        .bfadm-messageName {
            margin: 0px !important;
            padding: 0px !important;
        }
        
        .bfadm-messageText {
            margin: 0px !important;
            padding: 0px !important;
        }
        
        .bfadm-contacts {

        }
        
        .bfadm-contacts_contact {

        }
    </style>

        <div class="bfadm-message">
            <div class="bfadm-message_avatar">
                <?=mb_substr($name, 0, 1)?><?=$surname ? mb_substr($surname, 0, 1) : ''?>
            </div>
            <div class="bfadm-message_info">
                <h3 class="bfadm-messageName"><?=$name . ($surname ? ' ' . $surname : '')?></h3>
                <p class="bfadm-messageText"><?=$type?> - <a href="<?=$page?>" target="_blank">страница</a></p>
            </div>
        </div>
    <?php
    }

    if ($column == 'contacts') {
    ?>
        <div class="bfadm-contacts">
            <p class="">
                Тел:
                <a href="tel:<?=$phone?>" class="bfadm-contacts_contact"><?=phone_format($phone)?></a>
            </p>
            <?php
                if ($email) {
            ?>
            <p class="">
                Эл. почта:
                <a href="mailto:<?=$email?>" class="bfadm-contacts_contact"><?=$email?></a>
            </p>
            <?php
                }
            ?>
        </div>
    <?php
    }

    if ($column == '1') {
        echo 123;
    }
}, 10, 2);

add_action('wp_ajax_feedback_form', 'feedback_form');
add_action('wp_ajax_nopriv_feedback_form', 'feedback_form');

function feedback_form () {
    $name = sanitize_text_field( $_POST['name'] );
    $surname = sanitize_text_field( $_POST['surname'] );
    $phone = sanitize_text_field( $_POST['phone'] );
    $email = sanitize_email( $_POST['email'] );
    $url = esc_url( $_POST['url'] );
    $message_type = sanitize_text_field( $_POST['message_type'] );

    if ( empty( $name ) || empty( $phone ) || empty( $url ) || empty( $message_type ) ) {
        wp_send_json_error( 'error' );
    }

    $post_data = array(
        'post_type'     => 'messages',
        'post_status'   => 'publish',
    );

    $post_id = wp_insert_post( $post_data );

    if ( ! is_wp_error( $post_id ) ) {
        update_post_meta( $post_id, 'name', $name );
        update_post_meta( $post_id, 'surname', $surname );
        update_post_meta( $post_id, 'phone', $phone );
        update_post_meta( $post_id, 'email', $email );
        update_post_meta( $post_id, 'page', $url );
        update_post_meta( $post_id, 'type', $message_type );

        $data = [
            'name'  => $name . ($surname ? ' ' . $surname : ''),
            'phone' => $phone,
            'email' => $email,
            'textarea' => $message_type . ".Страница: " . $url
        ];

        if (get_theme_mod('email')) {
            require_once __DIR__."/../email/feedback.php";

            $email_template = get_feedback_mail_template([
                'name' => $name,
                'surname' => $surname,
                'phone' => $phone,
                'email' => $email,
                'page' => $url,
                'type' => $message_type
            ]);

            wp_mail( get_theme_mod('email'), 'Новая заявка на сайте BeFlex', $email_template, [
                'From: BeFlex <no-reply@beflex.ru>',
                'content-type: text/html'
            ] );

            wp_mail( 'mail@efimov-it.info', 'Новая заявка на сайте BeFlex', $email_template, [
                'From: BeFlex <no-reply@beflex.ru>',
                'content-type: text/html'
            ] );
        }

        $ch = curl_init('https://ln4241.listokcrm.ru/cron/tildaLead/f52c510dbbdb13bce79c409facc4491e');
    
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
        $response = curl_exec($ch);
        curl_close($ch);

        wp_send_json_success( 'success' );
    } else {
        wp_send_json_error( 'error' );
    }

    wp_die();
};