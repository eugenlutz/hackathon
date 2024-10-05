interface IWarehouseClient {
    move(id: number): Promise<string>;
}

class WarehouseClient  implements  IWarehouseClient {

    public async move(id: number) : Promise<string> {
        const url = `http://127.0.0.1:3000/move/${id.toString()}`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Mode': 'no-cors'
                    // Add any other headers if needed
                },
            });
    
            if (!response.ok) {
                return `HTTP error! status: ${response.status}`;
            }
    
            const data = await response.json();
            console.log('Data:', data);
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
        }

        return `Done`;
    }
}

export default WarehouseClient;