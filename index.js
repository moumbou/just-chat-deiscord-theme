const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const cors = require('cors')
const { jwtMiddleWare } = require('./middleware/jwt')
const { generateToken } = require('./TokenGenerator')
const Pusher = require("pusher");

//* Pusher *//
const pusher = new Pusher({
  appId: "1339366",
  key: "a99758da72bf2d376ff8",
  secret: "8628ff2ffa80a493f4ca",
  cluster: "eu",
  useTLS: true
});

//* Modals DB *//
const { userModal } = require('./modal/user')
const { channelModal } = require('./modal/channel')
const { messageModal } = require('./modal/message')

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.DB)

mongoose.connection.once('open', () => {
    console.log('connection DB successfull !')

    const channelChangeStream = mongoose.connection.collection('channels').watch()
    const messageChangeStream = mongoose.connection.collection('messages').watch()

    channelChangeStream.on('change', (change) => {
        if(change.operationType === 'insert') return pusher.trigger('channels', 'newChannel', {
            'change': change
        })
        console.log('error trigger pusher')
    })

    messageChangeStream.on('change', (change) => {
        if(change.operationType === 'insert') return pusher.trigger('messages', 'newMessage', {
            'change': change
        })
        console.log('error trigger pusher')
    })
})

app.get('/', jwtMiddleWare, async (req, res) => {
    const userId = req.userId

    const user = await userModal.findById(userId).select('-password')
    return res.status(200).json({
        auth: true,
        user
    })
})

app.post('/singup', async (req, res) => {
    const { userName, password, avatar } = req.body

    const userExist = await userModal.findOne({ userName })
    if(userExist) return res.status(401).send(null)

    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password, salt)

    const uid = mongoose.Types.ObjectId().toString()

    const newUser = new userModal({
        userName,
        password: hashedPass,
        avatar,
        id: uid.substring(uid.length - 5, uid.length)
    })

    const {_id} = await newUser.save()

    const token = generateToken(_id)

    return res.status(200).json({
        auth: true,
        token
    })
})

app.post('/login', async (req, res) => {

    const { userName, password } = req.body

    const user = await userModal.findOne({ userName })
    if(!user) return res.status(401).json({
        auth: false,
        message: "userName or password incorrect !"
    })

    const passwordMatch = await bcrypt.compare(password, user.password)
    if(!passwordMatch) return res.status(401).json({
        auth: false,
        message: "userName or password incorrect !"
    })
    
    user.password = ''

    const token = generateToken(user._id)
    return res.status(200).json({
        token,
        auth: true
    })
})

app.post('/add/channel', jwtMiddleWare, async (req, res) => {
    const { channelName } = req.body

    const channelExist = await channelModal.findOne({ channelName })
    if(channelExist) return res.status(401).send(null)

    const newChannel = new channelModal({
        channelName
    })
    const thisChannel = await newChannel.save()
    return res.status(200).json({
        channel: thisChannel,
        auth: true
    })
})

app.get('/channels', jwtMiddleWare, async (req, res) => {
    const channels = await channelModal.find()
    return res.status(200).send(channels)
})

app.get('/channel/:id', jwtMiddleWare, async (req, res) => {
    const channel_id = req.params.id

    const isObjectID = mongoose.isValidObjectId(channel_id)
    if(!isObjectID) return res.status(401).send(null)

    const channel = await channelModal.findOne({ _id: channel_id })
    if(!channel) return res.status(401).send(channel)

    const messages = await messageModal.aggregate([
        {
            $match: { channel: channel._id }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'currentUser',
            },
        },
        {
            $unwind: {
                path: '$currentUser',
                preserveNullAndEmptyArrays: true
            } 
        },
        {
            $sort: {
                "currentUser.timeNumber": -1
            }
        },
        {
            $project: {
                userName: '$currentUser.userName',
                avatar: '$currentUser.avatar',
                timeStamp: '$timeStamp',
                message: '$message'
            }
        }
    ])


    return res.status(200).json({
        auth: true,
        messages
    })
})

app.post('/add/message', jwtMiddleWare, async (req, res) => {
    const { channel_id, message } = req.body
    const user_id = req.userId

    const channel = await channelModal.findOne({ _id: channel_id }).select('_id')
    const user = await userModal.findOne({ _id: user_id }).select('_id')
    if(!channel || !user ) return res.status(401).json({
        auth: true,
        message: 'somthing went wrong'
    })
    
    const currentTime = new Date()
    const newMessage = new messageModal({
        channel: channel._id,
        user: user._id,
        message,
        timeStamp: currentTime.toUTCString(),
        timeNumber: currentTime
    })

    await newMessage.save()
    return res.status(200).json({
        auth: true,
        message: "message sent !"
    })
})

app.get('/get/message/:id', jwtMiddleWare, async (req, res) => {
    const message_id = req.params.id

    const message = await messageModal.aggregate([
        {
            $match: { _id: mongoose.Types.ObjectId(message_id) }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'currentUser',
            },
        },
        {
            $unwind: {
                path: '$currentUser',
                preserveNullAndEmptyArrays: true
            } 
        },
        {
            $sort: {
                "currentUser.timeNumber": -1
            }
        },
        {
            $project: {
                userName: '$currentUser.userName',
                avatar: '$currentUser.avatar',
                timeStamp: '$timeStamp',
                message: '$message'
            }
        }
    ])

    return res.status(200).json({
        auth: true,
        message
    })
})

app.listen(port , () => console.log(`Listening to port: ${port}`))
