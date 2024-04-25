<?php

function get_feedback_mail_template ($attributes) {
    $tmp_dir = get_template_directory_uri();


    $logo_id = get_theme_mod( 'custom_logo' );
    if ( $logo_id ) {
        $logo = wp_get_attachment_image_src( $logo_id, 'full' )[0];
    }
    else {
        $logo = $tmp_dir . "/assets/imgs/logo.svg";
    }

    ob_start();
?>

<!doctype html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body style="padding:0; margin:0;" bgcolor="#F2F4F5">
    <div style="display:none;font-size:1px;color:#333333;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
        📞 Заявка от <?=$attributes['name'] . ' ' . $attributes['surname']?> на сайте Beflex.
    </div>
    <table
        bgcolor="#ffffff"
        style="
            width: 100%;
            border-collapse: collapse;
        "
    >
        <tr>
            <td align="center" style="border-bottom: 1px solid #EAEAEA;">
                <table width="600" callpadding="0" cellspacing="0" bprder="0" style="vertical-align: bottom;">
                    <tr>
                        <td valign="middle" align="left" style="padding: 24px;">
                            <img src="<?=$logo?>" style="" width="200" height="48">
                        </td>
                        <td valign="middle" align="right" style="padding: 24px;">
                            <a
                                href="https://beflex.ru/wp-admin/edit.php?post_type=messages"
                                style="
                                    display: inline-block;
                                    padding: 12px 22px;
                                    border-radius: 8px;
                                    color: #ffffff;
                                    text-decoration: none;
                                    font-family: sans-serif;
                                    background-color: #E056BA;
                                    text-align: center;
                                    text-transform: uppercase;
                                    font-size: 12px;
                                    line-height: 100%;
                                    font-weight: 600;
                                "
                                target="_blank"
                            >Открыть в wordpress</a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <table style="width: 100%;" bgcolor="#F2F4F5">
        <tr>
            <td align="center">
                <table width="600" callpadding="0" cellspacing="0" bprder="0">
                    <tr>
                        <td valign="top" align="left" style="padding: 24px;">
                            <h2 style="
                                margin: 0px;
                                font-family: sans-serif;
                                text-transform: uppercase;
                                color: #101010;
                                font-size: 24px;
                                line-height: 100%;
                                margin-bottom: 4px;
                            ">Новая заявка на сайте</h2>
                            <p style="
                                margin: 0px;
                                font-family: sans-serif;
                                text-transform: lowercase;
                                color: #5A5A5A;
                                font-size: 20px;
                                line-height: 100%;
                                margin-bottom: 32px;
                            "><?=$attributes['type']?></p>

                            <table width="100%">
                                <tr>
                                    <td width="76">
                                        <p style="
                                            margin: 0px;
                                            display: block;
                                            width: 64px;
                                            max-height: 64px;
                                            text-align: center;
                                            border-radius: 32px;
                                            padding: 16px 0px;
                                            color: #ffffff;
                                            font-family: sans-serif;
                                            text-transform: uppercase;
                                            font-size: 32px;
                                            line-height: 100%;
                                            font-weight: 700;
                                            background-color: #E056BA;
                                        "><?=mb_substr($attributes['name'], 0, 1) . (mb_strlen($attributes['surname']) > 0 ? mb_substr($attributes['surname'], 0, 1) : '')?></p>
                                    </td>
                                    <td width="288"
                                        style="
                                            font-family: sans-serif;
                                            color: #101010;
                                            font-size: 20px;
                                            line-height: 120%;
                                            font-weight: 600;
                                        "
                                    ><?=$attributes['name'] . ' ' . $attributes['surname']?></td>
                                    <td width="" valign="middle">
                                        <a href="tel:<?=$attributes['phone']?>" target="_blank" style="
                                            display: block;
                                            text-decoration: none;
                                            margin: 0px;
                                            font-family: sans-serif;
                                            font-size: 16px;
                                            line-height: 120%;
                                            color: #101010;
                                            margin-bottom: 12px;
                                            margin-top: 7px;
                                        "><?=phone_format($attributes['phone'])?></p>
                                        <a href="mailto:<?=$attributes['email']?>" target="_blank" style="
                                            display: block;
                                            text-decoration: none;
                                            margin: 0px;
                                            font-family: sans-serif;
                                            font-size: 16px;
                                            line-height: 120%;
                                            color: #101010;
                                            margin-bottom: 7px;
                                        "><?=$attributes['email']?></p>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="3">
                                        <a
                                            href="<?=$attributes['page']?>"
                                            style="
                                                display: inline-block;
                                                padding: 12px 22px;
                                                border-radius: 8px;
                                                color: #ffffff;
                                                text-decoration: none;
                                                font-family: sans-serif;
                                                background-color: #E056BA;
                                                text-align: center;
                                                text-transform: uppercase;
                                                font-size: 12px;
                                                line-height: 100%;
                                                font-weight: 600;
                                                margin: 32px 0px;
                                            "
                                            target="_blank"
                                        >открыть страницу</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>

<?php

    return ob_get_clean();
}
?>