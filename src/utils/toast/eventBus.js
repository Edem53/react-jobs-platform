const events = {};

export const eventBus = {
    on(eventName, callback) {
        if (!events[eventName]) {
            events[eventName] = new Set();
        }

        events[eventName].add(callback);

        return () => {
            events[eventName].delete(callback);
        };
    },

    emit(eventName, data) {
        events[eventName]?.forEach((callback) => {
            callback(data);
        });
    },

    off(eventName, callback) {
        events[eventName]?.delete(callback);
    }
};