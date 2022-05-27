<?php
/**
*
*  enqueue-assets 
*
 **/

function imontheme_assets(){
  wp_enqueue_style( 'imontheme-stylesheet', get_template_directory_uri() . '/dist/assets/css/bundle.css', array(), '1.0.0', 'all' );
}

add_action('wp_enqueue_scripts', 'imontheme_assets');

function imontheme_admin_assets(){
  wp_enqueue_style( 'imontheme-admin-stylesheet', get_template_directory_uri() . '/dist/assets/css/admin.css', array(), '1.0.0', 'all' );
}

add_action('admin_enqueue_scripts', 'imontheme_admin_assets');