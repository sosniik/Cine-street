module.exports = {
    infoDate: (data)=>{
        let date = data.split(' ')[0]
        let time = data.split(' ')[1]

        let day = date.split('/')[0]
        let month = date.split('/')[1]
        let year = date.split('/')[2]

        let hour, minutes, seconds
        if(typeof(time) != "undefined"){
            hour = time.split(':')[0]
            minutes = time.split(':')[1]
            seconds = time.split(':')[2]
        }
        return {
            getHours: ()=>{
                return hour
            },
            getMinutes: ()=>{
                return minutes
            },
            getSeconds: ()=>{
                return seconds
            },
            getYear: ()=>{
                return year
            },
            getMonth: ()=>{
                return month
            },
            getDay: ()=>{
                return day
            }
        }
    },
    getTimeNow: ()=>{
        let date = new Date
        let year = date.getFullYear()
        let month = date.getMonth()
        let day = date.getDay()
        let hour = date.getHours()
        let minutes = date.getMinutes()
        let seconds = date.getSeconds()
        if(day < 10){
            day = "0" + day
        }
        if(month < 10){
            month = "0" + month
        }
        return `${year}/${month}/${day} ${hour}:${minutes}:${seconds}`
    }
}