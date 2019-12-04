const renameImports = require('../../lib/rename-imports');

module.exports = (file, api) => {
    const j = api.jscodeshift;
    const ast = j(file.source);

    const res = renameImports(api, ast, {
        DatePicker: 'Calendar',
        Select: 'Dropdown',
        ModalDefault: 'Modal',
        ModalDefaultHeader: 'ModalHeader',
        ModalDefaultTitle: 'ModalTitle',
        ModalDefaultDescription: 'ModalDescription',
        ModalDefaultContent: 'ModalContent',
        ModalDefaultContentFullBleed: 'ModalContentFullBleed',
        ModalDefaultFooter: 'ModalFooter',
        ModalDefaultAnimatedWrapper: 'ModalAnimatedWrapper',
        Textarea: 'TextArea',
        Input: 'TextInput',
        InputIcon: 'TextInputIcon',
        InputClearButton: 'TextInputClearButton',
    });

    if (res === null) {
        return null;
    }

    return ast.toSource();
};
