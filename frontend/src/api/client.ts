const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const apiGet = async <T>(path: string): Promise<T> => {
    const response = await fetch(`${baseUrl}${path}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('GET failed');
    return response.json() as Promise<T>;
};

export const apiPost = async <Req, Res = void>(path: string, data: Req): Promise<Res> => {
    const response = await fetch(`${baseUrl}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const text = await response.text(); // エラーログのヒント
        throw new Error(`POST failed: ${response.status} - ${text}`);
    }

    const text = await response.text();
    return text ? (JSON.parse(text) as Res) : (undefined as Res);
};
