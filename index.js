import express from "express";
import bodyParser from "body-parser";


const app = express();
const port = 4000;

// In-memory data store
var  posts = [
  {
    id: 1,
    title: "The Rise of Decentralized Finance",
    content:
      "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
    author: "Alex Thompson",
    date: "2023-08-01T10:00:00Z",
  },
  {
    id: 2,
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    content:
      "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
    author: "Mia Williams",
    date: "2023-08-05T14:30:00Z",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    author: "Samuel Green",
    date: "2023-08-10T09:15:00Z",
  },{
    id: 4,
    title: "Artistic Expressions: Unleashing Creativity",
    content:
      "Art is a window to the soul. Dive into the world of artistic expressions, from visual arts to performing arts. Let your creativity flow, and discover the beauty of self-expression through art.",
    author: "Isabella Artist",
    date: "2023-09-12T10:10:00Z",
  } ,{
    id: 5,
    title: "Tech Trends: Navigating the Digital Landscape",
    content:
      "Technology is constantly evolving, and staying updated is essential. Explore the latest tech trends, gadgets, and innovations with us. Stay ahead in the digital world and make informed tech choices.",
    author: "Daniel Techie",
    date: "2023-08-30T14:20:00Z",
  },{
    id: 6,
    title: "Tech Trends: Navigating the Digital Landscape",
    content:
      "Technology is constantly evolving, and staying updated is essential. Explore the latest tech trends, gadgets, and innovations with us. Stay ahead in the digital world and make informed tech choices.",
    author: "Daniel Techie",
    date: "2023-08-30T14:20:00Z",
  },{
    id: 7,
    title: "Fitness & Wellness: Achieving a Healthier You",
    content:
      "Health is wealth, and fitness plays a vital role. This post is your guide to maintaining a healthier lifestyle. Learn about exercise routines, nutrition, and mental well-being. Start your journey to a more balanced life today.",
    author: "Olivia Health",
    date: "2023-10-02T08:00:00Z",
  },
];

let lastId = 7;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Write your code here//

//CHALLENGE 1: GET All posts
app.get("/posts", (req,res)=>{
  console.log(posts);
  res.json(posts);
});

//CHALLENGE 2: GET a specific post by id
app.get("/posts/:id", (req,res)=>{

  try {
   const id=parseInt(req.params.id);
   const foundPost=posts.find((post)=>post.id ===id);
   res.json(foundPost);
   }
   catch  {
     res.status(500).json({
      error: `Posts with id:${id} not found.$No post were deleted.`
    }) ;
     }
 });


//CHALLENGE 3: POST a new post
app.post("/posts", (req,res)=>{
const currentDate = new Date();

const options = { 
  year: 'numeric', 
  month: 'numeric', 
  day: 'numeric', 
  hour: 'numeric', 
  minute: 'numeric', 
  second: 'numeric', 
  timeZoneName :'Asia/Kolkata',
  timeZoneName: 'short' 
};
const formattedDate = currentDate.toLocaleString('en-IN', options);

console.log(formattedDate);

const newid = lastId +=1;

   const post={
     id: newid ,
     title:req.body.title,
     content:req.body.content,
     author:req.body.author,
     date:formattedDate,
   } 
   lastId=newid ;
   const updatePost= posts.push(post);
   console.log(updatePost);
   console.log(post);
   res.json(post);
 
});

//CHALLENGE 4: PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req,res)=>{
  const id =parseInt(req.params.id);
  const existingPost=posts.find((post)=>post.id===id);
  const post={
    id:id,
    title:req.body.title || existingPost.title,
    content:req.body.content || existingPost.content,
    author:req.body.author || existingPost.author ,
  };
  const serchIndex = posts.findIndex((post)=>post.id ===id);
  posts[serchIndex] = post;
  console.log(posts[serchIndex]);
  res.json(post);
});  

//CHALLENGE 5: DELETE a specific post by providing the post id.
app.delete("/posts/:id",(req,res)=>{
  const id=parseInt(req.params.id);
  const serchIndex=posts.findIndex((post)=>post.id===id);
  console.log(serchIndex);
  if (serchIndex > -1){
    posts.splice(serchIndex,1);
    res.json({ message: "Post deleted" });
  } else{
    res.status(404).json({
      error: `Posts with id:${id} not found.$No post were deleted.`
    }) ;
  }
});




app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
