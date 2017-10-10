const NodeHelper = require("node_helper");
const url = require("url");

module.exports = NodeHelper.create({

    start: function() {
        this.expressApp.get('/browser', (req, res) => {

            var query = url.parse(req.url, true).query;

            var id = query.id;

            if (id == null){
                res.send({"status": "failed", "error": "No id given."});
            } else {
                this.sendSocketNotification("NEW_SEARCH", id);
                res.send({"status": "success", "payload": id});
            }
        });
    }
});
