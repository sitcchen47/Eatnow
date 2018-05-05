module.exports = {
    /**
     * 
     * @param {Date} pastDate 
     * @return {string}
     */
    getDif(pastDate) {
        if (!(pastDate instanceof Date)) throw "the parameter should be an instance of Date";
        let past = pastDate.getTime();
        let dif = Date.now() - past; // millisecond

        let secondDif = parseInt(dif / 1000);
        if (secondDif === 0) return 'just now';
        if (secondDif >= 1 && secondDif < 60) {
            return `${secondDif} seconds ago`;
        }
        let minDif = parseInt(secondDif / 60);
        if (minDif >= 1 && minDif < 60) {
            return `${minDif} minutes ago`;
        }
        let hourDif = parseInt(minDif / 60);
        if (hourDif >= 1 && hourDif < 24) {
            return `${hourDif} hours ago`;
        }
        let dayDif = parseInt(hourDif / 24);
        if (dayDif >= 1 && dayDif < 30) {
            return `${dayDif} days ago`;
        }
        let monthDif = parseInt(dayDif / 30);
        if (monthDif >= 1 && monthDif < 12) {
            return `${monthDif} months ago`;
        } 
        let yearDif = parseInt(monthDif / 12);
        return `${yearDif} years ago`;
    }
}