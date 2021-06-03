function calculateAPR(fees, tvl, weeklyVolume) {
    tvl = sanitizeNumber(tvl);
    weeklyVolume = sanitizeNumber(weeklyVolume);
    fees = parseFloat(fees.replace("%", "")) / 100;

    let apr = (((weeklyVolume * fees) / tvl) / 7) * 365;
    return "% " + (apr * 100).toFixed(2);
}

function addAPR(table) {
    rows = table.querySelectorAll(div(ROW_CLASS));
    rows.forEach((row, index) => {
        const cloned = row.children[row.childElementCount - 1].cloneNode(true);
        if (index == 0) {
            // This is the table header
            cloned.innerText = "% Min. APR";
            cloned.classList.add(ARP_HEADER_CLASS);
        } else {
            // Calculate the APR
            let tvl = row.children[TVL_INDEX].innerText;
            let weeklyVolume = row.children[WEEKLY_VOLUME_INDEX].innerText;
            let fees = row.querySelector(div(FEES_CLASS)).innerText;

            cloned.innerText = calculateAPR(fees, tvl, weeklyVolume);

            cloned.classList.add(ARP_VALUE_CLASS);
        }
        row.appendChild(cloned);
        // The original value is "20px 3.5fr repeat(3, 1fr)"
        row.style.gridTemplateColumns = "20px 3.5fr repeat(4, 1fr)";
    });
}

function updateAPR() {
    setTimeout(() => {
        document.querySelectorAll(div(ARP_VALUE_CLASS))
            .forEach((apr) => {
                const row = apr.parentNode;
                let fees = row.querySelector(div(FEES_CLASS)).innerText;
                let tvl = row.children[TVL_INDEX].innerText
                let weeklyVolume = row.children[WEEKLY_VOLUME_INDEX].innerText;
                apr.innerText = calculateAPR(fees, tvl, weeklyVolume);
            });
    }, 100);
}

// From: https://stackoverflow.com/a/47776379/3497739
async function rafAsync() {
    return new Promise(resolve => {
        requestAnimationFrame(resolve); //faster than set time out
    });
}

async function waitForElements(selector) {
    elements = document.querySelectorAll(selector);
    if (elements.length == 0) {
        return rafAsync().then(() => waitForElements(selector));
    } else {
        return Promise.resolve(elements);
    }
}

function setUpdateAPRListener(elements) {
    elements.forEach((element) => {
        element.addEventListener("click", updateAPR);
    });
}

function init() {
    waitForElements(div(POOLS_TABLE_CLASS))
        .then((elements) => {
            elements.forEach((element) => {
                // Insure that this is an inner table not an outer table
                if (!element.querySelector(div(POOLS_TABLE_CLASS))) {
                    addAPR(element);
                }
            });
        });

    waitForElements(div(NEXT_PAGE_CLASS))
        .then(setUpdateAPRListener);

    waitForElements(div(PREV_PAGE_CLASS))
        .then(setUpdateAPRListener);
}

/* Monitor for changes in URL */
chrome.runtime.onMessage.addListener((request) => {
    if (request.message === URL_CHANGE_MESSAGE) {
        init();
    }
});

init();
