import { PluginSidebar } from '@wordpress/edit-post';
import { registerPlugin } from '@wordpress/plugins';
import { TextControl } from '@wordpress/components';
import { withSelect, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';


const MetaBlockFieldComponent = compose(
    withDispatch((dispatch, props) => {
        return {
            setMetaFieldValue: (value) => {
                dispatch('core/editor').editPost(
                    { meta: { [props.metaFieldName]: value } }
                );
            }
        }
    }),
    withSelect((select, props) => {
        return {
            metaFieldValue: select('core/editor').getEditedPostAttribute('meta')[props.metaFieldName]
        };
    }),
)((props) => {

    let { metaFieldValue, setMetaFieldValue } = props;

    let onChangeTextControl = (content) => {
        setMetaFieldValue(content);
    };

    return (
        <TextControl
            label='Meta Block Field'
            value={metaFieldValue}
            onChange={onChangeTextControl}
        />
    );
});

const sidebarComponent = () => (
    <>
        <PluginSidebar
            name="skguten-plugin-sidebar"
            icon="admin-post"
            title="My plugin sidebar"
        >
            <div className="plugin-sidebar-content">
                <MetaBlockFieldComponent
                    metaFieldName="sidebar_plugin_meta_block_field"
                />
            </div>
        </PluginSidebar>
    </>
);

registerPlugin('skguten-plugin-sidebar', {
    icon: "smiley",
    render: sidebarComponent,
});
