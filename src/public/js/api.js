'use strict';
//fake Api calls returning promises with data
export let Api = {
    posts: {
        get: function () {
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
        },
        recent: function () {
            return Promise.resolve([
                {
                    id: 1,
                    title: 'In non urna tristique nisl pellentesque imperdiet',
                    slug: 'in-non-urna-tristique-nisl-pellentesque-imperdiet'
                },
                {
                    id: 2,
                    title: 'In non urna tristique nisl pellentesque imperdiet',
                    slug: 'in-non-urna-tristique-nisl-pellentesque-imperdiet'
                },
                {
                    id: 3,
                    title: 'In non urna tristique nisl pellentesque imperdiet',
                    slug: 'in-non-urna-tristique-nisl-pellentesque-imperdiet'
                },
                {
                    id: 4,
                    title: 'In non urna tristique nisl pellentesque imperdiet',
                    slug: 'in-non-urna-tristique-nisl-pellentesque-imperdiet'
                },
                {
                    id: 5,
                    title: 'In non urna tristique nisl pellentesque imperdiet',
                    slug: 'in-non-urna-tristique-nisl-pellentesque-imperdiet'
                }
            ]);
        }
    },
    tags: {
        get: function () {
            return Promise.resolve([
                {
                    name: 'Tag1',
                    slug: 'tag1'
                },
                {
                    name: 'Tag1',
                    slug: 'tag1'
                },
                {
                    name: 'Tag1',
                    slug: 'tag1'
                },
                {
                    name: 'Tag1',
                    slug: 'tag1'
                },
                {
                    name: 'Tag1',
                    slug: 'tag1'
                },
                {
                    name: 'Tag1',
                    slug: 'tag1'
                }
            ]);
        }
    },
    categories: {
        get: function () {
            return Promise.resolve([
                {
                    name: 'Test category 1',
                    slug: 'test-category-1'
                },
                {
                    name: 'Test category 1',
                    slug: 'test-category-1'
                },
                {
                    name: 'Test category 1',
                    slug: 'test-category-1'
                },
                {
                    name: 'Test category 1',
                    slug: 'test-category-1'
                },
                {
                    name: 'Test category 1',
                    slug: 'test-category-1'
                }
            ]);
        }
    }
};
