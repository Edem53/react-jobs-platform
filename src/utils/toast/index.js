import { eventBus } from "./eventBus";

export const toast = {
    success(message) {
        eventBus.emit("toast", {
            type: "success",
            message
        });
    },

    error(message) {
        eventBus.emit("toast", {
            type: "error",
            message
        });
    },

    info(message) {
        eventBus.emit("toast", {
            type: "info",
            message
        });
    },

    warning(message) {
        eventBus.emit("toast", {
            type: "warning",
            message
        });
    }
};