<?php

$is_video = false;
$is_iframe = false;

if (isset($attributes['video'])) {
    if (isset($attributes['video']['url'])) {
        $is_video = true;
    }
}

if (isset($attributes['youtube'])) {
    $url = ''.$attributes['youtube'];
    if (strpos($url, 'youtube.com') !== false || strpos($url, 'youtu.be') !== false) {
        $parts = parse_url($url);
        
        if (isset($parts['query'])) {
            parse_str($parts['query'], $query);
            if (isset($query['v'])) {
                $video_id = $query['v'];
                $is_iframe = "https://www.youtube.com/embed/$video_id";
            }
        }
        elseif (isset($parts['path'])) {
            $path = trim($parts['path'], '/');
            $path_parts = explode('/', $path);
            $video_id = end($path_parts);
            $is_iframe = "https://www.youtube.com/embed/$video_id";
        }
    }    
}
?>

<div class="bf-videoBlock">
    <?php
    if ($is_iframe) {
    ?>
    <iframe
        class="bf-videoBlock_video"
        width="764"
        height="432"
        src="<?=$is_iframe?>"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
    ></iframe>
    <?php
    }
    else {
    ?>
    <video class="bf-videoBlock_video" width="764" height="432" controls>
        <?php
        if ($is_video) {
        ?>
        <source src="<?=$attributes['video']['url']?>" type="video/mp4">
        <?php
        }
        ?>
    </video>
    <?php
    }
    ?>

    <div class="bf-videoBlock_content">
        <h3 class="bf-videoBlockTitle"><?=$attributes['title']?></h3>
        <p class="bf-videoBlockText"><?=$attributes['text']?></p>
    </div>
</div>