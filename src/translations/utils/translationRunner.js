const manageTranslations = require('react-intl-translations-manager').default;
manageTranslations({
    messagesDirectory    : '../extractedMessages',
    translationsDirectory: '../translations2/',
    whitelistsDirectory  : '../whitelists/',
    languages            : ['en', 'fr']
});