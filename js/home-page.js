$(document).ready(function () {
    let lang = $('html').prop('lang');
    let productsTable = $('table:not(.useDataTable)');
    if (productsTable.length > 0) {
        $.each(productsTable, function () {
            let currentProductsTable = $(this);
            let IsSwapTable = currentProductsTable.parents('.swap-container').length > 0 ? true : false;
            let productsTableConfig = {
                destroy: true,
                info: true,
                responsive: true,
                ordering: true,
                lengthMenu: [15],
                "initComplete": function (settings, json) {
                    if (currentProductsTable.parents('.swap-container').find('.see-all-container').length) {
                        let buttonElement = document.createElement('button');
                        buttonElement.className = "d-flex align-content-center gap-2 justify-content-center see-all-btn";
                        buttonElement.innerText = typeof resources.seeAll === "undefined" ? 'See All' : resources.seeAll;
                        let buttonContainer = currentProductsTable.parents('.swap-container').find('.see-all-container')[0];
                        buttonContainer.appendChild(buttonElement);
                    }
                }
            }
            productsTableConfig["paging"] = IsSwapTable ? true : false;
            productsTableConfig["searching"] = IsSwapTable ? true : false;
            productsTableConfig["columnDefs"] = IsSwapTable ? [
                {orderable: true, className: 'reorder', targets: 0},
                {orderable: false, targets: '_all'}
            ] : '';
            let path = `/api/data_table_i18n?lang=${lang}`;
            productsTableConfig["language"] = {
                url: path
            };
            productsTableConfig['dom'] = IsSwapTable ? `            
            <'row'<'col-12'<'d-flex top-radius bg-white align-content-center justify-content-end swaps-search 'f>>>
            <'row'<'col-12'tr>>
            <'row'<'col-12'<'bottom-radius' <'see-all-container'>>>>` : "<'row'<'col-12'tr>>";

            currentProductsTable.addClass('table table-striped table-hover');

            // check if there's a thead on the table
            if (!currentProductsTable.find('thead').length) {
                let firstRow = currentProductsTable.find('tbody tr:first').html();
                currentProductsTable.find('tbody tr:first').remove();
                currentProductsTable.prepend('<thead>' + firstRow + '</thead>')
                $.each(currentProductsTable.find('thead td'), function (index) {
                    $(this).addClass(index == 0 ? 'all' : 'desktop tablet-l tablet-p');
                })
            } else {
                $.each(currentProductsTable.find('thead th'), function (index) {
                    $(this).addClass(index === 0 ? 'all' : 'desktop tablet-l tablet-p');
                })
            }
            currentProductsTable.find('thead tr').css('text-align', '');
            let columnsNumber = currentProductsTable.find('thead tr th').length ? currentProductsTable.find('thead tr th').length : currentProductsTable.find('thead tr td').length;
            productsTableConfig["scrollX"] = columnsNumber > 8 ? true : false;
            if (columnsNumber <= 8) {
                $('table.useDataTable').addClass('break-word-table');
            }
            currentProductsTable.dataTable(productsTableConfig);
            collapsedDataTable();

        })
    }
});

// Pricing Widget
document.addEventListener("DOMContentLoaded", function () {
    if ($('#pricewidget').length > 0) {
        let widget = new PricingWidget();
        let WebSocketUrl = "eqpricestream01z-prod.azurewebsites.net";
        let configJSON = {
            "socketUri": "wss://" + WebSocketUrl + "/PriceStreaming.axd",
            "instruments": {
                "GBPUSD.p": {
                    "name": "GBPUSD",
                    "pipPosition": 4,
                    "decimals": 5,
                    "category": "CURRENCIES",
                    "fixedSpread": null
                },
                "EURUSD.p": {
                    "name": "EURUSD",
                    "pipPosition": 4,
                    "decimals": 5,
                    "category": "CURRENCIES",
                    "fixedSpread": null
                },
                "EURGBP.p": {
                    "name": "EURGBP",
                    "pipPosition": 4,
                    "decimals": 5,
                    "category": "CURRENCIES",
                    "fixedSpread": null
                },
                "USDJPY.p": {
                    "name": "USDJPY",
                    "pipPosition": 2,
                    "decimals": 3,
                    "category": "CURRENCIES",
                    "fixedSpread": null
                },
                "XAUUSD.p": {
                    "name": "XAUUSD",
                    "pipPosition": 1,
                    "decimals": 2,
                    "category": "METALS",
                    "fixedSpread": null
                },
                "XAGUSD.p": {
                    "name": "XAGUSD",
                    "pipPosition": 2,
                    "decimals": 3,
                    "category": "METALS",
                    "fixedSpread": null
                }
            },
            "lang": {
                "Market": "Market",
                "LivePrices": "Live prices",
                "Spreads": "Spreads",
                "Spread": "Spread",
                "Sell": "Sell",
                "Buy": "Buy",
                "Change": "Change",
                "Rates": "Rates",
                "Premiere": "Premiere",
                "Executive": "Executive"
            }
        };
        widget.init("pricewidget", configJSON);
    }
});