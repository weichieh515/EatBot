var carousel = {
    type: "catalogue",
    items: []
}

module.exports = {
    add: (results) => {
        results = Array.isArray(results) ? results : [results];
        results.forEach(result => {
            let item = {
                title: result.name,
                subtitle: result.description,
                imgurl: result.photoUrl,
                options: [{
                    type: 'url',
                    title: 'view on Google map',
                    url: result.mapUrl
                }, {
                    type: 'text',
                    title: `Add this #${result.place_id}`
                }]
            };
            carousel.items.push(item);
        });
        return carousel;
    },
    view: function (results) {
        results = Array.isArray(results) ? results : [results];
        results.forEach(result => {
            let item = {
                title: result.name,
                subtitle: result.description,
                imgurl: result.photoUrl,
                options: [{
                    type: 'url',
                    title: 'view on Google map',
                    url: result.mapUrl
                }, {
                    type: 'phone_number',
                    title: 'Call',
                    phone_number: result.phone
                }]
            };
            carousel.items.push(item);
        });
        return carousel;
    }
}