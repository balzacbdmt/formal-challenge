export type Card = {
    id: number,
    title: string,
    category: string,
    updatedAt: number,
    logsCount: number,
    dataName: string,
    data: any, // TODO !
    dataUpdatedAt?: number,
}