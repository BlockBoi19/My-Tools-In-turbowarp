class Thebloxers998sTools {
    getInfo() {
        return {
            id: 'thebloxers998sTools',
            name: "Thebloxers998's Tools",
            color1: '#FFA500', // Primary block color
            color2: '#E59400', // Secondary block color
            color3: '#CC8400', // Tertiary block color
            blocks: [
                {
                    opcode: 'initializeFirebase',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'initialize Firebase with [APIKEY] [AUTHDOMAIN] [DATABASEURL] [PROJECTID] [STORAGEBUCKET] [MESSAGINGSENDERID] [APPID]',
                    arguments: {
                        APIKEY: { type: Scratch.ArgumentType.STRING, defaultValue: 'your-api-key' },
                        AUTHDOMAIN: { type: Scratch.ArgumentType.STRING, defaultValue: 'your-auth-domain' },
                        DATABASEURL: { type: Scratch.ArgumentType.STRING, defaultValue: 'your-database-url' },
                        PROJECTID: { type: Scratch.ArgumentType.STRING, defaultValue: 'your-project-id' },
                        STORAGEBUCKET: { type: Scratch.ArgumentType.STRING, defaultValue: 'your-storage-bucket' },
                        MESSAGINGSENDERID: { type: Scratch.ArgumentType.STRING, defaultValue: 'your-messaging-sender-id' },
                        APPID: { type: Scratch.ArgumentType.STRING, defaultValue: 'your-app-id' },
                    }
                },
                {
                    opcode: 'makeHttpRequest',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'HTTP request [URL]',
                    arguments: {
                        URL: { type: Scratch.ArgumentType.STRING, defaultValue: 'https://example.com/api' }
                    }
                },
                {
                    opcode: 'getDeviceType',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'device type'
                },
                {
                    opcode: 'getScreenWidth',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'screen width'
                },
                {
                    opcode: 'getScreenHeight',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'screen height'
                },
                {
                    opcode: 'getBatteryLevel',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'battery level'
                },
                {
                    opcode: 'isOnline',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'is online'
                },
                {
                    opcode: 'getGeolocation',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'geolocation'
                },
                {
                    opcode: 'getBrowserLanguage',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'browser language'
                },
                {
                    opcode: 'getTimeZone',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'time zone'
                },
                {
                    opcode: 'getCurrentTime',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'current time'
                },
                {
                    opcode: 'getOrientation',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'device orientation'
                },
                {
                    opcode: 'vibrateDevice',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'vibrate device [DURATION] milliseconds',
                    arguments: {
                        DURATION: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 1000
                        }
                    }
                },
                {
                    opcode: 'setData',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'set data [KEY] to [VALUE]',
                    arguments: {
                        KEY: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'key'
                        },
                        VALUE: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'value'
                        }
                    }
                },
                {
                    opcode: 'getData',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'data for [KEY]',
                    arguments: {
                        KEY: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'key'
                        }
                    }
                }
            ]
        };
    }

    initializeFirebase(args) {
        const firebaseConfig = {
            apiKey: args.APIKEY,
            authDomain: args.AUTHDOMAIN,
            databaseURL: args.DATABASEURL,
            projectId: args.PROJECTID,
            storageBucket: args.STORAGEBUCKET,
            messagingSenderId: args.MESSAGINGSENDERID,
            appId: args.APPID
        };
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        } else {
            firebase.app().delete().then(() => firebase.initializeApp(firebaseConfig));
        }
    }

    async makeHttpRequest(args) {
        const response = await fetch(args.URL);
        return await response.text();
    }

    getDeviceType() {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        if (/android/i.test(userAgent)) {
            return 'Android';
        }
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return 'iOS';
        }
        return 'other';
    }

    getScreenWidth() {
        return window.screen.width;
    }

    getScreenHeight() {
        return window.screen.height;
    }

    async getBatteryLevel() {
        const battery = await navigator.getBattery();
        return (battery.level * 100) + '%';
    }

    isOnline() {
        return navigator.onLine ? 'Yes' : 'No';
    }

    getGeolocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                return `Lat: ${position.coords.latitude}, Lon: ${position.coords.longitude}`;
            });
        } else {
            return 'Geolocation not available';
        }
    }

    getBrowserLanguage() {
        return navigator.language || navigator.userLanguage;
    }

    getTimeZone() {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
    }

    getCurrentTime() {
        return new Date().toLocaleTimeString();
    }

    getOrientation() {
        return window.screen.orientation.type;
    }

    vibrateDevice(args) {
        window.navigator.vibrate(args.DURATION);
    }

    setData(args) {
        firebase.database().ref(args.KEY).set(args.VALUE);
    }

    getData(args) {
        return firebase.database().ref(args.KEY).once('value').then(snapshot => snapshot.val());
    }
}

Scratch.extensions.register(new Thebloxers998sTools());