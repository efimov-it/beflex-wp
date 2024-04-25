<?php
    $tmp_dir = get_template_directory_uri();
    $home_page = home_url();
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title><?=wp_title()?></title>
<?php
    wp_head();
?>

</head>
<body>
    <header class="bf-header<?=is_front_page() ? ' bf-header__main' : '' ?>">
        <?php
            $logo_id = get_theme_mod( 'custom_logo' );
            if ( $logo_id ) {
                $logo = wp_get_attachment_image_src( $logo_id, 'full' );
                ?>
                <a href="<?=$home_page?>" class="bf-headerLogo">
                    <img src="<?=$logo[0]?>" width="220" height="60" alt="Логотип" class="bf-headerLogo_img">
                </a>
                <?php
            }
            else {?>
                <a href="<?=$home_page?>" class="bf-headerLogo">
                    <img src="<?=$tmp_dir?>/assets/imgs/logo.svg" width="220" height="60" alt="Логотип" class="bf-headerLogo_img">
                </a>
            <?
            }
        ?>

        <button class="bf-headerMenuButton" type="button" id="mainMenuBtn">
            <img src="<?=$tmp_dir?>/assets/imgs/mainMenuIcon.svg" width="34" height="30" alt="Кнопка меню" class="bf-headerMenuButton_icon">
        </button>

        <div class="bf-headerNavBackground bf-headerNavBackground__hidden" id="mainMenuBackground" style="display: none;"></div>

        <nav class="bf-headerNav bf-headerNav__hidden" id="mainMenu">
            <ul class="bf-headerNavList">
                <button class="bf-headerMenuBack" type="button" id="backMainMenuBtn">
                    <img src="<?=$tmp_dir?>/assets/imgs/backMenuIcon.svg" width="16" height="16" alt="Закрыть меню" class="bf-headerMenuBack_icon">
                </button>
        <?php
            if (has_nav_menu('primary')) {
                $locations = get_nav_menu_locations();

                if ($locations || $locations['primary']) {
                    $menu_items = wp_get_nav_menu_items($locations['primary']);

                    if ($menu_items) {

                        $tmp_menu = [];

                        foreach ($menu_items as $menu_item) {
                            if ($menu_item -> menu_item_parent == "0") {
                                $tmp_menu[] = $menu_item;
                            }
                            else {
                                foreach ($tmp_menu as $tmp_menu_item) {

                                    $hasAdded = false;
                                    
                                    if (!isset($tmp_menu_item -> children)) {
                                        $tmp_menu_item -> children = [];
                                    }

                                    if ($menu_item -> menu_item_parent == $tmp_menu_item -> ID) {
                                        $tmp_menu_item -> children[] = $menu_item;
                                    }
                                    
                                    if (!$hasAdded) {
                                        foreach ($tmp_menu_item -> children as $tmp_menu_item_children) {
                                            if (!isset($tmp_menu_item_children -> children)) {
                                                $tmp_menu_item_children -> children = [];
                                            }
    
                                            if ($menu_item -> menu_item_parent == $tmp_menu_item_children -> ID) {
                                                $tmp_menu_item_children -> children[] = $menu_item;
                                                $hasAdded = true;
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        $menu_items = $tmp_menu;

                        foreach ($menu_items as $menu_item) {?>
                        <li class="bf-headerNavList_item">
                            <?php
                            if ($menu_item->url !== "#") {
                            ?>
                            <a href="<?=$menu_item->url?>" class="bf-headerNavList_itemLink"><?=$menu_item->title?></a>
                            <?php
                            } else {
                            ?>
                            <span class="bf-headerNavList_itemLink" data-submenu="mainMobileMenu-<?=$menu_item -> ID?>"><?=$menu_item->title?></span>
                            <?php
                            }
                            ?>

                            <?php
                                if (isset($menu_item -> children)) {
                            ?>
                                <svg width="12" height="11" class="bf-headerNavList_itemArrow" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 1.18555L6 8.68555L1 1.18555" stroke="black" stroke-width="2"/>
                                </svg>
                                <ul class="bf-headerNavList2" id="mainMobileMenu-<?=$menu_item -> ID?>">
                                    <?php
                                    foreach ($menu_item -> children as $child_1) {
                                        ?>
                                        <li class="bf-headerNavList2_item">
                                            <?php
                                            if ($child_1->url !== "#") {
                                            ?>
                                            <a href="<?=$child_1->url?>" class="bf-headerNavList2_itemLink"><?=$child_1->title?></a>
                                            <?php
                                            } else {
                                            ?>
                                            <span class="bf-headerNavList2_itemLink"><?=$child_1->title?></span>
                                            <?php
                                            }
                                            ?>
                                            
                                            <?php
                                                if (isset($child_1 -> children)) {
                                            ?>
                                                <svg width="12" height="11" class="bf-headerNavList2_itemArrow" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M11 1.18555L6 8.68555L1 1.18555" stroke="black" stroke-width="2"/>
                                                </svg>
                                                <ul class="bf-headerNavList3">
                                                    <?php
                                                    foreach ($child_1 -> children as $child_2) {
                                                        ?>
                                                        <li class="bf-headerNavList3_item">
                                                            <a href="<?=$child_2->url?>" class="bf-headerNavList3_itemLink"><?=$child_2->title?></a>
                                                        </li>
                                                        <?php
                                                    }
                                                    ?>
                                                </ul>
                                            <?php
                                                }
                                            ?>
                                        </li>
                                        <?php
                                    }
                                    ?>
                                </ul>
                            <?php
                                }
                            ?>
                        </li>
                        <?php
                        }
                    }
                }
            }
        ?>
            </ul>

            <button class="bf-headerMenuClose" type="button" id="closeMainMenuBtn">
                <img src="<?=$tmp_dir?>/assets/imgs/closeMenuIcon.svg" width="16" height="16" alt="Закрыть меню" class="bf-headerMenuClose_icon">
            </button>

            <img src="<?=$tmp_dir?>/assets/imgs/pink_flower.svg" width="180" height="180" alt="" class="bf-headerDecorFlower">
            <img src="<?=$tmp_dir?>/assets/imgs/elipses3green.svg" width="260" height="284" alt="" class="bf-headerDecorElipses">
        </nav>
    </header>