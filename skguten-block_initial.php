<?php

/**
 * Plugin Name: Initial Blocks
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
 * Recent post render callback function
 */
function skguten_dynamic_block_render_callback( $attributes, $content ) {
	$recent_posts = wp_get_recent_posts(
		array(
			'numberposts' => 1,
			'post_status' => 'publish',
		)
	);

	if ( count( $recent_posts ) === 0 ) {
		return '<P>Frontend No posts</p>';
	}
	$post    = $recent_posts[0];
	$post_id = $post['ID'];
	return sprintf(
		'<a class="wp-block-my-plugin-latest-post" href="%1$s">%2$s</a>',
		esc_url( get_permalink( $post_id ) ),
		esc_html( get_the_title( $post_id ) )
	);
}

/**
 * Register custom meta tag field
 */
function skguten_register_post_meta() {

	// do not check the permission
	register_post_meta(
		'page',
		'skguten_meta_block_field',
		array(
			'show_in_rest' => true,
			'single'       => true,
			'type'         => 'string',
		)
	);

	// meta key name start with (_) means protected; always check the permission
	register_post_meta(
		'page',
		'_skguten_protected_key',
		array(
			'show_in_rest'  => true,
			'single'        => true,
			'type'          => 'string',
			'auth_callback' => function() {
				return current_user_can( 'edit_posts' );
			},
		)
	);
}
add_action( 'init', 'skguten_register_post_meta' );

/**
 * Register block template which automatically insert the meta block at the top of a post
 */
function skguten_register_template() {

	$post_type_object = get_post_type_object( 'page' );

	$post_type_object->template = array(
		array( 'skguten/meta-blocks' ),
	);
}
add_action( 'init', 'skguten_register_template' );

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
		$asset_file['version']
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

	register_block_type(
		'skguten/test-blocks',
		array(
			'style'         => 'skguten-style',
			'editor_style'  => 'skguten-style-editor',
			'editor_script' => 'skguten-script',
		)
	);

	register_block_type(
		'skguten/dynamic-blocks',
		array(
			'style'           => 'skguten-style',
			'editor_style'    => 'skguten-style-editor',
			'editor_script'   => 'skguten-script',
			'render_callback' => 'skguten_dynamic_block_render_callback',
		)
	);

	register_block_type(
		'skguten/live-dynamic-blocks',
		array(
			'style'           => 'skguten-style',
			'editor_style'    => 'skguten-style-editor',
			'editor_script'   => 'skguten-script',
			'render_callback' => 'skguten_dynamic_block_render_callback',
		)
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
