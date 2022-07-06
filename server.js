const express =require('express');
const connect = require('./config/connectDB');
const User = require('./models/User');
require('dotenv').config({ path: './config/.env' })

var app = express();

app.use(express.json());

connect();

app.post('/add',async(req,res)=>{
    const {fullName,email,phone}=req.body
    try {
        const newUser = new User({
            fullName,
            email,
            phone

        })
    await newUser.save();
    res.send(newUser);
    
    } catch (error) {
        console.log(error)
        
    }

})
app.get('/get',async(req,res)=>{


const users = await User.find()
res.send(users)


});

app.get('/get/:id',async(req,res)=>{


    const users = await User.findById(req.params.id);
    res.send(users);
})

app.put('/update/:id',async(req,res)=>{

try {
    const editedUser = await User.findByIdAndUpdate(req.params.id,{...req.body},{new:true})
    res.send(editedUser);
    
} catch (error) {
    console.log(error);
}

})
app.delete('/delete/:id',async(req,res)=>{
try {
    await User.findByIdAndDelete(req.params.id)
    res.send('User deleted')
} catch (error) {
    console.log(error)
}



}
)






var PORT= process.env.PORT || 5000;

app.listen(PORT,err=>err?console.error(err):console.log(`Server is running on port ${PORT}`));