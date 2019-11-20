import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

registerBlockType('skguten/selection-block', {
    title: __('Section Block', 'skguten'),
    icon: 'universal-access-alt',
    category: 'layout',
    edit: ({ className }) => {
        return (
            <section className={className}>
                <InnerBlocks/>                
            </section>
        );
    },
    save: () => {
        return (
            <section>
                <InnerBlocks.Content/>
            </section>
        );
    }
});