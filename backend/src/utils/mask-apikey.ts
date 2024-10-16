export const maskApiKey = (apiKey: string) => {
    
    return apiKey ? `****${apiKey.slice(-4)}` : undefined
}