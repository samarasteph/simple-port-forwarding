## Simple port forwarding

Forward network data stream from port A to port B on same machine.

node port_forwarding.js [--from incoming_port] [--to port_to_forward] [--log]

* --from <incoming_port>: listening port that remote application connect to. Default: 8080.
* --to port_to_forward: local port that will receive forwarded data. default: 9090.
* --log: enable trace logs (stdout).

### Test example:

Telnet ----> host:portA ------> host-localserver:portB

- run test_server.js -> ```	node test_server.js [port_test] ```
- run port_forwarding -> ```	node port_forwarding.js [--from incoming_port] --to port_test ```
- run telnet -> ```	telnet host incoming_port ```

Then, on telnet prompt, type some text then Enter -> 'ACK: typed text' sent back.




