<?php
/**
*
*  enqueue-assets 
*
 **/

function imontheme_assets(){
  wp_enqueue_style( 'imontheme-stylesheet', get_template_directory_uri() . '/dist/assets/css/bundle.css', array(), '1.0.0', 'all' );
  wp_enqueue_script( 'imontheme-script', get_template_directory_uri() . '/dist/assets/js/bundle.js', array(), '1.0.0', true);
}

add_action('wp_enqueue_scripts', 'imontheme_assets');

function imontheme_admin_assets(){
  wp_enqueue_style( 'imontheme-admin-stylesheet', get_template_directory_uri() . '/dist/assets/css/admin.css', array(), '1.0.0', 'all' );
   wp_enqueue_script( 'imontheme-admin-script', get_template_directory_uri() . '/dist/assets/js/admin.js', array(), '1.0.0', true);
}

add_action('admin_enqueue_scripts', 'imontheme_admin_assets');