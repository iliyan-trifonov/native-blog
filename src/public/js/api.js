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

let idFromSlug = options => {
    let slug = options.catSlug || options.tagSlug;
    let items;

    if (options.catSlug) {
        items = blogData.categories;
    } else if (options.tagSlug) {
        items = blogData.tags;
    }

    for (let id in items) {
        if (items.hasOwnProperty(id)) {
            let item = items[id];
            if (item.slug === slug) {
                return Number(id);
            }
        }
    }
};

let filterPosts = (posts = [], options = {}) => {
    let itemId = idFromSlug(options);
    let filtered = [];
     for (let id in posts) {
        if (posts.hasOwnProperty(id)) {
            let post = posts[id];
            if (options.catSlug && post.category === itemId ||
                options.tagSlug && post.tags.indexOf(itemId) !== -1
            ) {
                filtered.push(post);
            }
        }
    }
    return filtered;
};

//simulating Api calls returning promises with data
export let Api = {
    posts: {
        get: function (options = {}) {
            let result;
            let posts = blogData.posts;

            if (options.catSlug || options.tagSlug) {
                result = filterPosts(posts, options);
            } else if (options.postId) {
                let key = options.postId;
                result = {
                    [key]: blogData.posts[options.postId]
                };
            } else {
                result = posts;
            }

            return Promise.resolve(
                populatePosts(result)
            );
        },
        recent: function () {
            let result = [];
            let posts = blogData.posts;
            for (let id in posts) {
                if (posts.hasOwnProperty(id)) {
                    let post = posts[id];
                    result.push({
                        id: id,
                        title: post.title
                    });
                }
            }
            return Promise.resolve(result);
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
