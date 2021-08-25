const Pending = 'pending'
const Fulfilled = 'fulfilled'
const Rejected = 'Rejected'

class FakePromise {
    
    status = Pending;
    value = null;
    reason = null;
    onFulfilledCallback = null;
    onRejectedCallback = null;

    constructor(executor) {
        executor(this.resolve, this.rejected);
    }

    resolve(value) {
        if (this.status === Pending) {
            this.value = value;
            this.status = Fulfilled;
            this.onFulfilledCallback && this.onFulfilledCallback(this.value);
        }
    }

    rejected(reason) {
        if (this.status === Pending) {
            this.value = reason;
            this.status = Rejected;
            this.onRejectedCallback && this.onRejectedCallback(this.reason);
        }
    }

    then(onFulFilled, onRejected) {
        if (this.status === Fulfilled) {
            onFulFilled(this.value);
        } else if (this.status === Rejected) {
            onRejected(this.reason);
        } else if (this.status === Pending) {
            this.onFulfilledCallback = onFulFilled;
            this.onRejectedCallback = onRejected;
        }
    }
}