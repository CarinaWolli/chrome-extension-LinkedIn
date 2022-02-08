chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (!changeInfo.url) return;

  const isProfilePage = changeInfo.url.includes("linkedin.com/in/");
  const hasQueryParams = changeInfo.url.includes("?");
  // url change triggers 2 times if it has query params
  if (isProfilePage && !hasQueryParams) {
    chrome.tabs.sendMessage(tabId, {
      message: "url-change",
    });
  }
});
