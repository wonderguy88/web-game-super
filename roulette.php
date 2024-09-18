<?php
/**
 * Plugin Name: Hello World React Plugin
 */

function roulette_shortcode() {

	return '<div id="root"></div>';
}

add_shortcode('roulette', 'roulette_shortcode');

function roulette_load_assets() {
	
	$react_app_js  = plugin_dir_url( __FILE__ ) . 'build/static/js/all_in_one_file.js';
    $react_app_css = plugin_dir_url( __FILE__ ) . 'build/static/css/all_in_one_file.css';	
      
    // time stops stylesheet/js caching while in development, might want to remove later  
    $version = time();	
    wp_enqueue_script( 'roulette', $react_app_js, array(), $version, true );         
    wp_enqueue_style( 'roulette', $react_app_css, array(), $version );
}

add_action( 'wp_enqueue_scripts', 'roulette_load_assets' );


// [url]\wp-content\plugins\roulette