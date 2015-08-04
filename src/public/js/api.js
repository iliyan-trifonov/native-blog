'use strict';

import { blogData } from './data.js';

let monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
];

let parseDate = timeStamp => {
    var date = new Date(timeStamp);
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return `${monthNames[monthIndex]} ${day}, ${year}`;
};

let populatePosts = posts => {
    let result = [];
    for (let id in posts) {
        if (posts.hasOwnProperty(id)) {
            let post = posts[id];
            let p = {
                id: id,
                title: post.title,
                text: post.text,
                author: {
                    name: blogData.authors[post.author].name
                },
                date: parseDate(post.date),
                tags: []
            };
            for (let tag of post.tags) {
                p.tags.push(blogData.tags[tag]);
            }
            result.push(p);
        }
    }
    return result;
};

//fake Api calls returning promises with data
export let Api = {
    posts: {
        get: function () {
            return Promise.resolve(
                populatePosts(blogData.posts)
            );
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
        },
        getById: function (postId) {
            let result;
            let post = blogData.posts[postId];
            if (!post) {
                result = [];
            } else {
                let posts = populatePosts([post]);
                result = posts.pop();
            }
            return Promise.resolve(result);
        }
    },
    tags: {
        get: function () {
            let tags = blogData.tags;
            let result = [];
            for (let id in tags) {
                if (tags.hasOwnProperty(id)) {
                    let tag = tags[id];
                    result.push({
                        id: id,
                        name: tag.name,
                        slug: tag.slug
                    });
                }
            }
            return Promise.resolve(result);
        }
    },
    categories: {
        get: function () {
            let result = [];
            let cats = blogData.categories;
            for (let id in cats) {
                if (cats.hasOwnProperty(id)) {
                    let cat = cats[id];
                    result.push({
                        id: id,
                        name: cat.name,
                        slug: cat.slug
                    });
                }
            }
            return Promise.resolve(result);
        }
    }
};
