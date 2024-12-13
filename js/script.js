document.addEventListener("DOMContentLoaded", () => {
    function updateLocalTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        document.getElementById("local-time").textContent = timeString;
    }

    function getTradingStatus(openTime, closeTime, isDST) {
        const now = new Date();
        const currentHoursUTC = now.getUTCHours();

        // Adjust for Daylight Saving Time if necessary
        if (isDST) {
            openTime--;
            closeTime--;
        }

        if (currentHoursUTC >= openTime && currentHoursUTC < closeTime) {
            return `<span class="status-open">Open</span>`;
        }
        return `<span class="status-closed">Closed</span>`;
    }

    function populateTradingTable() {
        const tradingMarkets = [
            { country: "USA", market: "NYSE", open: 14, close: 21, isDST: true },
            { country: "USA", market: "Nasdaq", open: 14, close: 21, isDST: true },
            { country: "UK", market: "LSE", open: 8, close: 16.5, isDST: false },
            { country: "Japan", market: "TSE", open: 0, close: 6, isDST: false },
            { country: "China", market: "SSE", open: 1.5, close: 7, isDST: false },
            { country: "Hong Kong", market: "HKEX", open: 1.5, close: 8, isDST: false },
            { country: "France", market: "Euronext", open: 8, close: 16.5, isDST: true },
            { country: "Germany", market: "Xetra", open: 8, close: 16.5, isDST: true },
            { country: "Australia", market: "ASX", open: 23, close: 5, isDST: true },
            { country: "India", market: "NSE", open: 3.75, close: 10, isDST: false }
        ];

        const tableBody = document.getElementById("trading-table");
        tradingMarkets.forEach(market => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${market.country}</td>
                <td>${market.market}</td>
                <td>${market.open}:00 UTC</td>
                <td>${market.close}:00 UTC</td>
                <td>${getTradingStatus(market.open, market.close, market.isDST)}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    updateLocalTime();
    setInterval(updateLocalTime, 1000); // Update every second
    populateTradingTable();
});
