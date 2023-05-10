const setupDB = require('../db/db-setup');
const Post = require('../models/post');
const { User } = require('../models/user');
const { uuidSchema, postSchema, updatePostSchema } = require('../utility/validations');

setupDB();

exports.PostDetailView = async (req, res) => {

    const {error, value } = uuidSchema.validate(req.params)

    if (error){
        res.render('home', {error: error.details[0].message})
        return
    }

    const post = await Post.query().findById(value.id).withGraphFetched('user').first();

    if (!post){
        res.render('home', {error: "Post no longer exists"})
        return
    }

    const current_user = req.session.userId

    res.render('post_detail', {post: post, current_user: current_user});
}


exports.postView = async (req, res) => {

    current_user = req.session.userId

    res.render('create_post', {current_user: current_user})
}

exports.createPost = async (req, res) => {


    const {error, value} = postSchema.validate(req.body)

    if (error){
        res.render('home', {error: error.details[0].message})
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
        res.redirect('/login')
        return
    });

    }else{
        // insert the user id in the object
        value.author = user_id

        console.log(value)

        Post.query()
        .insert(value)
        .then((post)=>{
            console.log(post)
            req.flash('success', `Successfully created Post!`)
            res.redirect('/')
        })
        .catch((err)=>{
            console.error(err)
        })

    }

}// 

exports.updatePostView = async (req, res) => {

    const {error, value} = uuidSchema.validate(req.params)

    if (error){
        res.render('home', {error: error.details[0].message})
        return
    }

    const postExists = await Post.query().findById(value.id).first();

    if (!postExists){
        res.render('home', {error: "Post does not exists"})
        return
    }

    current_user = req.session.userId

    res.render("update_post", {title: postExists.title, body: postExists.body, current_user: current_user, post_id: value.id})
}

exports.updatePost = async (req, res) => {

    const new_req_obj = {...req.body, ...req.params}

    console.log(new_req_obj)

    const {error, value} = updatePostSchema.validate(new_req_obj)

    if (error){
        res.render('home', {error: error.details[0].message})
        return
    }

    const postExists = await Post.query().findById(value.id).withGraphFetched('user').first();

    console.log(postExists)

    if (!postExists){
        req.flash('error', `No such post`)
        res.redirect("/")
        return
    }

    const current_user = req.session.userId

    if (current_user !== postExists.user.id){
        req.flash('error', `Permission Denied. You are not the user`)
        res.redirect("/")
        return
    }


    
    // remove id from object
    delete value.id

    postExists.$query()
    .update(value)
    .then((updatedPost)=>{
        console.log(updatedPost)
        req.flash('success', `Successfully updated post`)
        res.redirect("/")
    })
    .catch((err)=>{
        console.error(err)
    })



}