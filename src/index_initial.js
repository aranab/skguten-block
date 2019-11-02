import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import {
    RichText,
    AlignmentToolbar,
    BlockControls,
    InspectorControls
} from '@wordpress/block-editor';
import { withSelect } from '@wordpress/data';
import {
    ServerSideRender,
    TextControl
} from '@wordpress/components';


//#region Example: Basic
const blockStyle = {
    backgroundColor: '#900',
    color: '#fff',
    padding: '20px',
};

registerBlockType('skguten/basic-block', {
    title: __('Example: Basic', 'skguten'),
    icon: 'universal-access-alt',
    category: 'layout',
    edit: () => <div style={blockStyle}>Hello World, step 1 (from the editor).</div>,
    save: () => <div style={blockStyle}>Hello World, step 1 (from the editor).</div>,
});
//#endregion Example: Basic

//#region Example: Stylesheets
registerBlockType('skguten/stylesheets-block', {
    title: __('Example: Stylesheets', 'skguten'),
    icon: 'universal-access-alt',
    category: 'layout',
    example: {},
    edit: ({ className }) => <p className={className}>Hello World, step 2 (from the editor, in green).</p>,
    save: () => <p>Hello World, step 2 (from the frontend, in red).</p>,
});
//#endregion Example: Stylesheets

//#region Example: Editable
registerBlockType('skguten/editable-block', {
    title: __('Example: Editable', 'skguten'),
    icon: 'universal-access-alt',
    category: 'layout',
    attributes: {
        content: {
            type: 'array',
            source: 'children',
            selector: 'p',
        },
    },
    example: {
        attributes: {
            content: 'Hello World',
        },
    },
    edit: (props) => {
        const { attributes: { content }, setAttributes, className } = props;
        const onChangeContent = (newContent) => {
            setAttributes({ content: newContent });
        };
        return (
            <RichText
                tagName="p"
                className={className}
                onChange={onChangeContent}
                value={content}
            />
        );
    },
    save: (props) => <RichText.Content tagName="p" value={props.attributes.content} />,
});
//#endregion Example: Editable

//#region Example: Block Controls
registerBlockType('skguten/block-controls', {
    title: __('Example: Controls', 'skguten'),
    icon: 'universal-access-alt',
    category: 'layout',
    attributes: {
        content: {
            type: 'array',
            source: 'children',
            selector: 'p',
        },
        alignment: {
            type: 'string',
            default: 'none',
        },
    },
    example: {
        attributes: {
            content: 'Hello World',
            alignment: 'right',
        },
    },
    edit: (props) => {
        const {
            attributes: {
                content,
                alignment,
            },
            className,
        } = props;

        const onChangeContent = (newContent) => {
            props.setAttributes({ content: newContent });
        };

        const onChangeAlignment = (newAlignment) => {
            props.setAttributes({ alignment: newAlignment === undefined ? 'none' : newAlignment });
        }

        return (
            <div>
                {
                    <BlockControls>
                        <AlignmentToolbar
                            value={alignment}
                            onChange={onChangeAlignment}
                        />
                    </BlockControls>
                }
                {
                    <InspectorControls>
                        <AlignmentToolbar
                            value={alignment}
                            onChange={onChangeAlignment}
                        />
                    </InspectorControls>
                }
                <RichText
                    className={className}
                    style={{ textAlign: alignment }}
                    tagName="p"
                    onChange={onChangeContent}
                    value={content}
                />
            </div>
        )
    },
    save: (props) => {
        return (
            <RichText.Content
                className={`skguten-blocks-control-align-${props.attributes.alignment}`}
                tagName="p"
                value={props.attributes.content}
            />
        );
    },
});
//#endregion Example: Block Controls

//#region Example: Dynamic Blocks
registerBlockType('skguten/dynamic-blocks', {
    title: __('Example: last post', 'skguten'),
    icon: 'megaphone',
    category: 'widgets',

    edit: withSelect((select) => {
        return {
            posts: select('core').getEntityRecords('postType', 'post')
        };
    })(({ posts, className }) => {
        if (!posts) {
            return 'Loading...';
        }

        if (posts && posts.length === 0) {
            return 'No posts';
        }

        let post = posts[0];

        return <a className={className} href={post.link}>
            {post.title.rendered}
        </a>;
    }),
    save: () => null,
});

registerBlockType('skguten/live-dynamic-blocks', {
    title: __('Example: Live last post', 'skguten'),
    icon: 'megaphone',
    category: 'widgets',

    edit: (props) => {
        return (
            <ServerSideRender
                block="skguten/live-dynamic-blocks"
                attributes={props.attributes}
            />
        );
    },
    save: () => null,
});
//#endregion Dynamic Blocks

//#region Custom Meta Blocks
registerBlockType('skguten/meta-blocks', {
    title: __('Example: Meta Block', 'skguten'),
    icon: 'smiley',
    category: 'common',
    attributes: {
        blockValue: {
            type: 'string',
            source: 'meta',
            meta: 'skguten_meta_block_field',
        },
    },
    edit: (props) => {

        const {
            attributes: {
                blockValue
            },
            className,
            setAttributes
        } = props;

        const onUpdateBlockValue = (newBlockValue) => {
            console.log(newBlockValue);
            setAttributes({ blockValue: newBlockValue });
        }

        return (
            <div className={className}>
                <TextControl
                    label="Meta Block Field"
                    value={blockValue}
                    onChange={onUpdateBlockValue}
                />
            </div>
        );
    },
    // No information saved to the block
    // Data is saved to post meta via attributes
    save: () => null,
});
//#endregion Custom Meta Blocks
