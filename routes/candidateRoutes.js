const express = require('express')
const router = express.Router()

const Candidate = require('./../models/candidate')
const User = require('./../models/users')
const { jwtAuthMiddleware, jwtgeneratetoken } = require('../jwt')
const { count } = require('console')
checkadmin = async (userid) => {
    try {
        const userr = await User.findById(userid)
        return userr.role == 'admin'
    } catch (error) {
        console.log(error.message)
        return false
    }

}
router.post('/', jwtAuthMiddleware, async (req, res) => {
    try {
        if (await !checkadmin(req.user.id)) {
            return res.status(403).json({ message: 'Wrong Address' })
        }
        data = req.body
        newcandidate = new Candidate(data)
        result = await newcandidate.save()
        return res.status(201).json({ message: 'Candidate saved successfully', data: result, token: jwttoken });
    } catch (error) {
        return res.status(500).json({ message: 'Error saving candidate', error: error.message });
    }
})


router.put('/:candidateid', jwtAuthMiddleware, async (req, res) => {
    try {
        if (!checkadmin(req.user.id)) {
            return res.status(403).json({ message: 'Wrong Address, Admin only area' })
        }
        data = req.body
        givenid = req.params.candidateid
        responsemsg = await Candidate.findByIdAndUpdate(givenid, data, {
            newvalidator: true,
            new: true

        })
        if (!responsemsg) {
            return res.status(201).json('candidate not found')
        }
        else {
            return res.status(201).json({ responsemsg });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error saving candidate', error: error.message });
    }
})
router.delete('/:candidateid', jwtAuthMiddleware, async (req, res) => {
    try {
        if (!checkadmin(req.user.id)) {
            return res.status(403).json({ message: 'Wrong Address, Admin only area' })
        }
        givenid = req.params.candidateid
        responsemsg = await Candidate.findByIdAndDelete(givenid)
        if (!responsemsg) {
            return res.status(201).json('candidate not found')
        }
        else {
            return res.status(201).json('candidate deleted successfully');
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error saving candidate', error: error.message });
    }
})
router.put('vote/:candidateid', jwtAuthMiddleware, async (req, res) => {
    try {
        if (checkadmin(req.user.id)) {
            return res.status(403).json({ message: 'Admin cannot vote' })
        }
        const userid = req.user.id
        user = await User.findById(userid)
        const givenid = req.params.candidateid
        candidate = await Candidate.findById(givenid)
        if (!candidate) {
            return res.status(201).json('candidate not found')
        }
        if (!user) {
            return res.status(201).json('user not found')
        }
        if (user.isvoted) {
            return res.status(201).json('user not found')
        }
        user.isvoted = true
        await user.save()
        candidate.votecount++
        candidate.votes.push({ user: userid })
        await candidate.save()
        return res.status(201).json({ responsemsg: 'Voted Successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Error saving candidate', error: error.message });
    }
    router.get('/vote/count', async (req, res) => {
        try {
            candidates = await Candidate.find().sort({ votecount: 'desc' })
            datas = candidate.map((data) => {
                return {
                    party: data.party,
                    count: data.votecount
                }
            })
            return res.status(201).json(datas);
        } catch (error) {
            res.status(500).json({ message: 'Error saving candidate', error: error.message });

        }
    })
    router.get('/', async (req, res) => {
        try {
            // Find all candidates and select only the name and party fields, excluding _id
            const candidates = await Candidate.find({}, 'name party -_id');

            // Return the list of candidates
            res.status(200).json(candidates);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
})
module.exports = router