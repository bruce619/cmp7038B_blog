const setupDB = require('../db/db-setup');
const Post = require('../models/post');
const { User } = require('../models/user');
const { uuidSchema, postSchema, updatePostSchema } = require('../utility/validations');

setupDB();

exports.PostDetailView = async (req, res) => {

    const {error, value } = uuidSchema.validate(req.params)

    if (error){
        res.status(400).render('home', {error: error.details[0].message})
        return
    }

    const post = await Post.query().findById(value.id).withGraphFetched('user').first();

    if (!post){
        res.status(404).render('home', {error: "Post no longer exists"})
        return
    }

    const current_user = req.session.userId

    res.status(200).render('post_detail', {post: post, current_user: current_user});
}


exports.postView = async (req, res) => {

    console.log('========GET REQUEST=========')
    console.log(req.csrfToken())

    current_user = req.session.userId

    res.status(200).render('create_post', {current_user: current_user})
}

exports.createPost = async (req, res) => {

    console.log('========POST REQUEST=========')
    console.log(req.body._csrf)

    delete req.body._csrf

    const {error, value} = postSchema.validate(req.body)

    if (error){
        res.status(400).render('home', {error: error.details[0].message})
        return
    }

    user_id = req.session.userId

    const userExists = await User.query().findById(user_id).first()

    if (!userExists){

    // destroy session
    req.session.destroy(function (err) {
        if (err){
            return console.log(`Error ${err}`);
        }
        // redirect to login
        req.flash('error', `No such user`)
        res.status(404).redirect('/login')
        return
    });

    }else{
        // insert the user id in the object
        value.author = user_id

        console.log("I am in create post")
        Post.query()
        .insert(value)
        .then((post)=>{
            req.flash('success', `Successfully created Post!`)
            res.status(201).redirect('/')
        })
        .catch((err)=>{
            console.error(err)
        })

    }

}// 

exports.updatePostView = async (req, res) => {

    console.log('========GET REQUEST=========')
    console.log(req.csrfToken())

    const {error, value} = uuidSchema.validate(req.params)

    if (error){
        res.status(400).render('home', {error: error.details[0].message})
        return
    }

    const postExists = await Post.query().withGraphFetched('user').findById(value.id).first();

    if (!postExists){
        res.status(404).render('home', {error: "Post does not exists"})
        return
    }

    const current_user = req.session.userId

    if (current_user !== postExists.user.id){
        req.flash('error', `Permission Denied. You are not the user`)
        res.status(403).redirect("/")
        return
    }

    res.status(200).render("update_post", {title: postExists.title, body: postExists.body, current_user: current_user, post_id: value.id})
}

exports.updatePost = async (req, res) => {

    console.log('========POST REQUEST=========')
    console.log(req.body._csrf)

    delete req.body._csrf

    const new_req_obj = {...req.body, ...req.params}

    const {error, value} = updatePostSchema.validate(new_req_obj)

    if (error){
        res.status(400).render('home', {error: error.details[0].message})
        return
    }

    const postExists = await Post.query().findById(value.id).withGraphFetched('user').first();

    if (!postExists){
        req.flash('error', `No such post`)
        res.status(404).redirect("/")
        return
    }

    const current_user = req.session.userId

    if (current_user !== postExists.user.id){
        req.flash('error', `Permission Denied. You are not the user`)
        res.status(403).redirect("/")
        return
    }

    const post_id = value.id
    
    // remove id from object
    delete value.id

    postExists.$query()
    .patch(value)
    .then(()=>{
        req.flash('success', `Successfully updated post`)
        res.status(200).redirect(`/post-detail/${post_id}`)
    })
    .catch((err)=>{
        console.error(err)
    })



}


exports.deletePost = async (req, res) =>{
    
    const {error, value} = uuidSchema.validate(req.params);

    const postExists = await Post.query().findById(value.id).withGraphFetched('user').first();

    if (!postExists){
        req.flash('error', `No such post`)
        res.status(404).redirect("/")
        return
    }

    const current_user = req.session.userId

    if (current_user !== postExists.user.id){
        req.flash('error', `Permission Denied. You are not the user`)
        res.status(403).redirect("/")
        return
    }
    
    Post.query()
    .where('id', value.id)
    .andWhere('author', current_user)
    .delete()
    .then(()=>{
        req.flash('success', `Successfully deleted post`)
        res.status(200).redirect("/")
    })
    .catch((err)=>{
        console.error(err)
    })

}