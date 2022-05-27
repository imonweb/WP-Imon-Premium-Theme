<?php 
require_once('lib/helpers.php');
require_once('lib/enqueue-assets.php');

/*
function imontheme_scripts() {
  // wp_enqueue_style( 'imontheme-style', get_stylesheet_uri(), [], '1.0.0', 'all' ); 
  wp_enqueue_style( get_template_directory() . 'dist/assets/css/bundle.css', false, '1.0',  'all'); // inside child theme
   wp_enqueue_style( get_stylesheet_directory_uri() . 'dist/assets/css/bundle.css', false, '1.0',  'all');
  wp_enqueue_script( 'imontheme-script', get_template_directory_uri() . './js/app.js', array(), '1.0.0', true);
}

add_action( 'wp_enqueue_scripts', 'imontheme_scripts' );

*/