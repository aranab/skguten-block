<?php

/**
 * Plugin Name: Testing Blocks
 * Plugin URI:  http://skarafat.com/skguten/
 * Description: This is a plugin demonstrating how to register new blocks for the Gutenberg editor.
 * Version:     1.0.0
 * Author:      Md. Arafat Rahman Rana
 * Author URI:  http://skarafat.com/
 * Text Domain: skguten
 * Domain Path: /languages
 *
 * @package skguten
 */

defined( 'ABSPATH' ) || exit;

/**
 * Load all translations for our plugin from the MO file.
 */
function skguten_load_textdomain() {
	load_plugin_textdomain( 'skguten', false, basename( __DIR__ ) . '/languages' );
}
add_action( 'init', 'skguten_load_textdomain' );

/**
 * Register custom meta tag field
 */
function skguten_register_post_meta() {

	// do not check the permission
	register_post_meta(
		'page',
		'sidebar_plugin_meta_block_field',
		array(
			'show_in_rest' => true,
			'single'       => true,
			'type'         => 'string',
		)
	);
}
add_action( 'init', 'skguten_register_post_meta' );

/**
 * Registers all block assets so that they can be enqueued through Gutenberg in
 * the corresponding context.
 *
 * Passes translations to JavaScript.
 */
function skguten_register_block() {

	// automatically load dependencies and version
	$asset_file = include plugin_dir_path( __FILE__ ) . 'build/index.asset.php';

	wp_register_script(
		'skguten-script',
		plugins_url( 'build/index.js', __FILE__ ),
		$asset_file['dependencies'],
		$asset_file['version'],
		true
	);

	wp_register_style(
		'skguten-style-editor',
		plugins_url( 'editor.css', __FILE__ ),
		array( 'wp-edit-blocks' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'editor.css' )
	);

	wp_register_style(
		'skguten-style',
		plugins_url( 'style.css', __FILE__ ),
		array(),
		filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
	);

	if ( function_exists( 'wp_set_script_translations' ) ) {
		/**
		 * May be extended to wp_set_script_translations( 'my-handle', 'my-domain',
		 * plugin_dir_path( MY_PLUGIN ) . 'languages' ) ). For details see
		 * https://make.wordpress.org/core/2018/11/09/new-javascript-i18n-support-in-wordpress/
		 */
		wp_set_script_translations( 'skguten-script', 'skguten' );
	}

}
add_action( 'init', 'skguten_register_block' );

/**
 * Enqueue the script
 */
function sidebar_plugin_script_enqueue() {
	wp_enqueue_script( 'skguten-script' );
}
add_action( 'enqueue_block_editor_assets', 'sidebar_plugin_script_enqueue' );

/**
 * Enqueue the style sheet
 */
function sidebar_plugin_style_enqueue() {
	wp_enqueue_style( 'skguten-style-editor' );
}
add_action( 'enqueue_block_assets', 'sidebar_plugin_style_enqueue' );
