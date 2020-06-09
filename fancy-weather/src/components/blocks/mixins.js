import i18n from "./../../i18n";

export default {
    data () {
        return {
            currentTime: ''
        }
    },
    created() {
        setInterval(() => this.getCurrentTime(), 1000)
    },
    methods: {
        getCurrentTime()
        {
            const d = new Date();
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

            const day = days[d.getDay()];
            const date = d.getDate();
            const month = months[d.getMonth()];
            const year = d.getFullYear();
            const h = Math.abs(d.getHours() - (Math.abs(new Date().getTimezoneOffset() / 60) - (this.getGeolocation ? this.getGeolocation.annotations.timezone.offset_sec / 60 / 60 : 0)));
            const m = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
            const s = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
            this.currentTime = `${i18n.t('days.' + day)} ${date} ${i18n.t('months.' + month)} ${year} ${h}:${m}:${s}`
        }
    }
}


