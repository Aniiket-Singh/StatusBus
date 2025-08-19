export type MessageType = {
    url: string;
    id: string;
};

export type StreamEntry<T> = {
    id: string;
    message: T;
};
