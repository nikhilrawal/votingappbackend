const express = require('express')
const router = express.Router()
const User = require('./../models/users')
const { jwtAuthMiddleware, jwtgeneratetoken } = require('./../jwt')
router.post('/signup', async (req, res) => {
    try {
        data = req.body
        newperson = new User(data)
        if (newperson.role == 'admin') {
            const adminexist = await User.findOne({ role: 'admin' })
            if (adminexist) {
                return res.status(401).json({ message: 'Admin already exist' });
            }
        }
        result = await newperson.save()
        payload = {
            id: result.id,
        }
        jwttoken = jwtgeneratetoken(payload)
        return res.status(201).json({ message: 'Person saved successfully', data: result, token: jwttoken });
    } catch (error) {
        return res.status(500).json({ message: 'Error saving person', error: error.message });
    }
})

router.post('/login', async (req, res) => {
    try {
        const { aadhar, password } = req.body
        prsn = await User.findOne({ aadhar: aadhar })
        if (!prsn) {
            return res.status(401).json({ message: 'Invalid aadhar', error: error.message });
        }
        pass = await prsn.comparePassword(password)
        if (pass) {
            payload = {
                id: prsn.id,
            }
            jwttoken = jwtgeneratetoken(payload)
            return res.status(201).json({ token: jwttoken });
        }
        else {
            return res.status(401).json({ message: 'Invalid password', error: error.message });
        }

    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err })
    }

})

router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try {
        userdata = req.user
        const data = await User.findById(userdata.id)
        console.log('person fetch successful')
        return res.status(200).json(data)

    } catch (error) {
        console.log('person fetch unsuccessful')
        return res.status(500).json('Internal Server Error')
    }
})

router.put('/profile/password', jwtAuthMiddleware, async (req, res) => {
    try {
        userid = req.user.id
        const { currpass, newpass } = req.body
        user = User.findById(userid)
        pass = await user.comparePassword(currpass)
        if (!pass) {
            return res.status(401).json({ message: 'Invalid password', error: error.message });
        }
        user.password = newpass
        await user.save
        res.status(201).json({ responsemsg: "Password updated" });
    } catch (error) {
        res.status(500).json({ message: 'Error saving person', error: error.message });
    }
})
module.exports = router