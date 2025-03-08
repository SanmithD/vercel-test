import postModel from "../models/post.model.js";

const postInfo = async(req, res) =>{
    const { title, content } = req.body;
    if(!title || !content){
        return res.status(400).json({
            success: false,
            message: "Please enter details"
        });
    };
    try {
        const response = new postModel({
            title,
            content
        });
        
        // Save the document to the database
        await response.save();
        
        if(!response){
            return res.status(400).json({
                success: false,
                message: "Unable to post"
            });
        }
        res.status(200).json({
            success: true,
            message: "Info posted",
            response
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
        console.log(error);
    };
};
const getPostInfo = async(req, res) =>{
    try {
        const response = await postModel.find();
        if(!response){
            return res.status(404).json({
                success: false,
                message: "Empty"
            });
        }
        res.status(200).json({
            success: true,
            message: "All info data",
            response
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
        console.log(error);
    };
};

const deletePost = async(req, res) =>{
    const { _id } = req.params;
    if(!_id){
        return res.status(400).json({
            success: false,
            message: "Please enter id"
        });
    };
    try {
        const response = await postModel.findByIdAndDelete(_id);
        if(!response){
            return res.status(404).json({
                success: false,
                message: "Not found"
            });
        };
        res.status(200).json({
            success: true,
            message: "Post deleted",
            response
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
        console.log(error);
    };
};

export { deletePost, getPostInfo, postInfo };
