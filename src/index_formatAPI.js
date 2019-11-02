import { compose, ifCondition } from '@wordpress/compose';
import { registerFormatType, toggleFormat } from '@wordpress/rich-text';
import { RichTextToolbarButton } from '@wordpress/block-editor';
import { withSelect } from '@wordpress/data';


const CustomButtonComponent = (props) => {
    return (
        <RichTextToolbarButton
            icon="editor-code"
            title="Sample output"
            onClick={() => {
                props.onChange(toggleFormat(
                    props.value,
                    { type: 'skguten/custom-format' }
                ));
            }}
            isActive={props.isActive}
        />
    );
};

const ConditionalButton = compose(
    withSelect((select) => {
        return { selectedBlock: select('core/editor').getSelectedBlock() };
    }),
    ifCondition(
        (props) => (props.selectedBlock && props.selectedBlock.name == 'core/paragraph')
    )
)(CustomButtonComponent);

registerFormatType(
    'skguten/custom-format',
    {
        title: 'Sample output',
        tagName: 'samp',
        className: null,
        edit: ConditionalButton,
    }
);
