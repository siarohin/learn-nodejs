const path = require('path');

module.exports = {
    testRegex: '((\\.|/*.)(spec))\\.js?$',
    setupFiles: ['<rootDir>/scripts/setupTests.js'],
    restoreMocks: true,
    clearMocks: true,
    reporters: [
        'default',
        [
            'jest-html-reporters',
            {
                publicPath: path.resolve(__dirname, './coverage/html-report'),
                filename: 'test-report.html',
                expand: true
            }
        ]
    ]
};
