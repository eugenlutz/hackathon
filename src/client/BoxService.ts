
const WAREHOUSE_URL_BASE = 'localhost:3000/'

type MoveResponse = { bin: string }

export async function moveIdAuto(id: number): Promise<MoveResponse>
{
    const response = await fetch(
        WAREHOUSE_URL_BASE + 'move/' + id,
        { method: "POST" }
    )
        
    if (!response.ok)
        throw new Error(response.statusText)

    return await response.json() as MoveResponse
}

export async function moveId(id: number, bin: string)
{ 
    const response = await fetch(
    WAREHOUSE_URL_BASE + 'move/' + id,
    { method: "POST" }
    )
    
if (!response.ok)
    throw new Error(response.statusText)

return await response.json() as MoveResponse

}