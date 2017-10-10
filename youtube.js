Module.register("browser",{

    defaults: {
        search: ""
    },

    start: function() {
        Log.info("Starting module: " + this.name);
        this.sendSocketNotification("CONNECT");
    },

    getStyles: function() {
        return ['script.css'];
    },

    sendCommand: function(cmd){
        var myPlayer = document.getElementById('my-video');
        if(myPlayer){
            myPlayer.contentWindow.postMessage(JSON.stringify({
                "event": "command",
                "func": cmd
            }), "*");
        }
    },

    notificationReceived: function(notification, payload) {
        if (notification === "PAUSE_VIDEO"){
            this.sendCommand("pauseVideo");
        }
        if (notification === "PLAY_VIDEO"){
            this.sendCommand("playVideo");
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

        var background = document.createElement("div");
        background.classList.add("video-background");
ß
        var foreground = document.createElement("div");
        foreground.classList.add("video-foreground");

        var iframe = document.createElement("iframe");
        iframe.setAttribute("id", "my-video");
        iframe.setAttribute("src", "http://www.google.com/search?q=" + this.config.search);
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("type", "text/html");

        foreground.appendChild(iframe);
        background.appendChild(foreground);
        wrapper.appendChild(background);

        return wrapper;
    }
});
