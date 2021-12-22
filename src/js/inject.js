let observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        if (mutation.addedNodes.length) {
            if (mutation.type === 'childList') {
                const title = mutation.target.innerText;
                chrome.storage.sync.get(
                    {list: []}, function (data) {
                        update(data.list, title);
                    }
                );
            }
        }
    })
})

function update(array, item) {
    array.push(item);
    // update the list with modified value
    chrome.storage.sync.set({list: array});
}

function checkNode() {
    let targetNode = document.querySelector('h1.title.style-scope.ytd-video-primary-info-renderer');
    if (!targetNode) {
        window.setTimeout(checkNode, 500);
        return;
    }
    const title = targetNode.innerText;
    chrome.storage.sync.get(
        {list: []}, function (data) {
            update(data.list, title);
        }
    );
    let config = {
        childList: true,
        subtree: true
    }
    observer.observe(targetNode, config)
}

checkNode();