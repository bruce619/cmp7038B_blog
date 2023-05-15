const setupDB = require('../db/db-setup');
const Post = require('../models/post');
const { searchSchema } = require('../utility/validations');

setupDB();

// page size for pagination
const page_size = 4;

exports.homeView = async (req, res) => {

    // current uer
    const current_user = req.session.userId;

    // current page
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const offset = (page - 1) * page_size;
    
    if (Object.keys(req.query).length === 0){
        posts = await Post.query().withGraphFetched('user').offset(offset).limit(page_size).orderBy('created_at', 'desc');
        total = await Post.query().resultSize();
        total_pages = Math.ceil(total / page_size);

        res.status(200).render('home', {
            posts: posts, 
            search_results: '', 
            total_pages: total_pages,
            current_page: page,
            current_user: current_user
        });
        return         
    } else if (Object.keys(req.query).length === 1 && req.query.hasOwnProperty('page')){
        posts = await Post.query().withGraphFetched('user').offset(offset).limit(page_size).orderBy('created_at', 'desc');
        total = await Post.query().resultSize();
        total_pages = Math.ceil(total / page_size);

        res.status(200).render('home', {
            posts: posts, 
            search_results: '', 
            total_pages: total_pages,
            current_page: page,
            current_user: current_user
        });
        return 
    }else{

        const {error, value } = searchSchema.validate(req.query)

        // check if error exists in user input
        if (error){
            res.status(400).render('home', {error: error.details[0].message})
            return
        }

        const search_results = await Post.query()
        .offset(offset)
        .limit(page_size)
        .withGraphFetched('user')
        .where('title', 'ilike', `%${value.search}%`)
        .orWhere('body', 'ilike', `%${value.search}%`)
        .orderBy('created_at', 'desc');

        const total = await Post.query()
        .offset(offset)
        .limit(page_size)
        .where('title', 'ilike', `%${value.search}%`)
        .orWhere('body', 'ilike', `%${value.search}%`)
        .resultSize();

        total_pages = Math.ceil(total / page_size);

        res.status(200).render('home', {
            search_results: search_results, 
            posts: '', 
            current_page: page, 
            total_pages: total_pages,
            current_user: current_user
        });

    }

}


exports.privacyView = async (req, res) =>{
    res.status(200).render("privacy", {})
}

exports.termsConditionsView = async (req, res) =>{
    res.status(200).render("terms_and_conditions", {})
}