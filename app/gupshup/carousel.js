module.exports = {
    add: (results) => {
        results = Array.isArray(results) ? results : [results];
        let carousel = {
            type: "catalogue",
            items: []
        }
        results.forEach(result => {
            let item = {
                title: result.name,
                subtitle: result.description,
                imgurl: result.photoUrl,
                options: [{
                    type: 'text',
                    title: 'Google Map Url'
                }, {
                    type: 'text',
                    title: 'Add to Titansoft list'
                }]
            };
            carousel.items.push(item);
        });
        return carousel;
    },
    view: function (results) {
        results = Array.isArray(results) ? results : [results];
        let carousel = {
            type: "catalogue",
            items: []
        }
        results.forEach(result => {
            let item = {
                title: result.name,
                subtitle: result.description,
                imgurl: result.photoUrl,
                options: [{
                    type: 'text',
                    title: 'Google Map Url'
                }, {
                    type: 'text',
                    title: 'Phone Number'
                },{
                    type: 'text',
                    title: 'Opening Hours'
                }]
            };
            carousel.items.push(item);
        });
        return carousel;
    }
}