/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerPlugin } from '@wordpress/plugins';
import {
	PluginBlockSettingsMenuItem,
	PluginDocumentSettingPanel,
	PluginMoreMenuItem,
	PluginPostPublishPanel,
	PluginPostStatusInfo,
	PluginPrePublishPanel,
	PluginSidebar,
	PluginSidebarMoreMenuItem,
} from '@wordpress/edit-post';
import { Fragment } from '@wordpress/element';

const PluginBlockSettingsMenuItemDemo = () => (
	<PluginBlockSettingsMenuItem
		allowedBlocks={ [ 'core/paragraph' ] }
		icon="smiley"
		label={ __( 'Menu item text' ) }
		onClick={ () => console.log( 'clicked' ) } />
);

registerPlugin( 'skguten-plugin-block-settings-menu-item-demo', {
	render: PluginBlockSettingsMenuItemDemo,
} );

const PluginDocumentSettingPanelDemo = () => (
	<PluginDocumentSettingPanel
		name="custom-panel"
		icon="palmtree"
		title={ __( 'Custom Panel' ) }
		className="custom-panel"
	>
		Custom Panel Contents
	</PluginDocumentSettingPanel>
);

registerPlugin( 'skguten-plugin-document-setting-panel-demo', {
	render: PluginDocumentSettingPanelDemo,
} );

const PluginMoreMenuItemDemo = () => (
	<PluginMoreMenuItem
		icon="smiley"
		onClick={ () => console.log( 'clicked' ) }
	>
		More Menu Item
	</PluginMoreMenuItem>
);

registerPlugin( 'skguten-plugin-more-menu-item-demo', {
	render: PluginMoreMenuItemDemo,
} );

const PluginPostPublishPanelDemo = () => (
	<PluginPostPublishPanel
		icon="smiley"
		title="My New Custom Panel"
		className="custom-post-publish-panel"
	>
		<p>Custom Post Publish Panel!</p>
	</PluginPostPublishPanel>
);

registerPlugin( 'skguten-plugin-post-publish-panel-demo', {
	render: PluginPostPublishPanelDemo,
} );

const PluginPostStatusInfoDemo = () => (
	<PluginPostStatusInfo
		className="custom-post-status-info"
	>
		<p>Post Status Info SlotFill</p>
	</PluginPostStatusInfo>
);

registerPlugin( 'skguten-plugin-post-status-info-demo', {
	render: PluginPostStatusInfoDemo,
} );

const PluginPrePublishPanelDemo = () => (
	<PluginPrePublishPanel
		icon="palmtree"
		title="My New Custom Panel"
		className="custom-pre-publish-panel"
	>
		<p> Pre Publish Panel </p>
	</PluginPrePublishPanel>
);

registerPlugin( 'skguten-plugin-pre-publish-panel-demo', {
	render: PluginPrePublishPanelDemo,
} );

const PluginSidebarDemo = () => (
	<PluginSidebar
		name="plugin-sidebar-demo"
		title="My Plugin"
		icon="palmtree"
	>
		<p>Plugin Sidebar</p>
	</PluginSidebar>
);

registerPlugin( 'skguten-plugin-sidebar-demo', {
	render: PluginSidebarDemo,
} );

const PluginSidebarMoreMenuItemDemo = () => (
	<Fragment>
		<PluginSidebarMoreMenuItem
			target="skguten-sidebar"
			icon="palmtree"
		>
			<p> Expanded Sidebar - More item </p>
		</PluginSidebarMoreMenuItem>
		<PluginSidebar
			name="skguten-sidebar"
			icon="smiley"
			title={ __( 'My Sidebar' ) }
		>
			<p> Content of the sidebar</p>
		</PluginSidebar>
	</Fragment>
);

registerPlugin( 'skguten-plugin-sidebar-more-item-demo', {
	render: PluginSidebarMoreMenuItemDemo,
} );
