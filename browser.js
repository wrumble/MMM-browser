Module.register("browser",{

    defaults: {
        search: ""
    },

    start: function() {
        Log.info("Starting module: " + this.name);
        this.sendSocketNotification("LINK");
    },

    getStyles: function() {
        return ['browser.css'];
    },

    sendCommand: function(cmd){
        var browserWindow = document.getElementById('browserWindow');
        if(browserWindow){
            browserWindow.contentWindow.postMessage(JSON.stringify({
                "event": "command",
                "func": cmd
            }), "*");
        }
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "NEW_SEARCH"){
            this.config.search = payload;
            this.updateDom(1000);
        }
    },

    getDom: function() {

        var wrapper = document.createElement("div");
        var iframe = document.createElement("iframe");

        iframe.setAttribute("id", "browserWindow");
        iframe.setAttribute("src", "https://www.google.com/search?q=" + this.config.search);
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("type", "text/html");


        wrapper.appendChild(iframe);

        return wrapper;
    }
});
