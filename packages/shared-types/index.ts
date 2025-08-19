export type MessageType = {
    url: string;
    id: string;
};

export type StreamEntry<T> = {
    id: string;
    message: T;
};

export type RawRedisMessage = {
    id: string;
    message: Record<string, string>; // The payload is a dictionary of strings
};
