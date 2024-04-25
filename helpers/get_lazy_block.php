<?php

function get_lazy_block ($block, $attributes = [], $inner = '') {
    $theme_dir = get_template_directory();
    
    ob_start();
    
    include($theme_dir . '/blocks/lazyblock-' . $block . '/block.php');
    
    $blockLayout = ob_get_clean();

    $blockLayout = str_replace('<InnerBlocks />', $inner, $blockLayout);
    
    return $blockLayout;
}