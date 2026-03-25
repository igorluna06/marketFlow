export function reconstructEntities<T>(data: any[], factory: (item: any) => T): T[] {
    if(!Array.isArray(data)) return [];

    return data.map(item => factory(item));
}

    
