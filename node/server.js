const net = require('net');
const { ValidateEmail, ValidateRisks } = require('./validator');

/**
 * 
 * @param {net.Socket} socket 
 */
const handleConnection = (socket) => {
    socket.on('data', (data) => {
        try {
            
            const request = JSON.parse(data.toString());  
            console.log('Request:', request);
            
            const { method, params } = request;

            let result = null; 

            switch (method) {
                case "validateEmail":
                    
                    result = ValidateEmail(params[0]);

                    break;
                
                case "validateRisks":

                    result = ValidateRisks(params[0], params[1]);

                    break;
            
                default:
                    throw new Error("invalid method");
                    break;
            }

            socket.write(JSON.stringify(result) + '\n');

        } catch (error) {
            console.error(error);
            socket.write(error.message);
        }
    });
}

const server = net.createServer(handleConnection);
const PORT = 1337;

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});