var express = require('express');
var router = express.Router();

var mongojs = require('mongojs');
var db = mongojs('mongodb://zavitova:zavitushochka12@ds023373.mlab.com:23373/mytasklistzavitova', ['tasks']);

//Get all tasks
router.get('/tasks', function (req, resp, next) {
    db.tasks.find(function (err, tasks) {
        if (err) {
            resp.send(err);
        }

        resp.json(tasks);
    })

});


//Get Single Tasks
router.get('/tasks/:id', function (req, resp, next) {

    db.tasks.findOne({ _id: mongojs.ObjectId(req.params.id) }, function (err, task) {
        if (err) {
            resp.send(err);
        }

        resp.json(task);
    })

});


//Save Task
router.post('/task', function (req, resp, next) {
    var task = req.body;
    if (!task.title || !task.detail || !task.implementer || !(task.isDone + '')) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.tasks.save(task, function (err, task) {
            if (err) {
                resp.send(err);
            }
            resp.json(task);
        })
    }
});


//Delete Task
router.delete('/tasks/:id', function (req, resp, next) {

    db.tasks.remove({ _id: mongojs.ObjectId(req.params.id) }, function (err, task) {
        if (err) {
            resp.send(err);
        }

        resp.json(task);
    })

});


//Update
router.put('/tasks/:id', function (req, resp, next) {
    var task = req.body;
    var updatedTask = {};

    if (task.isDone) {
        updatedTask.isDone = task.isDone;
    }

    if (task.title) {
        updatedTask.title = task.title;
    }

    if (task.detail) {
        updatedTask.detail = task.detail;
    }
    if (task.implementer) {
        updatedTask.implementer = task.implementer;
    }

    console.log(updatedTask);
    if (!updatedTask) {
        resp.status(400);
        res.json({
            "error": "Bad Data"
        })
    } else {
        db.tasks.update({ _id: mongojs.ObjectId(req.params.id) }, updatedTask, {}, function (err, task) {
            if (err) {
                resp.send(err);
            }

            resp.json(task);
        })
    }
});

module.exports = router;