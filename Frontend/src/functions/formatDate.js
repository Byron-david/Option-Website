const formatDate = (date) => {
    if (!date) {
        return null
    }
    const newDate = new Date(date)
    const yyyy = newDate.getFullYear().toString();
    const mm = newDate.getMonth() + 1;
    const dd = newDate.getDate();
    return `${mm}/${dd}/${yyyy.slice(-2)}`
}

export default formatDate