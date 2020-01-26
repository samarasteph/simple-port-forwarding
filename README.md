Simple port forwarding
-----------------------

Forward network data stream from port A to local port B. Remote application

node port_forwarding.js [--from incoming_port] [--to port_to_forward]

incoming_port: listening port that remote application connect to. Default: 8080.
port_to_forward: local port that will receive forwarded data. default: 9090.
machine_or_ip: machine hostname or ip to connect to. Default is 'localhost'.

Test example:

Telnet ----> host:portA ------> host-localserver:portB

- run test_server.js ->	node test_server.js [port_test]
- run port_forwarding -> node port_forwarding.js [--from incoming_port] --to port_test
- run telnet -> telnet host port_test

Then, on telnet prompt, type some text then Enter -> 'ACK: typed text' sent back.



