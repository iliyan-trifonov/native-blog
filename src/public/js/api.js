//fake Api calls returning promises with data
export let Api = {
    posts: {
        get: function () {
            'use strict';
            return Promise.resolve([
                {
                    title: 'In non urna tristique nisl pellentesque imperdiet',
                    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at cursus magna.
                    Nullam congue sapien fringilla aliquet facilisis. Morbi quis elit in arcu suscipit auctor.
                    Quisque lobortis nulla magna. Curabitur leo libero, elementum tristique augue id, rhoncus iaculis
                    ipsum.
                    Phasellus in suscipit lacus, et rhoncus nulla. Donec tristique faucibus efficitur.`,
                    author: {
                        name: 'Iliyan Trifonov'
                    },
                    date: 'July 11, 2015',
                    tags: [
                        'JavaScript',
                        'Web Development'
                    ]
                },
                {
                    title: 'Morbi efficitur posuere eros',
                    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at cursus magna.
                    Nullam congue sapien fringilla aliquet facilisis. Morbi quis elit in arcu suscipit auctor.
                    Quisque lobortis nulla magna. Curabitur leo libero, elementum tristique augue id, rhoncus iaculis
                    ipsum.
                    Phasellus in suscipit lacus, et rhoncus nulla. Donec tristique faucibus efficitur.`,
                    author: {
                        name: 'Iliyan Trifonov'
                    },
                    date: 'July 11, 2015',
                    tags: [
                        'JavaScript',
                        'Web Development'
                    ]
                },
                {
                    title: 'Fusce ante tortor',
                    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at cursus magna.
                    Nullam congue sapien fringilla aliquet facilisis. Morbi quis elit in arcu suscipit auctor.
                    Quisque lobortis nulla magna. Curabitur leo libero, elementum tristique augue id, rhoncus iaculis
                    ipsum.
                    Phasellus in suscipit lacus, et rhoncus nulla. Donec tristique faucibus efficitur.`,
                    author: {
                        name: 'Iliyan Trifonov'
                    },
                    date: 'July 11, 2015',
                    tags: [
                        'JavaScript',
                        'Web Development'
                    ]
                },
                {
                    title: 'Maecenas a eros interdum, dictum enim sed, malesuada felis',
                    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at cursus magna.
                    Nullam congue sapien fringilla aliquet facilisis. Morbi quis elit in arcu suscipit auctor.
                    Quisque lobortis nulla magna. Curabitur leo libero, elementum tristique augue id, rhoncus iaculis
                    ipsum.
                    Phasellus in suscipit lacus, et rhoncus nulla. Donec tristique faucibus efficitur.`,
                    author: {
                        name: 'Iliyan Trifonov'
                    },
                    date: 'July 11, 2015',
                    tags: [
                        'JavaScript',
                        'Web Development'
                    ]
                },
                {
                    title: 'Donec vel tempor tortor, vitae luctus magna',
                    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at cursus magna.
                    Nullam congue sapien fringilla aliquet facilisis. Morbi quis elit in arcu suscipit auctor.
                    Quisque lobortis nulla magna. Curabitur leo libero, elementum tristique augue id, rhoncus iaculis
                    ipsum.
                    Phasellus in suscipit lacus, et rhoncus nulla. Donec tristique faucibus efficitur.`,
                    author: {
                        name: 'Iliyan Trifonov'
                    },
                    date: 'July 11, 2015',
                    tags: [
                        'JavaScript',
                        'Web Development'
                    ]
                }
            ]);
        }
    }
};
