export function reconstructEntities<T>(data: any[], entityClass: new (...args: any[]) => T): T[] {
    return data.map(item=> new entityClass(...Object.values(item)))
}

    
