export const openNotificationWithIcon = (api, type, title, description, duration) => {
    api[type]({
    message: title,
    description: description,
    duration: duration
    });
};