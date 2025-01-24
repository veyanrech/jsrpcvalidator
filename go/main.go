package main

import (
	"encoding/json"
	"fmt"
	"net"
)

type RPCRequest struct {
	Method string        `json:"method"`
	Params []interface{} `json:"params"`
}

type ValidationMethodResponse struct {
	Error string `json:"error"`
	Value string `json:"value"`
}

func ValidationMethod(req RPCRequest) ValidationMethodResponse {
	conn, err := net.Dial("tcp", "localhost:1337")
	if err != nil {
		return ValidationMethodResponse{Error: err.Error()}
	}
	defer conn.Close()

	encoder := json.NewEncoder(conn)
	if err := encoder.Encode(req); err != nil {
		return ValidationMethodResponse{Error: err.Error()}
	}

	var res ValidationMethodResponse

	reader := json.NewDecoder(conn)
	if err := reader.Decode(&res); err != nil {
		return ValidationMethodResponse{Error: err.Error()}
	}

	return res
}

func main() {
	// Create a new RPCRequest
	req := RPCRequest{
		Method: "validateRisks",
		Params: []interface{}{"ALL", "DAMAGE"},
	}

	// Call the validation method
	res := ValidationMethod(req)

	// Print the response
	fmt.Println(res.Value)

	req1 := RPCRequest{
		Method: "validateRisks",
		Params: []interface{}{"ALL", "OTHER"},
	}

	res1 := ValidationMethod(req1)

	fmt.Println(res1.Value)
}
