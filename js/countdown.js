
class CountDown {

    constructor(expiredDate, onRender, onComplete) {
        this.setExpiredDate(expiredDate);
        this.onRender = onRender;
        this.onComplete = onComplete;
    }

    setExpiredDate(expiredDate) {
        //get the current time
        const currentTime = new Date().getTime();

        //calculate the remaining time
        this.timeRemaining = expiredDate.getTime() - currentTime;

        //should the countdown complete or start?
        this.timeRemaining <= 0 ?
        this.complete() :
        this.start();
    }

    //Checks if onComplete callback is passed and invokes it; if unavailable does nothing
    complete() {
        if (typeof this.complete === 'function') {
            onComplete();
        }
    }

    
    getTime() {
        return {
            days: Math.floor(this.timeRemaining / 1000 / 60 / 60 / 24),
            hours: Math.floor(this.timeRemaining / 1000 / 60 / 60) % 24,
            minutes: Math.floor(this.timeRemaining / 1000 / 60) % 60,
            seconds: Math.floor(this.timeRemaining / 1000) % 60
        };
    }


    update() {
        if (typeof this.onRender === 'function') {
            this.onRender(this.getTime());
        }
    }


    // reduces timeRemaining property every second. if time remaining < 0,
    // the start method will first call the complete() method
    // second, call the timer using the clearInterval() function
    start() {
        //update the countdown
        this.update();

        //setup a timer
        const intervalId = setInterval(() => {
            //update the timer
            this.timeRemaining -= 1000;

            if (this.timeRemaining < 0) {
                //call the callback
                complete();

                //clear the interval if expired
                clearInterval (intervalId);
            } else {
                this.update();
            }
        }, 1000)
    }


    //defines the update method that calls onRender with curent remaining time
    //returned by getTime
   
}