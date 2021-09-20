function get_datetime(){
    DD = new Date();
    Year = DD.getYear();
    Month = DD.getMonth() + 1;
    Day = DD.getDate();
    Hours = DD.getHours();
    Minutes = DD.getMinutes();
    Seconds = DD.getSeconds();

    Year += 1900;
    Month = ("00" + Month).slice(-2);
    Day = ("00" + Day).slice(-2);
    Hours = ("00" + Hours).slice(-2);
    Minutes = ("00" + Minutes).slice(-2);
    Seconds = ("00" + Seconds).slice(-2);
    return Year + "/" + Month + "/" + Day + " " + Hours + ":" + Minutes + ":" + Seconds;
}

class Monitor {

    constructor(){
        // initialize variables
        this.api_link = "";
        this.img_data = null;
        this.is_reload = false;
        this.delay = 1; // [second]
        this.timer_id = null;
        this.last_reloaded_datetime = null;
    }

    set_last_reloaded_time(){
        this.last_reloaded_datetime = get_datetime();
    }

    set_api_link(link){
        this.api_link = link;
    }

    fetch_img_data(){
        axios.get(this.api_link)
            .then(response => {
                this.img_data = response.data.img_base64;
                this.set_last_reloaded_time();
            })
            .catch(error => {console.log(error)});
    }

    stop_reloading(){
        this.is_reload = false;
        window.clearInterval(this.timer_id);
    }

    begin_reloading(){
        this.stop_reloading();
        this.is_reload = true;
        this.timer_id = window.setInterval(this.fetch_img_data.bind(this), Number(this.delay) * 1000);
    }

}

var app = new Vue({
    el: '#app',
    data: {
        monitors: [],
        n_cols: 2,
        is_hide_propaties: false,
    },

    methods: {
        add_monitor: function(link){
            new_monitor = new Monitor(link);
            new_monitor.fetch_img_data();
            this.monitors.push(new_monitor);
        },

        delete_monitor: function(index){
            this.monitors.splice(index, 1);
        },
    },

    mounted :function(){
        this.add_monitor();
    }
});