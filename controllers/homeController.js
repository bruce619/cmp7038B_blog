const setupDB = require('../db/db-setup');
const Post = require('../models/post');
const { searchSchema } = require('../utility/validations');

setupDB();

// page size for pagination
const page_size = 4;

exports.homeView = async (req, res) => {

    // current page
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const offset = (page - 1) * page_size;

    console.log(req.query)
    
    if (Object.keys(req.query).length === 0){
        posts = await Post.query().withGraphFetched('user').offset(offset).limit(page_size);
        total = await Post.query().resultSize();
        total_pages = Math.ceil(total / page_size);
        res.render('home', {
            posts: posts, 
            search_results: '', 
            total_pages: total_pages,
            current_page: page
        });
        return         
    } else if (Object.keys(req.query).length === 1 && req.query.hasOwnProperty('page')){
        posts = await Post.query().withGraphFetched('user').offset(offset).limit(page_size);
        total = await Post.query().resultSize();
        total_pages = Math.ceil(total / page_size);
        res.render('home', {
            posts: posts, 
            search_results: '', 
            total_pages: total_pages,
            current_page: page
        });
        return 
    }else{

        const {error, value } = searchSchema.validate(req.query)

        // check if error exists in user input
        if (error){
            res.render('home', {error: error.details[0].message})
            return
        }

        const search_results = await Post.query()
        .offset(offset)
        .limit(page_size)
        .withGraphFetched('user')
        .where('title', 'ilike', `%${value.search}%`)
        .orWhere('body', 'ilike', `%${value.search}%`);

        const total = await Post.query()
        .offset(offset)
        .limit(page_size)
        .where('title', 'ilike', `%${value.search}%`)
        .orWhere('body', 'ilike', `%${value.body}%`)
        .resultSize();

        total_pages = Math.ceil(total / page_size);

        // console.log(search_results)
        res.render('home', {
            search_results: search_results, 
            posts: '', 
            current_page: page, 
            total_pages: total_pages
        });

    }

}