

module.exports = {
    add: function (results) {
        var carousel = {
            type: "catalogue",
            items: []
        }
        results.forEach(function (result) {
            var item = {};
            item.title = result.name;
            item.subtitle = result.description;
            item.options = [{ type: 'url', title: 'view on Google map', url: result.mapUrl }, { type: 'text', title: `Add this #${result.place_id}`}];
            carousel.items.push(item);
        });
        return carousel;
    },
    show: function (results) {
        var carousel = {
            type: "catalogue",
            items: []
        }
        results.forEach(function (result) {
            var item = {};
            item.title = result.name;
            item.subtitle = result.description;
            item.options = [{ type: 'url', title: 'view on Google map', url: result.mapUrl }];
            carousel.items.push(item);
        });
        return carousel;
    }
}