
// import { Duplex } from 'stream';

const noop = () => {
    return undefined;
};

export default class PostMessageStream {
    
    _target;
    _name;
    _targetWindow;
    _origin;
    _init;
    _haveSyn;

    constructor({ name, target, targetWindow }) {
        // super({ objectMode: true });

        this._name = name;
        this._target = target;
        this._targetWindow = targetWindow || window;
        // this._origin = targetWindow ? '*' : location.origin;
        this._origin = '*';
    
        // initialization flags
        this._init = false;
        this._haveSyn = false;
        this.onMessage = this.onMessage.bind(this);
    
        window.addEventListener('message', this.onMessage, false);
        // send syncorization message
        this.write('SYN', null, noop);
        // this.cork();
    }

    _destroy() {
        console.log('PostMessageStream: destroy');
        window.removeEventListener('message', this.onMessage, false);
    }

    onMessage(event) {
        const msg = event.data;
        
        // validate message
        if (this._origin !== '*' && event.origin !== this._origin) return;
        if (event.source !== this._targetWindow) return;
        if (typeof msg !== 'object') return;
        if (msg.target !== this._name) return;
        if (!msg.data) return;
        
                    console.log("Received =", msg);

        if (!this._init) {
          if (msg.data === 'SYN') {
            this._haveSyn = true;
            this.write('ACK', null, noop);
          } else if (msg.data === 'ACK') {
            this._init = true;
            if (!this._haveSyn) {
              this.write('ACK', null, noop);
            }
            // this.uncork();
          }
        } else {
          // forward message
          try {
            // this.push(msg.data);
            console.log("push");
          } catch (err) {
            console.warn(err);
            // this.emit('error', err);
          }
        }
    }

    write(data, _encoding, cb) {
        setTimeout(() => {
            const message = {
                target: this._target,
                data: data,
            };
            this._targetWindow.postMessage(message, this._origin);
            console.log("Write message =", message);
            // cb(null);

        },1000)
    }
   
}