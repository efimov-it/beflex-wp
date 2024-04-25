<?php

define('YA_MAP_KEY', '11f6d8b0-6ed4-4141-93e8-8b1bf7d6ece0');
function theme_setup() {
    add_theme_support('post-thumbnails');
    
    add_theme_support( 'custom-logo', array(
        'height'      => 120,
        'width'       => 440,
        'flex-height' => true,
        'flex-width'  => true,
        'header-text' => array( 'site-title', 'site-description' ),
    ) );

    register_nav_menu('primary', __('Главное меню', 'beflex'));
    register_nav_menu('footer', __('Подвал', 'beflex'));
}

add_action( 'after_setup_theme', 'theme_setup' );

add_filter( 'block_categories_all' , function( $categories ) {

    $categories = [[
		'slug'  => 'beflex',
		'title' => 'Beflex'
    ], ...$categories];

	return $categories;
} );

function allow_edit_theme_options_for_editors() {
    $editor = get_role('editor');
    $editor->add_cap('edit_theme_options');
}
add_action('admin_init', 'allow_edit_theme_options_for_editors');

function beflex_theme_scripts() {
    wp_enqueue_style( 'beflex-style', get_template_directory_uri() . '/assets/css/index.css', array(), '1.22', 'all' );
    wp_enqueue_script( 'beflex-script', get_template_directory_uri() . '/assets/js/index.js', array(), '1.24', true );

    wp_enqueue_script( 'ya-maps-script', 'https://api-maps.yandex.ru/v3/?apikey=' . YA_MAP_KEY . '&lang=ru_RU', array(), null, true );
}
add_action( 'wp_enqueue_scripts', 'beflex_theme_scripts' );

function beflex_admin_scripts() {
    wp_enqueue_style( 'beflex-style', get_template_directory_uri() . '/assets/css/index.css', array(), '1.22', 'all' );
    wp_enqueue_script( 'beflex-script', get_template_directory_uri() . '/assets/js/index.js', array(), '1.24', true );
}
add_action('admin_enqueue_scripts', 'beflex_admin_scripts');

add_action('customize_register', function ($wp_customize) {
    
    $wp_customize->add_section('beflex_links', array(
        'title' => 'Ссылки и контакты',
        'priority' => 30,
    ));

    
    $wp_customize->add_setting('phone', array(
        'default' => '',
        'transport' => 'refresh',
    ));
    $wp_customize->add_control('phone', array(
        'label' => 'Телефон для связи',
        'section' => 'beflex_links',
        'type' => 'text',
    ));

    
    $wp_customize->add_setting('email', array(
        'default' => '',
        'transport' => 'refresh',
    ));
    $wp_customize->add_control('email', array(
        'label' => 'Эл. почта для связи',
        'section' => 'beflex_links',
        'type' => 'text',
    ));

    
    $wp_customize->add_setting('tg_link', array(
        'default' => '',
        'transport' => 'refresh',
    ));
    $wp_customize->add_control('tg_link', array(
        'label' => 'Ник в Telegram (beflex)',
        'section' => 'beflex_links',
        'type' => 'text',
    ));

    
    $wp_customize->add_setting('wa_number', array(
        'default' => '',
        'transport' => 'refresh',
    ));
    $wp_customize->add_control('wa_number', array(
        'label' => 'Номер в WhatsApp (+79000000000)',
        'section' => 'beflex_links',
        'type' => 'text',
    ));

    
    $wp_customize->add_setting('google_play_link', array(
        'default' => '',
        'transport' => 'refresh',
    ));
    $wp_customize->add_control('google_play_link', array(
        'label' => 'Ссылка на Google Play',
        'section' => 'beflex_links',
        'type' => 'text',
    ));

    
    $wp_customize->add_setting('app_store_link', array(
        'default' => '',
        'transport' => 'refresh',
    ));
    $wp_customize->add_control('app_store_link', array(
        'label' => 'Ссылка на AppStore',
        'section' => 'beflex_links',
        'type' => 'text',
    ));

    
    
    $wp_customize->add_section('beflex_legal', array(
        'title' => 'Юридическая информация',
        'priority' => 31,
    ));

    
    $wp_customize->add_setting('legal_name', array(
        'default' => '',
        'transport' => 'refresh',
    ));
    $wp_customize->add_control('legal_name', array(
        'label' => 'Название организации',
        'section' => 'beflex_legal',
        'type' => 'text',
    ));

    
    $wp_customize->add_setting('inn', array(
        'default' => '',
        'transport' => 'refresh',
    ));
    $wp_customize->add_control('inn', array(
        'label' => 'ИНН',
        'section' => 'beflex_legal',
        'type' => 'text',
    ));

    
    $wp_customize->add_setting('ogrnip', array(
        'default' => '',
        'transport' => 'refresh',
    ));
    $wp_customize->add_control('ogrnip', array(
        'label' => 'ОГРНИП',
        'section' => 'beflex_legal',
        'type' => 'text',
    ));
});

include_once "custom_posts/union.php";
include_once "helpers/union.php";