const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

interface ErrorInterface {
  error: string;
}

if (!API_ENDPOINT) {
  throw new Error('API_ENDPOINT is not defined in environment variables');
}

export async function fetchData<T>(
  route: string,
  options: Partial<RequestInit> = {}
): Promise<any> {
  const response = await fetch(`${API_ENDPOINT}${route}`, options);
  if (!response.ok) {
    const data = (await response.json()) as ErrorInterface;
    throw new Error(`Failed to fetch data: ${response.status} | ${data.error}`);
  }
  return (await response.json()) as T;
}
