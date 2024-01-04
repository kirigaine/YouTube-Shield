browser.runtime.onInstalled.addListener(() => {
  browser.action.setBadgeText({
    text: 'OFF'
  });
});

browser.action.onClicked.addListener(async (tab) => {
	// Ensure only adds CSS on YouTube
  if (tab.url.startsWith("https://www.youtube.com/watch?v")) {
    const prevState = await browser.action.getBadgeText({ tabId: tab.id });
    const nextState = prevState === 'ON' ? 'OFF' : 'ON';
	console.log("inside");
    // Change badge text for easy discernment
    await browser.action.setBadgeText({
      tabId: tab.id,
      text: nextState
    });

    if (nextState === 'ON') {
      // Apply CSS when clicked ON
      await browser.scripting.insertCSS({
        files: ['youtube-shield.css'],
        target: { tabId: tab.id }
      });
    } else if (nextState === 'OFF') {
      // Remove CSS when clicked OFF
      await browser.scripting.removeCSS({
        files: ['youtube-shield.css'],
        target: { tabId: tab.id }
      });
    }
  }
});
