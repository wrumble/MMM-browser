const NodeHelper = require("node_helper");
const url = require("url");

module.exports = NodeHelper.create({

    start: function() {
        this.expressApp.get('/browser', (req, res) => {

            var query = url.parse(req.url, true).query;
            var search = query.search;

            console.log(url);
            console.log(query);
            console.log(search);

            if (search == null){
                res.send({"status": "failed", "error": "No search given."});
            } else {
                this.sendSocketNotification("NEW_SEARCH", search);
                res.send({"status": "success", "payload": search});
            }
        });
    }
});
