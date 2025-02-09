export default function formateMongoDate(createdAt) {
    const date = new Date(createdAt);
    const time = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    const formattedDate = date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const day = date.toLocaleDateString('en-GB', { weekday: 'long' });
    
    return { time, date: formattedDate, day };
}