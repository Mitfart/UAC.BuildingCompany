(function timer() {
    const timer_pad__attr = "timer-pad";
    const timer_date__attr = "timer-date";

    const timer__cl = "timer";
    const timer_field__cl = timer__cl + "__counter";

    const timers = document.getElementsByClassName(timer__cl);
    const intervals = [timers.length];

    const time_separator = ":";

    for (let i = 0; i < timers.length; i++) {
        intervals[i] = setInterval(
            () => {
                let timer = timers[i];
                let timer_field = timer.getElementsByClassName(timer_field__cl)[0];

                let timer_date  = timer.getAttribute(timer_date__attr);
                let target_time = new Date(timer_date).getTime();
                let cur_time    = new Date().getTime();

                let delta_time = target_time - cur_time;

                let days    = Math.floor( delta_time / (1000 * 60 * 60 * 24));
                let hours   = Math.floor((delta_time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let minutes = Math.floor((delta_time % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((delta_time % (1000 * 60)) / 1000);

                let timer_pad = timer.getAttribute(timer_pad__attr) ?? 2;

                timer_field.innerHTML =
                    pad(days   ,  0) + time_separator +
                    pad(hours  , timer_pad) + time_separator +
                    pad(minutes, timer_pad) + time_separator +
                    pad(seconds, timer_pad);


                if (delta_time <= 0) {
                    clearInterval(intervals[i]);
                    timer_field.innerHTML = "TIME'S OUT!";
                }
            }, 1000
        );
    }
})();

function pad(number, length) {
    let str = '' + number;

    while (str.length < length)
        str = '0' + str;

    return str;
}