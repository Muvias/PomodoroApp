export function secondsToTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600).toString().padStart(2, "0");
    const min = Math.floor((seconds / 60) % 60).toString().padStart(2, "0");
    const sec = Math.floor((seconds % 60) % 60).toString().padStart(2, "0");

    return `${hours}:${min}:${sec}`;
};