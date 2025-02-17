export default function formatDate(dateString: string): string {
    const d = new Date(dateString);
    return `${d.getDate()} / ${d.getMonth() + 1} / ${d.getFullYear()}`;
}