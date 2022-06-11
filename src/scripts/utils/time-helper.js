const Time = {
  fromMinute(minutes) {
    const hour = this.addingZero(Math.floor(minutes / 60));
    const minute = this.addingZero(Math.floor(minutes % 60));
    const second = this.addingZero(Math.round((minutes * 60) % 60));
    return `${hour} : ${minute} : ${second}`;
  },


  fromSecond(seconds) {
    const minutes = seconds / 60;
    return this.fromMinute(minutes);
  },


  addingZero(number) {
    if (number.toString().length < 2) return `0${number}`;
    return number;
  },
};

export default Time;