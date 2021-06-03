self.importScripts("config.js");

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tabInfo) {
    /* If the URL was changed, notify unihelper to redraw the APR */
    if (changeInfo.url) {
        chrome.tabs.sendMessage(tabId, {
            message: URL_CHANGE_MESSAGE,
            url: changeInfo.url
        });
    }
});
