# gopher-client

1993 called and they want their [protocol](https://en.wikipedia.org/wiki/Gopher_(protocol)) back.

## About
This is a node.js client for the Gopher protocol.
This software is unreleased and incomplete, and very poorly tested against reality.

### Gopher Resources
* [RFC 1436](http://www.rfc-base.org/rfc-1436.html)
* [The Overbite Project](http://gopher.floodgap.com/overbite/)
  * also available at [gopher://gopher.floodgap.com/1/world](gopher://gopher.floodgap.com/1/world)
* [gopher-node](https://www.npmjs.com/package/gopher-node) (ultra-bare-bones node.js Gopher *server*)

### FAQ
#### Isn't gopher... dead?
[No, it's just resting.](https://www.youtube.com/watch?v=npjOSLCR2hE)

#### why??
As a programmer I have spent a fair amount of time dealing with REST.
I thought it would be interesting to take a step back to a simpler time,
and look at older forms of information organization and retrieval.
There is an attractive simplicity to the Gopher model, and the protocol is
simple enough to make writing a good client achievable, but has enough parsing
to make it interesting.

Also, I may have possibly been reading coverage of the recent
["STUPID SHIT NO ONE NEEDS & TERRIBLE IDEAS HACKATHON"](http://www.stupidhackathon.com/).

## TODO
Major functionality:
* Support search queries
* Support following a link
* Support decoding files (e.g. binhex, uuencode)

Design considerations:
* Revisit Type strategy

Quality:
* Test against real-world Gopher servers
* Detailed unit tests around Request objects
* Hardening against malicious Gopher servers (*snerk*)

Todon't:
* Support Gopher+
